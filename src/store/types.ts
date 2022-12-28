import {Action} from 'redux';
import {Zoom} from 'containers/ZoomSelect/types';
import store from './index';

import type {ThunkDispatch} from '@reduxjs/toolkit';
import {IconTabType} from '../components/Images/types';

export type SnippetType = {
  snippet: string;
  endpoint: string;
  selectedScreen?: string;
  screenID: string;
  logic: string;
}

export type EditScreenNamePayloadAction = Action<string> & {
  screen: string;
  navigationSettings: any;
  settingsUI: TSettingsUI;
  snippet: SnippetType;
};

export type Actions = {
  actions: ActionItem[];
  data: ActionItem[];
  externals: ActionItem[];
  push: ActionItem[];
  cronTasks: ActionItem[];
  selected: ActionItem | null;
  all: ActionItem[];
  deleted: {
    actions: ActionItem[];
    data: ActionItem[];
    externals: ActionItem[];
    cronTasks: ActionItem[];
    push: ActionItem[];
  };
};

export enum ActionTypes {
  all = 'all',
  data = 'data',
  actions = 'actions',
  push = 'push',
  externals = 'externals',
  cronTasks = 'cronTasks'
}

export type ActionCronTasksObject = {
  id?: string;
  pattern?: string;
  snippetType?: string;
  snippetName?: string;
}

export type ActionItem = {
  action: string;
  object?: ActionCronTasksObject | string;
  selected?: boolean;
  type: ActionTypes;
};

export type ActionPushItem = {
  action: string;
  selected?: boolean;
  type: ActionTypes;
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
  created?: string;
  edited?: string;
};

export type TBusinessSetting = {
  loginUrl?: string;
  passCodeVerificationUrl?: string;
  isTouchId?: boolean;
  isFaceId?: boolean;
  timeTokenExpired?: number;
  tokenDeviceUrl?: string;
  countPincodeAttempt?: number;
  countFaceIdAttempt?: number;
  countTouchIdAttempt?: number;
  mainScreenUrl?: string;
  invalidAccessTime?: number;
};

export type Template = {
  id: string;
  title: string;
  description: string;
  snippets: {
    screens: Map<string, string>;
    actions: Map<string, string>;
    data: Map<string, string>;
    themes: Map<string, string>;
    externalActions: Map<string, string>;
  };
};

export type ProjectForm = {
  id: string;
  name: string;
  description: string;
  icon?: any;
  url? :string;
  platform: string | {
    [x: string]: any;
    ios: boolean;
    android: boolean;
    aurora: boolean;
  };
};

export type APIItem = {
  headers: {key: string; value: string}[];
  params: {key: string; value: string}[];
  varName: string;
  url: string;
};

export type Layout = {
  blocks: IListItem[];
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
  listItems?: IListItem[];
  listItem?: IListItem;
};

export interface IListItem {
  uuid: string;
  blockId: string | number;
  settingsUI: {
    size?: {
      heightInPercent: number;
      widthInPercent: number;
    };
    distribution?: string;
    spacing?: number;
    scroll?: boolean;
    borderColor?: string;
    borderWidth?: number;
    backgroundColor?: string;
    thumbOnColor?: string;
    placeholder?: string;
    text?: string;
    shadow?: Partial<TShadow>;
    padding?: Partial<TPadding>;
    shape?: {
      type: string;
      radius: string;
    };
  }
  interactive?: {
    type?: string;
    action?: {
      url: string;
      fields: object;
      target: string;
    }
  }
  listItems: IListItem[];
  listItem?: IListItem;
}

export type TShadow = {
  color: string;
  opacity: number;
  offsetSize: {
    width: number;
    height: number;
  };
  radius: number;
}

export type TPadding = {
  top: string;
  bottom: string;
  right: string;
  left: string;
}

export type Config = {
  activeTab: number;
  previewMode: number;
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
  dpi: number;
};

export type LeftBarMenu = {
  activeTab: string,
  activeImageTab: string,
  iconNameFilter: string,
  imageNameFilter: string,
  filterAction: ActionTypes,
  screenNameFilter: string,
  actionNameFilter: string,
  activeTabActions: ActionTypes
}

export type TScreenListOption = {
  label: string;
  value: string;
}

export type TImageListOption = {
  name: string;
  type: string;
}

export type TSettingsUI = {
  isBottomSheet: any;
    bottomSheetSettings: {
      heightInPercent: number;
      scrimColor: string;
      cornersRadius: number;
    };
  isNavigateDrawer: any;
    navigationDrawerSettings: {
      weightInPercent: number;
      scrimColor: string;
    }
}

export type TImagesType = {
  images: IconTabType[],
  newFolder: string,
  icons: IconTabType[]
}

export type RootStore = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootStore, void, Action>;
