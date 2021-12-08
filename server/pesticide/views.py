from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Pesticide
from time_log import logging_time
from django.core.cache import cache

# Create your views here.

# 농약 정보
@api_view(['GET'])
@logging_time
def pesticide_each(request, name):
    '''
    농약 각각의 정보
    '''
    try:

        pesticide = cache.get_or_set(f'pesticide_{name}',Pesticide.objects.filter(name = name).values(), timeout=604800)
        result = {"data" : pesticide[0]}

        return JsonResponse(result, json_dumps_params={'ensure_ascii': False}, safe=False)
        
    except:
        return Response('잘못된 형식')