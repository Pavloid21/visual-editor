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
  text, textColor, clearAppSettings, getSizeConfig, interactive
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store, {useAppSelector} from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';
import {setCorrectImageUrl, getFieldValue} from 'utils';
import {CustomSvg} from 'components/CustomSvg';

const Button = styled.div`
  position: relative;
  box-sizing: border-box;
  color: ${(props) => props.textColor || 'transparent'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-width: ${(props) => props.borderWidth  || 0}px;
  border-style: solid;
  border-color: ${(props) => props.borderColor || 'transparent'};
  ${(props) => getDimensionStyles(props)
    .width()
    .height()
    .padding()
    .fontSize()
    .apply()
  }
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
    ${(props) => getDimensionStyles(props)
      .padding('buttonTextPadding')
      .apply()
    }
  }
  & > img {
    ${(props) => getDimensionStyles(props)
      .padding('buttonImagePadding')
      .apply()
    }
  }
`;

const Component = ({settingsUI, ...props}) => {
  const {text} = settingsUI;
  const {id} = useAppSelector(state => state.project);
  const getCorrectImageUrl = setCorrectImageUrl(settingsUI.imageUrl, id);
  const getExtension = getFieldValue(settingsUI.imageUrl);

  return (
    <Wrapper id={props.id} {...settingsUI}>
      <Button className="draggable" {...settingsUI} {...props}>
        <span>{text}</span>
        {getExtension.length ? (
          <>
            {getExtension === 'icons' ? (
              <CustomSvg
                fill={settingsUI.iconTintColor}
                src={getCorrectImageUrl}
                sizeSvg={`${20 * 1.25}px`}
              />
            ) : (
              <img src={getCorrectImageUrl} width="100%" height="100%" />
            )}
          </>
        ) : null}
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
      action: {url: '', fields: {}},
    },
    defaultData: {
      text: 'Button',
      fontSize: 14,
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
    interactive: {
      action: {
        url: {
          type: 'select',
          name: 'Action URL',
          action_types: 'actions,screens,other',
        },
        method: {
          type: 'select',
          name: 'Method',
          options: [
            {label: 'Get', value: 'get'},
            {label: 'Post', value: 'post'},
          ],
        },
        fields: {
          type: 'object',
          properties: {
            key: {type: 'string', name: 'Key'},
            value: {type: 'string', name: 'Value'},
          }

        },
        clearAppSettings,
        triggresBottomSheet: {
          type: 'select',
          name: 'Open bottom sheet',
          options: [
            {label: 'True', value: true},
            {label: 'False', value: false},
          ],
        },
        closeBottomSheet: {
          type: 'select',
          name: 'Close bottom sheet',
          options: [
            {label: 'True', value: true},
            {label: 'False', value: false},
          ],
        },
        confirmationDialog: {
          title: {
            type: 'string',
            name: 'Title',
          },
          message: {
            type: 'string',
            name: 'Message',
          },
          confirmText: {
            type: 'string',
            name: 'Confirm text',
          },
          cancelledText: {
            type: 'string',
            name: 'Cancelled text',
          },
        },
        callEmailMessengersHolder: {
          phoneNumber: {
            type: 'string',
            name: 'Phone number',
          },
          emailAddress: {
            type: 'string',
            name: 'Email address',
          },
          packageName: {
            type: 'string',
            name: 'Package name',
          },
          urlApiMessenger: {
            type: 'string',
            name: 'Api messenger',
          },
        },
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
      size: getSizeConfig(blockState.deviceInfo.device),
      padding,
      shadow: shadowConfigBuilder()
        .withRadius
        .done(),
    },
  });
};

export default block;
