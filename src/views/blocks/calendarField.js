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

const block = () => ({
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
    systemCalendar
  },
});

export default block;
