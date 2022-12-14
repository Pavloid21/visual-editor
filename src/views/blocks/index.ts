import screen from './screen';
import vstack from './vstack';
import hstack from './hstack';
import basictextfield from './input';
import passwordtextfield from './passwordtextfield';
import label from './label';
import button from './button';
import card from './card';
import image from './image';
import bottombar from './bottombar';
import box from './box';
import searchbar from './searchbar';
import switch_block from './switch';
import topappbar from './topappbar';
import divider from './divider';
import list from './list';
import collection from './collection';
import webview from './webview';
import calendar_text_field from './calendarField';
import progressbar from './progressbar';
import checkbox from './checkbox';
import calendar from './calendar';
import passcodeview from './passcodeview';
import {Blocks} from './types';

const blocks: Blocks = {
  hstack,
  card,
  vstack,
  basictextfield,
  passwordtextfield,
  label,
  button,
  image,
  bottombar,
  box,
  searchbar,
  switch: switch_block,
  topappbar,
  divider,
  list,
  collection,
  webview,
  screen,
  calendar_text_field,
  progressbar,
  checkbox,
  calendar,
  passcodeview,
};

export const gallery: Record<string, any> = {
  card,
  vstack,
  basictextfield,
  label,
  button,
  image,
  bottombar,
  box,
  searchbar,
  switch: switch_block,
  topappbar,
  divider,
  list,
  collection,
  webview,
  // screen,
  progressbar,
  checkbox,
  calendar,
  passcodeview,
};

export default blocks;
