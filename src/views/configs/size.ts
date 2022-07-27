import {Device} from 'containers/MobileSelect/consts';

export const size = {
  height: {
    type: 'units',
    name: 'Height',
    options: [
      {label: 'px', value: 'px'},
      {label: '%', value: '%'},
    ],
  },
  width: {
    type: 'units',
    name: 'Width',
    options: [
      {label: 'px', value: 'px'},
      {label: '%', value: '%'},
    ],
  },
};

export const getSizeConfig = (device: Device) => {
  const units = device === Device.IOS ?
    [{label: 'Points', value: 'points'}] :
    [{label: 'DP', value: 'dp'}];

  return ({
    height: {
      type: 'units',
      name: 'Height',
      options: units,
    },
    width: {
      type: 'units',
      name: 'Width',
      options: units,
    },
  });
};
