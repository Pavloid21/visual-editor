import {Action} from 'redux';

export type Actions = {
  actions: ActionItem[];
  data: ActionItem[];
  selected: ActionItem | null;
  deleted: {
    actions: ActionItem[];
    data: ActionItem[];
  };
};

export type ActionItem = {
  action: string;
  object: string;
  selected: boolean;
  type?: 'action' | 'data';
};

export type API = {
  list: APIItem[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type APIItem = {
  headers: {key: string; value: string}[];
  params: {key: string; value: string}[];
  varName: string;
  url: string;
};

//TODO: тут нужно что-то сделать, чтобы выглядело логичнее
export interface LayoutAction extends Action {
  blockId: string;
  index?: any;
  interactive?: any;
  uuid?: string;
  blockUuid?: string;
  newBlocksLayout?: any[];
  element?: any;
  parentKey?: string;
  key?: string;
  value?: any;
  snippet?: any;
  screen?: any;
  bottomBar?: any;
  topAppBar?: any;
  delete?: any;
  documentId?: string;
  layout?: any;
  selectedScreen?: any;
}

export type Layout = {
  blocks: any[];
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
  blockId: string;
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
};

export type Store = {
  config: Config;
  layout: Layout;
  output: Output;
  api: API;
  sideBar: SideBar;
  editorMode: EditorMode;
  current: string;
  code: string;
  actions: Actions;
  project: Project;
};
