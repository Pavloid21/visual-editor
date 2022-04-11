import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import renderHandlebars from '../utils/renderHandlebars';
import LeftSidebar from '../components/LeftSidebar';
import Preview from './Preview';
import actionTypes from '../constants/actionTypes';
import {DndWrapper} from './DnDWrapper';
import {observer} from '../utils/observer';
import {findInTree} from '../reducers/layout';
import TopBar from '../components/TopBar';
import GlobalStyles from '../constants/theme';
import RightSidebar from '../components/RightSideBar';
import HighlightedElement from '../components/HighlightedElement';
import {AuthProvider, AuthContext} from 'auth';
import {ReactKeycloakProvider} from "@react-keycloak/web"
import Login from './Login';
import RequireAuth from 'auth/RequireAuth';
import keycloack from '../constants/keykloak';

const App = () => {
  const layout = useSelector((state) => state.layout);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const topAppBar = useSelector((state) => state.layout.topAppBar);
  const config = useSelector((state) => state.config);
  const barState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.event) {
        if (event.data.blockId && event.data.event === 'click') {
          handleChangeActiveTab(0);
          handleSetSelectedBlock(event.data.blockId);
        } else if (event.data.newOrder && event.data.event === 'sorted') {
          handleReorderLayout(event.data.newOrder, event.data.parentID, layout.blocks);
        }
      }
    };

    observer.subscribe((data) => {
      handleMessage({data, event: data.event});
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

  const {components} = renderHandlebars(layout.blocks, layout.documentId, bottomBar, topAppBar);
  const {previewMode} = config;

  const handleAppClick = (e) => {
    if (!e.target.onclick && e.target.localName !== 'input' && e.target.className !== 'saturation-black') {
      console.log('e.target', e.target);
      dispatch({
        type: actionTypes.SET_SELECTED_BLOCK,
        blockUuid: '',
      });
    }
  };

  return (
    // <AuthProvider onLogin={() => navigate('/editor')} onLogout={() => navigate('/login')} defaultAuthenticated={false}>
    <ReactKeycloakProvider authClient={keycloack}>
      <div id="APP" onClick={handleAppClick}>
        <DndWrapper id="APP">
          <div
            className="wrapper d-flex"
            style={{
              paddingTop: '60px',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <TopBar />
            <Routes>
              <Route exact path="/" element={<Navigate to="/editor" />} />
              <Route
                exact
                path="/login"
                element={
                  <>
                    <Login />
                  </>
                }
              />
              <Route
                path="/editor"
                element={
                  <RequireAuth>
                    <LeftSidebar display={barState.left} />
                    <Preview
                      components={components}
                      onChangePreviewMode={handleChangePreviewMode}
                      previewMode={previewMode}
                    />
                    <RightSidebar display={barState.right} />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </DndWrapper>
        <GlobalStyles />
        <HighlightedElement />
      </div>
    </ReactKeycloakProvider>
    // </AuthProvider>
  );
};

export default App;
