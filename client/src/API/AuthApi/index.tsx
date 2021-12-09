import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const naverClientId = 'ioHK_g45Ha9ZWdoNfune';
const googleClientId =
  '981453120514-lh9cf035sa3pbhan5qa8fjr9eg85idot.apps.googleusercontent.com';

const naverCallbackUrlLocal = 'http://127.0.0.1:3000/socialloginpopup';
const naverCallbackUrlAzure =
  'https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/socialloginpopup';

// const plantitServerUrl = 'http://localhost/api';
const LOCALHOST_CLIENT_URL = 'http://localhost';
const AZURE_CLIENT_URL =
  'https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com';
const BASE_URL = `https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/api`;

// 패스워드 잘못 입력할 경우 메세지 출력
const passwordFormMessage: JSX.Element = (
  <div>
    올바르지 않는 패스워드입니다<br></br>
    올바른 패스워드 양식이란?<br></br>
    8자 이상, 영문 숫자 특수기호<br></br>
    9자 이하: 영문, 숫자, 특수기호<br></br>
    10자 이상: 셋 중 두가지 포함
  </div>
);

// 회원가입 페이지 진입시 가입 양식 출력
const registerForm = ({ closeToast }: any): JSX.Element => (
  <div>
    회원가입 양식<br></br>
    <br></br>
    아이디: 이메일 형식<br></br>
    <br></br>
    패스워드 양식:<br></br>
    8자 이상, 영문 숫자 특수기호<br></br>
    9자 이하: 영문, 숫자, 특수기호<br></br>
    10자 이상: 셋 중 두가지 포함<br></br>
    <br></br>
    <button type="button" onClick={closeToast}>
      확인
    </button>
  </div>
);

// 로그인이 필요없는 경우 axios 생성
const requestDjango = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 새로운 axios 생성, baseURL과 헤더 값들을 지정해줄 수 있음
function createRequestAxios(_baseURL: any, _headers: any) {
  return axios.create({
    baseURL: _baseURL,
    headers: _headers,
  });
}

// 로그인이 필요한 api 요청(method : post)
function authRequestPost(
  _endpoint: string,
  _contentTypeValue: string,
  data: any,
) {
  return axios.post(BASE_URL + _endpoint, data, {
    headers: {
      'Content-Type': _contentTypeValue,
      Authorization: `${localStorage.getItem('access_token')}`,
    },
  });
}

// 로그인이 필요한 api 요청(method : get)
function authRequestGet(
  _endpoint: string,
  _contentTypeValue: string,
  _query: string,
) {
  return axios.get(BASE_URL + _endpoint + _query, {
    headers: {
      'Content-Type': _contentTypeValue,
      Authorization: `${localStorage.getItem('access_token')}`,
    },
  });
}

// 이메일 형식 판별 함수
function validateEmail(_email: string): (boolean | JSX.Element)[] {
  const reEmail =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const result: (boolean | JSX.Element)[] =
    reEmail.test(String(_email).toLowerCase()) === true
      ? [true, <div>올바른 이메일 형식입니다.</div>]
      : [false, <div>틀린 이메일 형식입니다.</div>];

  return result;
}

// 패스워드 형식 판별 함수
// 보안 기준에 맞지않는 패스워드 (아래 3가지 항목이 보안 기준입니다)
// 패스워드는 최소한 8자 이상이 되어야함
// 8 ~ 9자 -> 영문, 숫자, 특수기호 모두 포함
// 10자 이상 -> 영문, 숫자, 특수기호 중 2가지 이상 포함
function validatePassword(_password: string): (boolean | JSX.Element)[] {
  let count: number = 0;
  let message: JSX.Element;
  if (_password.length < 8) {
    message = passwordFormMessage;
    return [false, message];
  }
  if (_password.match(/[a-zA-Z]/g)) {
    count += 1;
  }
  if (_password.match(/[0-9]/g)) {
    count += 1;
  }
  if (_password.match(/\W/g)) {
    count += 1;
  }
  if (_password.length < 10 && count < 3) {
    message = passwordFormMessage;
    return [false, message];
  }
  if (count < 2) {
    message = passwordFormMessage;
    return [false, message];
  }

  message = <div>성공</div>;
  return [true, message];
}

// 비밀번호, 비밀번호 재입력 일치 판별함수
function validateSamePassword(
  _password: string,
  _repeatPassword: string,
): (boolean | JSX.Element)[] {
  return _password === _repeatPassword
    ? [true, <div>비밀번호 일치</div>]
    : [false, <div>비밀번호 불일치</div>];
}

// 제츨할 form 양식의 값이 비어있는지 확인
function validateFilledForm(
  _stringValues: string[],
): (boolean | JSX.Element)[] {
  let list = _stringValues.filter((value: string) => {
    return value === '';
  });

  return list[0] !== undefined
    ? [false, <div>입력이 안된 부분이 존재합니다.</div>]
    : [true, <div>폼이 모두 입력되었습니다.</div>];
}

function securityWarningProcess(_message: string): void {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  if (_message === 'Security Warning') {
    localStorage.removeItem('access_token');
    navigate('/');
    toast.error('해킹이 감지되었습니다.', {
      position: toast.POSITION.TOP_CENTER,
    });
  } else {
    toast.error('error', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

// 네이버 로그인 팝업창 url 파싱
function parsingUrl(url: string[]): any[] {
  const [access_token, state, token_type, expires_in] = url.map((data: any) => {
    return data.split('=')[1];
  });

  return [access_token, token_type, state, expires_in];
}

export const authApi = {
  requestDjango,
  createRequestAxios,
  registerForm,
  passwordFormMessage,
  authRequestPost,
  authRequestGet,
  validateEmail,
  validatePassword,
  validateSamePassword,
  validateFilledForm,
  securityWarningProcess,
  parsingUrl,
  naverClientId,
  googleClientId,
  naverCallbackUrlLocal,
  naverCallbackUrlAzure,
  BASE_URL,
  AZURE_CLIENT_URL,
  LOCALHOST_CLIENT_URL,
};
