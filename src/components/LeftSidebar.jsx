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
  const api = useSelector((state) => state.api);
  const output = useSelector((state) => state.output.screen);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const selectedBlock = useSelector((state) => state.layout.selectedBlockUuid);
  const selectedScreen = useSelector((state) => state.layout.selectedScreen);
  const [activeTab, setActiveTab] = useState(0);
  const [availableScreenes, setScreenes] = useState([]);
  const [treeData, setTree] = useState([]);
  const [show, toggleComponents] = useState(true);
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

  const prepareTree = (treeData) => {
    const root = { ...treeData.value };
    root.subtitle = "screen";
    root.title = "Screen";
    root.uuid = treeData.uuid;
    root.endpoint = treeData.screenEndpoint;
    root.expanded = treeData.uuid === selectedScreen;
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
    return root;
  };

  const buildLayout = ({ screen, object }) => {
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
    return { newBlock, action, screenEndpoint: screen };
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
            .then((data) => ({ screen, object: data }))
            .catch((e) => {
              console.log("e :>> ", e);
            });
        });
        Promise.allSettled(screenesArr)
          .then((resolves) => {
            const layouts = [];
            resolves.forEach((result) => {
              if (result.status === "fulfilled" && result.value.object.screen) {
                const { newBlock, action, screenEndpoint } = buildLayout(
                  result.value
                );
                layouts.push({
                  uuid: v4(),
                  value: newBlock,
                  action,
                  screenEndpoint,
                });
              }
            });
            setScreenes(layouts);
            setTree(layouts.map((layout) => prepareTree(layout)));
          })
          .catch(console.log);
      });
    const screenLayouts = availableScreenes.map((screen) => {
      if (screen.uuid === selectedScreen) {
        return {
          layout: layout,
          uuid: screen.uuid,
        };
      }
      return screen;
    });
    setScreenes(screenLayouts);
  }, []);

  useEffect(() => {
    const layouts = [];
    availableScreenes.forEach((item) => {
      if (item.uuid === selectedScreen) {
        layouts.push({
          ...item,
          action: {
            ...item.action,
            layout: layout,
          },
          value: {
            ...item.value,
            listItems: layout,
          },
        });
      } else {
        layouts.push(item);
      }
    });
    
    setScreenes(layouts);
    setTree(layouts.map((layout) => prepareTree(layout)));
  }, [layout, appBar, bottomBar, output]);

  useEffect(() => {
    const screenLayout = availableScreenes.filter(
      (screen) => screen.uuid === selectedScreen
    )[0];
    if (screenLayout) {
      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: output,
        snippet: {
          screenID: selectedScreen,
          endpoint: screenLayout.screenEndpoint,
          snippet: snippet({
            screen: output,
            listItems: layout,
          }),
        },
      });
    }
  }, [output])

  const buildJSONitem = (block) => {
    if (block.data.checked) {
      delete block.data.checked;
    }
    const settingsUI = {};
    Object.keys(block.data).forEach((key) => {
      if (
        typeof block.data[key] === "string" &&
        block.data[key].indexOf("{{") >= 0
      ) {
        settingsUI[key] = `${block.data[key]
          .replace("{{", "")
          .replace("}}", "")}`;
      }
      settingsUI[key] = block.data[key];
    });
    const data = {
      type: block.blockId.toUpperCase(),
      settingsUI: settingsUI,
    };
    if (block.listItems) {
      data.listItems = block.listItems.map((item) => buildJSONitem(item));
    }
    return data;
  };

  const prepareJSON = (initial) => {
    initial.listItems = layout[0]
      ? layout.map((block) => {
          return buildJSONitem(block);
        })
      : [];
    if (appBar) {
      initial.appBar = buildJSONitem(appBar);
    } else {
      delete initial.appBar;
    }
    if (bottomBar) {
      initial.bottomBar = buildJSONitem(bottomBar);
    } else {
      delete initial.bottomBar;
    }
  };

  const snippet = (initial) => {
    const reference = { ...initial };
    if (api) {
      const constants = api.list.map((item) => {
        const headers = item.headers?.map((header) => {
          return `"${header.key}": "${header.value}"`;
        });
        const params = item.params?.map((param) => {
          return `"${param.key}": "${param.value}"`;
        });
        return `const ${item.varName} = await api.get("${item.url}"${
          (headers || params) && `, {`
        }${headers && `"headers": {${headers.join(",")}},`}${
          params && `"params": {${params.join(",")}}`
        }});`;
      });
      prepareJSON(reference);
      let jsonString = JSON.stringify(reference, null, 4);
      jsonString = jsonString.replace(/"{{|}}"/g, "");
      constants.push(`return ${jsonString}`);
      return constants.join("\r\n");
    }
  };

  const handleItemClick = (event, item) => {
    event.stopPropagation();
    const uuid = item.node.subtitle;
    if (uuid === "screen") {
      const screenLayout = availableScreenes.filter(
        (screen) => screen.uuid === item.node.uuid
      )[0];
      dispatch({
        type: actionTypes.CHANGE_ACTIVE_TAB,
        index: 5,
      });
      dispatch({
        type: actionTypes.SELECT_SCREEN,
        screen: item.node.uuid,
      });
      dispatch({
        type: actionTypes.SET_SELECTED_BLOCK,
        selectedBlockUuid: "",
      });
      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: item.node.screen,
        snippet: {
          screenID: item.node.uuid,
          endpoint: item.node.endpoint,
          snippet: snippet({
            screen: item.node.screen,
            listItems: layout,
          }),
        },
      });
      dispatch(screenLayout.action);
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
    const layouts = [...availableScreenes];
    const { newBlock, action, screenEndpoint } = buildLayout({
      screen: "new_screen",
      object: {
        screen: "new screen",
        listItems: [],
      },
    });
    layouts.push({ uuid: v4(), value: newBlock, action, screenEndpoint });
    setScreenes(layouts);
    setTree(layouts.map((layout) => prepareTree(layout)));
  };

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
                      {extendedNode.node.endpoint || extendedNode.node.title}
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
