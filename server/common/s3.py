import boto3
import io
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

def upload_blog_image(html_code, blog_id):
    html_copy = html_code
    opentag = '<img src="data:image/png;base64,'
    closetag = '">'
    result = []
    image_index = []
    cursor = 0

    while True:
        opentag_idx = html_copy.find(opentag)
        if opentag_idx == -1:
            break
        
        cursor += opentag_idx
        html_copy = html_copy[opentag_idx:]
        
        closetag_idx = html_copy.find(closetag)    

        result.append(html_code[cursor + len(opentag):cursor + closetag_idx])
        image_index.append((cursor + len(opentag), cursor + closetag_idx))
        cursor = cursor + closetag_idx + len(closetag)
        html_copy = html_copy[closetag_idx + len(closetag):]

    image_path = []
    path_prefix = 'blog/'
    for idx, res in enumerate(result):
        filename = str(blog_id) + '-' + str(idx) + '.png'
        image = b64decode(res)
        
        img = io.BytesIO(image)
        s3.upload_fileobj(img, AWS_STORAGE_BUCKET_NAME, path_prefix + filename)
        
        image_path.append(AWS_DOMAIN + path_prefix + filename)

    for i in range(len(result)):
        result[i] = 'data:image/png;base64,' + result[i]

    for before, after in zip(result, image_path):
        html_code = html_code.replace(before, after)

    return html_code

def upload_user_image(image, user_id):
    path_prefix = 'profile/'
    image = b64decode(image)
    img = io.BytesIO(image)
    filename = str(user_id) + '-profile.png'
    s3.upload_fileobj(img, AWS_STORAGE_BUCKET_NAME, path_prefix +filename)
    image_path = AWS_DOMAIN + path_prefix + filename
    return image_path