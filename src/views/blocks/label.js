import React from "react";

const Component = ({ data, ...props }) => {
  const { alignment, text, textColor, fontSize } = data;
  return (
    <p
      {...props}
      className="draggable"
      style={{
        textAlign: alignment,
        color: textColor,
        fontSize: fontSize + "px",
        marginBottom: 0,
        boxSizing: "border-box",
        border: "1px dashed blue",
      }}
    >
      {text}
    </p>
  );
};

const block = {
  Component,
  name: "LABEL",
  previewImageUrl: "",
  category: "Controls",
  defaultData: {
    alignment: "CENTER",
    text: "Вход",
    textColor: "#000000",
    fontSize: "24",
  },
  config: {
    alignment: { type: "string", name: "Alignment" },
    text: { type: "string", name: "Text" },
    textColor: { type: "color", name: "Text color" },
    fontSize: { type: "number", name: "Font size" },
  },
};

export default block;
