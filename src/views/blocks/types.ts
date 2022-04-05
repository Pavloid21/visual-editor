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

export interface Blocks {
  hstack: Block;
  card: Block;
  vstack: Block;
  basictextfield: Block;
  passwordtextfield: Block;
  label: Block;
  button: Block;
  image: Block;
  bottombar: Block;
  box: Block;
  searchbar: Block;
  switch: Block;
  topappbar: Block;
  divider: Block;
  list: Block;
  collection: Block;
  bottomsheet: Block;
  webview: Block;
  screen: {
    previewImageUrl: string;
    name: string;
  };
}
