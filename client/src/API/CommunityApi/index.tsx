import axios from 'axios';

const BASE_URL = 'http://localhost/api/';
const Post = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: sessionStorage.getItem('access_token') || '',
  },
});

const Upload_Image = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: sessionStorage.getItem('access_token') || '',
  },
});

const Pagination = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const CommunityApi = {
  Post,
  Upload_Image,
  Pagination,
};
