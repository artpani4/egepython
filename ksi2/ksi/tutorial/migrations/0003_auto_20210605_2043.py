# Generated by Django 3.2.4 on 2021-06-05 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0002_auto_20210605_2024'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='title_url',
            field=models.CharField(default=0, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='theme',
            name='title_url',
            field=models.CharField(default=0, max_length=200),
            preserve_default=False,
        ),
    ]
