from django.test import TestCase
from .models import Crop, Disease
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from disease import views

# Create your tests here.

crops = Crop.objects.all()
crops = list(crops.values())

diseases= Disease.objects.all()
diseases= list(diseases.values())

class CropApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        Crop.objects.create(id=1, name='고추')
        Crop.objects.create(id=2, name='엘리스')
        

    def test_crop(self):
        url = reverse(views.crop_all)

        res = self.client.get(url)
        data = res.json()['data']
 
        # get 요청 확인 테스트
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # 테스트로 생성한 작물과 실제 데이터 베이스에 있는 작물과 같은지 확인
        self.assertEqual(data[0], crops[0])
        

class DiseaseAllApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()        
        

    def test_disease_all(self):
        url = reverse(views.disease_all)
        res = self.client.get(url)
        
        # get 요청 확인 
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        
        # DB 조회 확인 및 수량 확인
        self.assertEqual(len(diseases), 20)

class DiseaseEachApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.id = Crop.objects.create(id=1, name='고추')
        self.id = list(Crop.objects.all().values())[0]['id']
        Disease.objects.create(id=1, crops_id=self.id, name='고추탄저병', english_name='Anthracnose',image='a', symptom="주로 과실에 발생한다. 과실에는 처음에 감염부위가 수침상으로 약간 움푹 들어간 원형반점으로 나타나고, 진전되면 병반이 원형 내지 부정형의 겹무늬 증상으로 확대된다. 병반부위에는 담황색 내지 황갈색의 포자덩어리가 형성되고, 심하게 병든 과실은 비틀어지고 미이라처럼 말라버린다. 성숙과의 병반은 간혹 흑색의 겹무늬 증상을 띄는 것도 있으며, 수확 후 건조하는 과정에서 병 증상이 나타나는 것도 있다.", cause="병원균은 종자 혹은 병든 부위에서 자낭각과 균사의 형태로 겨울을 지내고 1차 전염원이 된다. 병의 전반은 주로 분생포자에 의해 이루어지며, 시설재배 포장보다는 노지포장에서 병 발생이 심하다. 노지포장에서는 여름철 장마기에 분생포자가 주로 비, 바람에 의해 전반된다. 노지재배의 풋고추에서는 7월 초순부터 병이 발생하기 시작하여 수확기까지 계속 발생한다.", prevention=["건전종자를 파종하고, 건전묘를 이식한다.",
      "종자를 소독하여 파종한다.",
      "이 병에 잘 걸리지 않는 품종을 선택하여 재배한다.",
      "등록약제를 병 발생 초기부터 살포한다."], pesticides=[
      {
        "id": 1,
        "name": "캡틴에이 입상수화제",
        "image": "a",
        "description": "비가와도 효과 좋은 종합살균제",
        "component": "Captan(40%),Trifloxystrobin(8%)",
        "packing_unit": "500g",
        "kind": "트리할로메칠치오계,스트로빌루린계",
        "attribute": [
          "약 성분이 식물 왁스충에 침투하여 병균 침입을 예방하므로 강우시에도 우수한 약효를 보입니다.",
          "침달성이 우수하여 약효 지속시간이 긴 보호살균제입니다.",
          "다작용기작으로 약제 저항성 병해에도 효과가 우수합니다."
        ],
        "information": [
          "각종 병해가 발생 전이나 발생 초기에 살포하시면 더욱 효과적입니다.",
          "내우성이 뛰어나 장마 전이나 우기 중에 사용하셔도 탁원한 효과를 나타냅니다."
        ]
      },
      {
        "id": 4,
        "name": "새론 수화제",
        "image": "a",
        "description": "유기유황계 종합 살균제",
        "component": "propineb70%",
        "packing_unit": "500g",
        "kind": "유기유황계",
        "attribute": [
          "다양한 작물에 뛰어난 효과를 가진 종합살균제입니다.",
          "유기유황계 계통의 살균제입니다.",
          "아연(ZNC,,)공급효과로 작물을 더욱 튼튼하게 합니다.",
          "작용점이 다양하여 저항성관리에 적합합니다."
        ],
        "information": [
          "동을 함유한 약제 및 기계유 유제와의 1주일 이내 근접살포시에는 약해의 우려가 있으니 근접살포하지 마십시오.",
          "사과에 사용할 경우 낙화 10~20일 경의 유과기에 유제와 썩어 쓰지 마십시오."
        ]
      },
      {
        "id": 3,
        "name": "발라 액제",
        "image": "a",
        "description": "약효 증진시켜주는 기능성 전착제",
        "component": "polyether modified polyslioxane 99%",
        "packing_unit": "100ml",
        "kind": "실록세인계",
        "attribute": [
          "이 농약은 다른 농약에 가용하여 살포하면 대상작물에 습전성 및 부착성을 좋게 하여 유효성분의 침투력을 증진시켜 줍니다."
        ],
        "information": [
          "이 농약은 전착효과를 나타내는 약제이므로 약효를 나타내는 약제와 혼용하여 사용하십시오.",
          "먼저 사용할 농약을 물에 희석한 후 반드시 물이 모두 채워진 상태에서 마지막으로 이 농약의 소정량을 희석액에 희석하여 사용하십시오.",
          "이 농약을 다른 농약과 사용하면 기준량에서도 충분한 효과를 나타냅니다."
        ]
      },
      {
        "id": 2,
        "name": "델란 입상수화제",
        "image": "a",
        "description": "탄저병에 강력한 종합 보호살균제",
        "component": "Dithianon 66%",
        "packing_unit": "330g",
        "kind": "퀴논계",
        "attribute": [
          "약효가 뛰어난 종합보호살균제입니다.",
          "감귤의 더뎅이병이나 배의 검은별무늬병에 특히 예방효과가 뛰어납니다.",
          "저항성균 발생이 적고, 타약제에 저항성을 보이는 병원균에도 효과적입니다.",
          "독특한 화학구조를 가지고 여러 작용점에 작용하므로 저항성균의 출현우려가 없고, 기존의 침투이행성 약제 저항성균에 효과적입니다.",
          "작물체 표면 구석까지 퍼져 보호효과가 우수합니다.",
          "입자가 미세하여 작물체 구석까지 표면에 고르게 살포되어 병원균으로부터 효과적으로 작물을 보호합니다.",
          "잎이나 과실에 부착성과 내우성이 우수합니다. 부착성과 내우성이 뛰어나 장마기에도 우수한 효과를 발휘하며, 약효지속효과가 탁월합니다.",
          "살포액 조제시 가루가 날리지 않아 사용이 간편합니다."
        ],
        "information": [
          "본 약제는 체질에 따라 알레르기 증상이 나타날 수 있으므로 특이체질 또는 호흡기관이 약한 사람과 병중인 사람은 사용하지 마십시오.",
          "기계유 유제와 혼용 및 근접살포시 약해 우려가 있으므로 사용에 주의하십시오."
        ]
      },
      {
        "id": 5,
        "name": "영일베스트 유현탁제",
        "image": "a",
        "description": "과수 전문 광범위 종합살균제",
        "component": "Propiconazole10%,Tebuconazole12%",
        "packing_unit": "250ml",
        "kind": "트리아졸계",
        "attribute": [
          "트리아졸계로 뛰어난 침투이행성을 가진 광범위 종합살균제입니다.",
          "병원균에 대한 예방 및 치료효과가 우수합니다.",
          "내우성이 우수하며, 저농도에서도 효과가 장기간 지속됩니다.",
          "침달성이 우수하여 병원균의 병반확대를 저지하는 효과가 우수합니다."
        ],
        "information": [
          "5월 중하순경 사과 갈색무늬병, 탄저병, 점무늬낙엽병을 동시에 방제하기 위하여 영일베스트 유현탁제를 2,000배로 살포하여 주십시오.",
          "본 약제처리 후 계통이 다른 스트로빌루린계 약제(카브리오에이 입상수화제, 스트로비 액상수화제)와 교호 살포시 방제효과를 극대화 시킬 수 있습니다."
        ]
      },
      {
        "id": 6,
        "name": "차세대 수화제",
        "image": "a",
        "description": "농업용 항생제와 침투성 약제의 혼합제",
        "component": "Carbendazim50%,Polyoxin D 1.5%",
        "packing_unit": "500g",
        "kind": "카바메이트계,항생제",
        "attribute": [
          "침투성이 우수하여 예방은 물론 치료효과도 우수합니다.",
          "사과, 배, 단감 등 과수류, 고추, 오이 등 과채류에도 적용범위가 넓고 혼용이 매우 편리합니다.",
          "이 약제는 농업용 항생제와 카바메이트계 침투성 약제의 혼합제로 탄저병 및 흰가루병에 우수한 상승효과를 가집니다.",
          "인축 및 어패류에 대하여 독성이 낮아 안전성이 높습니다."
        ],
        "information": [
          "장마가 시작되기전 예방위주로 1~2회 살포하는 것이 매우 효과적입니다.",
          "탄저병, 갈색무늬병, 잿빛곰팡이병, 흰가루병의 동시방제가 필요한 8월 상·중순경에 차세대 수화제를 사용하십시오."
        ]
      },
      {
        "id": 7,
        "name": "아리메타실엠지 수화제",
        "image": "a",
        "description": "역병 노균병 예방약",
        "component": "mancozeb(56%) , metalaxy(7.5%)",
        "packing_unit": "200g",
        "kind": "유기유황계,아실아라닌계",
        "attribute": [
          "이 농약은 유기유황계인 만코제브와 아실아라닌계인 메탈락실의 혼합제입니다.",
          "이 농약은 침투이행성 살균제와 보호살균제와의 혼합제로서 적용병해에 예방 및 치료효과가 있습니다."
        ],
        "information": [
          "이 농약은 사용약량을 지켜 물에 희석한 후 분무기를 이용하여 작물에 충분히 묻도록 뿌리십시오.",
          "동을 함유한 약제와는 약해의 우려가 있으므로 연용하지 마십시오.",
          "터널재배시에는 저항력이 약한 유묘나 생육이 불량한 상태에서는 사용을 피하십시오"
        ]
      },
      {
        "id": 8,
        "name": "아리베노밀 수화제",
        "image": "a",
        "description": "벤지미다졸계 살균제",
        "component": "Benomyl 50%",
        "packing_unit": "330g",
        "kind": "벤지미다졸계",
        "attribute": [
          "벤지미다졸계 살균제입니다."
        ],
        "information": [
          "느타리버섯 푸른곰팡이병 : 배지살균전 균상표면에 약제 희석액을 배지 3.3㎡당 6ℓ(약량 6g/3.3㎡)정도 골고루 살포하여 주십시오.",
          "사과 흰날개무늬병 : 묘목 정식 후 뿌리 주위에 ㎡당 희석액 40ℓ를 골고루 관주하십시오.",
          "저항성 문제를 예방하기 위하여 이 농약을 3회 이상 연용하지 마시고 작용기작이 다른 제품과 번갈아 살포하여 주십시오."
        ]
      }
    ])
        # list(Disease.objects.all().values())[0]['pesticides']

    def test_disease_each(self):
        url = reverse(views.disease_each, kwargs={'id': 1})
        test_data = {"id" : 1, "crops_id" : 1, "name" : "고추탄저병", "english_name":'Anthracnose', "image" : 'a', "symptom":"주로 과실에 발생한다. 과실에는 처음에 감염부위가 수침상으로 약간 움푹 들어간 원형반점으로 나타나고, 진전되면 병반이 원형 내지 부정형의 겹무늬 증상으로 확대된다. 병반부위에는 담황색 내지 황갈색의 포자덩어리가 형성되고, 심하게 병든 과실은 비틀어지고 미이라처럼 말라버린다. 성숙과의 병반은 간혹 흑색의 겹무늬 증상을 띄는 것도 있으며, 수확 후 건조하는 과정에서 병 증상이 나타나는 것도 있다.",
        "cause":"병원균은 종자 혹은 병든 부위에서 자낭각과 균사의 형태로 겨울을 지내고 1차 전염원이 된다. 병의 전반은 주로 분생포자에 의해 이루어지며, 시설재배 포장보다는 노지포장에서 병 발생이 심하다. 노지포장에서는 여름철 장마기에 분생포자가 주로 비, 바람에 의해 전반된다. 노지재배의 풋고추에서는 7월 초순부터 병이 발생하기 시작하여 수확기까지 계속 발생한다.", "prevention":["건전종자를 파종하고, 건전묘를 이식한다.", "종자를 소독하여 파종한다.", "이 병에 잘 걸리지 않는 품종을 선택하여 재배한다.", "등록약제를 병 발생 초기부터 살포한다."], "pesticides": [ "캡틴에이 입상수화제", "새론 수화제", "발라 액제", "델란 입상수화제", "영일베스트 유현탁제", "차세대 수화제", "아리메타실엠지 수화제", "아리베노밀 수화제"]}
        
        # print(Disease.objects.filter(id=1).values())
        # list(Disease.objects.filter(id=1).values())
        res = self.client.get(url)

        print(res.json())

        # get 요청 확인 
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # 테스트로 생성한 작물과 실제 데이터 베이스에 있는 작물과 같은지 확인
        self.assertEqual(test_data, diseases[0])