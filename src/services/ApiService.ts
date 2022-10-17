import axios from 'axios';
import {ActionTypes} from 'store/types';

type OptionsType = {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: any;
  credentials: string;
  data: string | null;
  responseType?: 'blob' | 'json' | 'text';
  params: any;
};

export const BASE_URL = 'http://mobile-platform.apps.msa31.do.neoflex.ru/api/v2/';

export const API = axios.create({
  baseURL: BASE_URL,
});

export const callApi = async (
  url: string,
  data: any,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  responseType?: 'blob' | 'text' | 'json',
  params?: any,
  headers?: any
): Promise<any> => {
  const options: OptionsType = {
    url,
    method: method,
    headers: {...API.defaults.headers, ...headers},
    credentials: 'include',
    data: data || null,
    responseType,
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
  const url = API.defaults.baseURL + 'projects';
  return callApi(url, null, 'GET');
};

export const getProjectData = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}`;
  return callApi(url, null, 'GET');
};

export const getScreenesList = async (projectId?: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/screens`;
  return callApi(url, null, 'GET');
};

export const getScreenByName = async (screenName: string, parsed: boolean, projectId?: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/screens/${screenName}${parsed ? '?view=parsed' : ''}`;
  return callApi(url, null, 'GET');
};

export const saveScreen = async (projectId: string, endpoint: string, payload: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/screens/${endpoint}`;
  return callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/javascript',
  });
};

export const deleteScreen = async (projectId: string, endpoint: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/screens/${endpoint}`;
  return callApi(url, null, 'DELETE');
};

export const getActionsList = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/actions/`;
  return callApi(url, null, 'GET');
};

export const getDataActionsList = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/data/`;
  return callApi(url, null, 'GET');
};

export const getExternalActionsList = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/externalActions/`;
  return callApi(url, null, 'GET');
};

export const getCronTaskList = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/cron/tasks/`;
  return callApi(url, null, 'GET');
};

export const getPushList = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/push/defaultTopics/`;
  return callApi(url, null, 'GET');
};

export const getActionByName = async (projectId: string, actionName: string, actionPath: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/${actionPath}/${actionName}`;
  return callApi(url, null, 'GET');
};

export const saveAction = async (projectId: string, actionType: string, endpoint: string, payload: string) => {
  const keyType = actionType === ActionTypes.action ? 'actions' : actionType;
  const url = API.defaults.baseURL + `projects/${projectId}/admin/${keyType}/${endpoint}`;
  return callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/javascript',
  });
};

export const deleteAction = async (projectId: string, actionType: string, endpoint: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}/admin/${actionType}/${endpoint}`;
  return callApi(url, null, 'DELETE');
};

export const createProject = async (payload: string) => {
  const url = API.defaults.baseURL + 'projects/';
  return callApi(url, payload, 'POST', undefined, undefined, {
    'Content-Type': 'application/json',
  });
};

export const editProject = async (projectId: string, payload: string) => {
  const url = API.defaults.baseURL + 'projects/' + projectId;
  return callApi(url, payload, 'PUT', undefined, undefined, {
    'Content-Type': 'application/json',
  });
};

export const deleteProject = async (projectId: string) => {
  const url = API.defaults.baseURL + `projects/${projectId}`;
  return callApi(url, null, 'DELETE');
};

export const getTemplates = async () => {
  const url = API.defaults.baseURL + 'templates';
  return callApi(url, null, 'GET');
};

export const getScreenTemplates = async () => {
  const url = API.defaults.baseURL + 'templates?screens=true';
  return callApi(url, null, 'GET');
};

export const getTemplateData = async (templateId: string, params?: string) => {
  const url = API.defaults.baseURL + `templates/${templateId}${params ? '?' + params : ''}`;
  return callApi(url, null, 'GET');
};

export const applyTemplate = async (templateId: string, payload: string) => {
  const url = API.defaults.baseURL + `templates/${templateId}/extraction`;
  return callApi(url, payload, 'POST', undefined, undefined, {
    'Content-Type': 'application/json',
  });
};

export const getSrcImageSvg = async (src: string) => {
  return callApi(src, null, 'GET', 'text');
};
