import { useEffect } from 'react';
import { authApi } from 'API/AuthApi/index';

export default function SocialLoginPopUpPage(): JSX.Element {
  // const token = window.location.href.split('=');
  useEffect(() => {
    const responseUrl = window.location.href.split('&');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [access_token, token_type, state, expires_in] =
      authApi.parsingUrl(responseUrl);

    console.log('access_token: ', access_token);
    console.log('token_type: ', token_type);
    console.log('state: ', state);
    console.log('expires_in: ', expires_in);

    authApi.requestDjango
      .post('/user/naver_login', {
        access_token: access_token,
        token_type: token_type,
      })
      .then(response => {
        console.log('response.data: ', response.data);
        localStorage.setItem('access_token', response.data);

        const [accessToken, message] = [
          response.data.token,
          response.data.message,
        ];

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        message === 'naver login success'
          ? // eslint-disable-next-line no-restricted-globals
            opener.location.replace(
              `${authApi.AZURE_CLIENT_URL}/login/${accessToken}`,
            )
          : window.close();

        // window.close();
      })
      .catch(error => {
        alert('error from Django');
        window.close();
      });
  }, []);

  return (
    <div className="LoginProcess">네이버에 요청한 토큰을 처리중입니다..</div>
  );
}
