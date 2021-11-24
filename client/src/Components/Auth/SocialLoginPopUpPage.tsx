import React, { useEffect } from 'react';
import { authApi } from 'API/AuthApi/index';

export default function SocialLoginPopUpPage(): JSX.Element {
  // const token = window.location.href.split('=');
  useEffect(() => {
    const responseUrl = window.location.href.split('&');
    const [access_token, token_type] = authApi.parsingUrl(responseUrl);
    authApi.requestDjango
      .post('/user/naver_login/', {
        access_token: access_token,
        token_type: token_type,
      })
      .then(response => {
        console.log('naver login: ', response);
        console.log('naver login token: ', response.data);
        sessionStorage.setItem('access_token', response.data);
        localStorage.setItem('access_token', response.data);
        console.log(sessionStorage.getItem('access_token'));
        // eslint-disable-next-line no-restricted-globals
        opener.location.replace(`http://localhost:3000/login/${response.data}`);
        window.close();

        // eslint-disable-next-line no-restricted-globals
        // opener.document.locaion.reload();
      })
      .catch(error => {
        console.log(error);
        alert('error');
        // window.close();
      });
  }, []);

  return (
    <div className="LoginProcess">
      네이버에 요청한 토큰을 처리중입니다..
      {sessionStorage.getItem('access_token')}
    </div>
  );
}
