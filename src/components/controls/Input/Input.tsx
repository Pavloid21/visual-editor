import React from 'react';
import {ReactComponent as Remove} from 'assets/circle_cross.svg';
import {NeoInputProps} from './types';
import {Container, Label, StyledNeoInput, StyledNeoTextArea} from './Input.styled';
import {TextAreaProps} from 'rc-textarea';

export const NeoInput = React.forwardRef(
  ({label, $clearable, $extraText, $textarea, ...props}: TextAreaProps & NeoInputProps, ref?: React.Ref<any>) => (
    <Container {...props} label={label}>
      {label && <Label>{label}</Label>}
      {$textarea ? (
        <StyledNeoTextArea autoSize={{minRows: 2, maxRows: 8}} ref={ref} {...props} />
      ) : (
        <StyledNeoInput allowClear={$clearable && {clearIcon: <Remove />}} ref={ref} {...props} />
      )}
      {$extraText && <span className="extra">{$extraText}</span>}
    </Container>
  )
);
