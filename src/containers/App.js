import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import renderHandlebars from "../utils/renderHandlebars";
import LeftSidebar from "../components/LeftSidebar";
import Preview from "./Preview";
import actionTypes from "../constants/actionTypes";
import { DndWrapper } from "./DnDWrapper";
import { observer } from "../utils/observer";
import { findInTree } from "../reducers/layout";
import TopBar from "../components/TopBar";
import GlobalStyles from "../constants/theme";
import RightSidebar from "../components/RightSideBar";

const App = () => {
  const layout = useSelector((state) => state.layout);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const appBar = useSelector((state) => state.layout.appBar);
  const config = useSelector((state) => state.config);
  const barState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.event) {
        if (event.data.blockId && event.data.event === "click") {
          handleChangeActiveTab(0);
          handleSetSelectedBlock(event.data.blockId);
        } else if (event.data.newOrder && event.data.event === "sorted") {
          handleReorderLayout(
            event.data.newOrder,
            event.data.parentID,
            layout.blocks
          );
        }
      }
    };

    observer.subscribe((data) => {
      handleMessage({ data, event: data.event });
    });
  }, [layout, bottomBar]);

  const handleChangeActiveTab = (index) => {
    dispatch({
      type: actionTypes.CHANGE_ACTIVE_TAB,
      index,
    });
  };

  const handleChangePreviewMode = (mode) => {
    dispatch({
      type: actionTypes.CHANGE_PREVIEW_MODE,
      mode,
    });
  };

  const handleSetSelectedBlock = (blockUuid) => {
    dispatch({
      type: actionTypes.SET_SELECTED_BLOCK,
      blockUuid,
    });
  };

  const handleReorderLayout = (newOrder, parentID, blocksLayout) => {
    const order = [];
    let parent = null;
    newOrder.forEach((blockUuid) => {
      const block = findInTree(blocksLayout, blockUuid);
      parent = findInTree(blocksLayout, parentID);
      order.push(block);
    });
    if (parent) {
      parent.listItems = order;
      dispatch({
        type: actionTypes.REPLACE_ELEMENT,
        element: parent,
      });
    } else {
      const uuids = blocksLayout.map((block) => block.uuid);
      const next = order.filter((item) => uuids.includes(item.uuid));
      dispatch({
        type: actionTypes.REORDER_LAYOUT,
        newBlocksLayout: next,
      });
    }
  };

  const { components, schema } = renderHandlebars(
    layout.blocks,
    layout.documentId,
    bottomBar,
    appBar
  );
  const innerHTML = schema;
  const { previewMode } = config;

  const handleAppClick = (e) => {
    if (!e.target.onclick && e.target.localName !== "input") {
      dispatch({
        type: actionTypes.SET_SELECTED_BLOCK,
        blockUuid: "",
      });
    }
  };

  return (
    <div id="APP" onClick={handleAppClick}>
      <DndWrapper id="APP">
        <TopBar />
        <Router>
          <div
            className="wrapper d-flex"
            style={{
              paddingTop: "60px",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <LeftSidebar display={barState.left} />
                    <Preview
                      html={innerHTML}
                      components={components}
                      onChangePreviewMode={handleChangePreviewMode}
                      previewMode={previewMode}
                    />
                    <RightSidebar display={barState.right} />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </DndWrapper>
      <GlobalStyles />
    </div>
  );
};

export default App;
