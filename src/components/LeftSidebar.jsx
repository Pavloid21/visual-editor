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
import v4 from "uuid/dist/v4";

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
    ${(props) => (props.show ? "height: 50%;" : "")}
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
  const selectedScreen = useSelector((state) => state.layout.selectedScreen);
  const [activeTab, setActiveTab] = useState(0);
  const [availableScreenes, setScreenes] = useState([]);
  const startTreeData = {
    subtitle: "screen",
    title: "screen",
    expanded: false,
    children: [],
  };
  const [treeData, setTree] = useState([]);
  const [show, toggleComponents] = useState(true);
  const dispatch = useDispatch();

  const buildTreeitem = (block) => {
    if (block) {
      const data = {
        subtitle: block.uuid,
        title: block.type,
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

  const prepareTree = (treeData) => {
    const root = { ...treeData.value };
    root.subtitle = "screen";
    root.title = "Screen";
    root.uuid = treeData.uuid;
    root.children = treeData.value.listItems.map((block) => {
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
    // setTree([root]);
    return root;
  };

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
    return newBlock;
    // dispatch(action);
    // dispatch({ type: actionTypes.EDIT_SCREEN_NAME, screen: object.screen });
  };

  useEffect(() => {
    fetch(
      "http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/screens/"
    )
      .then((response) => response.json())
      .then((screenes) => {
        const screenesArr = screenes.map((screen, index) => {
          return fetch(
            `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/screens/${screen}`
          )
            .then((response) => response.json())
            .catch((e) => {
              console.log("e :>> ", e);
            });
        });
        Promise.allSettled(screenesArr)
          .then((resolves) => {
            const layouts = [];
            resolves.forEach((result) => {
              if (result.status === "fulfilled" && result.value.screen) {
                layouts.push({ uuid: v4(), value: buildLayout(result.value) });
              }
            });
            setScreenes(layouts);
            setTree(layouts.map((layout) => prepareTree(layout)));
          })
          .catch(console.log);
      });
    const screenLayouts = availableScreenes.map((screen) => {
      if (screen.uuid === selectedScreen) {
        console.log(screen, layout);
        return {
          layout: layout,
          uuid: screen.uuid,
        };
      }
      return screen;
    });
    setScreenes(screenLayouts);
  }, [layout, appBar, bottomBar]);

  const handleItemClick = (event, item) => {
    event.stopPropagation();
    console.log("extendedNode :>> ", item.node);
    const uuid = item.node.subtitle;
    if (uuid === "screen") {
      dispatch({
        type: actionTypes.CHANGE_ACTIVE_TAB,
        index: 5,
      });
      dispatch({
        type: actionTypes.SELECT_SCREEN,
        screen: item.node.uuid,
      });
      const screenLayout = availableScreenes.filter(
        (screen) => screen.uuid === item.node.uuid
      )[0];
      console.log("screenLayout :>> ", screenLayout);
      // buildLayout(screenLayout.value);
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

  const handleAddScreen = () => {
    startTreeData.uuid = v4();
    setScreenes([
      ...availableScreenes,
      {
        layout: {
          screen: "screen name",
          listItems: [],
        },
        uuid: startTreeData.uuid,
      },
    ]);
    setTree([...treeData, prepareTree(startTreeData)]);
  };

  // console.log("availableScreenes :>> ", availableScreenes);
  // console.log("treeData :>> ", treeData);

  return (
    <Container show={show}>
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
              Actions
            </span>
          </div>
          <Plus className="icon" onClick={handleAddScreen} />
        </SideBarSubheader>
        <div
          style={{
            height: "calc(100% - 104px)",
            overflow: "auto",
            padding: "14px",
          }}
        >
          {/* {activeTab === 0 && <LoadScreen display />} */}
          <SortableTree
            treeData={treeData}
            onChange={(treeData) => setTree(treeData)}
            theme={FileExplorerTheme}
            generateNodeProps={(extendedNode) => {
              return {
                title: (
                  <section
                    className={`node ${
                      selectedBlock === extendedNode.node.subtitle ||
                      selectedScreen === extendedNode.node.uuid
                        ? "node_selected"
                        : ""
                    }`}
                    onClick={(event) => handleItemClick(event, extendedNode)}
                  >
                    <span>
                      <Icon
                        src={
                          models[extendedNode.node?.title?.toLowerCase()]
                            ?.previewImageUrl
                        }
                      />
                      {extendedNode.node.screen || extendedNode.node.title}
                    </span>
                  </section>
                ),
                buttons:
                  extendedNode.node.subtitle === "screen"
                    ? [<Copy className="icon" />, <Trash className="icon" />]
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
        </div>
      </div>
      <Gallery toggleComponents={toggleComponents} show={show} />
    </Container>
  );
}
