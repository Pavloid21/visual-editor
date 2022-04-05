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

export type APIItem = {
  headers: {key: string; value: string}[];
  params: {key: string; value: string}[];
  varName: string;
  url: string;
};

//TODO: типизировать стор
export type Store = {
  config: any;
  layout: any;
  output: any;
  api: API;
  sideBar: any;
  editorMode: any;
  current: any;
  code: any;
  actions: Actions;
}
