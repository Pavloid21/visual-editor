import React from 'react';
import styled from 'styled-components';
import button from '../../assets/button.svg';
import {hexToRgb} from '../../constants/utils';
import Wrapper from '../../utils/wrapper';

const Button = styled.div`
  position: relative;
  align-self: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'start';
      case 'RIGHT':
        return 'end';
      case 'CENTER':
        return 'center';
      default:
        return 'auto';
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
    if (props.alignment === 'FILL') {
      return '100%';
    } else if (props.size?.width) {
      return props.size.width + 'px';
    } else if (props.size?.widthInPercent !== undefined) {
      return props.size.widthInPercent + '%';
    }
    return 'fit-content';
  }};
  height: ${(props) => {
    if (props.size?.height !== undefined) {
      return props.size.height + 'px';
    } else if (props.size?.heightInPercent !== undefined) {
      return props.size.heightInPercent + '%';
    }
    return 'auto';
  }};
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
  const {text, imageUrl, sizeModifier} = props.settingsUI;
  return (
    <Wrapper id={props.id} sizeModifier={sizeModifier}>
      <Button className="draggable" {...props.settingsUI} {...props}>
        <span>{text}</span>
        {imageUrl && <img src={imageUrl} />}
      </Button>
    </Wrapper>
  );
};

const block = {
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
    alignment: 'CENTER',
    textAlignment: 'center',
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
    text: {type: 'string', name: 'Text'},
    fontSize: {type: 'number', name: 'Font size'},
    fontWeight: {
      type: 'select',
      name: 'Font weight',
      options: [
        {label: 'Ultralight', value: 'ULTRALIGHT'},
        {label: 'Thin', value: 'THIN'},
        {label: 'Light', value: 'LIGHT'},
        {label: 'Regular', value: 'REGULAR'},
        {label: 'Medium', value: 'MEDIUM'},
        {label: 'Semibold', value: 'SEMIBOLD'},
        {label: 'Bold', value: 'BOLD'},
        {label: 'Heavy', value: 'HEAVY'},
        {label: 'Black', value: 'BLACK'},
      ],
    },
    textColor: {type: 'color', name: 'Text color'},
    backgroundColor: {type: 'color', name: 'Background color'},
    borderColor: {type: 'color', name: 'Border color'},
    borderWidth: {type: 'number', name: 'Border width'},
    sizeModifier: {
      type: 'select',
      name: 'Size modifier',
      options: [
        {label: 'Full width', value: 'FULLWIDTH'},
        {label: 'Full height', value: 'FULLHEIGHT'},
        {label: 'Full size', value: 'FULLSIZE'},
      ],
    },
    alignment: {
      type: 'select',
      name: 'Alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
        {label: 'Top', value: 'TOP'},
        {label: 'Bottom', value: 'BOTTOM'},
      ],
    },
    textAlignment: {
      type: 'select',
      name: 'Text alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
      ],
    },
    buttonTextPadding: {
      top: {type: 'number', name: 'Text padding top'},
      right: {type: 'number', name: 'Text padding right'},
      bottom: {type: 'number', name: 'Text padding bottom'},
      left: {type: 'number', name: 'Text padding left'},
    },
    buttonImagePadding: {
      top: {type: 'number', name: 'Image padding top'},
      right: {type: 'number', name: 'Image padding right'},
      bottom: {type: 'number', name: 'Image padding bottom'},
      left: {type: 'number', name: 'Image padding left'},
    },
    imageUrl: {type: 'string', name: 'imageUrl'},
    shape: {
      type: {
        type: 'select',
        name: 'Shape type',
        options: [{label: 'All corners round', value: 'ALLCORNERSROUND'}],
      },
      radius: {type: 'number', name: 'Shape radius'},
    },
    size: {
      height: {
        type: 'units',
        name: 'Height',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
      width: {
        type: 'units',
        name: 'Width',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
    },
    shadow: {
      color: {type: 'color', name: 'Color'},
      opacity: {type: 'number', name: 'Opacity'},
      offsetSize: {
        height: {
          type: 'units',
          name: 'Height',
          options: [
            {label: 'px', value: 'px'},
            {label: '%', value: '%'},
          ],
        },
        width: {
          type: 'units',
          name: 'Width',
          options: [
            {label: 'px', value: 'px'},
            {label: '%', value: '%'},
          ],
        },
      },
      radius: {type: 'number', name: 'Radius'},
    },
  },
};

export default block;
