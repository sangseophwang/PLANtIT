from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Disease
from pesticide.models import Pesticide

# Create your views here.
# 질병 도감에 사용
@api_view(['GET'])
def disease_all(request):
    '''
    질병 전체
    '''
    try:
        diseases = Disease.objects.all()
        diseases = list(diseases.values())
        result = {"code" : 200, "message" : "success", "data" : diseases}
        return JsonResponse(result, json_dumps_params={'ensure_ascii': False}, safe=False)
    except:
        return Response('잘못된 형식')


# 결과페이지에 사용, 농약 value 수정 필요
@api_view(['GET'])
def disease_each(request, id):
    '''
    질병 각각
    '''
    try:
        disease = Disease.objects.filter(id = id)
        disease = list(disease.values())
        
        pesticides = []

        for item in disease[0]['pesticides']:
            find_each_pesticide = Pesticide.objects.filter(name=item)
            find_each_pesticide = find_each_pesticide.values()
            pesticides += find_each_pesticide

        disease[0]['pesticides'] = pesticides
        result = {"code" : 200, "message" : "success", "data" : disease[0]}

        return JsonResponse(result, json_dumps_params={'ensure_ascii': False}, safe=False)

    except:
        return Response('잘못된 형식')