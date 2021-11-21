import jwt
import datetime

from django.conf import settings
from rest_framework.response import Response

def create_token(email, user_type, user_id):
    expire_period = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    payload = {'exp': expire_period, 'email': email, 'user_type': user_type, 'user_id': user_id}
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    access_token = jwt.encode(payload, jwt_key, jwt_algorithm)
    return access_token

def validate_token(token):
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    try:
        payload = jwt.decode(token, jwt_key, jwt_algorithm)
    except jwt.ExpiredSignatureError:
        return Response(data='Expired Token', status=401)
    except jwt.InvalidTokenError:
        return Response(data='Invalid Token', status=401)
    else:
        return Response(data=payload, status=200)
