import React from "react";
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
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <ButtonGroup>
        {variants.map((variant, index) => {
          return (
            <Button
              className={`sm ${variant !== value && "secondary"}`}
              onClick={() => props.onChange(variant)}
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
