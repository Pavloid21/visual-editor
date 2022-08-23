import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  backgroundColor, fontSize,
  placeholder,
  placeholderColor, size,
  text,
  textAlignment, textColor,
} from 'views/configs';

const Container = styled.div`
  display: flex;
  align-self: center;
  width: ${(props) => {
    if (props.size?.width !== undefined) {
      return props.size.width + 'px';
    } else if (props.size?.widthInPercent !== undefined) {
      return props.size.widthInPercent + '%';
    }
    return '100%';
  }};
  & > input {
    height: ${(props) => {
      if (props.size?.height !== undefined) {
        return props.size.height + 'px';
      } else if (props.size?.heightInPercent !== undefined) {
        return props.size.heightInPercent + '%';
      }
      return 'auto';
    }};
    display: block;
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

const Component = ({settingsUI, ...props}) => {
  const {placeholder, text} = settingsUI;
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Container className="draggable" {...props} {...settingsUI}>
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
    fontSize: 16,
    size: {
      width: '',
      height: '',
    },
  },
  config: {
    placeholder,
    placeholderColor,
    text,
    textAlignment,
    textColor,
    backgroundColor,
    fontSize,
    size,
  },
  interactive: {
    field: {type: 'string', name: 'Field name'},
  },
};

export default block;
