# Generated by Django 3.2.9 on 2021-11-26 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20211124_0905'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='upload_date',
            field=models.CharField(default='2021-11-26', max_length=100),
        ),
        migrations.AlterModelTable(
            name='blog',
            table='blog',
        ),
    ]