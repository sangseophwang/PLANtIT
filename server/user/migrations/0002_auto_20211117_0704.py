# Generated by Django 3.2.9 on 2021-11-17 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='description',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
