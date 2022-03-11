import React, { useRef } from "react";
import styledComponents from "styled-components";
import { ReactComponent as Remove } from "../assets/circle_cross.svg";

const Container = styledComponents.section`
  position: relative;
  margin-bottom: 12px;
  & svg {
    position: absolute;
    right: 12px;
    top: 41px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const NeoInput = styledComponents.input`
  background: #FFFFFF;
  width: ${(props) => (props.isWide ? "100%" : "auto")};
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
  position: relative;
`;

const Input = (props) => {
  const inputRef = useRef(null);

  const handleClear = (event) => {
    inputRef.current.value = "";
    console.log(inputRef);
  };

  return (
    <Container>
      {props.clearable && <Remove onClick={handleClear} />}
      <Label>{props.label}</Label>
      <NeoInput ref={inputRef} {...props} />
    </Container>
  );
};

export default Input;
