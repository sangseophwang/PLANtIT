<h1> PLANtIT - Backend ํํธ ์๊ฐ ๐ </h1>

<h2> ๐ป ๊ธฐ์  ์คํ </h2>

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


<h2> ๐ฒ ๋๋ ํ ๋ฆฌ ๊ตฌ์กฐ </h2>

```bash
server
โโโ server
โ   โโโ settings.py     # ์ฅ๊ณ  ์๋ฒ ํ๊ฒฝ์ค์ 
โ   โโโ urls.py         # API URL Prefix ์ ์
โ   โโโ wsgi.py         # ์น์๋ฒ ๋ฏธ๋ค์จ์ด
โโโ common
โ   โโโ regex.py        # ์ด๋ฉ์ผ, ํจ์ค์๋ ์ ํจ์ฑ ๊ฒ์ฌ
โ   โโโ s3.py           # aws s3 ์ฐ๋
โ   โโโ token.py        # JWT ํ ํฐ ๊ด๋ฆฌ
โโโ plant_ai
โ   โโโ ai_disease.py   # ์๋ฌผ ์ง๋ณ ์ง๋จ ๋ชจ๋ธ
โ   โโโ ai_risk.py      # ์๋ฌผ ์ง๋ณ ๋ฑ๊ธ ์ธก์  ๋ชจ๋ธ
โ
โโโ analysis            # ์๋ฌผ ์ง๋ณ ์ง๋จ API
โโโ blog                # ์ปค๋ฎค๋ํฐ ๊ฒ์ํ API
โโโ disease             # ์ง๋ณ ๋ฐ์ดํฐ ์กฐํ API
โโโ pesticide           # ๋์ฝ ๋ฐ์ดํฐ ์กฐํ API
โโโ user                # ์ ์  ๊ด๋ฆฌ API
โโโ .env                # ์๋ฒ ํ๊ฒฝ๋ณ์
โโโ manage.py           # ์ฅ๊ณ  ๋งค๋์ 


API ๋๋ ํ ๋ฆฌ ๊ธฐ๋ณธ ๊ตฌ์กฐ
โโโ models.py           # ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ชจ๋ธ ์ ์
โโโ queryset.py         # ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ฟผ๋ฆฌ ์คํ
โโโ tests.py            # API ํ์คํธ ์ฝ๋
โโโ urls.py             # API URL ๋งคํ
โโโ views.py            # API ์๋น์ค ๊ตฌํ
```

<br/>

<h2> โ๏ธ ์ฃผ์ ๊ธฐ๋ฅ </h2>

1. ์์ฒด ๋ก๊ทธ์ธ / ๋ก๊ทธ์์ / ํ์๊ฐ์, ์์ ๋ก๊ทธ์ธ
2. JWT ๊ธฐ๋ฐ ์ ์  ์ธ์ฆ
3. ์ปค๋ฎค๋ํฐ ๊ฒ์ํ CRUD ๊ตฌํ
4. ์ปค๋ฎค๋ํฐ ๊ฒ์๊ธ ์กฐํ์
5. ์ง๋ณ ๋๊ฐ ๋ฐ์ดํฐ ์กฐํ
6. Redis๋ฅผ ์ด์ฉํ DB Caching
7. ์ด๋ฏธ์ง ํ์ผ ๊ด๋ฆฌ๋ฅผ ์ํ AWS S3 ์ฐ๋

<br>

<h2> ๐จโ๐ป ๋ฐฑ์๋ ๋ฉค๋ฒ </h2>
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
            <a href="https://github.com/ryan3780">์ด๊ธํ</a>
        </td>
        <td style="font-weight:bold">
            <a href="https://github.com/Hee-Jae">์ ํฌ์ฌ</a>
        </td>
    </tr>
</table>

