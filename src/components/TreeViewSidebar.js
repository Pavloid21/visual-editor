import React from "react";
import TreeMenu from "react-simple-tree-menu";
import { useSelector, useDispatch } from "react-redux";
import { observer } from "../utils/observer";
import actionTypes from "../constants/actionTypes";
import "../../node_modules/react-simple-tree-menu/dist/main.css";

export default function TreeViewSidebar() {
  const layout = useSelector((state) => state.layout.blocks);
  const dispatch = useDispatch();
  const treeData = [
    {
      key: "screen",
      label: "screen",
      nodes: [],
    },
  ];

  const buildJSONitem = (block) => {
    const data = {
      key: [block.uuid],
      label: block.blockId.toUpperCase(),
      nodes: [],
    };
    if (block.listItems) {
      data.nodes = block.listItems.map((item) => buildJSONitem(item));
    }
    return data;
  };

  const prepareJSON = () => {
    treeData[0].nodes = layout.map((block) => {
      return buildJSONitem(block);
    });
  };

  prepareJSON();

  const handleItemClick = (item) => {
    const uuid = item.key.split("/").slice(-1)[0];
    if (uuid === "screen") {
      dispatch({
        type: actionTypes.CHANGE_ACTIVE_TAB,
        index: 5,
      });
    } else {
      observer.broadcast({ blockId: uuid, event: "click" });
    }
  }

  return (
    <div className="mh-100 d-flex flex-column inspector-wrapper">
      <div className="sidebar-wrapper container-fluid p-2 pt-4">
        <TreeMenu data={treeData} onClickItem={handleItemClick} />
      </div>
    </div>
  );
}
