import React from "react";
import styled from "styled-components";
import "./common.css";

const Image = styled.div`
  width: ${(props) => (props.size.width ? props.size.width + "px" : "100%")};
  height: ${(props) => (props.size.height ? props.size.height + "px" : "auto")};
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) => {
    if (props.shape.type === "ALLCORNERSROUND") {
      return `border-radius: ${props.shape.radius}px;`;
    }
  }}
`;

const Component = ({ data, ...props }) => {
  return (
    <Image {...data} {...props} className="draggable" src={data.imageUrl} />
  );
};

const block = {
  Component,
  name: "IMAGE",
  previewImageUrl: "",
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
