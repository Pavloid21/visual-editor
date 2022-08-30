import {Device} from 'containers/MobileSelect/consts';

export type Block = {
  Component: any;
  name: string;
  title: string;
  description: string;
  previewImageUrl: string;
  category: string;
  defaultData: any;
  listItems?: any[];
  config: any;
  defaultInteractiveOptions?: any;
  interactive?: any;
  complex?: {label: string; value: string}[];
};

type SimpleObject = {[key: string]: any};

export type BlocksState = {
  deviceInfo: {
    device: Device,
    model: string,
    dpi: number
  }
}

export interface Blocks extends SimpleObject {
  hstack: (state?: BlocksState) => Block;
  card: (state?: BlocksState) => Block;
  vstack: (state?: BlocksState) => Block;
  basictextfield: (state?: BlocksState) => Block;
  passwordtextfield: (state?: BlocksState) => Block;
  label: (state?: BlocksState) => Block;
  button: (state?: BlocksState) => Block;
  image: (state?: BlocksState) => Block;
  bottombar: (state?: BlocksState) => Block;
  box: (state?: BlocksState) => Block;
  searchbar: (state?: BlocksState) => Block;
  switch: (state?: BlocksState) => Block;
  topappbar: (state?: BlocksState) => Block;
  divider: (state?: BlocksState) => Block;
  list: (state?: BlocksState) => Block;
  collection: (state?: BlocksState) => Block;
  bottomsheet: (state?: BlocksState) => Block;
  webview: (state?: BlocksState) => Block;
  screen: (state?: BlocksState) => Block;
}
