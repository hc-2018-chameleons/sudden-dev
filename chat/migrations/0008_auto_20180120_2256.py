# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2018-01-20 22:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_auto_20180120_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testcase',
            name='expected_output',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='testcase',
            name='test_input',
            field=models.CharField(max_length=200),
        ),
    ]
