from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    def __str__(self):
        return self.question_text

class TestCase(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    test_input = models.CharField(max_length=200)
    expected_output = models.CharField(max_length=200)

class Room(models.Model):
    name = models.TextField()
    label = models.SlugField(unique=True)
    question = models.ForeignKey(Question, on_delete=models.PROTECT, null=True)
    start_time = models.DateTimeField(default=timezone.now, db_index=True)
    total_duration = models.IntegerField(default=0)
    round_start_time = models.DateTimeField(default=timezone.now, db_index=True)
    round_duration = models.IntegerField(default=5)

    def __unicode__(self):
        return self.label

class Player(models.Model):
    room = models.ForeignKey(Room, on_delete=models.PROTECT, null=True)
    position = models.IntegerField(null=True)
    name = models.TextField(null=True)
    # Add more fields like lines added etc.

    def __str__(self):
        return self.id

class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages')
    handle = models.TextField()
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __unicode__(self):
        return '[{timestamp}] {handle}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %-d %-I:%M %p')

    def as_dict(self):
        return {'handle': self.handle, 'message': self.message, 'timestamp': self.formatted_timestamp}
# Question.objects.all()[0].testcase_set.create(test_input=pickle.dumps(3), expected_output=pickle.dumps(6))
