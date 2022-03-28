import React from "react";
import styled from "styled-components";

const NeoButton = styled.button`
  background-color: var(--main-color);
  color: #ffffff;
  padding: 10px 32px;
  border-radius: 4px;
  border: none;
  line-height: 20px;
  border: 1px solid var(--main-color);
  box-sizing: border-box;
  &:hover {
    background-color: var(--hover-color);
    border: 1px solid var(--hover-color);
  }
  &:active {
    background-color: var(--active-color);
    border: 1px solid var(--active-color);
  }
  &.secondary {
    background-color: #ffffff;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    &:hover {
      border: 1px solid var(--hover-color);
    }
    &:active {
      border: 1px solid var(--active-color);
      color: var(--active-color);
    }
  }
  &.sm {
    padding: 10px 26px;
  }
  ${(props) => {
    if (props.disabled) {
      return `
        pointer-events: none;
        background-color: #FFEBEE;
        border-color: #FFEBEE;
        &.secondary {
          color: #E6E6E6;
          border-color: #E6E6E6;
        }
      `
    }
  }}
`;

const Button = (props) => {
  return <NeoButton {...props}>{props.children}</NeoButton>;
};

export default Button;
