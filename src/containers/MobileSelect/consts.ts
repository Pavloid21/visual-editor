import {IButton} from 'components/ButtonSelector/types';
import { IOption } from 'components/controls/Select/types';
import { Device } from 'constants/device';
import {v4} from 'uuid';

export const buttons: IButton[] = [
  {title: 'iOS', key: Device.IOS, uuid: v4()},
  {title: 'Android', key: Device.ANDROID, uuid: v4()},
  // TODO: типизировать ключи кнопок и editor mode
];

export enum DeviceKeys {
  IPHONE_13_PRO_MAX = 'IPHONE_13_PRO_MAX',
  IPHONE_13 = 'IPHONE_13',
  IPHONE_13_MINI = 'IPHONE_13_MINI',
  IPHONE_11_PRO_MAX = 'IPHONE_11_PRO_MAX',
  IPHONE_11_PRO_10 = 'IPHONE_11_PRO_10',
  IPHONE_SE = 'IPHONE_SE',
  IPHONE_8_PLUS = 'IPHONE_8_PLUS',
  IPHONE_8 = 'IPHONE_8',
  ANDROID_SMALL = 'ANDROID_SMALL',
  ANDROID_LARGE = 'ANDROID_LARGE',
}

export const optionsByDevice: Record<Device, IOption[]> = {
  [Device.IOS]: [
    {label: 'iPhone 13 Pro Max', value: DeviceKeys.IPHONE_13_PRO_MAX},
    {label: 'iPhone 13 / 13 Pro', value: DeviceKeys.IPHONE_13},
    {label: 'iPhone 13 Mini', value: DeviceKeys.IPHONE_13_MINI},
    {label: 'iPhona 11 Pro Max', value: DeviceKeys.IPHONE_11_PRO_MAX},
    {label: 'iPhone 11 Pro / X', value: DeviceKeys.IPHONE_11_PRO_10},
    {label: 'iPhone SE', value: DeviceKeys.IPHONE_SE},
    {label: 'iPhone 8 Plus', value: DeviceKeys.IPHONE_8_PLUS},
    {label: 'iPhone 8', value: DeviceKeys.IPHONE_8}
  ],
  [Device.ANDROID]: [
    {label: 'Android Small', value: DeviceKeys.ANDROID_SMALL},
    {label: 'Android Large', value: DeviceKeys.ANDROID_LARGE}
  ],
};