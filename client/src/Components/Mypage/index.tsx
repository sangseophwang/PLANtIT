import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo } from 'react';
import { authApi } from 'API/AuthApi';

export default function Mypage(): JSX.Element {
  const navigate = useNavigate();

  const initMypage = useCallback(() => {
    console.log(
      '마이페이지 진입시 token: ',
      sessionStorage.getItem('access_token'),
    );
    const requestPlantitService = authApi.createRequestAxios(
      'http://localhost:8000/api/',
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
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  useEffect(() => {
    initMypage();
  }, []);

  return (
    <div className="Mypage__Container">
      <h1>마이페이지 : 미완성 </h1>
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

      <button
        type="button"
        name="Gomain"
        onClick={() => {
          navigate('/');
        }}
      >
        메인화면
      </button>
    </div>
  );
}
