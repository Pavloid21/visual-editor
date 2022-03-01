import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import renderHandlebars from "../utils/renderHandlebars";
import NarrowSidebar from "../components/NarrowSidebar";
import WideSidebar from "../components/WideSidebar";
import TreeViewSidebar from "../components/TreeViewSidebar";
import LoadScreen from "./LoadScreen";

import Preview from "./Preview";
import BlocksGallery from "./BlocksGallery";
import Search from "./Search";
import Inspector from "./Inspector";
import Settings from "./Settings";
import Screen from "./Screen";

import actionTypes from "../constants/actionTypes";
import Output from "./Output";

import { DndWrapper } from "./DnDWrapper";
import { observer } from "../utils/observer";
import { findInTree } from "../reducers/layout";

const App = () => {
  const layout = useSelector((state) => state.layout);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const config = useSelector((state) => state.config);
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

  const handlePushBlock = (blockId) => {
    dispatch({
      type: actionTypes.PUSH_BLOCK,
      blockId,
    });
  };

  const handlePushBlockInside = (blockId, uuid) => {
    dispatch({
      type: actionTypes.PUSH_BLOCK_INSIDE,
      blockId,
      uuid,
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
    bottomBar
  );
  const innerHTML = schema;
  const { activeTab, previewMode } = config;

  return (
    <div id="APP">
      <DndWrapper id="APP">
        <Router>
          <div className="wrapper d-flex">
            <Switch>
              <Route path="/">
                <NarrowSidebar
                  onChangeActiveTab={handleChangeActiveTab}
                  activeTab={activeTab}
                />
                <WideSidebar>
                  <Inspector display={activeTab === 0} />
                  <Search
                    display={activeTab === 1}
                    onPushBlock={handlePushBlock}
                    onPushBlockInside={handlePushBlockInside}
                  />
                  <LoadScreen display={activeTab === 2} />
                  <Screen
                    category="screen"
                    display={activeTab === 5}
                    onPushBlock={handlePushBlock}
                    onPushBlockInside={handlePushBlockInside}
                  />
                  <BlocksGallery
                    category="Layouts"
                    display={activeTab === 7}
                    onPushBlock={handlePushBlock}
                    onPushBlockInside={handlePushBlockInside}
                  />
                  <BlocksGallery
                    category="Controls"
                    display={activeTab === 8}
                    onPushBlock={handlePushBlock}
                    onPushBlockInside={handlePushBlockInside}
                  />
                  <Output display={activeTab === 9} html={innerHTML} />
                  <Settings display={activeTab === 10} />
                </WideSidebar>
                <Preview
                  html={innerHTML}
                  components={components}
                  onChangePreviewMode={handleChangePreviewMode}
                  previewMode={previewMode}
                />
                <TreeViewSidebar />
              </Route>
            </Switch>
          </div>
        </Router>
      </DndWrapper>
    </div>
  );
};

export default App;
