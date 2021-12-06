import axios from 'axios';

const BASE_URL = 'http://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/api/';

const Get_Thumbnail = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const MainApi = {
  Get_Thumbnail,
};
