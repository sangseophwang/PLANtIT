<h1> PLANtIT - Backend 파트 소개 🚀 </h1>

<h2> 💻 기술 스택 </h2>

<br>
<img alt="django" src="https://img.shields.io/badge/-Django-092E20?&style=flat-square&logo=django&logoColor=white"/>
<img alt="jwt" src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>
<img alt="mysql" src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
<img alt="docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
<img alt="aws-s3" src="https://img.shields.io/badge/AWS_S3-569A31?&style=flat-square&logo=amazons3&logoColor=white"/>
<img alt="gunicorn" src="https://img.shields.io/badge/Gunicorn-499848?style=flat-square&logo=gunicorn&logoColor=white"/>
<img alt="nginx" src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img alt="redis" src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"/>

</br>
</br>


<h2> 🌲 디렉토리 구조 </h2>

```bash
server
├── server
│   ├── settings.py     # 장고 서버 환경설정
│   ├── urls.py         # API URL Prefix 정의
│   └── wsgi.py         # 웹서버 미들웨어
├── common
│   ├── regex.py        # 이메일, 패스워드 유효성 검사
│   ├── s3.py           # aws s3 연동
│   └── token.py        # JWT 토큰 관리
├── plant_ai
│   ├── ai_disease.py   # 작물 질병 진단 모델
│   └── ai_risk.py      # 작물 질병 등급 측정 모델
│
├── analysis            # 작물 질병 진단 API
├── blog                # 커뮤니티 게시판 API
├── disease             # 질병 데이터 조회 API
├── pesticide           # 농약 데이터 조회 API
├── user                # 유저 관리 API
├── .env                # 서버 환경변수
└── manage.py           # 장고 매니저


API 디렉토리 기본 구조
├── models.py           # 데이터베이스 모델 정의
├── queryset.py         # 데이터베이스 쿼리 실행
├── tests.py            # API 테스트 코드
├── urls.py             # API URL 매핑
└── views.py            # API 서비스 구현
```

<br/>

<h2> ⚙️ 주요 기능 </h2>

1. 자체 로그인 / 로그아웃 / 회원가입, 소셜 로그인
2. JWT 기반 유저 인증
3. 커뮤니티 게시판 CRUD 구현
4. 커뮤니티 게시글 조회수
5. 질병 도감 데이터 조회
6. Redis를 이용한 DB Caching
7. 이미지 파일 관리를 위한 AWS S3 연동

<br>

<h2> 👨‍💻 백엔드 멤버 </h2>
<table>
    <tr align="center">
        <td style="min-width: 100px;">
              <img src="https://github.com/ryan3780.png" width="100">
        </td>
        <td style="min-width: 100px;">
              <img src="https://github.com/Hee-Jae.png"  width="100">
        </td>
    </tr>
    <tr align="center">
        <td  style="font-weight:bold">
            <a href="https://github.com/ryan3780">이금홍</a>
        </td>
        <td style="font-weight:bold">
            <a href="https://github.com/Hee-Jae">정희재</a>
        </td>
    </tr>
</table>

