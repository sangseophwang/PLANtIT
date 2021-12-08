import RegisterPage from 'Components/Auth/RegisterPage';
import LoginPage from 'Components/Auth/LoginPage';
import SocialLoginPopUpPage from 'Components/Auth/SocialLoginPopUpPage';
import { Helmet } from 'react-helmet-async';

export function Register(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <RegisterPage />
    </div>
  );
}

export function Login(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <LoginPage />
    </div>
  );
}

export function SocialLoginPopUp(): JSX.Element {
  return (
    <div>
      <SocialLoginPopUpPage />
    </div>
  );
}
