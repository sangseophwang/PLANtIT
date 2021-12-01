import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { authApi } from 'API/AuthApi';

import 'Components/Mypage/scss/Mypage.scss';

const joy =
  'https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-joy.jpg';

export default function MypageMain(): JSX.Element {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    authApi
      .authRequestGet('/user/mypage', 'application/json', '')
      .then(response => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        setNickname(response.data.nickname);
        setDescription(response.data.description);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  function onSubmitDeRegister(event: any): void {
    event.preventDefault();
    authApi
      .authRequestPost('/user/deregister', 'application/json', '')
      .then(response => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data === 'Deregister Success'
          ? (sessionStorage.removeItem('access_token'),
            navigate('/'),
            alert('계정이 삭제되었습니다. 안녕히가십시오.'))
          : alert('response.data is not "Deregister Success"');
      })
      .catch(error => {
        console.log('error: ', error);
        alert('error');
      });
  }

  function onSubmitChangeUser(event: any): void {
    event.preventDefault();
    console.log('event: ', event.target.name);
    let updateNickname = 'test nickname';
    let updateDescription = 'test description';

    switch (event.target.name) {
      case 'ChangeNickname':
        updateDescription = description;
        break;
      case 'ChangeDescription':
        updateNickname = nickname;
        break;
    }
    const testData = {
      nickname: updateNickname,
      description: updateDescription,
    };
    authApi
      .authRequestPost('/user/update', 'application/json', testData)
      .then(response => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data.message === 'success'
          ? (setNickname(response.data.nickname),
            setDescription(response.data.description))
          : alert('message is not "success"');
      })
      .catch(error => {
        console.log('error', error);
        alert('error');
      });
  }

  function onSubmitChangeImage(event: any) {
    event.preventDefault();
    
  }

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

      <form className="UpdateUser__Form">
        <button
          type="submit"
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

        <button type="submit" name="DeRegister" onClick={onSubmitDeRegister}>
          회원탈퇴
        </button>

        <button
          type="submit"
          name="ChangeNickname"
          onClick={onSubmitChangeUser}
        >
          닉네임 변경
        </button>

        <button
          type="submit"
          name="ChangeDescription"
          onClick={onSubmitChangeUser}
        >
          내용 변경
        </button>
      </form>
    </div>
  );
}
