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
  text, textColor, getSizeConfig, interactive
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';
import {useSelector} from 'react-redux';
import {setCorrectImageUrl} from 'utils';


const Button = styled.div`
  position: relative;
  padding-top: ${(props) => props.padding?.top || 0}px;
  padding-bottom: ${(props) => props.padding?.bottom || 0}px;
  padding-left: ${(props) => props.padding?.left || 0}px;
  padding-right: ${(props) => props.padding?.right || 0}px;
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize || 12}px;
  color: ${(props) => props.textColor || 'transparent'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-width: ${(props) => props.borderWidth  || 0}px;
  border-style: solid;
  border-color: ${(props) => props.borderColor || 'transparent'};
  width: ${(props) => getSizeStyle('width', props)};
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
    text-align: ${(props) => props.textAlignment || 'left'};
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

const Component = ({settingsUI, ...props}) => {
  const {text} = settingsUI;
  const {id} = useSelector(state => state.project);
  const getCorrectImageUrl = setCorrectImageUrl(settingsUI.imageUrl, id);

  return (
    <Wrapper id={props.id} {...settingsUI}>
      <Button className="draggable" {...settingsUI} {...props}>
        <span>{text}</span>
        {getCorrectImageUrl && <img src={getCorrectImageUrl} />}
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
      action: {url: '', target: '', fields: {}},
    },
    defaultData: {
      text: 'Button',
      fontSize: '14',
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      imageUrl: '',
      borderColor: '#EFEFEF',
      borderWidth: 1,
      buttonTextPadding: {
        top: 0,
        right: 16,
        bottom: 0,
        left: 16,
      },
      buttonImagePadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      shape: {
        type: 'ALLCORNERSROUND',
        radius: '4',
      },
      size: {
        height: 36,
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
    interactive,
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
      size: getSizeConfig(blockState.deviceInfo.device),
      padding,
      shadow: shadowConfigBuilder()
        .withRadius
        .done(),
    },
  });
};

export default block;
