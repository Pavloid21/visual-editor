import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEventHandler,
  InputHTMLAttributes
} from 'react';
import {Label} from 'components/controls';
import {Container, Wrapper} from './ColorPicker.styled';
import {debounce} from 'external/lodash';
import {isValidHEX, normalizeHEX} from 'utils/color';

interface IColorPicker extends InputHTMLAttributes<HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  debouncetimeout: number;
  $isWide: boolean;
}

const ColorPicker = ({value, onChange, ...rest}: IColorPicker) => {
  const colorRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => setLocalValue(value), [value]);
  const doDebouncedChangeGlobalValue = useCallback(debounce(onChange, 1000), [onChange]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const {value: targetValue} = e.target;
    if (isValidHEX(targetValue)) {
      onChange(e);
    } else {
      setLocalValue(value);
    }
  };

  const doChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const {value: targetValue} = e.target;
    setLocalValue(targetValue);
    if (isValidHEX(targetValue)) {
      doDebouncedChangeGlobalValue(e);
    }
  };

  return (
    <Wrapper>
      {rest.label && <Label>{rest.label}</Label>}
      <Container color={String(value)}>
        <input
          ref={colorRef}
          type="color"
          value={normalizeHEX(String(localValue))}
          onChange={doChangeValue}
          onBlur={onBlur}
        />
        <input
          type="text"
          value={localValue}
          onChange={doChangeValue}
          onBlur={onBlur}
          {...rest}
        />
      </Container>
    </Wrapper>
  );
};

export default ColorPicker;
