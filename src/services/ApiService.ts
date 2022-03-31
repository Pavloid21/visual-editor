import axios from 'axios';

type OptionsType = {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: any;
  credentials: string;
  data: string | null;
  responseType: 'blob' | 'json';
  params: any;
};

export const callApi = async (
  url: string,
  data: any,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  responseType?: 'blob',
  params?: any,
  headers?: any
): Promise<any> => {
  const options: OptionsType = {
    url,
    method: method,
    headers,
    credentials: 'include',
    data: data || null,
    responseType: responseType ? 'blob' : 'json',
    params: params || null,
  };
  try {
    return await axios(options);
  } catch (error) {
    return {
      status: 523,
      error: error,
    };
  }
};

export const getScreenesList = async () => {
  const url = 'http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/screens/';
  return await callApi(url, null, 'GET');
};

export const getScreenByName = async (screenName: string) => {
  const url = `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/screens/${screenName}`;
  return await callApi(url, null, 'GET');
};
