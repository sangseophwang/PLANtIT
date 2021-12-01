from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from disease.models import Disease
from pesticide.models import Pesticide
from time_log import logging_time
from common.s3 import s3
from django.conf import settings
import boto3


# Create your views here.
AWS_STORAGE_BUCKET_NAME = settings.AWS_STORAGE_BUCKET_NAME
AWS_REGION = settings.AWS_REGION
AWS_DOMAIN = 'https://%s.s3.%s.amazonaws.com/' % (AWS_STORAGE_BUCKET_NAME, AWS_REGION)

# 검사하려는 이미지 파일 s3로 저장
def upload_analysis_image(image, filename):
    path_prefix = 'analysis/'
    filename = filename.split('.')[0]
    upload_filename = path_prefix + filename +'-analysis.png'
    s3.upload_fileobj(image, AWS_STORAGE_BUCKET_NAME, upload_filename)
    image_url = AWS_DOMAIN + upload_filename
    return image_url

# 농약 정보
@api_view(['POST'])
@logging_time
def analysis(request, name='고추탄저병'):
    '''
    농약 각각의 정보
    '''
    try:
        # img = request.FILES['files']
        # filename = img.name
        # img_url = upload_analysis_image(image=img, filename=filename)

        disease = list(Disease.objects.filter(name=name).values())
        
        _pesticides = []

        for item in disease[0]['pesticides']:
            find_each_pesticide = Pesticide.objects.filter(name=item)
            find_each_pesticide = find_each_pesticide.values()
            _pesticides += find_each_pesticide
        
        disease[0]['pesticides'] = _pesticides
        # disease[0]['image'] = img_url
        disease[0]['level'] = 2 # AI Model에서 나온 값 적용해야함
        disease[0].pop('crops_id')

        data = {"data" : disease[0]}

        return Response(data, status=200)
        
    except:
        return Response('잘못된 형식', status=400)