import React from "react";

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
  previewImageUrl: "",
  category: "Controls",
  defaultData: {
    backgroundColor: "#000000",
  },
  config: {
    backgroundColor: { type: "color", name: "Color" },
  },
};

export default block;
