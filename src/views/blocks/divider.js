import React from 'react';
import styled from 'styled-components';
import divider from '../../assets/divider.svg';
import Wrapper from '../../utils/wrapper';

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

const block = {
  Component,
  name: 'DIVIDER',
  title: 'Divider',
  description: 'A visual element that can be used to separate other content.',
  previewImageUrl: divider,
  category: 'Element',
  defaultData: {
    alignment: 'CENTER',
    sizeModifier: 'FULLWIDTH',
    backgroundColor: '#000000',
  },
  config: {
    sizeModifier: {
      type: 'select',
      name: 'Size modifier',
      options: [
        {label: 'Full width', value: 'FULLWIDTH'},
        {label: 'Full height', value: 'FULLHEIGHT'},
        {label: 'Full size', value: 'FULLSIZE'},
      ],
    },
    alignment: {
      type: 'select',
      name: 'Alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
        {label: 'Top', value: 'TOP'},
        {label: 'Bottom', value: 'BOTTOM'},
      ],
    },
    backgroundColor: {type: 'color', name: 'Color'},
  },
};

export default block;
