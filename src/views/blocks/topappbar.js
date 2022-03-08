import React from "react";
import styled from "styled-components";
import invertColor from "../../utils/invertColor";
import topappbar from "../../assets/topappbar.svg"

const TopAppBar = styled.div`
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  color: ${(props) => props.textColor || invertColor(props.backgroundColor, true)};
  background-color: ${(props) => props.backgroundColor};
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: ${(props) => props.fontSize}px;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px dashed blue;
  & label {
    text-align: ${(props) => props.textAlignment};
    margin: 0;
    width: 100%;
  }
  & div {
    position: relative;
    justify-content: center;
    color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    & .item_icon {
      background-color: ${(props) => props.textColor || "black"};
    }
  }
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  mask: url(${(props) => props.iconUrl}) no-repeat center;
`;

const Component = ({ data, ...props }) => {
  const { appBarItems } = data;
  const buttons = [];
  for (let index in appBarItems) {
    buttons.push(appBarItems[index]);
  }
  return (
    <TopAppBar {...data} {...props}>
      <label>{data.text}</label>
      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        {buttons.map((item) => {
          return (
            <div>
              <Icon className="item_icon" iconUrl={item.iconUrl}></Icon>
            </div>
          );
        })}
      </div>
    </TopAppBar>
  );
};

const block = {
  Component,
  name: "TOPAPPBAR",
  previewImageUrl: topappbar,
  category: "Controls",
  defaultData: {
    fontSize: 16,
    textColor: "#E9E8EA",
    backgroundColor: "#423649",
    textAlignment: "LEFT",
    padding: {
      top: 8,
      bottom: 8,
      left: 16,
      right: 16,
    },
    text: "App Bar",
    appBarItems: [
      {
        iconUrl: "https://icons.getbootstrap.com/assets/icons/search.svg",
      },
      {
        iconUrl: "https://icons.getbootstrap.com/assets/icons/bell.svg",
      },
    ],
  },
  config: {
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
    fontSize: { type: "number", name: "Font size" },
    padding: {
      top: { type: "number", name: "Top" },
      bottom: { type: "number", name: "Bottom" },
      left: { type: "number", name: "Left" },
      right: { type: "number", name: "Right" },
    },
    text: { type: "string", name: "Text" },
    textAlignment: { type: "string", name: "Text alignment" },
    appBarItems: [
      {
        iconUrl: { type: "string", name: "Icon URL" },
      },
    ],
  },
};

export default block;
