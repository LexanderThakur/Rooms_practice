
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

    rooms_qs= Rooms.objects.all()
    data=[]

    for room in rooms_qs:
        serializer=RoomSerializer(room)
        data.append(serializer.data)

    return Response({"message":data},status=200)


    


