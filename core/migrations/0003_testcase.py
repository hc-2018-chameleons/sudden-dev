# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2018-01-20 15:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20180120_1416'),
    ]

    operations = [
        migrations.CreateModel(
            name='Testcase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_input', models.CharField(max_length=200)),
                ('expected_output', models.CharField(max_length=200)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Question')),
            ],
        ),
    ]
