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
    color: ${(props) => props.textColor || '#FFFFFF00'};
    background-color: ${(props) => props.backgroundColor || '#FFFFFF00'};
    box-sizing: border-box;
    text-align: ${(props) => props.textAlignment};
    font-size: ${(props) => props.fontSize}px;
    & ::placeholder {
      color: ${(props) => props.placeholderColor || '#FFFFFF00'};
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
      field: '',
    },
    complex: [
      {label: 'Text', value: 'BASICTEXTFIELD'},
      {label: 'Password', value: 'PASSWORDTEXTFIELD'},
      {label: 'Calendar', value: 'CALENDAR_TEXT_FIELD'},
    ],
    defaultData: {
      placeholder: 'Password',
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
      shape: {
        type: 'ALLCORNERSROUND',
        radius: '4',
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
