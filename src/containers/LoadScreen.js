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
      "http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/configurations/"
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
      layout: newBlock.listItems[0],
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
  };

  const changeHandler = (event) => {
    try {
      const json = JSON.parse(event.target.value);
      // console.log("json", json);
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
      <div className="d-flex justify-content-between align-items-center">
        <h5>Load Screen</h5>
      </div>
      <hr />
      <div>
        {/* <label>Screen JSON</label>
        <textarea
          className="form-control"
          rows={20}
          onChange={changeHandler}
        ></textarea> */}
        <h3>Avaliable screenes</h3>
        {availableScreenes.map((screen) => {
          return (
            <ScreenItem
              onClick={() => {
                fetch(
                  `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/configurations/${screen}`
                )
                  .then((response) => response.json())
                  .then((data) => {
                    try {
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
    </div>
  );
};

export default LoadScreen;
