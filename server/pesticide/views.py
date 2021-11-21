from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Pesticide

# Create your views here.

# 농약 정보
@api_view(['GET'])
def pesticide_each(request, name):
    '''
    농약 각각의 정보
    '''
    try:

        pesticide = Pesticide.objects.filter(name = name)
        pesticide = pesticide.values()
        result = {"code" : 200, "message" : "success", "data" : pesticide[0]}

        return JsonResponse(result, json_dumps_params={'ensure_ascii': False}, safe=False)
        
    except:
        return Response('잘못된 형식')