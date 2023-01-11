import React from 'react';
import {ReactComponent as Remove} from 'assets/circle_cross.svg';
import {NeoInputProps} from './types';
import {Container, IconWrapper, Label, StyledNeoInput, StyledNeoTextArea} from './Input.styled';
import {TextAreaProps} from 'rc-textarea';

export const NeoInput = React.forwardRef(({
  label,
  $clearable,
  $extraText,
  $textarea,
  maxNumber,
  ...props
}: TextAreaProps & NeoInputProps, ref?: React.Ref<any>) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxNumber) {
      if(Number(event.target.value) > maxNumber) {
        event.target.value = String(maxNumber);
      } else {
        return event.target.value;
      }
    }
  };

  return (
    <Container {...props} $clearable={$clearable} label={label}>
      {label && <Label>{label}</Label>}
      {$textarea ? (
        <StyledNeoTextArea autoSize={{minRows: 2, maxRows: 8}} ref={ref} {...props} />
      ) : (
        <StyledNeoInput
          allowClear={$clearable && {clearIcon: <Remove />}}
          ref={ref}
          onInput={handleChangeInput}
          {...props}
        />
      )}
      {$extraText && <span className="extra">{$extraText}</span>}
      {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
    </Container>
  );
});
