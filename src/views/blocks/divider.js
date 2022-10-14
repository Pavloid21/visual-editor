import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import divider from 'assets/divider.svg';
import {getSizeStyle} from '../utils/styles/size';
import store from 'store';
import {backgroundColor, padding, getSizeConfig} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';

const HR = styled.hr`
  align-self: center;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  height: ${(props) => getSizeStyle('height', props)};
  width: ${(props) => getSizeStyle('width', props)};
  padding-top: ${(props) => props.padding?.top || 0}px;
  padding-bottom: ${(props) => props.padding?.bottom || 0}px;
  padding-left: ${(props) => props.padding?.left || 0}px;
  padding-right: ${(props) => props.padding?.right || 0}px;
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <HR {...settingsUI} {...props} className="draggable" />
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'DIVIDER',
    title: 'Divider',
    description: 'A visual element that can be used to separate other content.',
    previewImageUrl: divider,
    category: 'Element',
    defaultData: {
      size: {
        height: 3,
        widthInPercent: 100,
      },
      backgroundColor: '#000000',
    },
    config: {
      size: getSizeConfig(blockState.deviceInfo.device),
      backgroundColor,
      padding,
    },
  });
};

export default block;
