# Generated by Django 3.2.4 on 2021-11-26 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0028_auto_20211125_1605'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertask',
            name='attemptions',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='usertask',
            name='ratio',
            field=models.FloatField(default=-1.0),
        ),
    ]
