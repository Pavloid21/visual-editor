import React from "react";
import styledComponents from "styled-components";

const NeoInput = styledComponents.input`
  background: #FFFFFF;
  border: 1px solid var(--neo-gray);
  height: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 12px;
  display: block;
  margin-top: 4px;
  &::placeholder {
    color: #B3B3B3;
  }
  &:hover {
    border: 1px solid #2A356C;
  }
`;

const Label = styledComponents.label`
  font-size: 12px;
  line-height: 16px;
`

const Input = (props) => {
  return (
    <Label>
      {props.label}
      <NeoInput {...props} />
    </Label>
  );
};

export default Input;
