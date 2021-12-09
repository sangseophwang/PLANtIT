import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { authApi } from 'API/AuthApi';

import 'Components/Mypage/scss/Mypage.scss';

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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data.message === 'success'
          ? (setNickname(response.data.nickname),
            setDescription(response.data.description),
            setImageUrl(response.data.image + '?t=' + new Date().getTime()))
          : alert('message is not "success"');

        if (response.data.new_token !== null) {
          localStorage.setItem('access_token', response.data.new_token);
        }
      })
      .catch(error => {
        if (error.response.data === 'Security Warning') {
          localStorage.removeItem('access_token');
          navigate('/');
          toast.error('해킹이 감지되었습니다.', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, []);

  function onSubmitDeRegister(event: any): void {
    event.preventDefault();

    let reconfirmMessage: string | null = prompt(
      '"탈퇴"를 입력하시면 계정이 삭제됩니다.',
    );
    if (reconfirmMessage === '탈퇴') {
      authApi
        .authRequestPost('/user/deregister', 'application/json', '')
        .then(response => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          response.data === 'Deregister Success'
            ? (localStorage.removeItem('access_token'),
              navigate('/'),
              toast.success('계정이 삭제되었습니다!', {
                position: toast.POSITION.TOP_CENTER,
              }))
            : alert('response.data is not "Deregister Success"');
        })
        .catch(error => {
          alert('error');
        });
    } else {
      toast.info('탈퇴가 취소되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data.message === 'success'
          ? (setNickname(response.data.nickname),
            setDescription(response.data.description))
          : alert('message is not "success"');

        if (response.data.new_token !== null) {
          localStorage.setItem('access_token', response.data.new_token);
        }
      })
      .catch(error => {
        if (error.response.data === 'Security Warning') {
          localStorage.removeItem('access_token');
          navigate('/');
          toast.error('해킹이 감지되었습니다.', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

    setChange(false);
  }

  function onChangeImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];

      const formData = new FormData();
      formData.append('image', uploadFile);

      authApi
        .authRequestPost('/user/image', 'multipart/form-data', formData)
        .then(response => {
          setImageUrl(response.data.image_url + '?t=' + new Date().getTime());
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions

          if (response.data.new_token !== null) {
            localStorage.setItem('access_token', response.data.new_token);
          }
        })
        .catch(error => {
          if (error.response.data === 'Security Warning') {
            localStorage.removeItem('access_token');
            navigate('/');
            toast.error('해킹이 감지되었습니다.', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  }

  return (
    <div className="Mypage__Container">
      <main className="Mypage__Wrapper">
        <section>
          <div className="Thumbnail__Area">
            <form>
              <label className="Upload__button" htmlFor="input-file">
                <img
                  className="Thumbnail__Area-img"
                  src={imageUrl}
                  alt=" "
                ></img>
                <span>+</span>
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
              <div className="Button__Wrapper">
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
                    localStorage.removeItem('access_token');

                    navigate('/');
                    toast.success('로그아웃 되었습니다.', {
                      position: toast.POSITION.TOP_CENTER,
                      autoClose: 2500,
                    });
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
                    저 장
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
