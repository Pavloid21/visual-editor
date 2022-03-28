import React from "react";
import styled from "styled-components";
import image from "../../assets/image.svg";
import Wrapper from "../../utils/wrapper";

const Image = styled.img`
  display: flex;
  box-sizing: border-box;
  align-items: ${(props) =>
    props.alignment === "SPACEBETWEEN" ? "space-between" : props.alignment};
  width: ${(props) => (+props.size?.width ? props.size.width + "px" : "100%")};
  z-index: 90;
  height: ${(props) =>
    +props.size?.height ? props.size.height + "px" : "auto"};
  ${(props) => {
    if (props.shape?.type === "ALLCORNERSROUND") {
      return `border-radius: ${props.shape?.radius || 0}px;`;
    }
  }}
`;

const Component = ({ settingsUI, ...props }) => {
  return (
    <Wrapper id={props.id} style={{ alignItems: "center" }}>
      <Image
        {...settingsUI}
        {...props}
        className="draggable"
        src={settingsUI.imageUrl}
      />
    </Wrapper>
  );
};

const block = {
  Component,
  name: "IMAGE",
  title: "Image",
  description: "A view that displays an image.",
  previewImageUrl: image,
  category: "Controls",
  defaultData: {
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    size: {
      height: 200,
      width: 400,
    },
    shape: {
      type: "ALLCORNERSROUND",
      radius: 4,
    },
  },
  config: {
    imageUrl: { type: "string", name: "Image URL" },
    size: {
      height: { type: "number", name: "Height" },
      width: { type: "number", name: "Width" },
    },
    shape: {
      type: { type: "string", name: "Shape type" },
      radius: { type: "number", name: "Shape radius" },
    },
  },
};

export default block;
