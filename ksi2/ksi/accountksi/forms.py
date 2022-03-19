from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django import forms


class UserRegistrationForm(forms.ModelForm):
    username = forms.CharField(label='Логин', widget=forms.TextInput(attrs={'class':'form-control col-auto'}))
    email = forms.EmailField(label='Почта', widget=forms.EmailInput(attrs={'class':'form-control'}))
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput(attrs={'class':'form-control'}))
    password2 = forms.CharField(label='И еще разок пароль', widget=forms.PasswordInput(attrs={'class':'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Пароли не совпадают')
        return cd['password2']


class LoginForm(forms.Form):
    username = forms.CharField(label='Логин', widget=forms.TextInput(attrs={'class': 'form-control col-auto'}))
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    # def clean_username(self):
    #     cd = self.cleaned_data
    #     user = authenticate(username=cd['username'], password=cd['password'])
    #     if user is None:
    #         raise forms.ValidationError('Пользователя с таким логином не нахожу!')
    #     return cd['username']