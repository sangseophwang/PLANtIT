import React from 'react';
import RegisterPage from 'Components/Auth/RegisterPage';
import LoginPage from 'Components/Auth/LoginPage';
import SocialLoginPopUpPage from 'Components/Auth/SocialLoginPopUpPage';

export function Register(): JSX.Element {
  return (
    <div>
      <RegisterPage />
    </div>
  );
}

export function Login(): JSX.Element {
  return (
    <div>
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
