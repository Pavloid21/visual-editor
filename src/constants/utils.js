import {useContext, useEffect} from 'react';
import {UNSAFE_NavigationContext} from 'react-router-dom';

export const leadLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export const setContrast = (rgb) => ((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125 ? 'black' : 'white');

export const useBackListener = (callback) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  useEffect(() => {
    const listener = ({location, action}) => {
      if (action === 'POP') {
        callback({location, action});
      }
    };

    const unlisten = navigator.listen(listener);
    return unlisten;
  }, [callback, navigator]);
};
