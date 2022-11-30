import {set} from 'external/lodash';
import type {FieldConfigType} from './types';

type ShadowConfigType = {
  color: FieldConfigType,
  opacity: FieldConfigType,
  offsetSize: {
    height: FieldConfigType
    width: FieldConfigType
  },
  radius?: FieldConfigType
}

export const shadowConfigBuilder = () => {
  const config: ShadowConfigType = {
    color: {type: 'color', name: 'Shadow color'},
    opacity: {type: 'number', name: 'Opacity'},
    offsetSize: {
      height: {
        type: 'number',
        name: 'Height',
      },
      width: {
        type: 'number',
        name: 'Width',
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
