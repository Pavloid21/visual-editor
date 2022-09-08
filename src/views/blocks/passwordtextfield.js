import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  backgroundColor,
  fontSize,
  getSizeConfig,
  placeholder,
  placeholderColor,
  text,
  textAlignment,
  textColor,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';

export const Container = styled.div`
  display: flex;
  align-self: center;
  width: ${(props) => getSizeStyle('width', props)};
  & > input {
    height: ${(props) => getSizeStyle('height', props)};
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
      <Container
        className="draggable"
        {...props}
        {...settingsUI}
      >
        <input {...props} type="password" className="form-control" placeholder={placeholder} value={text} />
      </Container>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
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
      {label: 'Calendar', value: 'CALENDAR_TEXT_FIELD'},
    ],
    defaultData: {
      placeholder: 'Password',
      placeholderColor: '#7F7F7F',
      text: 'neo12345',
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
      size: getSizeConfig(blockState.deviceInfo.device),
    },
    interactive: {
      field: {type: 'string', name: 'Field name'},
    },
  });
};

export default block;
