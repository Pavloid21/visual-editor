import React, { useRef } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Label } from "./Input";

const Container = styled.section`
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

const ButtonGroup = styled.div`
  & button:not(:last-child) {
    border-radius: 4px 0px 0px 4px;
    border-right: none !important;
  }

  & button:last-child {
    border-radius: 0px 4px 4px 0px;
    border-left: none !important;
  }
  & button.secondary {
    border: 1px solid #8c8c8c;
    color: #333333;
  }
`;

const ButtonSelector = (props) => {
  const { label, variants, titles, value } = props;
  const inputRef = useRef(null);
  const handleValueChange = (nextValue) => {
    let event = new Event("input", { bubbles: true });
    event.simulated = true;
    inputRef.current.value = nextValue;
    props.onChange(nextValue);
  };
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <input
        type="text"
        ref={inputRef}
        {...props}
        style={{ visibility: "hidden" }}
      />
      <ButtonGroup>
        {variants.map((variant, index) => {
          return (
            <Button
              className={`sm ${variant !== value && "secondary"}`}
              onClick={() => handleValueChange(variant)}
            >
              {titles[index]}
            </Button>
          );
        })}
      </ButtonGroup>
    </Container>
  );
};

export default ButtonSelector;
