import passwordtextfield from '../../assets/passwordtextfield.svg';
import styled from 'styled-components';
import Wrapper from '../../utils/wrapper';

const Container = styled.div`
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
  & > input {
    pointer-events: none;
    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backgroundColor};
    box-sizing: border-box;
    text-align: ${(props) => props.textAlignment};
    font-size: ${(props) => props.fontSize}px;
    & ::placeholder {
      color: ${(props) => props.placeholderColor};
    }
  }
`;

const Component = (props) => {
  const {placeholder, text, alignment} = props.settingsUI;
  return (
    <Wrapper id={props.id} style={{alignItems: alignment}}>
      <Container className="draggable" {...props} {...props.settingsUI}>
        <input {...props} type="password" className="form-control" placeholder={placeholder} value={text} />
      </Container>
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'PASSWORDTEXTFIELD',
  title: 'PasswordField',
  description: 'A control into which the user securely enters private text.',
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
    textAlignment: 'LEFT',
    fontSize: 16,
    alignment: 'LEFT',
    size: {
      width: '',
      height: '',
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
    alignment: {type: 'string', name: 'Alignment'},
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
