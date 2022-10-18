import React, {ReactNode} from 'react';
import {ReactComponent as Remove} from 'assets/circle_cross.svg';
import {NeoInputProps} from './types';
import {Container, Inline, Label, StyledNeoInput, StyledNeoTextArea} from './Input.styled';
import {TextAreaProps} from 'rc-textarea';

export const NeoInput = React.forwardRef(
  (
    {label, $clearable, $extraText, $textarea, ...props}: TextAreaProps & NeoInputProps & {icon?: ReactNode},
    ref?: React.Ref<any>
  ) => (
    <Container {...props} $clearable={$clearable} label={label}>
      {label && <Label>{label}</Label>}
      <Inline>
        {$textarea ? (
          <StyledNeoTextArea autoSize={{minRows: 2, maxRows: 8}} ref={ref} {...props} />
        ) : (
          <StyledNeoInput allowClear={$clearable && {clearIcon: <Remove />}} ref={ref} {...props} />
        )}
        {props.icon}
      </Inline>
      {$extraText && <span className="extra">{$extraText}</span>}
    </Container>
  )
);
