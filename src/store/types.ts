import {Action} from 'redux';
import {Zoom} from 'containers/ZoomSelect/types';
import store from './index';

export type EditScreenNamePayloadAction = Action<string> & {
  screen: string;
  snippet: {
    snippet: string;
    endpoint: string;
    selectedScreen: string;
    screenID: string;
    logic: string;
  };
};

export type Actions = {
  actions: ActionItem[];
  data: ActionItem[];
  selected: ActionItem | null;
  deleted: {
    actions: ActionItem[];
    data: ActionItem[];
  };
};

export enum ActionTypes {
  data = 'data',
  action = 'action',
}

export type ActionItem = {
  action: string;
  object: string;
  selected?: boolean;
  type?: ActionTypes;
};

export type API = {
  list: APIItem[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  platform?: Record<string, boolean> & {
    ios: boolean;
    android: boolean;
    aurora: boolean;
  };
  icon: string;
};

export type APIItem = {
  headers: {key: string; value: string}[];
  params: {key: string; value: string}[];
  varName: string;
  url: string;
};

export type Layout = {
  blocks: BlockItem[];
  selectedBlockUuid: string;
  documentId: string;
  selectedScreen: any | null;
  editedScreens: any[];
  deletedScreens: any[];
  snippets: any[];
  bottomBar?: any;
  topAppBar?: any;
};

export type BlockItem = {
  uuid: string;
  blockId: number | string;
  settingsUI: any;
  interactive?: any;
  listItems?: any[];
  listItem?: any;
};

export type Config = {
  activeTab: number;
  previewMode: number;
};

export type Output = {
  screen: string;
  logic: string;
};

export type SideBar = {
  left: boolean;
  right: boolean;
};

export type EditorMode = {
  mode: string;
  device: string;
  model: string;
  zoom: Zoom;
};

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
