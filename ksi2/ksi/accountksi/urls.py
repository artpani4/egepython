from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views

from .views import *
app_name = 'accountksi'
urlpatterns = [
    path('accountksi/register/', register, name='register'),
    path('accountksi/logout/', logout_user, name='logout_user'),
    path('accountksi/login/', user_login, name='login'),
    path('accountksi/password-reset/', auth_views.PasswordResetView.as_view(template_name='accountksi/password_reset_form.html', email_template_name='accountksi/password_reset_email.html', success_url = reverse_lazy('accountksi:password_reset_done')), name='password_reset'),
    path('accountksi/password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='accountksi/password_reset_done.html'), name='password_reset_done'),
    path(r'accountksi/password-reset/confirm/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name='accountksi/password_reset_confirm.html',success_url = reverse_lazy('accountksi:password_reset_complete')), name='password_reset_confirm'),
    path('accountksi/password-reset/complete/', auth_views.PasswordResetCompleteView.as_view(template_name='accountksi/password_reset_complete.html'), name='password_reset_complete'),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)