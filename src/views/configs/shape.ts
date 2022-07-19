import {set} from 'external/lodash';
import type {FieldConfigType, SelectionFieldConfigType} from './types';

type ShapeConfigType = {
  type: SelectionFieldConfigType,
  radius?: FieldConfigType
}

export const shapeConfigBuilder = () => {
  const config: ShapeConfigType = {
    type: {
      type: 'select',
      name: 'Shape type',
      options: [],
    },
    radius: {type: 'number', name: 'Shape radius'},
  };

  const builder = {
    get withRadius() {
      set(config, 'radius', {
        type: 'number', name: 'Shape radius'
      });
      return builder;
    },
    get withAllCornersRound() {
      config.type.options.push({
        label: 'All corners round', value: 'ALLCORNERSROUND'
      });
      return builder;
    },
    get withTopCornersRound() {
      config.type.options.push({
        label: 'Top corners round', value: 'TOPCORNERSROUND'
      });
      return builder;
    },
    done() {
      return config;
    }
  };

  return builder;
};
