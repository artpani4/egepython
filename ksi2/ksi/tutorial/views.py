import json
import random

from django.contrib.auth.models import User
from django.http import HttpResponse   #, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from itertools import chain
from .models import *
from django.utils  import timezone as dj_tz
from datetime import *


def index(request):
    context = {
        'title': 'Учебник',
        'themes': Theme.objects.order_by('order_num')
    }
    if request.user.is_authenticated:
        p = request.user.profile_set.get(user__pk = request.user.pk)
        context['locked_themes'] = themes_locked_for_profile(p)
    else:
        context['locked_themes'] = Theme.objects.filter(course__pk__in = Course.objects.all())
    return render(request, 'tutorial/index.html', context)


def theory(request, theme):
    context = {
        'theme': get_object_or_404(Theme, title_url = theme) ,
        'title': Theme.objects.get(title_url = theme).title,
        'themes': Theme.objects.order_by('order_num')
    }
    if request.user.is_authenticated:
        if context['theme'] in themes_locked_for_profile(request):
             return redirect('/courses')
        st = [i for i in Task.objects.all() if request.user.usertask_set.all().filter(solved_task__pk=i.pk).exists()]
        context['st'] = st
        context['locked_tasks'] = tasks_locked_for_profile(request)
        context['locked_themes'] = themes_locked_for_profile(request)
        return render(request, 'tutorial/theory_'+context['theme'].title_url+'.html', context)
    else:
        return redirect('/accountksi/register?next=/courses')


def task(request, theme, task):
    t = Task.objects.get(slug=task)
    dc = {1: '#008000', 2: '#006400', 3: '#CD5C5C', 4: '#8B0000', 5: 'black'}
    context = {
        'theme': Theme.objects.get(title_url=theme),
        'title': t.title,
        'task': t,
        'themes': Theme.objects.order_by('order_num'),
        'code':t.default_code,
    }
    if request.user.is_authenticated:
        if context['task'] in tasks_locked_for_profile(request):
            return redirect('/courses')
        st = [i for i in Task.objects.all() if request.user.usertask_set.all().filter(solved_task__pk=i.pk).exists()]
        context['st'] = st
        context['locked_tasks'] = tasks_locked_for_profile(request)
        context['locked_themes'] = themes_locked_for_profile(request)
        user_task = request.user.usertask_set.all().filter(solved_task__pk=t.pk)
        context['exists'] = int(user_task.exists())

        if t.withfile == 1:
            context['test_file'] = str(t.test_file.read())[2:-1]
        if t.withtest == 1:
            context['rangetests'] = range(len(json.loads(t.test)))
        if request.user.usertask_set.all().filter(solved_task__pk=t.pk).exists():
            context['code'] = request.user.usertask_set.all().get(solved_task__pk=t.pk).user_solution
    return render(request, 'tutorial/task.html', context)

def themes_locked_for_profile(request):
    p =  request.user.profile_set.get(user__pk = request.user.pk)
    dtms = set(chain(*[x.theme.all() for x in Course.objects.filter(profile__pk=p.pk)]))
    tms = set(Theme.objects.filter(course__pk__in = Course.objects.all()))
    return tms-dtms

def tasks_locked_for_profile(request):
    p =  request.user.profile_set.get(user__pk = request.user.pk)
    donated_tasks = set(chain(*[x.task.all() for x in Course.objects.filter(profile__pk=p.pk)]))
    dtms = set(chain(*[x.theme.all() for x in Course.objects.filter(profile__pk=p.pk)]))
    donated_by_themes = set(chain(*[x.task_set.all() for x in dtms]))
    tasks = set(Task.objects.filter(course__pk__in = Course.objects.all()))
    themes = set(Theme.objects.filter(course__pk__in = Course.objects.all()))
    task_from_themes = set(chain(*[x.task_set.all() for x in themes]))
    return tasks.union(task_from_themes) - donated_tasks.union(donated_by_themes)

def tasks_donated_for_profile(request):
    p =  request.user.profile_set.get(user__pk = request.user.pk)
    dontated_tasks = set(chain(*[x.task.all() for x in Course.objects.filter(profile__pk=p.pk)]))
    return dontated_tasks

def from_end_cleaner(s):
    i = len(s)-1
    while s[i] in [' ', '\n']:
        i-=1
    return s[:i+1]

def success_solution(request):
    if request.method == 'POST':
        req_task = request.POST['slug']
        req_solution = request.POST['solution']
        req_user = request.POST['user']
        bd_user = User.objects.get(username=req_user)
        bd_task = Task.objects.get(slug=req_task)
        t = bd_task.usertask_set.all().filter(solved_task__pk=bd_task.pk).exclude(user = request.user)
        if len(t)==0:
            z = {}
        else:
            t = random.sample(list(t), max(1, len(t)))
            z = {x.user.username:from_end_cleaner(x.user_solution) for x in t}
        ut = bd_user.usertask_set.all().get(solved_task__pk=bd_task.pk)
        ut.user_solution = from_end_cleaner(req_solution)
        if ut.finish ==  datetime(2000, 1, 1, 0, 0, tzinfo=timezone.utc):
            ut.finish =  dj_tz.localtime(dj_tz.now())
        ut.save()
        ausol= Task.objects.get(slug = req_task).author_solution
        y = json.dumps({'author_solution':ausol, 'other':z}, ensure_ascii=False)
        return HttpResponse(y, status=200)

