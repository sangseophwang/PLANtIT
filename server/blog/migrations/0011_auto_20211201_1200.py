# Generated by Django 3.2.9 on 2021-12-01 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_merge_20211201_1159'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='thumbnail',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='blog',
            name='title',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='blog',
            name='upload_date',
            field=models.CharField(default='2021-12-01', max_length=100),
        ),
    ]
