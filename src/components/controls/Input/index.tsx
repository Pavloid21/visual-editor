import React from 'react';
import styledComponents from 'styled-components';
import {ReactComponent as Remove} from 'assets/circle_cross.svg';
import Input from 'rc-input';
import Textarea, {TextAreaProps} from 'rc-textarea';
import {NeoInputProps} from './types';

export const Container = styledComponents.section<TextAreaProps & NeoInputProps>`
  position: relative;
  margin-bottom: 12px;
  & svg {
    position: absolute;
    right: 12px;
    top: 38px;
    &:hover {
      cursor: pointer;
    }
  }

  & .extra {
    color: ${(props) => (props.status === 'error' ? 'var(--error-text)' : 'var(--neo-black)')};
    font-size: 14px;
  }
`;

const StyledNeoInput = styledComponents(Input)<NeoInputProps>`
font-size: 14px;
& > .rc-input, &[type="text"] {
    background: #FFFFFF;
    width: ${(props) => (props.$isWide ? '100%' : 'auto')};
    border: 1px solid ${(props) => (props.status === 'error' ? 'var(--error-text)' : 'var(--neo-gray)')};
    height: 40px;
    line-height: 20px;
    border-radius: 4px;
    padding: 8px ${(props) => (props.$clearable ? '36px' : '12px')} 8px 12px ;
    &::placeholder {
      color: #B3B3B3;
    }
    &:hover {
      border: 1px solid #2A356C;
    }
    &:focus {
      border: 1px solid #2A356C;
      outline: none;
    }
  }
  ${(props) =>
    props.type === 'number' &&
    `
  width: ${props.$isWide ? '100%' : 'auto'};
  border: 1px solid ${props.status === 'error' ? 'var(--error-text)' : 'var(--neo-gray)'};
  height: 36px;
  line-height: 20px;
  border-radius: 4px;
  padding: 8px ${props.$clearable ? '36px' : '12px'} 8px 12px ;
  margin-top: 4px;
  &::placeholder {
    color: #B3B3B3;
  }
  &:hover {
    border: 1px solid #2A356C;
  }
  &:focus {
    border: 1px solid #2A356C;
    outline: none;
  }
  `}

`;

const StyledNeoTextArea = styledComponents<any>(Textarea)<TextAreaProps & NeoInputProps>`
  background: #FFFFFF;
  width: ${(props) => (props.$isWide ? '100%' : 'auto')};
  border: 1px solid var(--neo-gray);
  height: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  padding: 8px ${(props) => (props.$clearable ? '36px' : '12px')} 8px 12px ;
  display: block;
  margin-top: 4px;
  &::placeholder {
    color: #B3B3B3;
  }
  &:hover {
    border: 1px solid #2A356C;
  }
`;

export const Label = styledComponents.label`
  font-size: 14px;
  line-height: 20px;
  position: relative;
  color: var(--neo-secondary-gray);
  margin-bottom: 4px;
`;

export const NeoInput: React.FC<TextAreaProps & NeoInputProps> = ({
  label,
  $clearable,
  $extraText,
  $textarea,
  ...props
}) => {
  
  return (
    <Container {...props}>
      {label && <Label>{label}</Label>}
      {$textarea ? (
        <StyledNeoTextArea autoSize={{minRows: 2, maxRows: 8}} {...props} />
      ) : (
        <StyledNeoInput allowClear={$clearable && {clearIcon: <Remove />}} {...props} />
      )}
      {$extraText && <span className="extra">{$extraText}</span>}
    </Container>
  );
};
