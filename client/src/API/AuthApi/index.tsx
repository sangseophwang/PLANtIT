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
const googleClientId = '981453120514-lh9cf035sa3pbhan5qa8fjr9eg85idot.apps.googleusercontent.com';

const requestDjango = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { 'Content-Type': 'application/json' },
});

function isValidateForm(callBackList: ((arg0: any) => boolean)[], maskBooleanList: boolean[], ...formData: any[]): boolean[] {
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
  isValidateForm,
  parsingUrl,
  naverClientId,
  googleClientId,
};
