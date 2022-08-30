import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import button from 'assets/button.svg';
import {
  alignmentConfig, AlignmentValues, textAlignment,
  backgroundColor,
  borderColor, borderWidth,
  buttonImagePadding, buttonTextPadding,
  fontSize, fontWeight,
  imageUrl,
  padding,
  shadowConfigBuilder,
  shapeConfigBuilder,
  sizeModifier,
  text, textColor, getSizeConfig
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';

const Button = styled.div`
  position: relative;
  align-self: ${(props) => {
    switch (props.alignment) {
      case AlignmentValues.Left:
        return 'start';
      case AlignmentValues.Right:
        return 'end';
      case AlignmentValues.Center:
        return 'center';
      default:
        return 'auto';
    }
  }};
  margin: ${(props) => {
    switch (props.alignment) {
      case AlignmentValues.Center:
        return 'auto';
      case AlignmentValues.Left:
        return 'auto auto auto 0';
      case AlignmentValues.Right:
        return 'auto 0 auto auto';
      default:
        return '0 0';
    }
  }};
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
    if (!props.alignment) {
      return '100%';
    }
    return getSizeStyle('width', props);
  }};
  height: ${(props) => getSizeStyle('height', props)};
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
  const {text, imageUrl, sizeModifier, size} = props.settingsUI;
  return (
    <Wrapper id={props.id} sizeModifier={sizeModifier} size={size}>
      <Button className="draggable" {...props.settingsUI} {...props}>
        <span>{text}</span>
        {imageUrl && <img src={imageUrl} />}
      </Button>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
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
      sizeModifier: 'FULLWIDTH',
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
      sizeModifier,
      alignment: alignmentConfig.horizontally,
      textAlignment,
      buttonTextPadding,
      buttonImagePadding,
      imageUrl,
      shape: shapeConfigBuilder()
        .withAllCornersRound
        .withRadius
        .done(),
      size: getSizeConfig(blockState.deviceInfo.device),
      padding,
      shadow: shadowConfigBuilder()
        .withRadius
        .done(),
    },
  });
};

export default block;
