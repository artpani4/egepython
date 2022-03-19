import uuid

from django.conf import settings
from django.contrib.auth.models import  User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils  import timezone
from datetime import *



def task_avatar_directory_path(instance, filename):
    return 'avat_task/{}'.format(filename)


def theme_avatar_directory_path(instance, filename):
    return 'avat_theme/{}'.format( filename)

def course_avatar_directory_path(instance, filename):
    return 'avat_course/{}'.format( filename)

def task_testfile_directory_path(instance, filename):
    return 'test_files/{}.txt'.format(instance.title_url)





class Theme(models.Model):
    title = models.CharField(max_length=200)
    title_url = models.CharField(max_length=200)
    description = models.TextField()
    order_num = models.IntegerField()
    avatar = models.ImageField(upload_to=theme_avatar_directory_path)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return self.title_url

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'


class Task(models.Model):
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=255, unique=True, verbose_name='URL')
    default_code = models.TextField(default='')
    title = models.CharField(max_length=200)
    content = models.TextField()
    test = models.TextField(blank=True)
    test_file = models.FileField(blank=True, upload_to=task_testfile_directory_path)
    avatar = models.ImageField(upload_to=task_avatar_directory_path, blank=True)
    hint = models.TextField()
    author_solution = models.TextField()
    difficulty = models.IntegerField()
    available = models.BooleanField(default=True)
    withfile = models.IntegerField(default=0)
    withtest = models.IntegerField(default=1)
    withimg = models.IntegerField(default=0)
    solved_tasks = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserTask')

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return self.title_url

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'

    @property
    def has_hint(self):
        return len(self.hint) > 0

    @property
    def user_solution_range(self):
        t = Task.objects.get(slug=self.slug)
        l = len(t.usertask_set.all().filter(solved_task__pk=t.pk))
        return range(min(l, 5))

        

    @property
    def black_range_for_difficulty(self):
        return range(1, self.difficulty + 1)


    @property
    def white_range_for_difficulty(self):
        return range(self.difficulty, 5)


    @property
    def difficulty_color(self):
        dc = {1: '#008000', 2: '#006400', 3: '#CD5C5C', 4: '#8B0000', 5: 'black'}
        return dc[self.difficulty]


class UserTask(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    solved_task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user_solution = models.TextField()
    # # t = timezone.localtime(timezone.now())
    # print(datetime(2000, 1, 1, 0, 0, tzinfo=timezone.utc).isoformat())
    first_view = models.DateTimeField( default = datetime(2000, 1, 1, 0, 0, tzinfo=timezone.utc))
    finish = models.DateTimeField( default = datetime(2000, 1, 1, 0, 0, tzinfo=timezone.utc))
    attemptions = models.IntegerField(default = 0)
    ratio = models.FloatField(default = 0)

    class Meta:
        verbose_name = 'Юзер и решение'
        verbose_name_plural = 'Юзера и решения'

    def __str__(self):
        return self.user.username+':'+self.solved_task.title


class Trick(models.Model):
    title = models.CharField(max_length=200)
    code = models.TextField()
    comment = models.TextField()

    class Meta:
        verbose_name = 'Трюк'
        verbose_name_plural = 'Трюки'

    def __str__(self):
        return self.title

    @property
    def range_without_0(self):
        return range(1, 4)


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    donated = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        a = Profile.objects.create(user=instance)
        a.save()
        #instance.profile.save()

class Course(models.Model):
    title = models.CharField(max_length=200)
    theme = models.ManyToManyField(Theme, blank = True)
    task = models.ManyToManyField(Task, blank = True)
    profile = models.ManyToManyField(Profile, blank = True)
    # avatar = models.ImageField(upload_to=course_avatar_directory_path, blank=True)
    price = models.IntegerField()
    priority = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_themes(self):
        return ','.join([str(x) for x in self.theme.all()])

    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'
