from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from disease.models import Disease
from pesticide.models import Pesticide
from time_log import logging_time
from disease.views import disease_each

# Create your views here.

# 농약 정보
@api_view(['GET'])
@logging_time
def analysis(request, name='고추탄저병'):
    '''
    농약 각각의 정보
    '''
    try:
        disease = list(Disease.objects.filter(name=name).values())
        
        _pesticides = []

        for item in disease[0]['pesticides']:
            find_each_pesticide = Pesticide.objects.filter(name=item)
            find_each_pesticide = find_each_pesticide.values()
            _pesticides += find_each_pesticide
        
        disease[0]['pesticides'] = _pesticides
        disease[0]['image'] = '유저가 업로드한 이미지 (aws s3 url)'
        disease[0]['level'] = 2 # AI Model에서 나온 값 적용해야함
        disease[0].pop('crops_id')

        data = {"data" : disease[0]}

        return JsonResponse(data, json_dumps_params={'ensure_ascii': False}, safe=False)
        
    except:
        return Response('잘못된 형식')