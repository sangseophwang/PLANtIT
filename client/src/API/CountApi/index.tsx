import axios from 'axios';

const BASE_URL =
  'http://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/api/';

function Get_Count(endpoint: string) {
  return axios.get(BASE_URL + endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const AnalysisCountApi = {
  Get_Count,
};
