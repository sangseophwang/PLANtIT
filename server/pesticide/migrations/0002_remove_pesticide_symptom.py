# Generated by Django 3.2.9 on 2021-11-17 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pesticide', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pesticide',
            name='symptom',
        ),
    ]
