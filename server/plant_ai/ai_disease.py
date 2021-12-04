import tensorflow as tf
import os
import numpy as np
import cv2
import urllib.request

def disease(img_path):
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
#모델만들기
    model = tf.keras.applications.resnet50.ResNet50(
        include_top=True, weights='imagenet', input_tensor=None,
        input_shape=None, pooling=None, classes=1000)

#모델설정
    model.compile(
        loss='sparse_categorical_crossentropy',
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
        metrics=['accuracy']
    )

#가중치 가져와서 적용
    latest = '/project/server/plant_ai/checkpoint/cp-0004.ckpt'
    model.load_weights(latest).expect_partial()

#이미지파일을 모델에 적용시킬수 있도록 변형
    req = urllib.request.urlopen(img_path)
    image_nparray = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)
    img = cv2.resize(img,(224,224),3)
    img = img.reshape((1, 224, 224, 3))
#모델로 예측
    pred = model.predict(img)
#클래스 정리
    disease_classes = ['정상','고추탄저병','고추흰가루병','무검은무늬병','무노균병','배추검은썩음병','배추노균병','애호박노균병','애호박흰가루병','양배추균핵병','양배추무름병','오이노균병','오이흰가루병','콩불마름병','콩점무늬병','토마토잎마름병','파검은무늬병','파노균병','파녹병','호박노균병','호박흰가루병']

#각각 클래스의 확률
    disease_class={}
    for i in range(20):
        disease_class[disease_classes[i]] = pred[0][i]

    disease_class = sorted(disease_class.items(), key=lambda x:x[1], reverse=True)
    print('가능성 높은것은: {}, 확률은 {}'.format(disease_class[0][0], disease_class[0][1]))

#정답예측
    return disease_class[0]