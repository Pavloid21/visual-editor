import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import TreeMenu from "react-simple-tree-menu";
import actionTypes from "../constants/actionTypes";
import { observer } from "../utils/observer";
import SideBarHeader from "./SideBarHeader";
import Gallery from "../containers/Gallery";
import SortableTree from "@nosferatu500/react-sortable-tree";
import '@nosferatu500/react-sortable-tree/style.css';
// import "react-sortable-tree/style.css";

const Container = styled.div`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  & > div {
    height: 50%;
  }
`;

export default function LeftSidebar({ children }) {
  const layout = useSelector((state) => state.layout.blocks);
  const startTreeData = [
    {
      subtitle: "screen",
      title: "screen",
      children: [],
    },
  ];
  const [treeData, setTree] = useState(startTreeData);
  const dispatch = useDispatch();

  const buildJSONitem = (block) => {
    if (block) {
      const data = {
        key: [block.uuid],
        label: block.blockId.toUpperCase(),
        nodes: [],
      };
      if (block.listItems) {
        data.nodes = block.listItems.map((item) => buildJSONitem(item));
      }
      return data;
    }
    return null;
  };

  const buildTreeitem = (block) => {
    if (block) {
      const data = {
        subtitle: block.uuid,
        title: block.blockId.toUpperCase(),
        children: [],
      };
      if (block.listItems) {
        data.children = block.listItems.map((item) => buildTreeitem(item));
      }
      return data;
    }
    return null;
  };

  const prepareJSON = () => {
    treeData[0].nodes = layout.map((block) => {
      return buildJSONitem(block);
    });
  };

  const prepareTree = () => {
    const root = { ...treeData[0] };
    root.children = layout.map((block) => {
      return buildTreeitem(block);
    });
    setTree([root]);
  };

  // prepareJSON();
  useEffect(() => {
    prepareTree();
  }, [layout]);

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
  };
  console.log(treeData);
  return (
    <Container>
      <div>
        <SideBarHeader title="Project name" />
        {/* <TreeMenu data={treeData} onClickItem={handleItemClick} /> */}
        <div style={{ height: 400, overflow: "auto"}}>
          <SortableTree
            treeData={treeData}
            onChange={(treeData) => setTree(treeData)}
            debugMode
          />
        </div>
      </div>
      <Gallery />
    </Container>
  );
}
