import React from 'react';
import {Button} from '../../components/controls';
import {Label} from '../Input';
import {ButtonGroup, Container} from '../../components/layouts';
import {IButtonSelector} from './types';

const ButtonSelector = (props: IButtonSelector) => {
  const {label, buttons, value} = props;
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <ButtonGroup>
        {buttons.map(({title, key, uuid}) => {
          return (
            <Button key={uuid} className={`sm ${key !== value && 'secondary'}`} onClick={() => props.onChange(value)}>
              {title}
            </Button>
          );
        })}
      </ButtonGroup>
    </Container>
  );
};

export default ButtonSelector;
