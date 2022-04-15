import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from '../constants/actionTypes';
import {observer} from '../utils/observer';
import SideBarHeader, {SideBarSubheader} from './SideBarHeader';
import Gallery from '../containers/Gallery';
import Actions from './Actions';
import SortableTree from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from '@nosferatu500/theme-file-explorer';
import {ReactComponent as Copy} from '../assets/copy.svg';
import {ReactComponent as Trash} from '../assets/trash.svg';
import {ReactComponent as Plus} from '../assets/plus.svg';
import models from '../views/blocks/index';
import v4 from 'uuid/dist/v4';
import {snippet} from '../utils/prepareModel';
import {getScreenesList, getScreenByName} from '../services/ApiService';
import {BounceLoader} from 'react-spinners';
import {css} from '@emotion/react';
import Loader from './Loader';
import {useParams} from 'react-router-dom';

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
    ${(props) => (props.show ? 'height: 50%;' : '')}
  }
  & > div {
    overflow: hidden;
    & .rst__virtualScrollOverride > div {
      position: static !important;
    }
  }

  @media (max-width: 1500px) {
    min-width: 300px;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const SreenTitle = styled.div`
  display: flex;
  align-items: center;
`;

export default function LeftSidebar({children, ...props}) {
  const layout = useSelector((state) => state.layout.blocks);
  const topAppBar = useSelector((state) => state.layout.topAppBar);
  const api = useSelector((state) => state.api);
  const output = useSelector((state) => state.output.screen);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const selectedBlock = useSelector((state) => state.layout.selectedBlockUuid);
  const selectedScreen = useSelector((state) => state.layout.selectedScreen);
  const {project} = useParams();
  const projectName = useSelector((state) => state.project.name);
  const [activeTab, setActiveTab] = useState(0);
  const [availableScreenes, setScreenes] = useState([]);
  const [treeData, setTree] = useState([]);
  const [show, toggleComponents] = useState(true);
  const [load, setLoadScreen] = useState();
  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: red;
    margin-right: 6px;
  `;
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
      if (block.listItem) {
        data.children = [buildTreeitem(block.listItem)];
      }
      return data;
    }
    return null;
  };

  const prepareTree = (treeData) => {
    const root = {...treeData.value};
    root.subtitle = 'screen';
    root.title = 'Screen';
    root.uuid = treeData.uuid;
    root.endpoint = treeData.screenEndpoint;
    root.logic = treeData.logic;
    root.expanded = treeData.uuid === selectedScreen;
    if (treeData.value.listItems) {
      root.children = treeData.value.listItems.map((block) => {
        return buildTreeitem(block);
      });
    } else if (treeData.value.listItem) {
      root.children = [buildTreeitem(treeData.value.listItem)];
    }
    if (topAppBar) {
      root.children.unshift({
        title: 'TOPAPPBAR',
        subtitle: topAppBar?.uuid,
      });
    }
    if (bottomBar) {
      root.children.push({
        title: 'BOTTOMBAR',
        subtitle: bottomBar?.uuid,
      });
    }
    return root;
  };

  const buildLayout = ({screen, object}) => {
    const tree = object.listItems;
    let newBlock = {
      screen: object.screen,
      listItems: [],
    };
    const traverse = function (tree) {
      return tree.map((item) => {
        const {settingsUI, action, listItems, listItem, ...interactive} = item;
        let reference = {};
        reference.uuid = v4();
        reference.blockId = item.type.toLowerCase();
        reference.settingsUI = settingsUI;
        reference.interactive = interactive;
        if (listItems) {
          reference.listItems = traverse(listItems);
        }
        if (listItem) {
          reference.listItem = traverse([listItem])[0];
        }
        if (action) {
          reference.interactive = {action};
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
        blockId: 'bottombar',
        uuid: v4(),
        settingsUI: {
          ...object.bottomBar.settingsUI,
          navigationItems: object.bottomBar.navigationItems,
        },
      };
    }
    if (object.topAppBar) {
      action.topAppBar = {
        blockId: 'topappbar',
        uuid: v4(),
        settingsUI: {
          ...object.topAppBar.settingsUI,
        },
        interactive: {
          appBarItems: {...object.topAppBar.appBarItems},
        }
      };
    }
    return {newBlock, action, screenEndpoint: screen};
  };

  useEffect(() => {
    getScreenesList(project).then((screenes) => {
      const screenesArr = screenes.data.map((screen) => {
        return getScreenByName(project, screen, true)
          .then((response) => {
            return {
              screen,
              object: response.data,
              logic: response.data,
              project,
            };
          })
          .catch((e) => {
            console.log('e :>> ', e);
          });
      });
      Promise.allSettled(screenesArr)
        .then((resolves) => {
          const layouts = [];
          resolves.forEach((result, index) => {
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
          setTree(layouts.map((layout) => prepareTree(layout)));
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
  }, [layout, topAppBar, bottomBar, output]);

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
      dispatch({type: actionTypes.SAVE_CODE, code: constants});
      dispatch({
        type: actionTypes.SET_SNIPPET,
        snippet: constants,
        selectedScreen,
      });
    }
  }, [output]);

  const handleItemClick = async (event, item) => {
    event.stopPropagation();
    const uuid = item.node.subtitle;
    if (uuid === 'screen') {
      setLoadScreen({uuid: item.node.uuid, load: true});
      const script = await getScreenByName(project, item.node.endpoint, false);
      setLoadScreen({uuid: item.node.uuid, load: false});
      const screenLayout = availableScreenes.filter((screen) => screen.uuid === item.node.uuid)[0];
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
        selectedBlockUuid: '',
      });
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
      dispatch(screenLayout.action);
    } else {
      observer.broadcast({blockId: uuid, event: 'click'});
    }
  };

  const handleDeleteBlock = (blockUuid) => {
    dispatch({
      type: actionTypes.DELETE_BLOCK,
      blockUuid,
    });
  };

  const handleCloneBlock = (blockUuid) => {
    dispatch({
      type: actionTypes.CLONE_BLOCK,
      blockUuid,
    });
  };

  if (!props.display) {
    return null;
  }

  const handleAddScreen = () => {
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
    setTree(layouts.map((layout) => prepareTree(layout)));
  };

  const handleAddAction = () => {
    const added = {
      action: 'new_action',
      object: '',
    };
    dispatch({
      type: actionTypes.ADD_ACTION,
      action: added,
    });
  };

  const handleDeleteScreen = (event, node) => {
    event.stopPropagation();
    const newTree = treeData.filter((item) => item.uuid !== node.uuid);
    setTree(newTree);
    dispatch({
      type: actionTypes.SELECT_SCREEN,
      delete: true,
      screen: node.uuid,
    });
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
  };

  const handleCloneScreen = (event, screenUuid) => {
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
      setTree(screens.map((layout) => prepareTree(layout)));
    }
  };

  return (
    <Container show={show}>
      <div>
        <SideBarHeader title={projectName} />
        <SideBarSubheader>
          <div>
            <span
              className={activeTab === 0 ? 'tab_active' : ''}
              onClick={() => {
                setActiveTab(0);
                dispatch({type: actionTypes.SELECT_ACTION, selected: null});
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
            {!treeData.length ? (
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
                        <SreenTitle>
                          {load?.load && load?.uuid === extendedNode.node.uuid ? (
                            <BounceLoader loading={true} size={24} color="#F44532" css={override} />
                          ) : (
                            <Icon src={models[extendedNode.node?.title?.toLowerCase()]?.previewImageUrl} />
                          )}
                          <span>{extendedNode.node.endpoint || extendedNode.node.title}</span>
                        </SreenTitle>
                      </section>
                    ),
                    buttons:
                      extendedNode.node.subtitle === 'screen'
                        ? [
                            <Copy
                              className="icon"
                              onClick={(event) => {
                                handleCloneScreen(event, extendedNode.node.uuid);
                              }}
                            />,
                            <Trash
                              className="icon"
                              onClick={(event) => handleDeleteScreen(event, extendedNode.node)}
                            />,
                          ]
                        : [
                            <Copy className="icon" onClick={() => handleCloneBlock(extendedNode.node.subtitle)} />,
                            <Trash className="icon" onClick={() => handleDeleteBlock(extendedNode.node.subtitle)} />,
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
}
