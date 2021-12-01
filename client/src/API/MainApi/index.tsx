import axios from 'axios';

const BASE_URL = 'http://localhost/api/';

const Get_Thumbnail = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const MainApi = {
  Get_Thumbnail,
};
