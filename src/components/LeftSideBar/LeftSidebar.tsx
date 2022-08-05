/* eslint-disable react/jsx-key */
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from 'constants/actionTypes';
import SideBarHeader, {SideBarSubheader} from '../SideBarHeader';
import {Gallery} from 'containers/Gallery';
import {Actions} from 'components';
import SortableTree from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from '@nosferatu500/theme-file-explorer';
import {ReactComponent as Copy} from 'assets/copy.svg';
import {ReactComponent as Trash} from 'assets/trash.svg';
import {ReactComponent as Plus} from 'assets/plus.svg';
import models from 'views/blocks/index';
import {v4} from 'uuid';
import {getScreenesList, getScreenByName} from 'services/ApiService';
import {BounceLoader} from 'react-spinners';
import {css} from '@emotion/react';
import Loader from '../Loader';
import {useParams} from 'react-router-dom';
import {observer, snippet, prepareTree, buildLayout} from 'utils';
import {Container, Icon, ScreenTitle} from './LeftSideBar.styled';
import {addAction, setSelectAction} from 'store/actions.slice';
import {setActiveTab as setActiveTabAction} from 'store/config.slice';
import {saveCode} from 'store/code.slice';
import {
  cloneBlock,
  deleteBlock,
  selectScreen,
  setLayout,
  setSelectedBlock,
  setSnippet,
} from 'store/layout.slice';
import type {RootStore} from 'store/types';

