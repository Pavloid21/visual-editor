import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  backgroundColor,
  borderColor,
  borderWidth,
  text, textColor, fontWeight, fontSize,
  padding, placeholder, placeholderColor,
  shadowConfigBuilder,
  shapeConfigBuilder,
  textAlignment,
  getSizeConfig,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';

const Input = styled.div`
  align-self: center;
  color: ${(props) => props.textColor || 'transparent'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  display: flex;
  align-items: center;
  border: 1px solid var(--neo-gray);
  text-align: ${(props) => props.textAlignment || 'left'};
  ${(props) => getDimensionStyles(props)
    .width()
    .height()
    .padding()
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
  border-width: ${(props) => props.borderWidth || 0}px;
  border-color: ${(props) => props.borderColor || 'transparent'};
  & > span {
    font-size: ${(props) => props.fontSize || 12}px;
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
  }
  & > .placeholder {
    color: ${(props) => props.placeholderColor || 'transparent'};
    font-size: 12px;
    font-weight: 400;
  }
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Input
        {...props}
        {...settingsUI}
        className="draggable"
      >
        {!settingsUI.text && settingsUI.placeholder && <span className="placeholder">{settingsUI.placeholder}</span>}
        {settingsUI.text && <span>{settingsUI.text}</span>}
      </Input>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'BASICTEXTFIELD',
    title: 'Input',
    description: 'A control into which the user enters necessary value.',
    previewImageUrl: passwordtextfield,
    category: 'Controls',
    defaultInteractiveOptions: {
      field: '',
    },
    complex: [
      {label: 'Text', value: 'BASICTEXTFIELD'},
      {label: 'Password', value: 'PASSWORDTEXTFIELD'},
      {label: 'Calendar', value: 'CALENDAR_TEXT_FIELD'}
    ],
    defaultData: {
      placeholder: 'Placeholder',
      placeholderColor: '#7F7F7F',
      text: '',
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      borderColor: '#EFEFEF',
      borderWidth: 1,
      fontSize: 16,
      size: {
        width: 280,
        height: 48,
      },
      shadow: {
        color: '#000000',
        opacity: 0,
        offsetSize: {
          width: 0,
          height: 0,
        },
        radius: 0,
      },
      padding: {
        left: 12,
        right: 16,
        top: 4,
        bottom: 4,
      },
    },
    config: {
      padding,
      placeholder,
      placeholderColor,
      text,
      textAlignment,
      textColor,
      backgroundColor,
      borderColor,
      borderWidth,
      fontSize,
      size: getSizeConfig(blockState.deviceInfo.device),
      fontWeight,
      shadow: shadowConfigBuilder()
        .withRadius
        .done(),
      shape: shapeConfigBuilder().withAllCornersRound.withRadius.done(),
    },
    interactive: {
      field: {type: 'string', name: 'Field name'},
    },
  });
};

export default block;
