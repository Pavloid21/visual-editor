import React, { useRef } from "react";
import styled from "styled-components";
import { Label } from "./controls";

const Wrapper = styled.section`
  position: relative;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  width: ${(props) => (props.isWide ? "100%" : "auto")};
  padding: 4px 12px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;

  & > .swatch {
    min-height: 20px;
    min-width: 20px;
    border-radius: 50%;
    border: 1px solid var(--neo-gray);
    margin-right: 8px;
    background: ${(props) => props.color};
    &:hover {
      cursor: pointer;
    }
  }

  & .chrome-picker {
    position: absolute;
    z-index: 2;
    top: 64px;
    left: 0;
  }

  input[type="color"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    max-width: 20px;
    max-height: 20px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--neo-gray);
    margin-right: 8px;
    &::-webkit-color-swatch {
      border-radius: 50%;
      border: none;
    }
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-moz-color-swatch {
      border-radius: 50%;
      border: none;
    }
    &::-moz-color-swatch-wrapper {
      padding: 0;
    }
  }

  input[type="text"] {
    border: none;
    width: 100%;
  }
`;

const ColorPicker = ({ value, onChange, ...rest }) => {
  const colorRef = useRef(null);

  return (
    <Wrapper>
      {rest.label && <Label>{rest.label}</Label>}
      <Container color={value}>
        <input ref={colorRef} type="color" value={value} onChange={onChange} />
        <input type="text" value={value} onChange={onChange} {...rest} />
      </Container>
    </Wrapper>
  );
};

export default ColorPicker;
