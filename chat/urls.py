from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$',  views.about, name='about'),
    url(r'^new/$', views.new_room, name='new_room'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
]
