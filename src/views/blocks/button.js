import React from "react";
import styled from "styled-components";
import button from "../../assets/button.svg";
import { hexToRgb } from "../../constants/utils";

const Wrapper = styled.div``;

const Button = styled.div`
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  align-items: center;
  justify-content: ${(props) => props.textAlignment};
  display: flex;
  border-width: ${(props) => props.borderWidth}px;
  border-color: ${(props) => props.borderColor};
  ${(props) => {
    if (props.shadow) {
      return `box-shadow: ${props.shadow?.offsetSize?.width}px ${
        props.shadow?.offsetSize?.height
      }px ${props.shadow?.radius}px rgba(${hexToRgb(props.shadow?.color).r}, ${
        hexToRgb(props.shadow?.color).g
      }, ${hexToRgb(props.shadow?.color).b}, ${props.shadow?.opacity});`;
    }
  }}

  ${(props) => {
    if (props.shape?.type === "ALLCORNERSROUND") {
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
  & > span {
    font-size: inherit;
    padding-top: ${(props) => props.buttonTextPadding?.top || 0}px;
    padding-left: ${(props) => props.buttonTextPadding?.left || 0}px;
    padding-right: ${(props) => props.buttonTextPadding?.right || 0}px;
    padding-bottom: ${(props) => props.buttonTextPadding?.bottom || 0}px;
  }
  & > img {
    padding-top: ${(props) => props.buttonImagePadding?.top || 0}px;
    padding-left: ${(props) => props.buttonImagePadding?.left || 0}px;
    padding-right: ${(props) => props.buttonImagePadding?.right || 0}px;
    padding-bottom: ${(props) => props.buttonImagePadding?.bottom || 0}px;
  }
`;

const Component = (props) => {
  const { text, imageUrl } = props.data;
  return (
    <Wrapper className="draggable" {...props.data} {...props}>
      <Button {...props.data} {...props}>
        <span>{text}</span>
        {imageUrl && <img src={imageUrl} />}
      </Button>
    </Wrapper>
  );
};

const block = {
  Component,
  name: "BUTTON",
  title: "Button",
  description:
    "Displays a button icon the user can click to initiate an action.",
  previewImageUrl: button,
  category: "Controls",
  defaultData: {
    action: "nextScreenName",
    text: "Войти",
    fontSize: "24",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    alignment: "CENTER",
    textAlignment: "center",
    imageUrl: "",
    borderColor: "#EFEFEF",
    borderWidth: 1,
    buttonTextPadding: {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    },
    buttonImagePadding: {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    },
    shape: {
      type: "ALLCORNERSROUND",
      radius: "4",
    },
    size: {
      height: 48,
      width: 230,
    },
    shadow: {
      color: "#000000",
      opacity: 0.3,
      offsetSize: {
        width: 0,
        height: 0,
      },
      radius: 8,
    },
  },
  config: {
    action: { type: "string", name: "Action" },
    text: { type: "string", name: "Text" },
    fontSize: { type: "number", name: "Font size" },
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
    borderColor: { type: "color", name: "Border color" },
    borderWidth: { type: "number", name: "Border width" },
    alignment: { type: "string", name: "Alignment" },
    textAlignment: { type: "string", name: "Text alignment" },
    buttonTextPadding: {
      top: { type: "number", name: "Text padding top" },
      right: { type: "number", name: "Text padding right" },
      bottom: { type: "number", name: "Text padding bottom" },
      left: { type: "number", name: "Text padding left" },
    },
    buttonImagePadding: {
      top: { type: "number", name: "Image padding top" },
      right: { type: "number", name: "Image padding right" },
      bottom: { type: "number", name: "Image padding bottom" },
      left: { type: "number", name: "Image padding left" },
    },
    imageUrl: { type: "string", name: "imageUrl" },
    shape: {
      type: { type: "string", name: "Shape type" },
      radius: { type: "number", name: "Shape radius" },
    },
    size: {
      height: { type: "number", name: "Height" },
      width: { type: "number", name: "Width" },
    },
    shadow: {
      color: { type: "color", name: "Color" },
      opacity: { type: "number", name: "Opacity" },
      offsetSize: {
        width: { type: "number", name: "Width" },
        height: { type: "number", name: "Height" },
      },
      radius: { type: "number", name: "Radius" },
    },
  },
};

export default block;
