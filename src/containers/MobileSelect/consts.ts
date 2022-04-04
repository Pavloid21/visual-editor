import {IButton} from 'components/ButtonSelector/types';
import { Device } from 'constants/device';
import {v4} from 'uuid';

export const buttons: IButton[] = [
  {title: 'iOS', key: Device.IOS, uuid: v4()},
  {title: 'Android', key: Device.ANDROID, uuid: v4()},
  // TODO: типизировать ключи кнопок и editor mode
];

export const options = [
  {label:'Phone x', value: '1', _uuid: v4()},
  {label:'Phone y', value: '2', _uuid: v4()}
]