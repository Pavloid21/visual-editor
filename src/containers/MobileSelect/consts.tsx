import {IButton} from 'components/ButtonSelector/types';
import {IOption} from 'components/controls/Select/types';
import {v4} from 'uuid';
import {ReactComponent as AndroidSmall} from 'assets/mockups/Android_Small.svg';
import {ReactComponent as AndroidLarge} from 'assets/mockups/Android_Large.svg';
import {ReactComponent as Iphone13ProMax} from 'assets/mockups/iPhone13_Pro_Max.svg';
import {ReactComponent as Iphone13} from 'assets/mockups/iPhone13_Pro.svg';
import {ReactComponent as Iphone13Mini} from 'assets/mockups/iPhone13_Mini.svg';
import {ReactComponent as Iphone11ProMax} from 'assets/mockups/iPhone11_Pro_Max.svg';
import {ReactComponent as Iphone11or10} from 'assets/mockups/iPhone_X.svg';
import {ReactComponent as IphoneSE} from 'assets/mockups/iPhoneSE.svg';
import {ReactComponent as Iphone8Plus} from 'assets/mockups/iPhone8_Plus.svg';
import {ReactComponent as Iphone8} from 'assets/mockups/iPhone8.svg';
import {CSSProperties} from 'styled-components';

export enum Device {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

export const buttons: IButton[] = [
  {title: 'iOS', key: Device.IOS, uuid: v4()},
  {title: 'Android', key: Device.ANDROID, uuid: v4()},
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

export const mockByDeviceKey = {
  [DeviceKeys.ANDROID_SMALL]: <AndroidSmall />,
  [DeviceKeys.ANDROID_LARGE]: <AndroidLarge />,
  [DeviceKeys.IPHONE_13_PRO_MAX]: <Iphone13ProMax />,
  [DeviceKeys.IPHONE_13]: <Iphone13 />,
  [DeviceKeys.IPHONE_13_MINI]: <Iphone13Mini />,
  [DeviceKeys.IPHONE_11_PRO_MAX]: <Iphone11ProMax />,
  [DeviceKeys.IPHONE_11_PRO_10]: <Iphone11or10 />,
  [DeviceKeys.IPHONE_SE]: <IphoneSE />,
  [DeviceKeys.IPHONE_8_PLUS]: <Iphone8Plus />,
  [DeviceKeys.IPHONE_8]: <Iphone8 />,
};

export const stylesByDeviceKey: Record<DeviceKeys, CSSProperties> = {
  [DeviceKeys.ANDROID_SMALL]: {},
  [DeviceKeys.ANDROID_LARGE]: {
    width: '431px',
    height: '1000px',
    marginTop: '33px',
  },
  [DeviceKeys.IPHONE_13_PRO_MAX]: {
    width: '475px',
    height: '972px',
    padding: '22px',
    clipPath: 'url(#clipPath)',
    borderRadius: '50px',
    paddingTop: '55px',
    backgroundColor: '#fff',
  },
  [DeviceKeys.IPHONE_13]: {
    
  },
  [DeviceKeys.IPHONE_13_MINI]: {},
  [DeviceKeys.IPHONE_11_PRO_MAX]: {},
  [DeviceKeys.IPHONE_11_PRO_10]: {
    width: '428px',
    height: '836px',
    clipPath: 'url(#maskRect1)',
  },
  [DeviceKeys.IPHONE_SE]: {},
  [DeviceKeys.IPHONE_8_PLUS]: {},
  [DeviceKeys.IPHONE_8]: {},
};

export const optionsByDevice: Record<Device, IOption[]> = {
  [Device.IOS]: [
    {label: 'iPhone 13 Pro Max', value: DeviceKeys.IPHONE_13_PRO_MAX},
    {label: 'iPhone 13 / 13 Pro', value: DeviceKeys.IPHONE_13},
    {label: 'iPhone 13 Mini', value: DeviceKeys.IPHONE_13_MINI},
    {label: 'iPhona 11 Pro Max', value: DeviceKeys.IPHONE_11_PRO_MAX},
    {label: 'iPhone 11 Pro / X', value: DeviceKeys.IPHONE_11_PRO_10},
    {label: 'iPhone SE', value: DeviceKeys.IPHONE_SE},
    {label: 'iPhone 8 Plus', value: DeviceKeys.IPHONE_8_PLUS},
    {label: 'iPhone 8', value: DeviceKeys.IPHONE_8},
  ],
  [Device.ANDROID]: [
    {label: 'Android Small', value: DeviceKeys.ANDROID_SMALL},
    {label: 'Android Large', value: DeviceKeys.ANDROID_LARGE},
  ],
};
