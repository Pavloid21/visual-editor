import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  alignmentConfig,
  backgroundColor,
  fontSize,
  getSizeConfig,
  placeholder,
  placeholderColor,
  sizeModifier,
  text,
  textAlignment,
  textColor,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';

const Container = styled.div`
  display: flex;
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
    ],
    defaultData: {
      placeholder: 'Логин',
      placeholderColor: '#7F7F7F',
      text: 'neo',
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      fontSize: 16,
      alignment: 'LEFT',
      size: {
        width: '',
        height: '',
      },
    },
    config: {
      sizeModifier,
      alignment: alignmentConfig.both,
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
