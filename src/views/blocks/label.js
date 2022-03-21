import React from "react";
import styledComponents from "styled-components";
import label from "../../assets/label.svg";
import Wrapper from "../../utils/wrapper";

const Label = styledComponents.div`
  text-align: ${(props) => props.alignment};
  width: 100%;
  box-sizing: border-box;
  & > span {
    display: block;
    width: ${(props) =>
      props.alignment === "FILL" ? "100%" : props.size?.width || "auto"};
    height: ${(props) => props.size?.height || "auto"};
    text-align: ${(props) => props.textAlignment};
    color: ${(props) => props.textColor};
    font-size: ${(props) => props.fontSize}px;
  }
`;

const Component = ({ settingsUI, ...props }) => {
  const { text } = settingsUI;
  return (
    <Wrapper id={props.id}>
      <Label {...props} {...settingsUI} className="draggable">
        <span>{text}</span>
      </Label>
    </Wrapper>
  );
};

const block = {
  Component,
  name: "LABEL",
  title: "Label",
  description:
    "A standard label for user interface items, consisting of an icon with a title.",
  previewImageUrl: label,
  category: "Controls",
  defaultData: {
    alignment: "CENTER",
    text: "Вход",
    textAlignment: "CENTER",
    textColor: "#000000",
    fontSize: 24,
    size: {
      width: 100,
      height: 48,
    },
    fontWeight: "REGULAR",
  },
  config: {
    alignment: { type: "string", name: "Alignment" },
    text: { type: "string", name: "Text" },
    textAlignment: { type: "string", name: "Text alignment" },
    textColor: { type: "color", name: "Text color" },
    fontSize: { type: "number", name: "Font size" },
    fontWeight: { type: "string", name: "Font weight" },
    size: {
      width: { type: "number", name: "Width" },
      height: { type: "number", name: "Height" },
    },
  },
};

export default block;
