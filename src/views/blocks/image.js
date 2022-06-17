import React from 'react';
import styled from 'styled-components';
import {hexToRgb} from 'constants/utils';
import Wrapper from 'utils/wrapper';
import image from 'assets/image.svg';
import {
  alignmentConfig, backgroundColor,
  borderColor, borderWidth,
  imageUrl, shadowConfigBuilder,
  shapeConfigBuilder,
  size, sizeModifier,
} from 'views/configs';

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
    sizeModifier,
    alignment: alignmentConfig.both,
    imageUrl,
    backgroundColor,
    borderWidth,
    borderColor,
    size,
    shape: shapeConfigBuilder()
      .withRadius
      .withAllCornersRound
      .done(),
    shadow: shadowConfigBuilder().done()
  },
};

export default block;
