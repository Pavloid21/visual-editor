import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import v4 from "uuid/dist/v4";
import actionTypes from "../constants/actionTypes";

const LoadScreen = (props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   fetch(
  //     "http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/configurations/"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data", data);
  //     });
  // }, []);

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
    newBlock.listItems = traverse(tree);
    dispatch({
      type: actionTypes.SET_LAYOUT,
      layout: newBlock.listItems[0],
    })
  };

  const changeHandler = (event) => {
    try {
      const json = JSON.parse(event.target.value);
      console.log("json", json);
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
        <label>Screen JSON</label>
        <textarea
          className="form-control"
          rows={20}
          onChange={changeHandler}
        ></textarea>
      </div>
    </div>
  );
};

export default LoadScreen;
