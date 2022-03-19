from django.contrib import admin
from .models import *

# class ThemeInline(admin.StackedInline):
#     model = Theme
#     extra = 1

class TaskInline(admin.StackedInline):
    model = Task


class TrickInline(admin.StackedInline):
    model = Trick

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'default_code','test')
    list_display_links = ('title',)
    list_editable = ( 'default_code','test')
    prepopulated_fields = {"slug":("title",)}


class ThemeAdmin(admin.ModelAdmin):
    list_display = ('title', 'order_num', 'avatar', 'description')
    list_display_links = ('title',)
    list_editable = ('avatar', 'description')
    inlines = [TaskInline]

class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_themes')
    # inlines = [ThemeInline]


class TrickAdmin(admin.ModelAdmin):
    list_display = ('title', 'code', 'comment')
    list_display_links = ('title',)
    list_editable = ('code', 'comment')




class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'donated')
    list_display_links = ('user',)

admin.site.register(Task, TaskAdmin)
admin.site.register(Theme, ThemeAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Trick, TrickAdmin)
admin.site.register(Profile, ProfileAdmin)


