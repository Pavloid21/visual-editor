import React from "react";
import styled from "styled-components";

const Button = styled.div`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  text-align: ${(props) => props.textAlignment};
  align-items: center;
  display: flex;
  ${(props) => {
    if (props.shape.type === "ALLCORNERSROUND") {
      return `border-radius: ${props.shape.radius}px;`;
    }
  }}
  ${(props) => {
    if (props.size) {
      return `height: ${props.size.height}px;
              width: ${
                props.alignment === "FILL" ? "100%" : props.size.width + "px"
              };`;
    }
  }}
`;

const Component = (props) => {
  const { text } = props.data;
  return (
    <Button className="btn draggable" {...props.data} {...props}>
      {text}
    </Button>
  );
};

const block = {
  Component,
  name: "BUTTON",
  previewImageUrl: "",
  category: "Controls",
  defaultData: {
    action: "nextScreenName",
    text: "Войти",
    fontSize: "24",
    alignment: "CENTER",
    textColor: "#000000",
    textAlignment: "center",
    backgroundColor: "#FFFFFF",
    shape: {
      type: "ALLCORNERSROUND",
      radius: "4",
    },
    size: {
      height: "48",
      width: "230",
    },
  },
  config: {
    action: { type: "string", name: "Action" },
    text: { type: "string", name: "Text" },
    fontSize: { type: "number", name: "Font size" },
    alignment: { type: "string", name: "Alignment" },
    textAlignment: { type: "string", name: "Text alignment" },
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
    shape: {
      type: { type: "string", name: "Shape type" },
      radius: { type: "number", name: "Shape radius" },
    },
    size: {
      height: { type: "number", name: "Height" },
      width: { type: "number", name: "Width" },
    },
  },
};

export default block;
