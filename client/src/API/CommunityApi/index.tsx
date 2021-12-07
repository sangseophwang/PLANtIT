import axios from 'axios';

const BASE_URL =
  'http://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/api/';

function Community_Post(endpoint: string, data: any) {
  return axios.post(BASE_URL + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${sessionStorage.getItem('access_token')}`,
    },
  });
}

function Modify_Post(endpoint: string, data: any) {
  return axios.patch(BASE_URL + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${sessionStorage.getItem('access_token')}`,
    },
  });
}

function Upload_Image(endpoint: string, data: any) {
  return axios.post(BASE_URL + endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `${sessionStorage.getItem('access_token')}`,
    },
  });
}

function Get_Page(endpoint: string, id?:any) {
  axios.defaults.withCredentials = true;
  return axios.get(BASE_URL + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${sessionStorage.getItem('access_token')}`,
      views : id
    },
  });
}

export const CommunityApi = {
  Community_Post,
  Upload_Image,
  Get_Page,
  Modify_Post,
};
