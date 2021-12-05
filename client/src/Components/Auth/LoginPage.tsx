import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NaverLogin from 'react-login-by-naver';
import GoogleLogin from 'react-google-login';
import GoMain from 'Components/Auth/GoMain';
import { authApi } from 'API/AuthApi/index';

import 'Components/Auth/scss/Login.scss';
import Logo from 'Assets/logo.png';
import NaverButtonImg from 'Assets/Auth/login_button_naver.png';
import GoogleButtonImg from 'Assets/Auth/login_button_google.png';
import LoginImage from 'Assets/Auth/login_side_image.jpeg';

export default function LoginPage(): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { tokenParam } = useParams();
  const navigate = useNavigate();
  const tokenState = sessionStorage.getItem('access_token');

  const googleImgRef = useRef<HTMLImageElement>(null);
  const naverImgRef = useRef<HTMLImageElement>(null);
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
    preventDefault: () => void;
    target: { name: any; value: any };
  }): void {
    event.preventDefault();
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
    <div className="Component__Container">
      <div className="LoginPage__Container">
        <div className="Side__Image-Wrapper">
          <img src={LoginImage} alt="" className="Side__Image" />
        </div>
        <div className="Login__Container">
          <GoMain />
          <img src={Logo} alt="" className="Plaintit__logo-Image" />

          <div className="Form__Content-Wrapper">
            <div className="Form__Label-Wrapper">
              <label className="Form__Label" htmlFor="id">
                아이디
              </label>
            </div>
            <input
              className="Form__Input"
              type="email"
              name="id"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={onChangeInputHandler}
              required
            />
          </div>
          <div className="Form__Content-Wrapper">
            <div className="Form__Label-Wrapper">
              <label className="Form__Label" htmlFor="password">
                비밀번호
              </label>
            </div>
            <input
              className="Form__Input"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onChangeInputHandler}
              required
            />
          </div>
          <div className="Submit__Form-Wrapper">
            <div></div>
            <button
              className="Plantit__Login-Button"
              type="button"
              onClick={onClickSubmitHandler}
            >
              로그인
            </button>
            <a
              href="###"
              className="Plantit__Register-Link"
              style={{ textDecoration: 'none' }}
              onClick={() => {
                console.log('go to register');
                navigate('/register');
              }}
            >
              회원가입
            </a>
          </div>

          <div className="Login__Divider-Wrapper">
            <span className="Login__Divider-Span"></span>
            <div className="Login__Divider-Text">소셜 로그인</div>
            <span className="Login__Divider-Span"></span>
          </div>

          <a
            href="###"
            className="Social__Login-Link"
            onClick={() => {
              googleImgRef.current?.click();
            }}
            style={{ textDecoration: 'none' }}
          >
            <div className="Social__Login-Wrapper">
              <GoogleLogin
                clientId={authApi.googleClientId}
                render={renderProps => (
                  <img
                    className="Social__Login-image"
                    src={GoogleButtonImg}
                    alt="구글 로그인 버튼"
                    ref={googleImgRef}
                    onClick={renderProps.onClick}
                  ></img>
                )}
                buttonText="Login"
                onSuccess={onSucessGoogleHandler}
                onFailure={onFailureGoogleHandler}
              />
            </div>
            <h1 className="Login__H1">구글 로그인</h1>
          </a>

          <a
            href="###"
            className="Social__Login-Link"
            onClick={() => {
              naverImgRef.current?.click();
            }}
            style={{ textDecoration: 'none' }}
          >
            <div className="Social__Login-Wrapper">
              <NaverLogin
                clientId={authApi.naverClientId}
                callbackUrl="http://127.0.0.1:3000/socialloginpopup"
                render={props => (
                  <img
                    className="Social__Login-image"
                    src={NaverButtonImg}
                    alt="네이버 로그인 버튼"
                    ref={naverImgRef}
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
            <h1 className="Login__H1">네이버 로그인</h1>
          </a>
        </div>
      </div>
    </div>
  );
}
