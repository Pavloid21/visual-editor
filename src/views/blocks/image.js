import React from 'react';
import styled from 'styled-components';
import image from '../../assets/image.svg';
import Wrapper from '../../utils/wrapper';

const Image = styled.img`
  display: flex;
  box-sizing: border-box;
  align-self: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'start';
      case 'RIGHT':
        return 'end';
      case 'FILL':
        return 'stretch';
      default:
        return 'center';
    }
  }};
  z-index: 90;
  width: ${(props) => {
    if (props.size?.width !== undefined) {
      return props.size.width + 'px';
    } else if (props.size?.widthInPercent !== undefined) {
      return props.size.widthInPercent + '%';
    }
    return '100%';
  }};
  height: ${(props) => {
    if (props.size?.height !== undefined) {
      return props.size.height + 'px';
    } else if (props.size?.heightInPercent !== undefined) {
      return props.size.heightInPercent + '%';
    }
    return 'auto';
  }};
  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape?.radius || 0}px;`;
    }
  }}
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} style={{alignItems: 'center'}}>
      <Image {...settingsUI} {...props} className="draggable" src={settingsUI.imageUrl} />
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'IMAGE',
  title: 'Image',
  description: 'A view that displays an image.',
  previewImageUrl: image,
  category: 'Controls',
  defaultData: {
    imageUrl:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    size: {
      height: 200,
      width: 400,
    },
    shape: {
      type: 'ALLCORNERSROUND',
      radius: 4,
    },
  },
  config: {
    alignment: {
      type: 'select',
      name: 'Alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
        {label: 'Justify', value: 'JUSTIFY'},
        {label: 'Fill', value: 'FILL'},
      ],
    },
    imageUrl: {type: 'string', name: 'Image URL'},
    size: {
      height: {
        type: 'units',
        name: 'Height',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
      width: {
        type: 'units',
        name: 'Width',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
    },
    shape: {
      type: {
        type: 'select',
        name: 'Shape type',
        options: [{label: 'All corners round', value: 'ALLCORNERSROUND'}],
      },
      radius: {type: 'number', name: 'Shape radius'},
    },
  },
};

export default block;
