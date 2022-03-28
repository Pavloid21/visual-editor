import React from "react";
import styled from "styled-components";
import bottombar from "../../assets/bottombar.svg";
import Wrapper from "../../utils/wrapper";

const BottomBar = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 16px 0px 16px 0px;
  bottom: 0;
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & div {
    position: relative;
    flex: 1 1 auto;
    justify-content: center;
    color: ${(props) => props.bottomIconUnselectedColor};
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    & label {
      margin-bottom: 0;
    }
    & .item_icon {
      background-color: ${(props) => props.bottomIconUnselectedColor};
    }
  }
  & .active {
    color: ${(props) => props.bottomIconSelectedColor};
    & div {
      background-color: ${(props) => props.bottomIconSelectedColor};
    }
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  mask: url(${(props) => props.iconUrl}) no-repeat center;
`;

const Component = ({ settingsUI, ...props }) => {
  const { navigationItems } = settingsUI;
  const buttons = [];
  for (let index in navigationItems) {
    buttons.push(navigationItems[index]);
  }
  return (
    <Wrapper id={props.id} style={{ position: "sticky", bottom: 0 }}>
      <BottomBar {...settingsUI} {...props}>
        {buttons.map((item, index) => {
          return (
            <div
              className={item.isNestedScreen && "active"}
              key={`bottomBarItem_${index}`}
            >
              <Icon className="item_icon" iconUrl={item.iconUrl}></Icon>
              <label>{item.screenName}</label>
            </div>
          );
        })}
      </BottomBar>
    </Wrapper>
  );
};

const block = {
  Component,
  name: "BOTTOMBAR",
  title: "Bottom navigation",
  description:
    "Bottom navigation bars allow movement between primary destinations in an app.",
  previewImageUrl: bottombar,
  category: "Controls",
  defaultInteractiveOptions: {
    action: { url: "nextScreenName", fields: ["field1", "field2"], target: "" },
  },
  defaultData: {
    backgroundColor: "#423649",
    bottomIconSelectedColor: "#E9E8EA",
    bottomIconUnselectedColor: "#A29CA6",
    navigationItems: [
      {
        screenName: "Auth",
        isNestedScreen: true,
        iconUrl:
          "https://icons.getbootstrap.com/assets/icons/box-arrow-in-right.svg",
        action: {
          url: "screenAuth",
        },
      },
      {
        screenName: "Contacts",
        isNestedScreen: false,
        iconUrl:
          "https://icons.getbootstrap.com/assets/icons/person-lines-fill.svg",
        action: {
          url: "screenContacts",
        },
      },
      {
        screenName: "Settings",
        isNestedScreen: false,
        iconUrl: "https://icons.getbootstrap.com/assets/icons/gear.svg",
        action: {
          url: "screenSettings",
        },
      },
    ],
  },
  config: {
    backgroundColor: { type: "color", name: "Background color" },
    bottomIconSelectedColor: {
      type: "color",
      name: "Bottom icon selected color",
    },
    bottomIconUnselectedColor: {
      type: "color",
      name: "Bottom icon unselected color",
    },
    navigationItems: [
      {
        screenName: { type: "string", name: "Screen name" },
        isNestedScreen: { type: "boolean", name: "Is nested screen" },
        iconUrl: { type: "string", name: "Icon URL" },
        action: {
          url: { type: "string", name: "URL" },
        },
      },
    ],
  },
  interactive: {
    action: {
      url: {
        type: "string",
        name: "Action URL",
      },
      target: { type: "string", name: "Target" },
      fields: { type: "array", name: "Fields set" },
    },
  },
};

export default block;
