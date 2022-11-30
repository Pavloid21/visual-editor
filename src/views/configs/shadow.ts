import {set} from 'external/lodash';
import type {FieldConfigType, SelectionFieldConfigType} from './types';

type ShadowConfigType = {
  color: FieldConfigType,
  opacity: FieldConfigType,
  offsetSize: {
    height: SelectionFieldConfigType
    width: SelectionFieldConfigType
  },
  radius?: FieldConfigType
}

export const shadowConfigBuilder = () => {
  const config: ShadowConfigType = {
    color: {type: 'color', name: 'Shadow color'},
    opacity: {type: 'number', name: 'Opacity'},
    offsetSize: {
      height: {
        type: 'units',
        name: 'Height',
        options: [
          {label: 'px', value: 'px'},
        ],
      },
      width: {
        type: 'units',
        name: 'Width',
        options: [
          {label: 'px', value: 'px'},
        ],
      },
    },
  };

  const builder = {
    get withRadius() {
      set(config, 'radius', {
        type: 'number', name: 'Radius'
      });
      return builder;
    },
    done() {
      return config;
    }
  };

  return builder;
};