const LeftSidebar: React.FC<any> = ({children, ...props}) => {
  const {
    topAppBar,
    bottomBar,
    selectedBlockUuid: selectedBlock,
    selectedScreen,
    blocks: layout,
  } = useSelector((state: RootStore) => state.layout);
  const [loading, setLoading] = useState(false);
  const api = useSelector((state: RootStore) => state.api);
  const output = useSelector((state: RootStore) => state.output.screen);
  const currentSnippet = useSelector(
    (state: RootStore) => state.layout.snippets.filter((snippetData) => snippetData.screenID === selectedScreen)[0]
  );
  const projectName = useSelector((state: RootStore) => state.project.name);
  const {project} = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [availableScreenes, setScreenes] = useState<Record<string, any>[]>([]);
  const [treeData, setTree] = useState<Record<string, any>[]>([]);
  const [show, toggleComponents] = useState(true);
  const [load, setLoadScreen] = useState<Record<string, any>>();
  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: red;
    margin-right: 6px;
  `;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getScreenesList(project).then((screenes) => {
      const screenesArr = screenes.data.map(async (screen: string) => {
        try {
          const response = await getScreenByName(screen, true, project);
          return {
            screen,
            object: response.data,
            logic: response.data,
            project,
          };
        } catch (e) {
          console.log('e :>> ', e);
        }
      });
      Promise.allSettled(screenesArr)
        .then((resolves) => {
          const layouts: Record<string, any>[] = [];
          resolves.forEach((result) => {
            if (result.status === 'fulfilled' && result.value?.object.screen) {
              const {newBlock, action, screenEndpoint} = buildLayout(result.value);
              layouts.push({
                uuid: v4(),
                value: newBlock,
                action,
                screenEndpoint,
                logic: result.value.logic[0],
                project,
              });
            }
          });
          setScreenes(layouts);
          setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
          setLoading(false);
        })
        .catch(console.log);
    });
    const screenLayouts = availableScreenes.map((screen) => {
      if (screen.uuid === selectedScreen) {
        return {
          layout,
          uuid: screen.uuid,
        };
      }
      return screen;
    });
    setScreenes(screenLayouts);
  }, []);

  useEffect(() => {
    const layouts: Record<string, any>[] = [];
    availableScreenes.forEach((item) => {
      if (item.uuid === selectedScreen) {
        layouts.push({
          ...item,
          screenEndpoint: currentSnippet?.endpoint,
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
    setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
  }, [layout, topAppBar, bottomBar, output, currentSnippet]);

  useEffect(() => {
    const screenLayout = availableScreenes.filter((screen) => screen.uuid === selectedScreen)[0];
    if (screenLayout) {
      const constants = snippet(
        {
          screen: output,
          listItems: layout,
        },
        api,
        layout,
        topAppBar,
        bottomBar,
        'code'
      );
      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: output,
        snippet: {
          screenID: selectedScreen,
          endpoint: output.replace(/\s/g, '_'),
          snippet: constants,
        },
      });
      dispatch(saveCode(constants));
      dispatch(setSnippet({
        snippet: constants,
        selectedScreen,
      }));
    }
  }, [output]);

  const handleItemClick = async (event: React.MouseEvent, item: Record<string, any>) => {
    event.stopPropagation();
    const uuid = item.node.subtitle;
    if (uuid === 'screen') {
      setLoadScreen({uuid: item.node.uuid, load: true});
      const script = await getScreenByName(item.node.endpoint, false, project);
      setLoadScreen({uuid: item.node.uuid, load: false});
      const screenLayout = availableScreenes.filter((screen) => screen.uuid === item.node.uuid)[0];
      dispatch(setActiveTabAction(5));
      dispatch(selectScreen({
        screen: item.node.uuid,
      }));
      dispatch(setSelectedBlock(''));
      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: item.node.screen,
        snippet: {
          screenID: item.node.uuid,
          endpoint: item.node.endpoint,
          logic: script.data?.match(/.*return/gs)[0] || ' ',
          snippet: snippet(
            {
              screen: item.node.screen,
              listItems: layout,
            },
            api,
            layout,
            topAppBar,
            bottomBar
          ),
        },
      });
      dispatch(setLayout(screenLayout.action));
    } else {
      observer.broadcast({blockId: uuid, event: 'click'});
    }
  };

  const handleDeleteBlock = useCallback(
    (blockUuid) => {
      dispatch(deleteBlock(blockUuid));
    },
    [dispatch]
  );

  const handleCloneBlock = useCallback(
    (blockUuid) => {
      dispatch(cloneBlock(blockUuid));
    },
    [dispatch]
  );

  const handleDeleteScreen = useCallback(
    (event, node) => {
      event.stopPropagation();
      const layouts = [...availableScreenes];
      setScreenes(layouts.filter((layout) => layout.uuid !== node.uuid));
      const newTree = treeData.filter((item) => item.uuid !== node.uuid);
      setTree(newTree);
      dispatch(selectScreen({
        delete: true,
        screen: node.uuid,
      }));
      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: node.screen,
        snippet: {
          screenID: node.uuid,
          endpoint: node.endpoint,
          snippet: snippet({
            screen: node.screen,
            listItems: layout,
          }),
        },
      });
    },
    [availableScreenes, dispatch, layout, treeData]
  );

  const handleAddScreen = useCallback(() => {
    const layouts = [...availableScreenes];
    const {newBlock, action, screenEndpoint} = buildLayout({
      screen: 'new_screen',
      object: {
        screen: 'new screen',
        listItems: [],
      },
    });
    layouts.push({uuid: v4(), value: newBlock, action, screenEndpoint});
    setScreenes(layouts);
    setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
  }, [availableScreenes, bottomBar, selectedScreen, topAppBar]);

  const handleAddAction = useCallback(() => {
    const added = {
      action: 'new_action',
      object: '',
    };
    dispatch(addAction(added));
  }, [dispatch]);

  const handleCloneScreen = useCallback(
    (event, screenUuid) => {
      event.stopPropagation();
      let cloneIndex = null;
      treeData.forEach((item, index) => {
        if (item.uuid === screenUuid) {
          cloneIndex = index;
        }
      });
      if (cloneIndex) {
        const screens = [...availableScreenes];
        screens.push({
          ...screens[cloneIndex],
          uuid: v4(),
        });
        setScreenes(screens);
        setTree(screens.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
      }
    },
    [availableScreenes, bottomBar, selectedScreen, topAppBar, treeData]
  );

  if (!props.display) {
    return null;
  }

  return (
    <Container show={show}>
      <div>
        <SideBarHeader title={projectName} left />
        <SideBarSubheader>
          <div>
            <span
              className={activeTab === 0 ? 'tab_active' : ''}
              onClick={() => {
                setActiveTab(0);
                dispatch(setSelectAction(null));
              }}
            >
              Screens
            </span>
            <span className={activeTab === 1 ? 'tab_active' : ''} onClick={() => setActiveTab(1)}>
              Actions
            </span>
          </div>
          <Plus className="icon" onClick={activeTab === 0 ? handleAddScreen : handleAddAction} />
        </SideBarSubheader>
        {activeTab === 0 && (
          <div
            style={{
              height: 'calc(100% - 104px)',
              overflow: 'auto',
              padding: '14px',
              position: 'relative',
            }}
          >
            {loading ? (
              <Loader loading={true} size={40} />
            ) : (
              <SortableTree
                treeData={treeData}
                onChange={(treeData) => setTree(treeData)}
                theme={FileExplorerTheme}
                generateNodeProps={(extendedNode) => {
                  return {
                    title: (
                      <section
                        className={`node ${
                          selectedBlock === extendedNode.node.subtitle || selectedScreen === extendedNode.node.uuid
                            ? 'node_selected'
                            : ''
                        }`}
                        onClick={async (event) => await handleItemClick(event, extendedNode)}
                      >
                        <ScreenTitle>
                          {load?.load && load?.uuid === extendedNode.node.uuid ? (
                            <BounceLoader loading={true} size={24} color="#F44532" css={override} />
                          ) : (
                            <Icon src={models[extendedNode.node?.title?.toLowerCase()]?.previewImageUrl} />
                          )}
                          <span>{extendedNode.node.endpoint || extendedNode.node.title}</span>
                        </ScreenTitle>
                      </section>
                    ),
                    buttons: [
                      <Copy
                        className="icon"
                        onClick={(event) => {
                          extendedNode.node.subtitle === 'screen'
                            ? handleCloneScreen(event, extendedNode.node.uuid)
                            : handleCloneBlock(extendedNode.node.subtitle);
                        }}
                      />,
                      <Trash
                        className="icon"
                        onClick={(event) =>
                          extendedNode.node.subtitle === 'screen'
                            ? handleDeleteScreen(event, extendedNode.node)
                            : handleDeleteBlock(extendedNode.node.subtitle)
                        }
                      />,
                    ],
                  };
                }}
              />
            )}
          </div>
        )}
        {activeTab === 1 && <Actions />}
      </div>
      <Gallery toggleComponents={toggleComponents} show={show} />
    </Container>
  );
};

export default LeftSidebar;
