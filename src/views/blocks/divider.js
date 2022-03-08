import React from "react";
import divider from "../../assets/divider.svg";

const Component = ({ data, ...props }) => {
  const { backgroundColor } = data;
  return (
    <hr
      {...props}
      className="draggable"
      style={{
        backgroundColor,
      }}
    />
  );
};

const block = {
  Component,
  name: "DIVIDER",
  previewImageUrl: divider,
  category: "Controls",
  defaultData: {
    backgroundColor: "#000000",
  },
  config: {
    backgroundColor: { type: "color", name: "Color" },
  },
};

export default block;
