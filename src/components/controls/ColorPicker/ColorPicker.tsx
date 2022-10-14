import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {Label} from 'components/controls';
import {Container, Wrapper} from './ColorPicker.styled';
import {debounce} from 'external/lodash';
import {isValidHEX, normalizeHEX} from 'utils/color';

const ColorPicker: React.FC<any> = ({value, onChange, ...rest}) => {
  const colorRef = useRef(null);
  const [localValue, setLocalValue] = useState<string>(value);
  useEffect(() => setLocalValue(value), [value]);
  const doDebouncedChangeGlobalValue = useCallback(debounce(onChange, 1000), []);

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
      <Container color={value}>
        <input ref={colorRef} type="color" value={normalizeHEX(localValue)} onChange={doChangeValue} onBlur={onBlur} />
        <input type="text" value={localValue} onChange={doChangeValue} onBlur={onBlur} {...rest} />
      </Container>
    </Wrapper>
  );
};

export default ColorPicker;
