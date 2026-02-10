from django.urls import path 

from . import views
from . import room_views
urlpatterns=[
    path("register/",views.register),
    path("login/",views.login),
    path("me/",views.me),
    path("create/",room_views.create_room),
    path('get/',room_views.get_all_rooms),
]