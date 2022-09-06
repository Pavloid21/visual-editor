import React from 'react';
import styledComponents from 'styled-components';
import label from 'assets/label.svg';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import {
  backgroundColor, fontSize,
  fontWeight,
  padding,
  shadowConfigBuilder,
  shapeConfigBuilder, size, text,
  textAlignment, textColor,
} from 'views/configs';

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
      <Label {...props} {...settingsUI} className="draggable">
        <span>{text}</span>
      </Label>
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'LABEL',
  title: 'Label',
  description: 'A standard label for user interface items, consisting of an icon with a title.',
  previewImageUrl: label,
  category: 'Element',
  defaultData: {
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
    size,
    padding,
    shadow: shadowConfigBuilder()
      .withRadius
      .done()
  },
};

export default block;
