# PLANtIT 🌱

[🎥 시연 영상](https://youtu.be/toRqQOW0pUw)
<br/>

[✏️ 노션](https://onyx-limburger-373.notion.site/PLANtIT-3fdd5e5372fe4152bbe402b00872efde)



- 베란다 농부(팜린이)를 위한 종합 가드닝 솔루션 서비스
  - [메인] 질병이 발생한 작물의 사진을 업로드 하면, AI가 학습한 데이터를 이용하여 진단을 내려주는 서비스
  - [서브] 가드닝과 질병에 관한 다양한 정보 공유 제공

## 프로젝트 구성 안내

## 1. 프로젝트 소개 🌿

### 1-1. 프로젝트 목표

- 인공지능을 활용한 식물 질병 분석 기능을 통해 진단 및 간단한 해결책 제시
- 커뮤니티를 통해 사용자간 정보 교류 및 상호작용 유도

### 1-2. 팀원 소개

| 이름   | 담당 업무            |
| ------ | -------------------- |
| 박우람 | 팀장/프론트엔드 개발 |
| 황상섭 | 기획/프론트엔드 개발 |
| 김진경 | 기획/프론트엔드 개발 |
| 정희재 | 백엔드 개발          |
| 이금홍 | 백엔드 개발          |
| 한동희 | 인공지능 개발        |

<br/>

1. 프론트엔드 담당
   - 기획 및 페이지 구성, 시각화 작업
2. 백엔드 담당
   - DB 관리 및 API 제작, 배포
3. 인공지능 담당 - 식물 질병 데이터를 활용해 인공지능 모델 개발
   <br/>

## 2. 프로젝트 기능 설명 ☘️

### 2-1. 메인 기능

1. `질병 진단`
   - AI가 가장 유사도가 높은 질병명을 판단하여 사용자에게 알려주며, 관련 정보를 출력.
   - 관련 정보: 예방법, 질병 단계, 치료 약물(농약), 주변의 식물병원 위치 등
2. `커뮤니티`
   - 회원끼리 정보를 공유할 수 있는 커뮤니티 게시판을 제공한다.
   - 조회순 또는 최신순 정렬 기능을 제공한다.
   - 페이지네이션을 통해 컨텐츠를 보기 편한 정도만 보여준다.
3. `자체 및 소셜 로그인 기능`
   - 플래닛의 자체 회원가입 및 로그인 기능 구현
   - 구글, 네이버의 소셜 로그인 기능 도입
4. `질병 도감`
   - 사용자가 궁금한 질병을 검색할 수 있도록 구현
   - 해당 질병에 대한 정보(발생환경, 방제 방법 등) 얻을 수 있도록 구현
5. `마이페이지`
   - 간단한 프로필 작성

### 2-2. 서브 기능

1. `좋아요, 댓글 기능`
   - Disqus를 활용해 커뮤니티 게시글에 좋아요 및 댓글 기능 제공
2. `SNS 계정`
   - 페이스북, 인스타그램, 트위터에 가상 계정을 만들어 실제 서비스와 유사하게 컨텐츠 제공
   - 다양한 경로로 서비스에 접근할 수 있도록 컨텐츠 업로드

## 3. 프로젝트 구성도 🌲

[와이어프레임](https://www.figma.com/file/RCSPesfx9rN5XJky2RUSni/PLANtIT?node-id=19%3A1485)

## 4. 버전 🪴

- ver 1.0 : 기본 메인 및 서브 기능 구현 (질병 진단, 질병 도감, 커뮤니티 등)
- ver 1.01 : 전체 디자인 수정, 이미지 로딩 속도 개선

## 5. FAQ 🌵

- 자주 받는 질문 정리
