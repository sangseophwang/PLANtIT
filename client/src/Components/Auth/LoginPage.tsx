import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NaverLogin from 'react-login-by-naver';
import GoogleLogin from 'react-google-login';
import GoMain from 'Components/Auth/GoMain';
import { authApi } from 'API/AuthApi/index';

import 'Components/Auth/scss/Login.scss';
import Logo from 'Assets/logo.png';
import NaverButtonImg from 'Assets/login_button_naver.png';
import GoogleButtonImg from 'Assets/login_button_google.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(faUserAlt, faKey, faGoogle);

export default function LoginPage(): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { tokenParam } = useParams();
  const navigate = useNavigate();
  const tokenState = sessionStorage.getItem('access_token');
  console.log('로그인 전 세션스토리지: ', tokenState);
  console.log('네이버 로그인 plantit 액세스 토큰', tokenParam);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sessionStorage.getItem('access_token') === null && tokenParam !== undefined
      ? (sessionStorage.setItem('access_token', tokenParam),
        navigate('/'),
        console.log(
          '네이버 로그인 후 토큰',
          sessionStorage.getItem('access_token'),
        ),
        alert('로그인 성공'))
      : sessionStorage.getItem('access_token') !== null
      ? navigate('/')
      : () => {};
  }, [navigate, tokenParam]);

  function onChangeInputHandler(event: {
    target: { name: any; value: string };
  }): void {
    const [name, value] = [event.target.name, event.target.value];
    switch (name) {
      case 'id':
        setId(value);
        break;
      case 'password':
        setPassword(value);

        break;
    }
  }

  function onClickSubmitHandler(event: { preventDefault: () => void }): void {
    event.preventDefault();
    console.log('id :', id);
    console.log('password : ', password);

    console.log('로그인 전 세션스토리지: ', tokenState);
    authApi.requestDjango
      .post('/user/login', {
        email: id,
        password: password,
      })
      .then(response => {
        console.log('성공', response);
        const [accessToken, message] = [
          response.data.token,
          response.data.message,
        ];

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        message === 'login success'
          ? (sessionStorage.setItem('access_token', accessToken),
            alert('로그인 성공!'),
            console.log(
              '로그인 후 세션스토리지: ',
              sessionStorage.getItem('access_token'),
            ),
            navigate('/'))
          : alert('error');
      })
      .catch(error => {
        console.log('error : ', error);
        alert('error');
      });
  }

  function onSucessGoogleHandler(res: any) {
    console.log(res);
    authApi.requestDjango
      .post('/user/google_login', {
        id_token: res.tokenObj.id_token,
      })
      .then(response => {
        console.log('성공', response);
        const [accessToken, message] = [
          response.data.token,
          response.data.message,
        ];

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        message === 'google login success'
          ? (sessionStorage.setItem('access_token', accessToken),
            alert('로그인 성공!'),
            console.log(
              '로그인 후 세션스토리지: ',
              sessionStorage.getItem('access_token'),
            ),
            navigate('/'))
          : alert('error');
      })
      .catch(error => {
        console.log('error : ', error);
        alert('error');
      });
  }

  function onFailureGoogleHandler(error: any) {
    console.log('onFailureGoogleHandler', error);
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <GoMain />
        <img className="login__logo" src={Logo} alt="plantit logo"></img>

        <form className="login-form">
          <div>
            <label htmlFor="id">
              <FontAwesomeIcon icon={faUserAlt} />
            </label>
            <input
              type="email"
              name="id"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={onChangeInputHandler}
              required
            ></input>
          </div>

          <div>
            <label htmlFor="password">
              <FontAwesomeIcon icon={faKey} />
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onChangeInputHandler}
              required
            ></input>
          </div>

          <button type="submit" onClick={onClickSubmitHandler}>
            로그인
          </button>

          <div className="login-form__register">
            <span>지금 바로 가입해보세요!</span>
            <button
              type="button"
              onClick={() => {
                navigate('/register');
                console.log(
                  '세션 스토리지: ',
                  sessionStorage.getItem('access_token'),
                );
              }}
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="login-social">
          <div className="login-social__google">
            <GoogleLogin
              clientId={authApi.googleClientId}
              render={renderProps => (
                <img
                  className="login-social__google--img"
                  src={GoogleButtonImg}
                  alt="구글 로그인 버튼"
                  onClick={renderProps.onClick}
                ></img>
              )}
              buttonText="Login"
              onSuccess={onSucessGoogleHandler}
              onFailure={onFailureGoogleHandler}
            />
          </div>

          <div className="login-social__naver">
            <NaverLogin
              clientId={authApi.naverClientId}
              callbackUrl="http://127.0.0.1:3000/socialloginpopup"
              render={props => (
                <img
                  className="login-social__naver--img"
                  src={NaverButtonImg}
                  alt="네이버 로그인 버튼"
                  onClick={props.onClick}
                ></img>
              )}
              onSuccess={
                () => {}
                /*  
                  네이버 로그인의 응답은 onSuccess, onFailure의 핸들링으로 처리하지 않으며
                  콜백 url 팝업창에서 랜더링하는 SocialLoginPopUp 엘리먼트에서 응답 url을 파싱하여
                  access_token, token_type 값을 가져와서 Django로 보내주면 plantit access token을 돌려준다.
                */
              }
              onFailure={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
