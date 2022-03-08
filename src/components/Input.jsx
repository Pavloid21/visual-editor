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
  &::placeholder {
    color: #B3B3B3;
  }
  &:hover {
    border: 1px solid #2A356C;
  }
`;

const Input = (props) => {
  return <NeoInput {...props} />;
};

export default Input;
