# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2018-01-20 16:35
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
        ),
        migrations.CreateModel(
            name='TestCase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_input', models.BinaryField(default=None)),
                ('expected_output', models.BinaryField(default=None)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Question')),
            ],
        ),
    ]
