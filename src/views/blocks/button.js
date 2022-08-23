import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import button from 'assets/button.svg';
import {
  textAlignment,
  backgroundColor,
  borderColor, borderWidth,
  buttonImagePadding, buttonTextPadding,
  fontSize, fontWeight,
  imageUrl,
  padding,
  shadowConfigBuilder,
  shapeConfigBuilder,
  size,
  text, textColor
} from 'views/configs';

const Button = styled.div`
  position: relative;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-width: ${(props) => props.borderWidth}px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  width: ${(props) => {
    if (props.size?.width) {
      return props.size.width + 'px';
    } else if (props.size?.widthInPercent !== undefined) {
      return props.size.widthInPercent + '%';
    }
    return 'fit-content';
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
    if (props.shadow) {
      return `box-shadow: ${props.shadow?.offsetSize?.width}px ${props.shadow?.offsetSize?.height}px ${
        props.shadow?.radius
      }px rgba(${hexToRgb(props.shadow?.color).r}, ${hexToRgb(props.shadow?.color).g}, ${
        hexToRgb(props.shadow?.color).b
      }, ${props.shadow?.opacity});`;
    }
  }}

  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape.radius}px;`;
    }
  }}
  & > span {
    width: 100%;
    font-size: inherit;
    font-weight: ${(props) => {
      switch (props.fontWeight) {
        case 'THIN':
          return 100;
        case 'ULTALIGHT':
          return 200;
        case 'LIGHT':
          return 300;
        case 'REGULAR':
          return 400;
        case 'MEDIUM':
          return 500;
        case 'SEMIBOLD':
          return 600;
        case 'BOLD':
          return 700;
        case 'BLACK':
          return 800;
        case 'HEAVY':
          return 900;
        default:
          return 400;
      }
    }};
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${(props) => props.textAlignment};
    padding-top: ${(props) => props.buttonTextPadding?.top || 0}px;
    padding-left: ${(props) => props.buttonTextPadding?.left || 0}px;
    padding-right: ${(props) => props.buttonTextPadding?.right || 0}px;
    padding-bottom: ${(props) => props.buttonTextPadding?.bottom || 0}px;
  }
  & > img {
    padding-top: ${(props) => props.buttonImagePadding?.top || 0}px;
    padding-left: ${(props) => props.buttonImagePadding?.left || 0}px;
    padding-right: ${(props) => props.buttonImagePadding?.right || 0}px;
    padding-bottom: ${(props) => props.buttonImagePadding?.bottom || 0}px;
  }
`;

const Component = (props) => {
  const {text, imageUrl, sizeModifier} = props.settingsUI;
  return (
    <Wrapper id={props.id} sizeModifier={sizeModifier}>
      <Button className="draggable" {...props.settingsUI} {...props}>
        <span>{text}</span>
        {imageUrl && <img src={imageUrl} />}
      </Button>
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'BUTTON',
  title: 'Button',
  description: 'Displays a button icon the user can click to initiate an action.',
  previewImageUrl: button,
  category: 'Controls',
  defaultInteractiveOptions: {
    action: {url: 'nextScreenName', fields: ['field1', 'field2'], target: ''},
  },
  defaultData: {
    text: 'Войти',
    fontSize: '24',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    imageUrl: '',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    buttonTextPadding: {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    },
    buttonImagePadding: {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    },
    shape: {
      type: 'ALLCORNERSROUND',
      radius: '4',
    },
    size: {
      height: 48,
      width: 230,
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
  interactive: {
    action: {
      url: {
        type: 'string',
        name: 'Action URL',
      },
      target: {type: 'string', name: 'Target'},
      fields: {type: 'array', name: 'Fields set'},
    },
  },
  config: {
    text,
    fontSize,
    fontWeight,
    textColor,
    backgroundColor,
    borderColor,
    borderWidth,
    textAlignment,
    buttonTextPadding,
    buttonImagePadding,
    imageUrl,
    shape: shapeConfigBuilder()
      .withAllCornersRound
      .withRadius
      .done(),
    size,
    padding,
    shadow: shadowConfigBuilder()
      .withRadius
      .done()
  },
};

export default block;
