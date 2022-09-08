import {Device} from 'containers/MobileSelect/consts';
import type {BlocksState} from 'views/blocks/types';

type SizeStylePropsType = {
  size?: {
    width?: number,
    height?: number,
    widthInPercent?: number,
    heightInPercent?: number
  },
  blockState: BlocksState
}

export const getPixelsByDeviceUnit = ({deviceInfo}: BlocksState, value: number) => {
  if (deviceInfo.device === Device.IOS) {
    return (value * deviceInfo.dpi) / 163;
  }
  return (value * deviceInfo.dpi) / 160;
};

export const getSizeStyle = (key: 'width' | 'height', props: SizeStylePropsType) => {
  if (props.size) {
    const size = props.size[key];
    if (size) {
      return getPixelsByDeviceUnit(props.blockState, size) + 'px';
    } else if (props.size[`${key}InPercent`] !== undefined) {
      return props.size[`${key}InPercent`] + '%';
    }
  }
  return key === 'width' ? 'fit-content' : 'auto';
};
