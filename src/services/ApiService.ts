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

const backHost = 'http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/';

export const getScreenesList = async () => {
  const url = backHost + 'admin/screens/';
  return await callApi(url, null, 'GET');
};

export const getScreenByName = async (screenName: string) => {
  const url = backHost + `admin/screens/${screenName}`;
  return await callApi(url, null, 'GET');
};

export const saveScreen = async (endpoint: string, payload: string) => {
  const url = backHost + `admin/screens/${endpoint}`;
  return await callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/javascript',
  });
};

export const deleteScreen = async (endpoint: string) => {
  const url = backHost + `admin/screens/${endpoint}`;
  return await callApi(url, null, 'DELETE');
};

export const getActionsList = async () => {
  const url = backHost + 'admin/actions/';
  return await callApi(url, null, 'GET');
}

export const getDataActionsList = async () => {
  const url = backHost + 'admin/data/';
  return await callApi(url, null, 'GET');
}

export const getActionByName = async (actionName: string) => {
  const url = backHost + `admin/actions/${actionName}`;
  return await callApi(url, null, 'GET');
};

export const getDataActionByName = async (actionName: string) => {
  const url = backHost + `admin/data/${actionName}`;
  return await callApi(url, null, 'GET');
};

export const saveAction = async (actionType: string, endpoint: string, payload: string) => {
  const url = backHost + `admin/${actionType}/${endpoint}`;
  return await callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/javascript',
  });
};

export const deleteAction = async (actionType: string, endpoint: string) => {
  const url = backHost + `admin/${actionType}/${endpoint}`;
  return await callApi(url, null, 'DELETE');
};
