import axios from 'axios';

// export function requestData({ method, endpoint, data }: { method: any; endpoint: any; data: any }) {
//   return axios({
//     method: method,
//     url: endpoint,
//     data: data,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

const naverClientId = 'ioHK_g45Ha9ZWdoNfune';
const googleClientId =
  '981453120514-lh9cf035sa3pbhan5qa8fjr9eg85idot.apps.googleusercontent.com';

const plantitServerUrl = 'http://localhost/api';

const requestDjango = axios.create({
  baseURL: 'http://localhost/api/',
  headers: { 'Content-Type': 'application/json' },
});

function createRequestAxios(_baseURL: any, _headers: any) {
  return axios.create({
    baseURL: _baseURL,
    headers: _headers,
  });
}

function authRequestPost(
  _endpoint: string,
  _contentTypeValue: string,
  data: any,
) {
  return axios.post(plantitServerUrl + _endpoint, data, {
    headers: {
      'Content-Type': _contentTypeValue,
      Authorization: `${sessionStorage.getItem('access_token')}`,
    },
  });
}

function authRequestGet(
  _endpoint: string,
  _contentTypeValue: string,
  _query: string,
) {
  return axios.get(plantitServerUrl + _endpoint + _query, {
    headers: {
      'Content-Type': _contentTypeValue,
      Authorization: `${sessionStorage.getItem('access_token')}`,
    },
  });
}

function isValidateForm(
  callBackList: ((arg0: any) => boolean)[],
  maskBooleanList: boolean[],
  ...formData: any[]
): boolean[] {
  return formData.map((data, index) => {
    return callBackList[index](data) === maskBooleanList[index] ? true : false;
  });
}

function parsingUrl(url: string[]): any[] {
  const [access_token, state, token_type, expires_in] = url.map((data: any) => {
    return data.split('=')[1];
  });

  console.log('access_token : ', access_token);
  console.log('state : ', state);
  console.log('token_type : ', token_type);
  console.log('expires_in : ', expires_in);

  return [access_token, token_type];
}

export const authApi = {
  requestDjango,
  createRequestAxios,
  authRequestPost,
  authRequestGet,
  isValidateForm,
  parsingUrl,
  naverClientId,
  googleClientId,
};
