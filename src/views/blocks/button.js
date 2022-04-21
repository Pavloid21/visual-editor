import React from 'react';
import styled from 'styled-components';
import button from '../../assets/button.svg';
import {hexToRgb} from '../../constants/utils';
import Wrapper from '../../utils/wrapper';

const Button = styled.div`
  position: relative;
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
  const {text, imageUrl, alignment} = props.settingsUI;
  const calculateAlignment = (alignment) => {
    console.log('alignmrnt', alignment);
    switch (alignment) {
      case 'LEFT':
        return 'start';
      case 'RIGHT':
        return 'end';
      case 'FILL':
        return 'stretch';
      default:
        return 'center';
    }
  };
  return (
    <Wrapper id={props.id} style={{alignItems: calculateAlignment(alignment)}}>
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
    textColor: {type: 'color', name: 'Text color'},
    backgroundColor: {type: 'color', name: 'Background color'},
    borderColor: {type: 'color', name: 'Border color'},
    borderWidth: {type: 'number', name: 'Border width'},
    alignment: {
      type: 'select',
      name: 'Alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
        {label: 'Justify', value: 'JUSTIFY'},
        {label: 'Fill', value: 'FILL'},
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
        width: {type: 'number', name: 'Width'},
        height: {type: 'number', name: 'Height'},
      },
      radius: {type: 'number', name: 'Radius'},
    },
  },
};

export default block;
