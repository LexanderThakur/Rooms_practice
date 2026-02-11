from rest_framework import serializers

from .models import Room,RoomMembership
from django.contrib.auth import get_user_model

User = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class RoomSerializer(serializers.ModelSerializer):
    owner=UserSerializer(read_only=True)
    class Meta:
        model=Room
        fields="__all__"


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Room 
        fields=['name','description']



class RoomMembershipSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    room=RoomSerializer(read_only=True)
    class Meta:
        model=RoomMembership
        fields="__all__"


class RoomMembershipCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=RoomMembership
        fields=['room']

    def validate(self,attrs):
        user= self.context['request'].user
        room = attrs.get("room")
        
        if RoomMembership.objects.filter(user=user,room=room).exists():
            raise serializers.ValidationError("Already Joined this Room")
           
        return attrs