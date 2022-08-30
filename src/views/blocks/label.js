import React from 'react';
import styledComponents from 'styled-components';
import label from 'assets/label.svg';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import {
  alignmentConfig,
  backgroundColor,
  fontSize,
  fontWeight,
  getSizeConfig,
  padding,
  shadowConfigBuilder,
  shapeConfigBuilder,
  sizeModifier,
  text,
  textAlignment,
  textColor,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';

const Label = styledComponents.div`
  box-sizing: border-box;
  display: flex;
  width: fit-content;
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
  ${({shape}) => {
    if (shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${shape.radius}px;`;
    }
  }}
  overflow: hidden;
  ${({shadow}) => {
    if (shadow) {
      return `box-shadow: ${shadow?.offsetSize?.width}px ${shadow?.offsetSize?.height}px ${
        shadow?.radius || 0
      }px rgba(${hexToRgb(shadow?.color).r}, ${hexToRgb(shadow?.color).g}, ${
        hexToRgb(shadow?.color).b
      }, ${shadow?.opacity});`;
    }
  }}
  & > span {
    display: block;
    width: ${(props) => getSizeStyle('width', props)};
    height: ${(props) => getSizeStyle('height', props)};
    text-align: ${(props) => props.textAlignment};
    color: ${(props) => props.textColor};
    font-size: ${(props) => props.fontSize}px;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
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
    padding-top: ${(props) => props.padding?.top}px;
    padding-bottom: ${(props) => props.padding?.bottom}px;
    padding-left: ${(props) => props.padding?.left}px;
    padding-right: ${(props) => props.padding?.right}px;
  }
`;

const Component = ({settingsUI, ...props}) => {
  const {text} = settingsUI;

  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Label
        {...props}
        {...settingsUI}
        className="draggable"
      >
        <span>{text}</span>
      </Label>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'LABEL',
    title: 'Label',
    description: 'A standard label for user interface items, consisting of an icon with a title.',
    previewImageUrl: label,
    category: 'Element',
    defaultData: {
      sizeModifier: 'FULLWIDTH',
      text: 'Вход',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      fontSize: 24,
      shape: {
        type: 'ALLCORNERSROUND',
        radius: '0',
      },
      size: {
        width: 100,
        height: 48,
      },
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      fontWeight: 'REGULAR',
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
      text,
      textAlignment,
      backgroundColor,
      textColor,
      fontSize,
      fontWeight,
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
