import React, { useEffect } from 'react';
import { authApi } from 'API/AuthApi/index';

export default function SocialLoginPopUpPage(): JSX.Element {
  // const token = window.location.href.split('=');

  useEffect(() => {
    const responseUrl = window.location.href.split('&');
    const [access_token, token_type] = authApi.parsingUrl(responseUrl);
    authApi.requestDjango
      .post('/user/naver_login', {
        access_token: access_token,
        token_type: token_type,
      })
      .then(response => {
        console.log(response);
        // window.close();
      })
      .catch(error => {
        console.log(error);
        alert('error');
        // window.close();
      });
  }, []);

  return <div className="LoginProcess">네이버에 요청한 토큰을 처리중입니다..</div>;
}
