import React from 'react';
import styled from 'styled-components';
import switch_ic from 'assets/switch.svg';
import Wrapper from 'utils/wrapper';
import {
  backgroundColor,
  isActive,
  thumbOnColor,
  interactive,
  padding,
} from 'views/configs';

const Switch = styled.div`
  font-size: 16px;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  margin-bottom: 0;
  z-index: 0;
  width: fit-content;
  padding-top: ${(props) => props.padding?.top || 0}px;
  padding-bottom: ${(props) => props.padding?.bottom || 0}px;
  padding-left: ${(props) => props.padding?.left || 0}px;
  padding-right: ${(props) => props.padding?.right || 0}px;
  & input:checked + span::before {
    background-color: ${(props) => props.thumbOnColor || 'transparent'};
  }
  & input:checked + span::after {
    background-color: ${(props) => props.thumbOnColor || 'transparent'};
    transform: translateX(16px);
  }
  & input {
    pointer-events: none;
    z-index: -1;
    appearance: none;
    position: absolute;
    right: 6px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
    outline: none;
    opacity: 0;
    transform: scale(1);
    transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
    &:checked {
      right: -10px;
      background-color: ${(props) => props.thumbOnColor || 'transparent'};
    }
  }
  & span {
    pointer-events: none;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    &::before {
      content: "";
      float: right;
      display: inline-block;
      margin: 5px 0 5px 10px;
      border-radius: 7px;
      width: 36px;
      height: 14px;
      vertical-align: top;
      transition: background-color 0.2s, opacity 0.2s;
      background-color: ${(props) => props.backgroundColor || 'transparent'}
    }
    &::after {
      content: "";
      position: absolute;
      top: 2px;
      right: 16px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      transition: background-color 0.2s, transform 0.2s;
      background-color: #FFFFFF;
    }
  }
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id}>
      <Switch {...props} {...settingsUI} className="draggable">
        <input type="checkbox" checked={settingsUI?.isActive} />
        <span></span>
      </Switch>
    </Wrapper>
  );
};

const block = () => ({
  Component,
  name: 'SWITCH',
  title: 'Switches',
  description: 'A control that toggles between on and off states.',
  previewImageUrl: switch_ic,
  category: 'Controls',
  defaultData: {
    backgroundColor: '#FDB291',
    thumbOnColor: '#FA6621',
  },
  config: {
    backgroundColor,
    thumbOnColor,
    isActive,
    padding,
  },
  defaultInteractiveOptions: {
    action: {url: '', fields: {}},
  },
  interactive,
});

export default block;
