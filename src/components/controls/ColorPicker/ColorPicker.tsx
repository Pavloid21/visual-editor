import React, {useRef} from 'react';
import {Label} from 'components/controls';
import {Container, Wrapper} from './ColorPicker.styled';

const ColorPicker: React.FC<any> = ({value, onChange, ...rest}) => {
  const colorRef = useRef(null);

  return (
    <Wrapper>
      {rest.label && <Label>{rest.label}</Label>}
      <Container color={value}>
        <input ref={colorRef} type="color" value={value} onChange={onChange} />
        <input type="text" value={value} onChange={onChange} {...rest} />
      </Container>
    </Wrapper>
  );
};

export default ColorPicker;
