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
import styled, {CSSProperties} from 'styled-components';
import {ReactComponent as LeftSide} from 'assets/mockups/left_side.svg';
import {ReactComponent as RightSide} from 'assets/mockups/right_side.svg';
import {ReactComponent as LeftSideSE} from 'assets/mockups/left_side_se.svg';
import {ReactComponent as RightSideSE} from 'assets/mockups/right_side_se.svg';
import {ReactComponent as Time} from 'assets/mockups/time.svg';
import {ReactComponent as TimeAndroid} from 'assets/mockups/time_android.svg';
import {ReactComponent as RightSideAndroid} from 'assets/mockups/right_side_android.svg';
import {useAppSelector} from 'store';
import {transformHexWeb} from 'utils/color';
import type {TButton} from 'components/ButtonSelector/types';
import type {IOption} from 'components/controls/Select/types';
import {invertColor} from 'utils';

export enum Device {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

export const buttons: TButton[] = [
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
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.ANDROID_SMALL]: {
    width: '396px',
    height: '802px',
    clipPath: 'url(#clipPath)',
    borderRadius: '55px',
    padding: '76px 20px 80px',
  },
  /**
   * SVG Viewport - maybe
   * */
  [DeviceKeys.ANDROID_LARGE]: {
    width: '424px',
    height: '997px',
    clipPath: 'url(#clipPath)',
    padding: '86px 26px 100px',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_13_PRO_MAX]: {
    width: '475px',
    height: '972px',
    padding: '22px',
    clipPath: 'url(#clipPath)',
    borderRadius: '50px',
    paddingTop: '22px',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_13]: {
    width: '439px',
    height: '886px',
    borderRadius: '50px',
    clipPath: 'url(#clipPath)',
    padding: '20px 26px 19px',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_13_MINI]: {
    width: '422px',
    height: '853px',
    borderRadius: '63px',
    padding: '20px 25px 20px',
    clipPath: 'url(#clipPath)',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_11_PRO_MAX]: {
    width: '474px',
    height: '953px',
    clipPath: 'url(#clipPath)',
    padding: '22px 26px 0px',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_11_PRO_10]: {
    width: '428px',
    height: '836px',
    clipPath: 'url(#maskRect1)',
    padding: '22px 26px 0px',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_SE]: {
    width: '422px',
    height: '881px',
    padding: '110px 21px 100px',
    clipPath: 'url(#clipPath)',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_8_PLUS]: {
    width: '465px',
    height: '969px',
    padding: '115px 24px 115px',
    borderRadius: '65px',
    clipPath: 'url(#clipPath)',
  },
  /**
   * SVG Viewport - correct
   * */
  [DeviceKeys.IPHONE_8]: {
    clipPath: 'url(#clipPath)',
    width: '421px',
    height: '878px',
    padding: '105px 22px 103px',
  },
};

export const optionByDeviceModelKey: Record<string, {dpi: number}> = {
  [DeviceKeys.ANDROID_SMALL]: {
    dpi: 120
  },
  [DeviceKeys.ANDROID_LARGE]: {
    dpi: 640
  },
  [DeviceKeys.IPHONE_13_PRO_MAX]: {
    dpi: 458
  },
  [DeviceKeys.IPHONE_13]: {
    dpi: 460
  },
  [DeviceKeys.IPHONE_13_MINI]: {
    dpi: 476
  },
  [DeviceKeys.IPHONE_11_PRO_MAX]: {
    dpi: 458
  },
  [DeviceKeys.IPHONE_11_PRO_10]: {
    dpi: 458
  },
  [DeviceKeys.IPHONE_SE]: {
    dpi: 326
  },
  [DeviceKeys.IPHONE_8_PLUS]: {
    dpi: 401
  },
  [DeviceKeys.IPHONE_8]: {
    dpi: 326,
  },
};

export const optionsByDevice: Record<Device, IOption[]> = {
  [Device.IOS]: [
    {label: 'iPhone 13 Pro Max', value: DeviceKeys.IPHONE_13_PRO_MAX},
    {label: 'iPhone 13 / 13 Pro', value: DeviceKeys.IPHONE_13},
    {label: 'iPhone 13 Mini', value: DeviceKeys.IPHONE_13_MINI},
    {label: 'iPhone 11 Pro Max', value: DeviceKeys.IPHONE_11_PRO_MAX},
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

const StatusBar = styled.div<any>`
  display: flex;
  justify-content: space-between;
  padding: 12px 21px 0px;
  background-color: #fff;
  ${(props) => props.styled}
  ${(props) => {
    const appBar = useAppSelector((state) => state.layout.topAppBar);
    const colorSvg = transformHexWeb(appBar?.settingsUI.backgroundColor || '#FFFFFF');

    return `background-color: ${transformHexWeb(appBar?.settingsUI.backgroundColor)};
            & > svg > g {
              fill: ${colorSvg.length !== 9 ? invertColor(colorSvg, true) : invertColor(colorSvg.substring(0, 7), true)};
            }`;
  }}
`;

export const statusBarByDevice = (backgroundColor: string, model: string) => {
  const bars = {
    [DeviceKeys.IPHONE_13_PRO_MAX]: (
      <StatusBar backgroundColor={backgroundColor}>
        <LeftSide />
        <RightSide />
      </StatusBar>
    ),
    [DeviceKeys.ANDROID_SMALL]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          padding: '8px 10px',
          alignItems: 'center',
        }}
      >
        <TimeAndroid />
        <RightSideAndroid />
      </StatusBar>
    ),
    [DeviceKeys.ANDROID_LARGE]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          padding: '12px 10px',
          alignItems: 'center',
        }}
      >
        <TimeAndroid />
        <RightSideAndroid />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_13]: (
      <StatusBar backgroundColor={backgroundColor}>
        <LeftSide />
        <RightSide />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_13_MINI]: (
      <StatusBar backgroundColor={backgroundColor}>
        <LeftSide />
        <RightSide />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_11_PRO_MAX]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          height: '42px',
          alignItems: 'self-start',
        }}
      >
        <LeftSide />
        <RightSide />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_11_PRO_10]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          padding: '10px 20px 0px',
        }}
      >
        <LeftSide />
        <RightSide />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_SE]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          padding: '10px 10px 4px',
          alignItems: 'center',
        }}
      >
        <LeftSideSE />
        <Time />
        <RightSideSE />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_8_PLUS]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          padding: '10px 10px 4px',
          alignItems: 'center',
        }}
      >
        <LeftSideSE />
        <Time />
        <RightSideSE />
      </StatusBar>
    ),
    [DeviceKeys.IPHONE_8]: (
      <StatusBar
        backgroundColor={backgroundColor}
        styled={{
          padding: '10px 10px 4px',
          alignItems: 'center',
        }}
      >
        <LeftSideSE />
        <Time />
        <RightSideSE />
      </StatusBar>
    ),
  };
  return bars[model as DeviceKeys];
};
