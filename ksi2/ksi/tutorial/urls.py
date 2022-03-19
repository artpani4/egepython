from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from tutorial.views import page_not_found

from .views import *
app_name = 'tutorial'
urlpatterns = [
    path('', index, name='index'),
    path('tutorial/<slug:theme>/', theory, name='theory'),
    path('tutorial/<slug:theme>/<slug:task>', task, name='task'),
]
handler404 = page_not_found
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)