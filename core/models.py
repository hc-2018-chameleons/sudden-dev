from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text

class TestCase(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    test_input = models.CharField(max_length=200)
    expected_output = models.CharField(max_length=200)
