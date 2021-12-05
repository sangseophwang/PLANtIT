import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { authApi } from 'API/AuthApi';

import 'Components/Mypage/scss/Mypage.scss';
import FirstImage from 'Assets/Mypage/FirstProfileImage.png';

export default function MypageMain(): JSX.Element {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [change, setChange] = useState(false);

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
            response.data.image === null
              ? setImageUrl(FirstImage)
              : setImageUrl(response.data.image))
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

  function onChangeInputHandler(event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }): void {
    event.preventDefault();
    const [name, value] = [event.target.name, event.target.value];
    switch (name) {
      case 'displayName':
        setNickname(value);
        break;
      case 'displayDescription':
        setDescription(value);
        break;
    }
  }

  function onSubmitChangeValue(event: any): void {
    event.preventDefault();

    const data = {
      nickname: nickname,
      description: description,
    };

    authApi
      .authRequestPost('/user/update', 'application/json', data)
      .then(response => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);

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

    setChange(false);
  }

  function onChangeImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

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

          setImageUrl(response.data.image_url);
          setImageUrl('');
          window.location.replace('/mypage');
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions

          if (response.data.new_token !== null) {
            sessionStorage.setItem('access_token', response.data.new_token);
          }
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  }

  return (
    <div className="Mypage__Container">
      <main>
        <section>
          <div className="Thumbnail__Area">
            <img className="Thumbnail__Area-img" src={imageUrl} alt=" "></img>

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

          {change === false ? (
            <div className="Info__Area">
              <h2>{nickname !== null ? nickname : '닉네임'}</h2>
              <p>{description !== null ? description : '자기 소개'}</p>
              <button
                type="button"
                name="Change"
                onClick={event => {
                  event.preventDefault();
                  setChange(true);
                }}
              >
                내용 수정
              </button>
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
                name="DeRegister"
                onClick={onSubmitDeRegister}
              >
                회원탈퇴
              </button>
            </div>
          ) : (
            <div className="Info__Area">
              <form className="Change__Value">
                <input
                  type="text"
                  className="Change__Name"
                  name="displayName"
                  placeholder="닉네임"
                  maxLength={10}
                  value={nickname}
                  onChange={onChangeInputHandler}
                ></input>
                <input
                  type="text"
                  className="Change__Description"
                  name="displayDescription"
                  placeholder="한 줄 소개 (50자 이내)"
                  maxLength={50}
                  value={description === null ? '' : description}
                  onChange={onChangeInputHandler}
                ></input>
                <div className="Change__Button-Wrapper">
                  <button
                    className="Change__Button"
                    type="submit"
                    onClick={onSubmitChangeValue}
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
