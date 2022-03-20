"""ksi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from tutorial.views import *
from django.views.static import serve


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', include('tutorial.urls')),
    path('', include('accountksi.urls')),
    path('success_solution/', success_solution, name='success_solution'),
    path('update_solution/', update_solution, name='update_solution'),
    path('sandbox/', sandbox, name='sandbox'),
    path('tips&tricks/', tips, name='tips'),
    path('get_tricks/', get_tricks, name='get_tricks'),
    path('accounts/', include('allauth.urls')),
    path('courses/', courses, name = 'courses'),
    path('profile/', profile, name = 'profile'),
    path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

handler404 = page_not_found
handler500 = page_not_found1