import random
import string
import logging
from django.db import transaction
from django.shortcuts import render, redirect
import haikunator
from .models import Room

log = logging.getLogger(__name__)

def about(request):
    return render(request, "about.html")

def new_room(request):
    """
    Randomly create a new room, and redirect to it.
    """
    new_room = None
    while not new_room:
        with transaction.atomic():
            label = haikunator.haikunate()
            if Room.objects.filter(label=label).exists():
                continue
            new_room = Room.objects.create(label=label)
    return redirect(chat_room, label=label)

def chat_room(request, label):
    """
    Room view - show the room, with latest messages.

    The template for this view has the WebSocket business to send and stream
    messages, so see the template for where the magic happens.
    """
    # If the room with the given label doesn't exist, automatically create it
    # upon first visit (a la etherpad).
    room, created = Room.objects.get_or_create(label=label)

    if room.capacity <= 0:
        return redirect(about)

    return render(request, "index.html", {
        'room': room,
    })
