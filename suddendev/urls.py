from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import core.views

# Examples:
# url(r'^$', 'suddendev.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', core.views.index, name='index'),
    url(r'^db', core.views.db, name='db'),
    url(r'^admin/', include(admin.site.urls)),
]
