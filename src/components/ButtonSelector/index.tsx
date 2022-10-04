import React from 'react';
import {Button, Label} from 'components/controls';
import {ButtonGroup, Container} from 'components/layouts';
import type {TButtonSelector} from './types';

const ButtonSelector: React.FC<TButtonSelector> = ({onChange, buttons, label, value, className}) => {
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <ButtonGroup>
        {buttons.map(({title, key, uuid}) => {
          return (
            <Button key={uuid} className={`sm ${key !== value && 'transparent'}`} onClick={() => onChange(key)}>
              {title}
            </Button>
          );
        })}
      </ButtonGroup>
    </Container>
  );
};

export default ButtonSelector;
