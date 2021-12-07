import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authApi } from 'API/AuthApi/index';
import NaverLogin from 'react-login-by-naver';
import GoogleLogin from 'react-google-login';
import Back from 'Components/Common/Back';
import Logo from 'Assets/logo.png';
import Image from 'Assets/Auth/LoginPage__Image.jpg';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'Components/Auth/scss/LoginPage.scss';
import { toast } from 'react-toastify';

library.add(faGoogle);

export default function LoginPage(): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { tokenParam } = useParams();
  const navigate = useNavigate();
  const tokenState = sessionStorage.getItem('access_token');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sessionStorage.getItem('access_token') === null && tokenParam !== undefined
      ? (sessionStorage.setItem('access_token', tokenParam),
        navigate('/'),
        console.log(
          '네이버 로그인 후 토큰',
          sessionStorage.getItem('access_token'),
        ),
        toast.success('로그인 성공!', {
          position: toast.POSITION.TOP_CENTER,
        }))
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
            toast.success('로그인 성공!', {
              position: toast.POSITION.TOP_CENTER,
            }),
            console.log(
              '로그인 후 세션스토리지: ',
              sessionStorage.getItem('access_token'),
            ),
            navigate('/'))
          : alert('error');
      })
      .catch(error => {
        console.log('error : ', error);
        console.log('error.response: ', error.response);
        let errorMessage: string = '';
        switch (error.response.data) {
          case 'Wrong Password':
            errorMessage = '아이디 및 비밀번호를 확인해주세요!';
            break;
          case 'User Not Found':
            errorMessage = '등록된 유저가 아닙니다!';
            break;
        }
        toast.error(errorMessage);
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
            toast.success('로그인 성공!', {
              position: toast.POSITION.TOP_CENTER,
            }),
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
    <div className="LoginPage__Container">
      <Back />
      <div className="LoginPage__Wrapper">
        <img className="LoginPage__Image" src={Image} alt="" />
        <div className="Login__Wrapper">
          <img src={Logo} alt="" className="LoginPage__Logo" />
          <div className="Form__Container">
            <div className="Form__Wrapper">
              <div className="Form__Label-Wrapper">
                <label className="Form__Label" htmlFor="id">
                  이메일
                </label>
              </div>
              <input
                className="Form__Input"
                type="email"
                name="id"
                autoComplete="off"
                placeholder="이메일을 입력해주세요."
                value={id}
                onChange={onChangeInputHandler}
                required
              />
            </div>
            <div className="Form__Wrapper">
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
          </div>
          <div className="Submit__Wrapper">
            <button
              className="Login__Button"
              type="button"
              onClick={onClickSubmitHandler}
            >
              로그인
            </button>
            <a
              href="###"
              className="Register__Button"
              style={{ textDecoration: 'none' }}
              onClick={() => {
                console.log('go to register');
                navigate('/register');
              }}
            >
              회원이 아니신가요?
            </a>
          </div>
          <div className="SocialLogin__Container">
            <a
              href="###"
              className="SocialLogin__Link"
              style={{ textDecoration: 'none' }}
            >
              <GoogleLogin
                clientId={authApi.googleClientId}
                render={renderProps => (
                  <FontAwesomeIcon
                    title="구글로 로그인하기"
                    className="SocialLogin__Google"
                    onClick={renderProps.onClick}
                    icon={faGoogle}
                  />
                )}
                buttonText="Login"
                onSuccess={onSucessGoogleHandler}
                onFailure={onFailureGoogleHandler}
              />
            </a>

            <a
              href="###"
              className="SocialLogin__Link"
              style={{ textDecoration: 'none' }}
            >
              <NaverLogin
                clientId={authApi.naverClientId}
                callbackUrl="http://127.0.0.1:3000/socialloginpopup"
                render={props => (
                  <button
                    title="네이버로 로그인하기"
                    className="SocialLogin__Naver"
                    onClick={props.onClick}
                  >
                    N
                  </button>
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
