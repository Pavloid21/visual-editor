import {get} from 'external/lodash';
import type {StyledComponentPropsType} from 'views/blocks/types';

export const getSizeStyle = (key: 'width' | 'height', props: StyledComponentPropsType) => {
  if (props.size) {
    const size = props.size[key];
    if (size) {
      return size + 'px';
    } else if (props.size[`${key}InPercent`] !== undefined) {
      return props.size[`${key}InPercent`] + '%';
    }
  }
  return key === 'width' ? 'fit-content' : 'auto';
};

export const getDimensionStyles = (props: StyledComponentPropsType) => {
  const mediator: Record<string, string> = {};

  const getPixels = (value = 0) => `${value}px`;

  const builder = {
    width() {
      mediator['width'] = getSizeStyle('width', props);
      return builder;
    },
    height() {
      mediator['height'] = getSizeStyle('height', props);
      return builder;
    },
    padding(path = 'padding', defaultValue = 0) {
      const paddings = get(props, path, {});
      mediator['padding'] = [
        getPixels(paddings.top || defaultValue),
        getPixels(paddings.right || defaultValue),
        getPixels(paddings.bottom || defaultValue),
        getPixels(paddings.left || defaultValue)
      ].join(' ');
      return builder;
    },
    borderRadius(path = 'corners', defaultValue = 0) {
      const borders = get(props, path, {});
      mediator['borderRadius'] = [
        getPixels(borders.topLeftRadius || defaultValue),
        getPixels(borders.topRightRadius || defaultValue),
        getPixels(borders.bottomRightRadius || defaultValue),
        getPixels(borders.bottomLeftRadius || defaultValue)
      ].join(' ');
      return builder;
    },
    fontSize() {
      mediator['font-size'] = getPixels(props.fontSize || 12);
      return builder;
    },
    apply() {
      return mediator;
    }
  };

  return builder;
};
