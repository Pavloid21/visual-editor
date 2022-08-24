import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import invertColor from 'utils/invertColor';
import topappbar from 'assets/topappbar.svg';
import {backgroundColor} from 'views/configs';

const TopAppBar = styled.div`
  padding: 16px;
  color: ${(props) => invertColor(props.backgroundColor, true)};
  background-color: ${(props) => props.backgroundColor};
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px dashed blue;
  & label {
    margin: 0;
    width: 100%;
    font-size: ${(props) => props.fontSize}px;
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

const Component = ({settingsUI, ...props}) => {
  const {appBarItems} = props.interactive;
  return (
    <Wrapper id={props.id} style={{padding: 0}} sizeModifier='FULLWIDTH'>
      <TopAppBar {...settingsUI} {...props}>
        <label>{appBarItems?.title}</label>
      </TopAppBar>
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'TOPAPPBAR',
  title: 'App bars: top',
  description: 'The top app bar displays information and actions relating to the current screen.',
  previewImageUrl: topappbar,
  category: 'Container',
  defaultInteractiveOptions: {
    action: {url: 'nextScreenName', target: ''},
    appBarItems: {
      title: 'Title',
    },
  },
  defaultData: {
    backgroundColor: '#423649',
    padding: {
      top: 8,
      bottom: 8,
      left: 16,
      right: 16,
    },
  },
  config: {
    backgroundColor,
  },
  interactive: {
    appBarItems: {
      title: {type: 'string', name: 'Title'},
    },
  },
};

export default block;
