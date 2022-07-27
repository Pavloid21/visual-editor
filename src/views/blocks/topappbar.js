import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import invertColor from 'utils/invertColor';
import topappbar from 'assets/topappbar.svg';
import {
  action,
  backgroundColor,
  fontSize,
  padding,
  sizeModifier,
  textAlignment,
  textColor
} from 'views/configs';

const TopAppBar = styled.div`
  padding-top: ${(props) => props.padding?.top || 16}px;
  padding-bottom: ${(props) => props.padding?.bottom || 16}px;
  padding-left: ${(props) => props.padding?.left || 16}px;
  padding-right: ${(props) => props.padding?.right || 16}px;
  color: ${(props) => props.textColor || invertColor(props.backgroundColor, true)};
  background-color: ${(props) => props.backgroundColor};
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: ${(props) => props.fontSize}px;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px dashed blue;
  & label {
    text-align: ${(props) => props.textAlignment};
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

const block = () => ({
  Component,
  name: 'TOPAPPBAR',
  title: 'App bars: top',
  description: 'The top app bar displays information and actions relating to the current screen.',
  previewImageUrl: topappbar,
  category: 'Container',
  defaultInteractiveOptions: {
    action: {url: 'nextScreenName', fields: ['field1', 'field2'], target: ''},
    appBarItems: {
      title: 'Title',
    },
  },
  defaultData: {
    fontSize: 16,
    textColor: '#E9E8EA',
    sizeModifier: 'FULLSIZE',
    backgroundColor: '#423649',
    padding: {
      top: 8,
      bottom: 8,
      left: 16,
      right: 16,
    },
    action: {
      url: 'backScreen',
    },
  },
  config: {
    fontSize,
    sizeModifier,
    textColor,
    textAlignment,
    backgroundColor,
    padding,
    action,
  },
  interactive: {
    appBarItems: {
      title: {type: 'string', name: 'Title'},
      iconUrl: {type: 'string', name: 'Icon URL'},
    },
    action: {
      url: {
        type: 'string',
        name: 'Action URL',
      },
      target: {type: 'string', name: 'Target'},
      fields: {type: 'array', name: 'Fields set'},
    },
  },
});

export default block;
