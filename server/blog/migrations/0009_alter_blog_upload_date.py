# Generated by Django 3.2.9 on 2021-11-29 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_merge_20211128_1530'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='upload_date',
            field=models.CharField(default='2021-11-29', max_length=100),
        ),
    ]
