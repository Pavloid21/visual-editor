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

export const API = axios.create({
  baseURL: 'http://mobile-platform.apps.msa31.do.neoflex.ru/api/v2/',
});

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
    headers: {...API.defaults.headers, ...headers},
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

export const getProjectsList = async () => {
  const url = API.defaults.baseURL + `projects`;
  return await callApi(url, null, 'GET');
};

export const getProjectData = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}`;
  return await callApi(url, null, 'GET');
};

export const getScreenesList = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/screens`;
  return await callApi(url, null, 'GET');
};

export const getScreenByName = async (projectId: string, screenName: string, parsed: boolean = false) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/screens/${screenName}${parsed ? '?view=parsed' : ''}`;
  return await callApi(url, null, 'GET');
};

export const saveScreen = async (endpoint: string, payload: string) => {
  const url = API.defaults.baseURL + `admin/screens/${endpoint}`;
  return await callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/javascript',
  });
};

export const deleteScreen = async (endpoint: string) => {
  const url = API.defaults.baseURL + `admin/screens/${endpoint}`;
  return await callApi(url, null, 'DELETE');
};

export const getActionsList = async () => {
  const url = API.defaults.baseURL + 'admin/actions/';
  return await callApi(url, null, 'GET');
};

export const getDataActionsList = async () => {
  const url = API.defaults.baseURL + 'admin/data/';
  return await callApi(url, null, 'GET');
};

export const getActionByName = async (actionName: string) => {
  const url = API.defaults.baseURL + `admin/actions/${actionName}`;
  return await callApi(url, null, 'GET');
};

export const getDataActionByName = async (actionName: string) => {
  const url = API.defaults.baseURL + `admin/data/${actionName}`;
  return await callApi(url, null, 'GET');
};

export const saveAction = async (actionType: string, endpoint: string, payload: string) => {
  const url = API.defaults.baseURL + `admin/${actionType}/${endpoint}`;
  return await callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/javascript',
  });
};

export const deleteAction = async (actionType: string, endpoint: string) => {
  const url = API.defaults.baseURL + `admin/${actionType}/${endpoint}`;
  return await callApi(url, null, 'DELETE');
};
