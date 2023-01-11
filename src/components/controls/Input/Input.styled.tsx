import Input from 'rc-input';
import TextArea, {TextAreaProps} from 'rc-textarea';
import styled, {css} from 'styled-components';
import {NeoInputProps} from './types';

export const Container = styled.section<TextAreaProps & NeoInputProps & {label?: string}>`
  position: relative;
  ${({icon}) => icon && css`
      margin-right: 16px;
    `}
  & svg {
    position: ${({$clearable}) => ($clearable ? 'absolute' : 'initial')};
    right: 12px;
    top: ${({label}) => (label ? '38px' : '10px')};
    &:hover {
      cursor: pointer;
    }
  }

  & .extra {
    color: ${(props) => (props.status === 'error' ? 'var(--error-text)' : 'var(--neo-black)')};
    font-size: 14px;
  }
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  & :nth-child(n) {
    flex: 1 1 auto;
  }
`;

export const StyledNeoInput = styled(Input)<NeoInputProps>`
  font-size: 14px;
  & > .rc-input,
  &[type='text'] {
    background: ${(props) => (props.disabled ? 'var(--neo-gray)' : '#FFFFFF')};
    width: ${(props) => (props.$isWide ? '100%' : 'auto')};
    border: 1px solid ${(props) => (props.status === 'error' ? 'var(--error-text)' : 'var(--neo-gray)')};
    height: 40px;
    line-height: 20px;
    border-radius: 4px;
    padding: 8px ${(props) => (props.$clearable ? '36px' : '12px')} 8px 12px;
    &::placeholder {
      color: #b3b3b3;
    }
    &:hover {
      border: 1px solid #2a356c;
    }
    &:focus {
      border: 1px solid #2a356c;
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

// @ts-ignore
export const StyledNeoTextArea = styled(TextArea)<TextAreaProps & NeoInputProps>`
  background: #ffffff;
  width: ${(props) => (props.$isWide ? '100%' : 'auto')};
  border: 1px solid var(--neo-gray);
  height: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  padding: 8px ${(props) => (props.$clearable ? '36px' : '12px')} 8px 12px;
  display: block;
  margin-top: 4px;
  &::placeholder {
    color: #b3b3b3;
  }
  &:hover {
    border: 1px solid #2a356c;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  position: relative;
  color: var(--neo-secondary-gray);
  margin-bottom: 4px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 34px;
  right: -25px;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;
