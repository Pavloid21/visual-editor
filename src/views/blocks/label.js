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
import {getDimensionStyles} from 'views/utils/styles/size';
import {transformHexWeb} from '../../utils/color';

const Label = styledComponents.div`
  box-sizing: border-box;
  display: flex;
  width: fit-content;0
  align-self: center;
  ${({shape}) => {
    if (shape?.type === 'ALLCORNERSROUND' || !shape?.type) {
      return `border-radius: ${shape?.radius || 0}px;`;
    }
  }}
  overflow: hidden;
  ${({shadow}) => {
    if (shadow) {
      const webColor = transformHexWeb(shadow?.color);
      const RGB = hexToRgb(webColor) || {r: 0, g: 0, b: 0};
      return `box-shadow: ${shadow?.offsetSize?.width || 0}px ${shadow?.offsetSize?.height|| 0}px ${
        shadow?.radius || 0
      }px rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, ${shadow?.opacity|| 0});`;
    }
  }}
  & > span {
    display: block;
    text-align: ${(props) => props.textAlignment || 'left'};
    color: ${(props) => transformHexWeb(props.textColor || 'transparent')};
    background-color: ${(props) => transformHexWeb(props.backgroundColor || 'transparent')};
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
    ${(props) => getDimensionStyles(props)
      .width()
      .height()
      .padding()
      .fontSize()
      .apply()
    }
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
