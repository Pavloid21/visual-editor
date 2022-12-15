import React, {useState, useCallback, useRef, useEffect, FormEvent} from 'react';
import {HexColorInput} from 'react-colorful';

import {debounce} from 'external/lodash';

import {Label} from 'components/controls';
import {Container, Wrapper} from './ColorPicker.styled';
import {PopoverColor} from 'components/controls/ColorPicker/PopoverColor';
import {transformHexAndroid} from 'utils/color';

const options = {
  root: null,
  rootMargin: "0px",
};

interface IColorPicker {
  onChangeColor: (value: string) => void | undefined;
  label: string;
  debouncetimeout: number;
  $isWide: boolean;
  placeholder?: string;
  value: string;
}

const ColorPicker = ({value, onChangeColor, ...rest}: IColorPicker) => {
  const wrapperRef = useRef(null);

  const [position, setPosition] = useState("bottom");
  const [isShow, setIsShow] = useState(false);

  const onChangeEvent = useCallback((value: string | undefined | null) => {
    onChangeColor(transformHexAndroid(value));
  }, [onChangeColor]);

  const doDebouncedChangeGlobalValue = useCallback(debounce(onChangeEvent, 750), [onChangeEvent]);

  const callbackObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    const heightDocument = document.documentElement.clientHeight;
    if ((heightDocument - 250 - 120 - 20) <= entry.boundingClientRect.y) {
      position !== "top" && setPosition("top");
    } else {
      position !== "bottom" && setPosition("bottom");
    }
    if (!entry.isIntersecting) {
      setIsShow(false);
    }
  }, [position]);

  const onWheel = useCallback(() => {
    if (isShow) {
      setIsShow(false);
    }
  }, [isShow]);

  const onInputValue = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '#') {
      onChangeEvent('');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackObserver, options);
    if (wrapperRef.current && isShow) {
      observer.observe(wrapperRef.current);
      document.addEventListener('wheel', onWheel);
    }
    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
      document.removeEventListener('wheel', onWheel);
    };
  }, [wrapperRef, isShow]);

  return (
    <Wrapper>
      {rest.label && <Label>{rest.label}</Label>}
      <Container color={String(value)}>
        <div
          ref={wrapperRef}
          className="swatch"
          onClick={() => setIsShow(!isShow)}
        />

        <HexColorInput
          color={value || ''}
          onChange={doDebouncedChangeGlobalValue}
          onInput={onInputValue}
          alpha={true}
          prefixed={true}
          type="text"
          className="input-color"
          {...rest}
        />

        {isShow && (
          <PopoverColor
            value={value || ''}
            onChange={doDebouncedChangeGlobalValue}
            // themeColors={['#4D1ED58A', '#DC0F728A', '#42FF0026', '#CC00FFA1', '#49A44AE0', '#D917C063']}
            onClickThemColors={onChangeColor}
            onClose={() => setIsShow(false)}
            position={position}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default ColorPicker;
