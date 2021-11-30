import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { authApi } from 'API/AuthApi';

import 'Components/Mypage/scss/Mypage.scss';

const joy =
  'https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-joy.jpg';

export default function MypageMain(): JSX.Element {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  const initMypage = useCallback(() => {
    console.log(
      '마이페이지 진입시 token: ',
      sessionStorage.getItem('access_token'),
    );
    const requestPlantitService = authApi.createRequestAxios(
      'http://localhost/api/',
      {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.getItem('access_token')}`,
      },
    );

    requestPlantitService
      .get('/user/mypage')
      .then(response => {
        console.log('response: ', response);
        console.log('resoponse.data: ', response.data);
        setNickname(response.data.nickname);
        setDescription(response.data.description);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  useEffect(() => {
    initMypage();
  }, []);

  function onSubmitDeRegister() {
    // requestPlantitService.post('/user/deregister').then().catch();
  }

  // function onSubmitChangeNickname(event) {}

  // function onSubmitChangeDescription(event) {}

  return (
    <div className="Mypage__Container">
      <main>
        <section>
          <div className="Thumbnail__Area">
            <img
              className="Thumbnail__Area-img"
              src={joy}
              alt="profile-user-img"
            ></img>
            <button type="button" name="ChangeImg">
              이미지 업로드
            </button>
          </div>

          <div className="Info__Area">
            <h2>{nickname !== null ? nickname : '닉네임'}</h2>
            <p>{description !== null ? description : '자기 소개'}</p>
          </div>
        </section>

        <section></section>
      </main>

      <button
        type="button"
        name="logout"
        onClick={() => {
          sessionStorage.removeItem('access_token');
          console.log(
            '로그아웃 후 세션 스토리지 값: ',
            sessionStorage.getItem('access_token'),
          );
          navigate('/');
          alert('로그아웃 되었습니다.');
        }}
      >
        로그아웃
      </button>

      <button type="button" name="DeRegister" onClick={onSubmitDeRegister}>
        회원탈퇴
      </button>

      <button type="button" name="ChangeNickname">
        닉네임 변경
      </button>

      <button type="button" name="ChangeDescription">
        내용 변경
      </button>
    </div>
  );
}
