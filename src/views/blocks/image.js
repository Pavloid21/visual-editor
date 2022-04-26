import {hexToRgb} from 'constants/utils';
import React from 'react';
import styled from 'styled-components';
import image from '../../assets/image.svg';
import Wrapper from '../../utils/wrapper';

const Image = styled.img`
  display: flex;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor || '#FFFFFF'};
  border-width: ${(props) => props.borderWidth}px;
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  box-shadow: ${(props) => {
    const RGB = hexToRgb(props.shadow?.color);
    return `${props.shadow?.offsetSize?.width || props.shadow?.offsetSize?.widthInPercent}px ${
      props.shadow?.offsetSize?.height || props.shadow?.offsetSize?.heightInPercent
    }px 8px rgba(${RGB?.r}, ${RGB?.g}, ${RGB?.b}, ${props.shadow?.opacity})`;
  }};
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

const Component = ({settingsUI, sizeModifier, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Image {...settingsUI} {...props} className="draggable" src={settingsUI.imageUrl || image} />
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
    sizeModifier: 'FULLWIDTH',
    alignment: 'CENTER',
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#000000',
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
    shadow: {
      color: '#000000',
      opacity: 0.3,
      offsetSize: {
        width: 0,
        height: 0,
      },
      radius: 8,
    },
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
    imageUrl: {type: 'string', name: 'Image URL'},
    backgroundColor: {type: 'color', name: 'Background color'},
    borderWidth: {type: 'number', name: 'Border width'},
    borderColor: {type: 'color', name: 'Border color'},
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
    shadow: {
      color: {type: 'color', name: 'Shadow color'},
      opacity: {type: 'number', name: 'Opacity'},
      offsetSize: {
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
    },
  },
};

export default block;
