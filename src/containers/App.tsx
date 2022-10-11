import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {default as AppRoutes} from 'routes/routes';
import {renderHandlebars, observer, findInTree} from 'utils';
import {LeftSidebar, TopBar, RightSidebar, HighlightedElement, Loader} from 'components';
import {Preview} from './Preview';
import actionTypes from 'constants/actionTypes';
import GlobalStyles from 'constants/theme';
import {Login} from './Login';
import RequireAuth from 'auth/RequireAuth';
import {useKeycloak} from '@react-keycloak/web';
import {Project} from './Project';
import {API} from 'services/ApiService';
import 'react-notifications-component/dist/theme.css';
import {setActiveTab, setPreviewMode} from 'store/config.slice';
import {reOrderLayout, replaceElement, setSelectedBlock} from 'store/layout.slice';
import type {BlockItem, RootStore} from 'store/types';
import {Templates} from './Templates/Templates';

const App: React.FC<unknown> = () => {
  const layout = useSelector((state: RootStore) => state.layout);
  const location = useLocation();
  const bottomBar = useSelector((state: RootStore) => state.layout.bottomBar);
  const topAppBar = useSelector((state: RootStore) => state.layout.topAppBar);
  const config = useSelector((state: RootStore) => state.config);
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
          dispatch(setActiveTab(0));
          dispatch(setSelectedBlock(data.blockId));
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

  const handleChangePreviewMode = (mode: number) => {
    dispatch(setPreviewMode(mode));
  };

  const handleReorderLayout = (newOrder: string[], parentID: string, blocksLayout: BlockItem[]) => {
    const order: BlockItem[] = [];
    let parent: BlockItem | null = null;
    for (const blockUuid of newOrder) {
      const block = findInTree(blocksLayout, blockUuid);
      parent = findInTree(blocksLayout, parentID);
      if (block) {
        order.push(block);
      }
    }
    if (parent) {
      dispatch(
        replaceElement({
          ...parent,
          listItems: order,
        })
      );
    } else {
      const uuids = blocksLayout.map((block) => block.uuid);
      const next = order.filter((item) => uuids.includes(item.uuid));
      const uniqueBlockItemList: BlockItem[] = [...new Set(next.map((blockItem) => JSON.stringify(blockItem)))].map(
        (blockItem) => JSON.parse(blockItem)
      );
      dispatch(reOrderLayout(uniqueBlockItemList));
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
          <Route path={AppRoutes.HOME} element={<Navigate to={AppRoutes.PROJECT} />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route
            path={AppRoutes.PROJECT}
            element={
              <RequireAuth>
                <Project />
              </RequireAuth>
            }
          />
          <Route
            path={AppRoutes.TEMPLATES}
            element={
              <RequireAuth>
                <Templates />
              </RequireAuth>
            }
          />
          <Route
            path={`${AppRoutes.EDITOR}/:project`}
            element={
              <RequireAuth>
                <LeftSidebar />
                <Preview
                  components={components}
                  onChangePreviewMode={handleChangePreviewMode}
                  previewMode={previewMode}
                />
                <RightSidebar />
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
