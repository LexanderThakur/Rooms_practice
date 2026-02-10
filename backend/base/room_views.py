
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

@api_view(['POST'])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def create_room(request):

    


