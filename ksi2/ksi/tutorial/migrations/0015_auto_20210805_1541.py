# Generated by Django 3.2.4 on 2021-08-05 12:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tutorial', '0014_task_default_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_solution', models.TextField()),
                ('solved_task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.task')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='task',
            name='solved_tasks',
            field=models.ManyToManyField(through='tutorial.UserTask', to=settings.AUTH_USER_MODEL),
        ),
    ]
