import axios from 'axios';

const BASE_URL = 'http://localhost/api/';
const TOKEN = sessionStorage.getItem('access_token') || '';

const Community_Post = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  },
});

const Upload_Image = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: TOKEN,
  },
});

const Get_Page = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  },
});

export const CommunityApi = {
  Community_Post,
  Upload_Image,
  Get_Page,
};
