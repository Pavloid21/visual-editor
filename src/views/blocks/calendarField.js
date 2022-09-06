import Wrapper from 'utils/wrapper';
import passwordtextfield from 'assets/passwordtextfield.svg';
import {
  backgroundColor, fontSize,
  placeholder,
  placeholderColor, size,
  text,
  textAlignment, textColor, systemCalendar
} from 'views/configs';
import {Container} from './passwordtextfield';


const Component = ({settingsUI, ...props}) => {
  const {placeholder, text} = settingsUI;
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Container className="draggable" {...props} {...settingsUI}>
        <input {...props} type="text" className="form-control" placeholder={placeholder} value={text} />
      </Container>
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'CALENDAR_TEXT_FIELD',
  title: 'CALENDAR_TEXT_FIELD',
  description: 'A control into which the user securely enters private text.',
  previewImageUrl: passwordtextfield,
  category: 'Controls',
  defaultInteractiveOptions: {
    field: 'field_name',
    systemCalendar: {
      systemDialog: 'CALENDAR',
      timeFormat: 'DD.MM.YYYY'
    }
  },
  complex: [
    {label: 'Text', value: 'BASICTEXTFIELD'},
    {label: 'Password', value: 'PASSWORDTEXTFIELD'},
    {label: 'Calendar', value: 'CALENDAR_TEXT_FIELD'},
  ],
  defaultData: {
    placeholder: 'Fill in the date',
    placeholderColor: '#7F7F7F',
    text: '21.12.1990',
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
    systemCalendar
  },
};

export default block;
