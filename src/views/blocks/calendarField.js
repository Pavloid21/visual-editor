import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  backgroundColor, 
  fontSize,
  placeholder,
  placeholderColor, 
  getSizeConfig,
  text,
  textAlignment, 
  textColor, 
  systemCalendar
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';

export const Container = styled.div`
  display: flex;
  align-self: center;
  ${(props) => getDimensionStyles(props)
    .width()
    .apply()
  }
  & > input {
    display: block;
    pointer-events: none;
    color: ${(props) => props.textColor || 'transparent'};
    background-color: ${(props) => props.backgroundColor || 'transparent'};
    box-sizing: border-box;
    text-align: ${(props) => props.textAlignment || 'left'};
    ${(props) => getDimensionStyles(props)
      .height()
      .fontSize()
      .apply()
    }
    & ::placeholder {
      color: ${(props) => props.placeholderColor || 'transparent'};
      font-size: 12px;
      font-weight: 400;
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
        <input {...props} type="text" className="form-control" placeholder={placeholder} value={text} />
      </Container>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
  Component,
  name: 'CALENDAR_TEXT_FIELD',
  title: 'CALENDAR_TEXT_FIELD',
  description: 'A control into which the user securely enters private text.',
  previewImageUrl: passwordtextfield,
  category: 'Controls',
  defaultInteractiveOptions: {
    field: '',
    systemCalendar: {
      systemDialog: 'CALENDAR',
      timeFormat: 'DD.MM.YYYY',
      editFieldEnabled: false
    }
  },
  complex: [
    {label: 'Text', value: 'BASICTEXTFIELD'},
    {label: 'Password', value: 'PASSWORDTEXTFIELD'},
    {label: 'Calendar', value: 'CALENDAR_TEXT_FIELD'},
  ],
  defaultData: {
    placeholder: 'Select date',
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
      keyboardType: {
        type: 'select',
        name: 'Keyboard type',
        options: [
          {label: 'Password', value: 'PASSWORD'},
          {label: 'Text', value: 'TEXT'},
          {label: 'Ascii', value: 'ASCII'},
          {label: 'Decimal', value: 'DECIMAL'},
          {label: 'Email', value: 'EMAIL'},
          {label: 'Number', value: 'NUMBER'},
          {label: 'Number password', value: 'NUMBER_PASSWORD'},
          {label: 'Phone', value: 'PHONE'},
          {label: 'Uri', value: 'URI'},
        ],
      },
    systemCalendar
  },
});
};

export default block;
