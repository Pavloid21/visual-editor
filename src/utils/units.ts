import {Device} from 'containers/MobileSelect/consts';

export const getKeyByUnit = (unitValue: string | undefined, key: string) => {
  if (unitValue === '%') {
    return `${key}InPercent`;
  } else if (unitValue) {
    return key;
  }
  return key;
};

export const getUnitOptionByDevice = (device: Device) => {
  return device === Device.IOS ?
    {label: 'Points', value: 'points'} :
    {label: 'DP', value: 'dp'};
};
