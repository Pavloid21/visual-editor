import React from 'react';
import styledComponents from 'styled-components';
import label from 'assets/label.svg';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import {
  backgroundColor,
  fontSize,
  fontWeight,
  getSizeConfig,
  padding,
  shadowConfigBuilder,
  shapeConfigBuilder,
  text,
  textAlignment, textColor,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';

const Label = styledComponents.div`
  box-sizing: border-box;
  display: flex;
  width: fit-content;
  align-self: center;
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
    text-align: ${(props) => props.textAlignment || 'left'};
    color: ${(props) => props.textColor || 'transparent'};
    font-size: ${(props) => props.fontSize || 12}px;
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
    padding-top: ${(props) => props.padding?.top || 0}px;
    padding-bottom: ${(props) => props.padding?.bottom || 0}px;
    padding-left: ${(props) => props.padding?.left || 0}px;
    padding-right: ${(props) => props.padding?.right || 0}px;
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
      text: 'Label',
      textColor: '#000000',
      fontSize: 14,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    config: {
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
