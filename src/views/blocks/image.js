import React from 'react';
import styled from 'styled-components';
import {hexToRgb} from 'constants/utils';
import Wrapper from 'utils/wrapper';
import image from 'assets/image.svg';
import {
  backgroundColor,
  borderColor, borderWidth, getSizeConfig,
  imageUrl, interactive, shadowConfigBuilder,
  shapeConfigBuilder, padding,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';
import {useSelector} from 'react-redux';
import {setCorrectImageUrl, getFieldValue, checkExtension} from 'utils';
import {CustomSvg} from 'components/CustomSvg';

const Image = styled.img`
  display: flex;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  border-width: ${(props) => props.borderWidth  || 0}px;
  border-color: ${(props) => props.borderColor || 'transparent'};
  border-style: solid;
  box-shadow: ${(props) => {
    const RGB = hexToRgb(props.shadow?.color);
    return `${props.shadow?.offsetSize?.width || props.shadow?.offsetSize?.widthInPercent}px ${props.shadow?.offsetSize?.height || props.shadow?.offsetSize?.heightInPercent
      }px 8px rgba(${RGB?.r}, ${RGB?.g}, ${RGB?.b}, ${props.shadow?.opacity})`;
  }};
  object-fit: ${(props) => {
    switch (props.imageAlignment) {
      case 'ASPECT_FIT':
        return 'contain';
      case 'ASPECT_FILL':
        return 'cover';
      case 'SCALE_TO_FILL':
        return 'fill';
      default:
        return 'contain';
    }
  }};
  align-self: center;
  z-index: 90;
  ${(props) => getDimensionStyles(props)
    .width()
    .height()
    .padding()
    .apply()
  }
  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape?.radius || 0}px;`;
    }
  }}
`;

const Component = ({settingsUI, ...props}) => {
  const {id} = useSelector(state => state.project);
  const getCorrectImageUrl = setCorrectImageUrl(settingsUI.imageUrl, id);
  const getExtension = getFieldValue(settingsUI.imageUrl);

  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      {getExtension === 'icons' || checkExtension(getCorrectImageUrl) === 'svg' ? (
        <CustomSvg fill={settingsUI.iconTintColor} src={getCorrectImageUrl} />
      ) : (
        <Image
          {...settingsUI}
          {...props}
          className="draggable"
          src={getCorrectImageUrl}
        />
      )}
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'IMAGE',
    title: 'Image',
    description: 'A view that displays an image.',
    previewImageUrl: image,
    category: 'Controls',
    defaultData: {
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
    defaultInteractiveOptions: {
      action: {url: '', target: '', fields: {}},
    },
    interactive,
    config: {
      iconTintColor: {type: 'color', name: 'Icon color'},
      imageAlignment: {
        type: 'select',
        name: 'Image alignment',
        options: [
          {label: 'Aspect fit', value: 'ASPECT_FIT'},
          {label: 'Aspect fill', value: 'ASPECT_FILL'},
          {label: 'Scale to fill', value: 'SCALE_TO_FILL'},
        ],
      },
      imageUrl,
      backgroundColor,
      padding,
      borderWidth,
      borderColor,
      size: getSizeConfig(blockState.deviceInfo.device),
      shape: shapeConfigBuilder()
        .withRadius
        .withAllCornersRound
        .done(),
      shadow: shadowConfigBuilder().done(),
    },
  });
};

export default block;
