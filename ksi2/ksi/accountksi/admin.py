from django.contrib import admin

from tutorial.models import Task, UserTask

class UserTaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'solved_task', 'user_solution','attemptions', 'ratio', 'first_view', 'finish' )
    list_display_links = ('solved_task',)
    list_editable = ('attemptions', 'finish', 'ratio')


admin.site.register(UserTask, UserTaskAdmin)