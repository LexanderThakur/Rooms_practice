from django.urls import path 

from . import views
from . import room_views
urlpatterns=[
    path("register/",views.register),
    path("login/",views.login),
    path("me/",views.me),
    path("create/",room_views.create_room),
    path('getall/',room_views.get_all_rooms),
    path('get/',room_views.get_rooms),
    path('getmy/',room_views.get_my_rooms),
    path('join/<int:room_id>/',room_views.join_room),
    path('members/<int:room_id>/',room_views.get_memberships),
    path('members/',room_views.my_memberships),
    path('delete/<int:room_id>/',room_views.delete_room),
]