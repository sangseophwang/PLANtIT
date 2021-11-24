import boto3
import io
import datetime

from base64 import b64decode
from django.conf import settings


AWS_STORAGE_BUCKET_NAME = settings.AWS_STORAGE_BUCKET_NAME
AWS_ACCESS_KEY_ID = settings.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = settings.AWS_SECRET_ACCESS_KEY
AWS_REGION = settings.AWS_REGION
AWS_DOMAIN = 'https://%s.s3.%s.amazonaws.com/' % (AWS_STORAGE_BUCKET_NAME, AWS_REGION)

s3 = boto3.client(
    service_name = 's3',
    aws_access_key_id = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY)

def upload_blog_image(image, filename):
    upload_time = datetime.datetime.now().strftime('%y%m%d-%H%M%S')
    s3.upload_fileobj(image, AWS_STORAGE_BUCKET_NAME, 'blog/' + upload_time + filename)
    image_url = AWS_DOMAIN + 'blog/' + upload_time + filename
    return image_url

def get_thumbnail_url(html_code):
    opentag = '<img src='
    closetag = '>'

    opentag_idx = html_code.find(opentag) + 1
    if opentag_idx == -1:
        return False

    html_copy = html_code[opentag_idx:]
    closetag_idx = html_copy.find(closetag) - 1

    result = html_code[opentag_idx + len(opentag) : opentag_idx + closetag_idx]
    return result

def upload_user_image(image, user_id):
    path_prefix = 'profile/'
    image = b64decode(image)
    img = io.BytesIO(image)
    filename = str(user_id) + '-profile.png'
    s3.upload_fileobj(img, AWS_STORAGE_BUCKET_NAME, path_prefix +filename)
    image_path = AWS_DOMAIN + path_prefix + filename
    return image_path