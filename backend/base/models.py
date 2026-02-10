from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

from django.conf import settings
class CustomUser(AbstractUser):
    email=models.EmailField(unique=True)



class Room(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    owner=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)



class RoomMembership(models.Model):

    room=models.ForeignKey(Room,on_delete=models.CASCADE)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)



