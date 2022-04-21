import passwordtextfield from '../../assets/passwordtextfield.svg';
import styled from 'styled-components';
import Wrapper from '../../utils/wrapper';

const Input = styled.div`
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  border: 1px solid var(--neo-gray);
  padding: 4px 12px;
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
  & > span {
    font-size: ${(props) => props.fontSize}px;
  }
  & > .placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id}>
      <Input {...props} {...settingsUI}>
        {!settingsUI.text && settingsUI.placeholder && <span className="placeholder">{settingsUI.placeholder}</span>}
        {settingsUI.text && <span>{settingsUI.text}</span>}
      </Input>
    </Wrapper>
  );
};

const block = {
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
    textAlignment: 'LEFT',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    size: {
      width: '',
      height: 48,
    },
  },
  config: {
    placeholder: {type: 'string', name: 'Placeholder'},
    placeholderColor: {type: 'color', name: 'Placeholder color'},
    text: {type: 'string', name: 'Text'},
    textAlignment: {
      type: 'select',
      name: 'Text alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
      ],
    },
    textColor: {type: 'color', name: 'Text color'},
    backgroundColor: {type: 'color', name: 'Background color'},
    fontSize: {type: 'number', name: 'Font size'},
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
  },
  interactive: {
    field: {type: 'string', name: 'Field name'},
  },
};

export default block;
