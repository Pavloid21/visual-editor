import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import v4 from "uuid/dist/v4";
import actionTypes from "../constants/actionTypes";

const ScreenItem = styled.div`
  padding: 4px 0px;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

const LoadScreen = (props) => {
  const [availableScreenes, setScreenes] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(
      "http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/configurations"
    )
      .then((response) => response.json())
      .then((data) => {
        setScreenes(data);
      });
  }, []);

  const buildLayout = (object) => {
    const tree = object.listItems;
    let newBlock = {
      screen: object.screen,
      listItems: [],
    };
    const traverse = function (tree) {
      return tree.map((item) => {
        let reference = {};
        reference.uuid = v4();
        reference.blockId = item.type.toLowerCase();
        reference.data = item.settingsUI;
        if (item.listItems) {
          reference.listItems = traverse(item.listItems);
        }
        return reference;
      });
    };
    newBlock.listItems = tree?.length ? traverse(tree) : [];
    const action = {
      type: actionTypes.SET_LAYOUT,
      layout: newBlock.listItems,
    };
    if (object.bottomBar) {
      action.bottomBar = {
        blockId: "bottombar",
        uuid: v4(),
        data: {
          ...object.bottomBar.settingsUI,
          navigationItems: object.bottomBar.navigationItems,
        },
      };
    }
    if (object.appBar) {
      action.appBar = {
        blockId: "topappbar",
        uuid: v4(),
        data: {
          ...object.appBar.settingsUI,
          appBarItems: object.appBar.appBarItems,
        },
      };
    }
    dispatch(action);
    dispatch({ type: actionTypes.EDIT_SCREEN_NAME, screen: object.screen });
  };

  const changeHandler = (event) => {
    try {
      const json = JSON.parse(event.target.value);
      buildLayout(json);
    } catch (e) {
      console.log(e);
    }
  };

  if (!props.display) {
    return null;
  }
  return (
    <div>
      {availableScreenes.map((screen) => {
        return (
          <ScreenItem
            onClick={() => {
              fetch(
                `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/configurations/${screen}`
              )
                .then((response) => response.json())
                .then((data) => {
                  try {
                    dispatch({
                      type: actionTypes.SET_CURRENT_SCREEN_NAME,
                      current: screen,
                    });
                    buildLayout(data);
                  } catch (e) {
                    console.log("e", e);
                  }
                });
            }}
          >
            {screen}
          </ScreenItem>
        );
      })}
    </div>
  );
};

export default LoadScreen;
