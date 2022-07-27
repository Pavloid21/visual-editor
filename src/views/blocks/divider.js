import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import divider from 'assets/divider.svg';
import {
  alignmentConfig,
  backgroundColor,
  sizeModifier,
} from 'views/configs';

const HR = styled.hr`
  align-self: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
      default:
        return 'center';
    }
  }};
  margin: ${(props) => {
    switch (props.alignment) {
      case 'CENTER':
        return 'auto';
      case 'TOP':
        return '0 auto auto auto';
      case 'BOTTOM':
        return 'auto auto 0 auto';
      case 'LEFT':
        return 'auto auto auto 0';
      case 'RIGHT':
        return 'auto 0 auto auto';
      default:
        return '0 0';
    }
  }};
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <HR {...settingsUI} {...props} className="draggable" />
    </Wrapper>
  );
};

const block = () => ({
  Component,
  name: 'DIVIDER',
  title: 'Divider',
  description: 'A visual element that can be used to separate other content.',
  previewImageUrl: divider,
  category: 'Element',
  defaultData: {
    sizeModifier: 'FULLWIDTH',
    backgroundColor: '#000000',
  },
  config: {
    sizeModifier,
    alignment: alignmentConfig.both,
    backgroundColor,
  },
});

export default block;
