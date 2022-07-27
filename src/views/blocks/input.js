import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import {hexToRgb} from 'constants/utils';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  alignmentConfig, backgroundColor,
  borderColor,
  borderWidth,
  text, textColor, fontWeight, fontSize,
  padding, placeholder, placeholderColor,
  shadowConfigBuilder,
  shapeConfigBuilder,
  size, sizeModifier,
  textAlignment,
} from 'views/configs';

const Input = styled.div`
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
      case 'LEFT':
        return 'auto auto auto 0';
      case 'RIGHT':
        return 'auto 0 auto auto';
      default:
        return '0 0';
    }
  }};
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  border: 1px solid var(--neo-gray);
  text-align: ${(props) => props.textAlignment};
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
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
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
  border-width: ${(props) => props.borderWidth}px;
  border-color: ${(props) => props.borderColor};
  & > span {
    font-size: ${(props) => props.fontSize}px;
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
    color: ${(props) => props.placeholderColor};
  }
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Input {...props} {...settingsUI} className="draggable">
        {!settingsUI.text && settingsUI.placeholder && <span className="placeholder">{settingsUI.placeholder}</span>}
        {settingsUI.text && <span>{settingsUI.text}</span>}
      </Input>
    </Wrapper>
  );
};

const block = () => ({
  Component,
  name: 'BASICTEXTFIELD',
  title: 'Input',
  description: 'A control into which the user enters necessary value.',
  previewImageUrl: passwordtextfield,
  category: 'Controls',
  defaultInteractiveOptions: {
    field: 'field_name',
  },
  complex: [
    {label: 'Text', value: 'BASICTEXTFIELD'},
    {label: 'Password', value: 'PASSWORDTEXTFIELD'},
  ],
  defaultData: {
    placeholder: 'Логин',
    placeholderColor: '#7F7F7F',
    text: 'neo',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    fontSize: 16,
    size: {
      width: '',
      height: 48,
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
    padding: {
      left: 12,
      right: 12,
      top: 4,
      bottom: 4,
    },
    shape: {
      type: 'ALLCORNERSROUND',
      radius: '4',
    },
  },
  config: {
    sizeModifier,
    alignment: alignmentConfig.horizontally,
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
    size,
    fontWeight,
    shadow: shadowConfigBuilder()
      .withRadius
      .done(),
    shape: shapeConfigBuilder().withAllCornersRound.withRadius.done()
  },
  interactive: {
    field: {type: 'string', name: 'Field name'},
  },
});

export default block;
