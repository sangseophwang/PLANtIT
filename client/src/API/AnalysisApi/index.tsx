import axios from 'axios';

const BASE_URL =
  'https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/api/';

function Post_Analysis(endpoint: string, data: any) {
  return axios.post(BASE_URL + endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function Get_Count(endpoint: string) {
  return axios.get(BASE_URL + endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const AnalysisApi = {
  Post_Analysis,
  Get_Count,
};
