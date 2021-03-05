from django.shortcuts import render
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework .permissions import IsAuthenticated

from .serializers import LoginSerializer, UserSerializer

# Create your views here.

@api_view(['POST'])
def login_view(request, *args, **kwargs):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    res = {
        "user": UserSerializer(user).data,
        "token": AuthToken.objects.create(user)[1]
    }
    print(res)
    return Response(res)