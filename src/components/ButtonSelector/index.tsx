import React from 'react';
import {Button, Label} from 'components/controls';
import {ButtonGroup, Container} from 'components/layouts';
import {IButtonSelector} from './types';

const ButtonSelector = (props: IButtonSelector) => {
  const {label, buttons, value} = props;
  return (
    <Container className={props.className}>
      {label && <Label>{label}</Label>}
      <ButtonGroup>
        {buttons.map(({title, key, uuid}) => {
          return (
            <Button key={uuid} className={`sm ${key !== value && 'secondary'}`} onClick={() => props.onChange(key)}>
              {title}
            </Button>
          );
        })}
      </ButtonGroup>
    </Container>
  );
};

export default ButtonSelector;
