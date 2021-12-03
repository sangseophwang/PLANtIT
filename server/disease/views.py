import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Disease, Crop
from pesticide.models import Pesticide
from time_log import logging_time
from django.core.cache import cache

# Create your views here.
# 질병 도감에 사용
@api_view(['GET'])
@logging_time
def disease_all(request):
    '''
    질병 전체
    '''
    try:

        diseases = cache.get_or_set('diseases', Disease.objects.all().values(),timeout=None)
        # diseases = Disease.objects.all().values()
        diseases = list(diseases)

        for crop in diseases:
            crop_id = crop['crops_id']
            crop_name = Crop.objects.filter(id=crop_id)
            crop_name = list(crop_name.values())
            crop['crops_id'] = crop_name[0]['name']
            
        result = {"data" : diseases}
        
        return JsonResponse(result, json_dumps_params={'ensure_ascii': False}, safe=False)
    except:
        return Response('잘못된 형식')



# 결과페이지에 사용, 농약 value 수정 필요
@api_view(['GET'])
@logging_time
def disease_each(request, id):
    '''
    질병 각각
    '''
    try:
        disease = cache.get_or_set(f'disease_{id}',Disease.objects.filter(id = id).values(), timeout=604800)
        disease = list(disease)
        
        _pesticides = []

        for item in disease[0]['pesticides']:
            find_each_pesticide = Pesticide.objects.filter(name=item)
            find_each_pesticide = find_each_pesticide.values()
            _pesticides += find_each_pesticide

        disease[0]['pesticides'] = _pesticides
        result = {"data" : disease[0]}

        return JsonResponse(result, json_dumps_params={'ensure_ascii': False}, safe=False)

    except:
        return Response('잘못된 형식', status=400)


@api_view(['GET'])
@logging_time
def crop_all(request):
    '''
    작물 전체
    '''
    try:
        crop = Crop.objects.all()
        crop = list(crop.values())

        result = {"data" : crop}
        return Response(result, status=200)
    except:
        return Response('잘못된 형식', status=400)