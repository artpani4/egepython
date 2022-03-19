from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from .forms import UserRegistrationForm, LoginForm

def register(request):
    if request.method == 'POST':
        valuenext = request.POST.get('next')
        user_form = UserRegistrationForm(request.POST)
        context = {'valuenext': valuenext, 'user_form': user_form}
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()
            cd = user_form.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password'])
            login(request, user)
            if 'login' not in valuenext and 'register' not in valuenext:
                return redirect(valuenext)
            else:
                return redirect('/')
        else:
            return render(request, 'accountksi/register.html', context)
    else:
        user_form = UserRegistrationForm()
    return render(request, 'accountksi/register.html', {'user_form': user_form})


def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse('tutorial:index'))


def user_login(request):

    if request.method == 'POST':
        valuenext = request.POST.get('next')
        form = LoginForm(request.POST)
        context = {'form': form,
                   'valuenext': valuenext}
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    if len(valuenext)>0 and 'login' not in valuenext and 'register' not in valuenext:
                        return redirect(valuenext)
                    else:
                        return redirect('/')
                    #return HttpResponseRedirect(reverse('tutorial:index'))
                else:
                    return HttpResponse('Disabled accountksi')
            else:
                context['nologin'] = 'Неверный логин или пароль!'
                return render(request, 'accountksi/login.html', context)
    else:
        form = LoginForm()
    return render(request, 'accountksi/login.html', {'form': form})