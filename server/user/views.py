from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
import jwt
import datetime
import json

# Create your views here.

@api_view(['POST'])
def login(request):
    request_body = json.loads(request.body)
    email = request_body['email']
    password = request_body['password']
    user_type = 0
    
    expire_period = datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
    payload = {'exp': expire_period, 'email': email, 'user_type': user_type}
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    
    access_token = jwt.encode(payload, jwt_key, jwt_algorithm)
    
    return Response(data=access_token, status=200)

@api_view(['POST'])
def naver_login(request):
    code = request.POST['code']
    status = request.POST['status']
    
@api_view(['POST'])
def google_login(request):
    token = request.POST['code']

def validate_token(token):
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    try:
        jwt.decode(token, jwt_key, jwt_algorithm)
    except jwt.ExpiredSignatureError:
        return Response(data='Expired Token', status=401)
    except jwt.InvalidTokenError:
        return Response(data='Invalid Token', status=401)
    else:
        return True