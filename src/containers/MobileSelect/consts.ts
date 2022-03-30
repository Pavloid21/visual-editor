import {IButton} from 'components/ButtonSelector/types';
import {v4} from 'uuid';

export const buttons: IButton[] = [
  {title: 'iOS', key: 'iOS', uuid: v4()},
  {title: 'Android', key: 'Android', uuid: v4()},
  // TODO: типизировать ключи кнопок и editor mode
];
