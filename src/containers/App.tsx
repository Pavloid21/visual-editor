import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {renderHandlebars, observer, findInTree} from 'utils';
import {LeftSidebar, TopBar, RightSidebar, HighlightedElement, Loader} from 'components';
import Preview from './Preview';
import actionTypes from 'constants/actionTypes';
import GlobalStyles from 'constants/theme';
import {Login} from './Login';
import RequireAuth from 'auth/RequireAuth';
import {useKeycloak} from '@react-keycloak/web';
import {Project} from './Project';
import {API} from 'services/ApiService';
import 'react-notifications-component/dist/theme.css';
import {BlockItem, Store} from 'reducers/types';

const App: React.FC<unknown> = () => {
  const layout = useSelector((state: Store) => state.layout);
  const location = useLocation();
  const bottomBar = useSelector((state: Store) => state.layout.bottomBar);
  const topAppBar = useSelector((state: Store) => state.layout.topAppBar);
  const config = useSelector((state: Store) => state.config);
  const barState = useSelector((state: Store) => state.sideBar);
  const dispatch = useDispatch();
  const {initialized, keycloak} = useKeycloak();
  const setHeaderAuthorizationToken = () => {
    if (keycloak.token) {
      API.defaults.headers.common.Authorization = `Bearer ${keycloak.token}`;
    }
  };

  useEffect(() => {
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(50);
    };
    keycloak.onAuthSuccess = setHeaderAuthorizationToken;
    keycloak.onAuthRefreshSuccess = setHeaderAuthorizationToken;
  }, [!keycloak.authenticated]);

  useEffect(() => {
    const handleMessage = (data: Record<string, any>) => {
      if (data.event) {
        if (data.blockId && data.event === 'click') {
          handleChangeActiveTab(0);
          handleSetSelectedBlock(data.blockId);
        } else if (data.newOrder && data.event === 'sorted') {
          handleReorderLayout(data.newOrder, data.parentID, layout.blocks);
        }
      }
    };

    observer.subscribe((data: Record<string, any>) => {
      handleMessage({...data, event: data.event});
    });
  }, [layout, bottomBar]);

  useEffect(() => {
    dispatch({
      type: actionTypes.ERASE,
    });
  }, [location, dispatch]);

  const handleChangeActiveTab = (index: number) => {
    dispatch({
      type: actionTypes.CHANGE_ACTIVE_TAB,
      index,
    });
  };

  const handleChangePreviewMode = (mode: number) => {
    dispatch({
      type: actionTypes.CHANGE_PREVIEW_MODE,
      mode,
    });
  };

  const handleSetSelectedBlock = (blockUuid: string) => {
    dispatch({
      type: actionTypes.SET_SELECTED_BLOCK,
      blockUuid,
    });
  };

  const handleReorderLayout = (newOrder: string[], parentID: string, blocksLayout: BlockItem[]) => {
    const order: BlockItem[] = [];
    let parent: BlockItem | null = null;
    newOrder.forEach((blockUuid) => {
      const block = findInTree(blocksLayout, blockUuid);
      parent = findInTree(blocksLayout, parentID);
      if (block) {
        order.push(block);
      }
    });
    if (parent) {
      // @ts-ignore
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
        // @ts-ignore
        newBlocksLayout: [...new Set(next.map(JSON.stringify))].map(JSON.parse),
      });
    }
  };

  const {components} = renderHandlebars(layout.blocks, layout.documentId, bottomBar, topAppBar);
  const {previewMode} = config;

  if (!initialized) {
    return <Loader loading={!initialized} />;
  }

  return (
    <div>
      <GlobalStyles />
      <div
        className="wrapper d-flex"
        style={{
          paddingTop: '60px',
          justifyContent: 'center',
          height: '100vh',
          display: 'flex',
        }}
      >
        <TopBar />
        <Routes>
          <Route path="/" element={<Navigate to="/project" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/project"
            element={
              <RequireAuth>
                <Project />
              </RequireAuth>
            }
          />
          <Route
            path="/editor/:project"
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
      <HighlightedElement />
    </div>
  );
};

export default App;
