import tensorflow as tf
import os
import numpy as np
import cv2
import urllib.request

def risk(img_path):
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
    latest = '/project/server/plant_ai/checkpoint/risk-0003.ckpt'
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
    risk_classes = [0,1,2,3]

#각각 클래스의 확률
    risk_class={}
    for i in range(4):
        risk_class[risk_classes[i]] = pred[0][i]

    risk_class = sorted(risk_class.items(), key=lambda x:x[1], reverse=True)
    print('가능성 높은것은: {}, 확률은 {}'.format(risk_class[0][0], risk_class[0][1]))

#정답예측
    return risk_class[0]