def update_solution(request):
    if request.method == 'POST':
        req_task = request.POST['slug']
        req_solution = request.POST['solution']
        req_user = request.POST['user']
        req_ratio = request.POST['ratio']
        bd_user = User.objects.get(username=req_user)
        bd_task = Task.objects.get(slug=req_task)
        solution_set = bd_user.usertask_set.all().filter(solved_task__pk=bd_task.pk)
        if solution_set.exists():
            sol = solution_set[0]
            if  sol.finish ==  datetime(2000, 1, 1, 0, 0, tzinfo=timezone.utc):
                sol.attemptions += 1
                sol.user_solution = from_end_cleaner(req_solution)
                sol.save()
        else:
            UserTask.objects.create(user=bd_user, solved_task=bd_task, user_solution=from_end_cleaner(req_solution), first_view =  dj_tz.localtime(dj_tz.now()), ratio = req_ratio, attemptions = 1 )
        return HttpResponse(status=200)


def sandbox(request):
    context = {
        'title': 'Песочница',
        'themes': Theme.objects.order_by('order_num'),
        'code':'',
    }
    if request.user.is_authenticated:
        st = [i for i in Task.objects.all() if request.user.usertask_set.all().filter(solved_task__pk=i.pk).exists()]
        
        context['st'] = st
    return render(request, 'tutorial/sandbox.html', context)


def get_tricks(request):
    if request.method == 'GET':
        tricks = random.sample(list(Trick.objects.all()), 2)
        trick_titles = [x.title for x in tricks]
        trick_codes = [x.code for x in tricks]
        trick_comments = [x.comment for x in tricks]
        j = json.dumps({'titles':trick_titles, 'codes':trick_codes, 'comments': trick_comments}, ensure_ascii=False)
        return HttpResponse(j, status=200)

def tips(request):
    tricks = Trick.objects.all().order_by('id')
    context = {'trick_titles': [x.title for x in tricks],
               'trick_codes': [x.code for x in tricks],
               'trick_comments': [x.comment for x in tricks],
               'tricks': tricks,
               }
    j = json.dumps({'titles': context['trick_titles'], 'codes': context['trick_codes'], 'comments': context['trick_comments']})
    # range_of_len_tips = range(len(trick_titles))
    context['j'] = j
    return render(request, 'tutorial/tipsandtricks.html', context)


def courses(request):
    context = {
        'title': 'Купить курс',
        'courses': Course.objects.all()
    }
    if request.user.is_authenticated:
        context['donated'] = Course.objects.filter(profile__pk=( request.user.profile_set.get(user__pk = request.user.pk)).pk)
    else:
        context['donated'] = []
    return render(request, 'tutorial/courses.html', context)


def page_not_found(request, exception):
    return render(request, 'tutorial/404.html', status=404)


def page_not_found1(request):
    return render(request, 'tutorial/404.html', status=500)

def profile(request):
    user_sols = request.user.usertask_set.filter(user__pk = request.user.pk)
    themes_tasks = {x:[y for y in user_sols.filter(solved_task__pk__in = x.task_set.all())] for x in {x.solved_task.theme for x in user_sols}}
    context = {}
    avr_attemptions = {x.title:(0 if len(themes_tasks[x]) == 0 else sum([i.attemptions for i in themes_tasks[x]])/len(themes_tasks[x])) for x in themes_tasks.keys()}
    context['avr_attemptions'] = json.dumps({'themes':list(avr_attemptions.keys()), 'values':list(avr_attemptions.values())}, ensure_ascii=False)
    avr_ratios = {x.title:(0 if len(themes_tasks[x]) == 0 else sum([i.ratio for i in themes_tasks[x]])/len(themes_tasks[x])) for x in themes_tasks.keys()}
    context['avr_ratios'] = json.dumps({'themes':list(avr_ratios.keys()), 'values':list(avr_ratios.values())}, ensure_ascii=False)
    avr_time = {x.title:(0 if len(themes_tasks[x]) == 0 else sum([(i.finish-i.first_view).total_seconds()/60 for i in themes_tasks[x]])/len(themes_tasks[x])) for x in themes_tasks.keys()}
    context['avr_time'] = json.dumps({'themes':list(avr_time.keys()), 'values':list(avr_time.values())}, ensure_ascii=False)
    return render(request, 'tutorial/profile.html', context)
