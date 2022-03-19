from django.apps import AppConfig


class TutorialConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tutorial'
    verbose_name = 'Учебник'


class ThemeConfig(AppConfig):
    name = 'theme'
    verbose_name = 'Темы'

class TaskConfig(AppConfig):
    name = 'task'
    verbose_name = 'Задачи'
