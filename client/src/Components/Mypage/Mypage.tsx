import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { authApi } from 'API/AuthApi';

import 'Components/Mypage/scss/Mypage.scss';

const joy =
  'https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-joy.jpg';

export default function MypageMain(): JSX.Element {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  let imgElement = (
    <img
      className="Thumbnail__Area-img"
      src={imageUrl}
      alt=""
    ></img>
  );

  useEffect(() => {
    authApi
      .authRequestGet('/user/mypage', 'application/json', '')
      .then(response => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        console.log('new_token', response.data.new_token);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data.message === 'success'
          ? (setNickname(response.data.nickname),
            setDescription(response.data.description),
            setImageUrl(response.data.image))
          : alert('message is not "success"');

        if (response.data.new_token !== null) {
          console.log(
            'new_token === old?',
            sessionStorage.getItem('access_token') === response.data.new_token,
          );
          sessionStorage.setItem('access_token', response.data.new_token);
          console.log(
            '일치?',
            response.data.new_token === sessionStorage.getItem('access_token'),
          );
        }
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, [imageUrl]);

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

        // if (response.data.new_token === null) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data.message === 'success'
          ? (setNickname(response.data.nickname),
            setDescription(response.data.description))
          : alert('message is not "success"');

        if (response.data.new_token !== null) {
          console.log(
            'new_token === old?',
            sessionStorage.getItem('access_token') === response.data.new_token,
          );
          sessionStorage.setItem('access_token', response.data.new_token);
          console.log(
            '일치?',
            response.data.new_token === sessionStorage.getItem('access_token'),
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        alert('error');
      });
  }

  function onChangeImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setIsLoading(true);
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      console.log('uploadFile: ', uploadFile);
      const formData = new FormData();
      formData.append('image', uploadFile);

      authApi
        .authRequestPost('/user/image', 'multipart/form-data', formData)
        .then(response => {
          console.log('img response: ', response);
          console.log(response.data);
          console.log(
            'imageUrl === new Url?',
            imageUrl === response.data.image_url,
          );

          // setImageUrl('');

          
          setImageUrl(response.data.image_url);
          // window.location.replace('/mypage');
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions

          if (response.data.new_token !== null) {
            sessionStorage.setItem('access_token', response.data.new_token);
          }
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
    setIsLoading(false);
  }

  return (
    <div className="Mypage__Container">
      <main>
        <section>
          <div className="Thumbnail__Area">
            {!isLoading && imgElement}

            <form>
              <label className="Upload__button" htmlFor="input-file">
                이미지 업로드
              </label>
              <input
                type="file"
                id="input-file"
                accept="image/jpg, image/jpeg, image/png"
                required
                onChange={onChangeImageInput}
              ></input>
            </form>
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
