import React from 'react';
import styled from 'styled-components';
import switch_ic from 'assets/switch.svg';
import Wrapper from 'utils/wrapper';
import {Device} from 'containers/MobileSelect/consts';
import {
  isActive,
  interactive,
  padding,
  checkedColor,
  uncheckedColor,
} from 'views/configs';
import {getDimensionStyles} from '../utils/styles/size';

const Switch = styled.div`
  font-size: 16px;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  margin-bottom: 0;
  z-index: 0;
  width: fit-content;
  ${(props) => getDimensionStyles(props)
    .padding()
    .fontSize()
    .apply()
  }
  & input:checked + span::before {
    background-color: ${(props) => props.checkedColor || '#4ed164'};
    opacity: ${(props) => (props.blockState.deviceInfo.device === Device.ANDROID ? '0.5' : '1')};
  }
  & input:checked + span::after {
    transform: translateX(16px);
    ${(props) => {
    if (props.blockState.deviceInfo.device === Device.ANDROID) {
      return `background-color: ${(props) => props.checkedColor || '#4ed164'};`;
    }
    if (props.blockState.deviceInfo.device === Device.IOS) {
      return `background-color: #ffffff;`;
    }
  }}
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
    background-color: ${(props) => props.uncheckedColor || '#d9dadc'};
    outline: none;
    opacity: 0;
    transform: scale(1);
    transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
    &:checked {
      right: -10px;
      background-color: ${(props) => props.checkedColor || '#4ed164'};
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
      margin: ${(props) => (props.blockState.deviceInfo.device === Device.ANDROID ? '5px 0 0 0' : '0 0 0 0')};
      border-radius: 7px;
      width: 36px;
      height: ${(props) => (props.blockState.deviceInfo.device === Device.ANDROID ? '14px' : '20px')};
      vertical-align: top;
      transition: background-color 0.2s, opacity 0.2s;
      background-color: ${(props) => props.uncheckedColor || '#d9dadc'}
    }
    &::after {
      content: "";
      position: absolute;
      top: ${(props) => (props.blockState.deviceInfo.device === Device.ANDROID ? '2px' : '0px')};
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
  },
  config: {
    checkedColor,
    uncheckedColor,
    isActive,
    padding,
  },
  defaultInteractiveOptions: {
//   field: '',
    action: {url: '', fields: {}},
  },
  interactive,
//  :{
//    field: {type: 'string', name: 'Field name'},
//    action: {
//      url: interactive.action.url,
//      method: interactive.action.method,
//    },
//    fields: interactive.fields,
//    confirmationDialog: {
//      title: interactive.confirmationDialog.title,
//      message: interactive.confirmationDialog.message,
//      confirmText: interactive.confirmationDialog.confirmText,
//      cancelledText: interactive.confirmationDialog.cancelledText,
//    },
//  },
});

export default block;
