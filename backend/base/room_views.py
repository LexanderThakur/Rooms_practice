
from django.shortcuts import render

# Create your views here.


from rest_framework.response import Response 

from rest_framework.decorators import api_view,authentication_classes , permission_classes

from django.contrib.auth import get_user_model,authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny

from .jwt_utils import create_token,decode_token

from .auth import customjwt
from rest_framework import status

User= get_user_model()

from .models import Room,RoomMembership
from .serializers import (
    RoomSerializer,
    RoomCreateSerializer,
    RoomMembershipSerializer,
    RoomMembershipCreateSerializer
)

@api_view(['POST'])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def create_room(request):

    serializer = RoomCreateSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(owner=request.user)

    return Response({"message":"success"},status=201)



@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_all_rooms(request):

    rooms_qs= Room.objects.all()
    data=[]

    for room in rooms_qs:
        
        serializer=RoomSerializer(room)
        data.append(serializer.data)

    return Response({"message":data},status=200)

@api_view(['GET'])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def get_rooms(request):
    room_qs= Room.objects.exclude(owner=request.user)
    serializer= RoomSerializer(room_qs,many=True)
    return Response({"message":serializer.data},status=200)

@api_view(["PATCH"])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def join_room(request,room_id):

    
    serializer =  RoomMembershipCreateSerializer(
        data={
            "room":room_id
        },
        context={"request":request}
    )
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    return Response({"message":"joined successfully"},status=201)

@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def get_memberships(request,room_id):

    membership_qs= RoomMembership.objects.filter(room=room_id)
    
    
    serializer= RoomMembershipSerializer(membership_qs, many=True)

        

    return Response({"message":serializer.data},status=200)



@api_view(["GET"])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def my_memberships(request):

    membership_qs= RoomMembership.objects.filter(user=request.user)
    serializer= RoomMembershipSerializer(membership_qs,many=True)

    return Response({"message":serializer.data},status=200)

@api_view(["GET"])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def get_my_rooms(request):
    qs= Room.objects.filter(owner=request.user)
    serializer= RoomSerializer(qs,many=True)
    return Response({"message":serializer.data},status=200)


@api_view(['DELETE'])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def delete_room(request,room_id):

    room = Room.objects.get(id=room_id)
    if not room:
        return Response({"message":"already gone"},status=200)

    room.delete()
    return Response({"message":"success"},status=200)