import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Mypage(): JSX.Element {
  const navigate = useNavigate();
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
