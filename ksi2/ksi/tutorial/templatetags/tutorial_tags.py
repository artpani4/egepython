from tutorial.models import *
from django import template
import random

register = template.Library()
a={}


@register.simple_tag()
def theme_progress_width_1(user,theme):
    return user.usertask_set.all().filter(solved_task__theme=theme).count()
    # a[theme] = [1]
    # b = user.usertask_set.all()#все решенные задачи юзера
    # c = b.filter(solved_task__theme=theme).count()
    # print(c)
    # return a[theme][0]


@register.simple_tag()
def theme_progress_width_2(theme):
    # a[theme].append(theme.task_set.all().count())
    # return a[theme][1]
    return theme.task_set.all().count()

@register.simple_tag()
def theme_progress_width(user,theme):
    # if theme.task_set.all().count()==0:
    #     d=100
    # else:
    #     d = theme.task_set.all().count()
    # return int(100*1/d)
    return 100*user.usertask_set.all().filter(solved_task__theme=theme).count()/theme.task_set.all().count()


# @register.simple_tag()
# def locked_task(task, user):
#         t = Task.objects.get(slug=task.slug)
#         print('-------------------------',user.profile_set.all())
#         return t.available==1# and user.profile_set.all()