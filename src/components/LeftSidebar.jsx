import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";
import { observer } from "../utils/observer";
import SideBarHeader, { SideBarSubheader } from "./SideBarHeader";
import Gallery from "../containers/Gallery";
import SortableTree from "@nosferatu500/react-sortable-tree";
import FileExplorerTheme from "@nosferatu500/theme-file-explorer";
import { ReactComponent as Copy } from "../assets/copy.svg";
import { ReactComponent as Trash } from "../assets/trash.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import LoadScreen from "../containers/LoadScreen";
import models from "../views/blocks/index";

const Container = styled.div`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  z-index: 2;
  & > div:nth-child(2n + 1) {
    height: 50%;
  }
  & > div {
    overflow: hidden;
    & .rst__virtualScrollOverride > div {
      position: static !important;
    }
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

export default function LeftSidebar({ children, ...props }) {
  const layout = useSelector((state) => state.layout.blocks);
  const appBar = useSelector((state) => state.layout.appBar);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const selectedBlock = useSelector((state) => state.layout.selectedBlockUuid);
  const [activeTab, setActiveTab] = useState(1);
  const startTreeData = [
    {
      subtitle: "screen",
      title: "screen",
      expanded: true,
      children: [],
    },
  ];
  const [treeData, setTree] = useState(startTreeData);
  const dispatch = useDispatch();

  const buildTreeitem = (block) => {
    if (block) {
      const data = {
        subtitle: block.uuid,
        title: block.blockId.toUpperCase(),
        expanded: true,
        children: [],
      };
      if (block.listItems) {
        data.children = block.listItems.map((item) => buildTreeitem(item));
      }
      return data;
    }
    return null;
  };

  const prepareTree = () => {
    const root = { ...treeData[0] };
    root.children = layout.map((block) => {
      return buildTreeitem(block);
    });
    if (appBar) {
      root.children.unshift({
        title: "TOPAPPBAR",
        subtitle: appBar?.uuid,
      });
    }
    if (bottomBar) {
      root.children.push({
        title: "BOTTOMBAR",
        subtitle: bottomBar?.uuid,
      });
    }
    setTree([root]);
  };

  useEffect(() => {
    prepareTree();
  }, [layout, appBar, bottomBar]);

  const handleItemClick = (item) => {
    const uuid = item.node.subtitle;
    if (uuid === "screen") {
      dispatch({
        type: actionTypes.CHANGE_ACTIVE_TAB,
        index: 5,
      });
    } else {
      observer.broadcast({ blockId: uuid, event: "click" });
    }
  };

  const handleDeleteBlock = (blockUuid) => {
    dispatch({
      type: actionTypes.DELETE_BLOCK,
      blockUuid,
    });
  };

  if (!props.display) {
    return null;
  }

  return (
    <Container>
      <div>
        <SideBarHeader title="Project name" />
        <SideBarSubheader>
          <div>
            <span
              className={activeTab === 0 ? "tab_active" : ""}
              onClick={() => setActiveTab(0)}
            >
              Screens
            </span>
            <span
              className={activeTab === 1 ? "tab_active" : ""}
              onClick={() => setActiveTab(1)}
            >
              Structure
            </span>
          </div>
          <Plus className="icon" />
        </SideBarSubheader>
        <div
          style={{
            height: "calc(100% - 104px)",
            overflow: "auto",
            padding: "14px",
          }}
        >
          {activeTab === 0 && <LoadScreen display />}
          {activeTab === 1 && (
            <SortableTree
              treeData={treeData}
              onChange={(treeData) => setTree(treeData)}
              theme={FileExplorerTheme}
              generateNodeProps={(extendedNode) => {
                return {
                  title: (
                    <section
                      className={`node ${
                        selectedBlock === extendedNode.node.subtitle
                          ? "node_selected"
                          : ""
                      }`}
                      onClick={() => handleItemClick(extendedNode)}
                    >
                      <span>
                        <Icon
                          src={
                            models[extendedNode.node?.title?.toLowerCase()]
                              ?.previewImageUrl
                          }
                        />
                        {extendedNode.node.title}
                      </span>
                    </section>
                  ),
                  buttons:
                    extendedNode.node.subtitle === "screen"
                      ? []
                      : [
                          <Copy className="icon" />,
                          <Trash
                            className="icon"
                            onClick={() =>
                              handleDeleteBlock(extendedNode.node.subtitle)
                            }
                          />,
                        ],
                };
              }}
            />
          )}
        </div>
      </div>
      <Gallery />
    </Container>
  );
}
