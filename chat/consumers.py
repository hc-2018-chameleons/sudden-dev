import re
import json
import logging
import time
import calendar
from channels import Group
from channels.sessions import channel_session
from .models import Room, Player

log = logging.getLogger(__name__)

@channel_session
def ws_connect(message):
    # Extract the room from the message. This expects message.path to be of the
    # form /chat/{label}/, and finds a Room if the message path is applicable,
    # and if the Room exists. Otherwise, bails (meaning this is a some othersort
    # of websocket). So, this is effectively a version of _get_object_or_404.
    try:
        prefix, label = message['path'].decode('ascii').strip('/').split('/')
        if prefix != 'chat':
            log.debug('invalid ws path=%s', message['path'])
            return
        room = Room.objects.get(label=label)
    except ValueError:
        log.debug('invalid ws path=%s', message['path'])
        return
    except Room.DoesNotExist:
        log.debug('ws room does not exist label=%s', label)
        return

    log.debug('chat connect room=%s client=%s:%s', 
        room.label, message['client'][0], message['client'][1])
    
    room.capacity -= 1
    room.save()

    # Need to be explicit about the channel layer so that testability works
    # This may be a FIXME?
    Group('chat-'+label, channel_layer=message.channel_layer).add(message.reply_channel)

    message.channel_session['room'] = room.label
    player = Player.objects.create(room=room, position=room.capacity)
    room.player_set.add(player)
    room.save()

    message.channel_session['position'] = player.position
    message.reply_channel.send({
        "text": json.dumps({'you': player.position})
    })
    send_players_update(room, Group('chat-'+label, channel_layer=message.channel_layer))

    if room.capacity == 0:
        q = Question.random()

        test_case_inputs = []
        test_case_outputs = []
        for test_case in q.test_case_set.all():
            test_case_inputs.append(test_case.test_input)
            test_case_outputs.append(test_case.expected_output)

        round_json = {
            'round' : {
                'starttime_utc' : calendar.timegm(time.gmtime()) + 5,
                'time_limit': q.time_limit_seconds,
                'problem' : q.question_text,
                'test_case_inputs' : test_case_inputs,
                'test_case_outputs' : test_case_outputs
            }
        }
        Group('chat-'+label, channel_layer=message.channel_layer).send({'text': json.dumps()})

@channel_session
def ws_receive(message):
    # Look up the room from the channel session, bailing if it doesn't exist
    try:
        label = message.channel_session['room']
        room = Room.objects.get(label=label)
    except KeyError:
        log.debug('no room in channel_session')
        return
    except Room.DoesNotExist:
        log.debug('recieved message, buy room does not exist label=%s', label)
        return

    # Parse out a chat message from the content text, bailing if it doesn't
    # conform to the expected message format.
    try:
        data = json.loads(message['text'])
    except ValueError:
        log.debug("ws message isn't json text=%s", text)
        return
    
    if len(data.keys()) != 1 or data.keys()[0] not in ['player_name']:
        log.debug("ws message unexpected format data=%s", data)
        return

    if data:
        position = message.channel_session['position']
        log.debug('message room=%s player=%s name=%s', 
            room.label, position, data['player_name'])

        player = room.player_set.filter(position=position)
        player.name = data['player_name']
        player.save()

        send_players_update(room, Group('chat-'+label, channel_layer=message.channel_layer))


@channel_session
def ws_disconnect(message):
    try:
        label = message.channel_session['room']
        room = Room.objects.get(label=label)
        Group('chat-'+label, channel_layer=message.channel_layer).discard(message.reply_channel)
    except (KeyError, Room.DoesNotExist):
        pass

def send_players_update(room, group):
    players_dict = {}
    for player in room.player_set.all():
        name = player.name if player.name is not None else ""
        players_dict[player.position] = name

    message_dict = {}
    message_dict['players'] = players_dict
    group.send({'text': json.dumps(players_dict)})



