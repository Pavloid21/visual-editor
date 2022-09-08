import {Device} from 'containers/MobileSelect/consts';
import {getUnitOptionByDevice} from 'utils/units';

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
  const percentOption = {label: '%', value: '%'};
  const unitOption = getUnitOptionByDevice(device);

  return ({
    height: {
      type: 'units',
      name: 'Height',
      options: [percentOption, unitOption],
    },
    width: {
      type: 'units',
      name: 'Width',
      options: [percentOption, unitOption],
    },
  });
};
