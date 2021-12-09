import { useEffect } from 'react';
import { authApi } from 'API/AuthApi/index';

export default function SocialLoginPopUpPage(): JSX.Element {
  // const token = window.location.href.split('=');
  useEffect(() => {
    const responseUrl = window.location.href.split('&');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [access_token, token_type, state, expires_in] =
      authApi.parsingUrl(responseUrl);

    authApi.requestDjango
      .post('/user/naver_login', {
        access_token: access_token,
        token_type: token_type,
      })
      .then(response => {
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

        window.close();
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
