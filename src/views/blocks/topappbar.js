import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import invertColor from 'utils/invertColor';
import topappbar from 'assets/topappbar.svg';
import {backgroundColor} from 'views/configs';
import {Device} from 'containers/MobileSelect/consts';

const TopAppBar = styled.div`
  padding: 16px;
  color: ${(props) => invertColor(props.backgroundColor, true)};
  background-color: ${(props) => props.backgroundColor};
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 17px;
  justify-content: space-between;
  box-sizing: border-box;
  border: 0px dashed blue;
  & label {
    margin: 0;
    width: 100%;
    text-align: ${(props) => (props.blockState.deviceInfo.device === Device.ANDROID ? 'left' : 'center')};
    font-size: ${(props) => props.fontSize}px;
    color: ${(props) => props.titleColor
    || (props.blockState.deviceInfo.device === Device.ANDROID ? '#FFFFFF' : '#0000FF')};
  }
  & div {
    position: relative;
    justify-content: center;
    color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    & .item_icon {
      background-color: ${(props) => props.textColor || 'black'};
    }
  }
`;

const Component = ({settingsUI, ...props}) => (
  <Wrapper id={props.id} style={{padding: 0, width: '100%'}} sizeModifier='FULLWIDTH'>
    <TopAppBar {...settingsUI} {...props}>
      <label>{settingsUI?.title}</label>
    </TopAppBar>
  </Wrapper>
);

const block = () => ({
  Component,
  name: 'TOPAPPBAR',
  title: 'App bars: top',
  description: 'The top app bar displays information and actions relating to the current screen.',
  previewImageUrl: topappbar,
  category: 'Container',
  defaultInteractiveOptions: {
    rightButtons: [
      {
        title: 'Button',
        iconUrl: '',
        tintColor: '#000000',
      },
    ],
  },
  defaultData: {
    backgroundColor: '#423649',
  },
  config: {
    backgroundColor,
    title: {type: 'string', name: 'Title'},
    titleColor: {type: 'color', name: 'Title color'},
  },
  interactive: {
    rightButtons: [
      {
        title: {type: 'string', name: 'Title'},
        iconUrl: {type: 'string', name: 'Image'},
        tintColor: {type: 'color', name: 'Tint color'},
      },
    ],
  },
});

export default block;
