import React, {FC} from 'react';
import {Container} from './Radio.styled';

type RadioProps = {
  value: number,
  checked: boolean,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label: string
}

export const Radio: FC<RadioProps> = ({value, checked, name, onChange, label}) => {
  const id = String(value);
  return (
    <Container>
      <label className='custom-radio-btn'>
        <input type='radio' name={name} id={id} value={value} checked={checked} onChange={onChange} />
        <span className='checkmark'></span>
      </label>
      <label htmlFor={id} className='radio-label'>{label}</label>
    </Container>
  );
};
