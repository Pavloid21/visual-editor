/* eslint-disable react/jsx-key */
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from 'constants/actionTypes';
import {Gallery} from 'containers/Gallery';
import {Actions, ButtonSelector, Modal, SideBarHeader} from 'components';
import SortableTree from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from '@nosferatu500/theme-file-explorer';
import {ReactComponent as Copy} from 'assets/copy.svg';
import {ReactComponent as Trash} from 'assets/trash.svg';
import models from 'views/blocks/index';
import {v4} from 'uuid';
import {getScreenesList, getScreenByName, getScreenTemplates, getTemplateData} from 'services/ApiService';
import {BounceLoader} from 'react-spinners';
import {css} from '@emotion/react';
import Loader from '../Loader';
import {useParams} from 'react-router-dom';
import {observer, snippet, prepareTree, buildLayout, useModal} from 'utils';
import {Container, DefaultTemplateWrapper, Icon, ModalContent, ScreenTitle, TemplateItem} from './LeftSideBar.styled';
import {addAction, setSelectAction} from 'store/actions.slice';
import {setActiveTab as setActiveTabAction} from 'store/config.slice';
import {saveCode} from 'store/code.slice';
import {cloneBlock, deleteBlock, selectScreen, setLayout, setSelectedBlock, setSnippet} from 'store/layout.slice';
import type {RootStore} from 'store/types';
import {Bar} from 'containers/Project/Modal/Modal.styled';
import {ReactComponent as Close} from 'assets/close.svg';
import {screenTemplates as defaultTemplates} from 'constants/screenTemplates';
import {Subheader} from './Subheader';
import {setScreens} from 'store/screens.slice';

const LeftSidebar: React.FC<unknown> = () => {
  const {
    topAppBar,
    bottomBar,
    selectedBlockUuid: selectedBlock,
    selectedScreen,
    blocks: layout,
  } = useSelector((state: RootStore) => state.layout);
  const [loading, setLoading] = useState(false);
  const barState = useSelector((state: RootStore) => state.sideBar);
  const api = useSelector((state: RootStore) => state.api);
  const {screen: output, navigationSettings} = useSelector((state: RootStore) => state.output);
  const currentSnippet = useSelector(
    (state: RootStore) => state.layout.snippets.filter((snippetData) => snippetData.screenID === selectedScreen)[0]
  );
  const projectName = useSelector((state: RootStore) => state.project.name);
  const {project} = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [availableScreenes, setScreenes] = useState<Record<string, any>[]>([]);
  const [treeData, setTree] = useState<Record<string, any>[]>([]);
  const [load, setLoadScreen] = useState<Record<string, any>>();
  const [templates, setScreenTemplates] = useState<Record<string, any>[]>([]);
  const [itemModalOpen, setItemModalOpen] = useModal();
  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: red;
    margin-right: 6px;
  `;
  const dispatch = useDispatch();

  const generatePromiseStack = useCallback(
    (data: any[], parsed: boolean) => {
      const screenesArr = data.map(async (screen: string) => {
        try {
          const response = await getScreenByName(screen, parsed, project);
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
      return screenesArr;
    },
    [project]
  );

  useEffect(() => {
    setLoading(true);
    getScreenesList(project).then(({data}) => {
      Promise.allSettled(generatePromiseStack(data, true))
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
          dispatch(setScreens(data.map((item: string) => ({label: item, value: `screen/${item}`}))));
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
          navigationSettings,
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
      dispatch(
        setSnippet({
          snippet: constants,
          selectedScreen,
        })
      );
    }
  }, [output]);

  const parseRuturnStatement = (script: any) => {
    const func = eval(`(() => {${'return {' + script.data?.match(/(?<=^return.{).*$/gms)[0]}})`);
    return func();
  };

  const updateScreenList = (script: any, screenLayout: Record<string, any>, screenPositionInList: number) => {
    if (script.data) {
      const rawData = {
        screen,
        logic: parseRuturnStatement(script),
        object: parseRuturnStatement(script),
        project,
      };
      const {newBlock, action, screenEndpoint} = buildLayout(rawData);
      const newScreenData = {
        uuid: screenLayout.uuid,
        value: newBlock,
        action,
        screenEndpoint,
        logic: rawData.logic[0],
        project,
      };
      const nextList = [...availableScreenes];
      nextList[screenPositionInList] = newScreenData;
      return nextList;
    }
    return availableScreenes;
  };

  const handleItemClick = async (event: React.MouseEvent, item: Record<string, any>) => {
    event.stopPropagation();
    const uuid = item.node.subtitle;
    if (uuid === 'screen') {
      setLoadScreen({uuid: item.node.uuid, load: true});
      const script = await getScreenByName(item.node.endpoint, false, project);
      setLoadScreen({uuid: item.node.uuid, load: false});
      let screenPositionInList = 0;
      const screenLayout = availableScreenes.filter((screen, index) => {
        if (screen.uuid === item.node.uuid) {
          screenPositionInList = index;
          return true;
        }
      })[0];
      const nextList = updateScreenList(script, screenLayout, screenPositionInList);
      dispatch(setActiveTabAction(5));
      dispatch(
        selectScreen({
          screen: item.node.uuid,
        })
      );
      dispatch(setSelectedBlock(''));
      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: item.node.screen,
        navigationSettings: item.node.navigationSettings,
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
      dispatch(setLayout(nextList[screenPositionInList].action));
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
      dispatch(
        selectScreen({
          delete: true,
          screen: node.uuid,
        })
      );
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
    setItemModalOpen(true);
    getScreenTemplates().then(({data}) => {
      const screenesArr = data.map(async (templateId: string) => {
        try {
          const template = await getTemplateData(templateId, 'screens=true');
          return template;
        } catch (e) {
          console.log('e', e);
        }
      });
      Promise.allSettled(screenesArr)
        .then((resolves) => {
          const screenTemplates = resolves.reduce((acc: any[], result) => {
            if (result.status === 'fulfilled') {
              acc.push(result.value.data);
            }
            return acc;
          }, [] as any[]);
          setScreenTemplates(screenTemplates);
        })
        .catch(console.log);
    });
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

  const handleSelectTemplate = useCallback(
    (template: Record<string, any>) => {
      const {snippets} = template;
      const screenName = Object.keys(snippets.screens)[0];
      const code: string = snippets.screens[screenName].replace(/return/g, '');
      const layouts = [...availableScreenes];
      const {newBlock, action, screenEndpoint} = buildLayout({
        screen: screenName,
        object: JSON.parse(code),
      });
      layouts.push({uuid: v4(), value: newBlock, action, screenEndpoint});
      setScreenes(layouts);
      setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
      setItemModalOpen(false);
    },
    [availableScreenes, bottomBar, selectedScreen, topAppBar]
  );

  const handleDefaultTemplate = useCallback(
    (snippet: any) => {
      const layouts = [...availableScreenes];
      const {newBlock, action, screenEndpoint} = buildLayout({
        screen: snippet.screen,
        object: snippet,
      });
      layouts.push({uuid: v4(), value: newBlock, action, screenEndpoint});
      setScreenes(layouts);
      setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
      setItemModalOpen(false);
    },
    [availableScreenes, bottomBar, selectedScreen, setItemModalOpen, topAppBar]
  );

  if (!barState.left) {
    return null;
  }

  return (
    <Container>
      <div className="screen-list">
        <SideBarHeader title={projectName} left />
        <Subheader
          activeTab={activeTab}
          handleAddAction={handleAddAction}
          handleAddScreen={handleAddScreen}
          handleClick={() => {
            setActiveTab(0);
            dispatch(setSelectAction(null));
          }}
          setActiveTab={setActiveTab}
        />
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
                            <Icon src={models[extendedNode.node?.title?.toLowerCase()]?.().previewImageUrl} />
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
      <Gallery />
      <Modal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)} style={{width: 'fit-content'}}>
        <Bar>
          <h3>Screens</h3>
          <div>
            <Close className="icon" onClick={() => setItemModalOpen(false)} />
          </div>
        </Bar>
        <ModalContent>
          <div id="center">
            <ButtonSelector
              buttons={[
                {title: 'Technical', key: 'technical', uuid: v4()},
                {title: 'Business', key: 'business', uuid: v4()},
              ]}
              onChange={function (): void {
                throw new Error('Function not implemented.');
              }}
              value={'technical'}
            />
          </div>
          <div className="modal_columns">
            <div className="modal_col side">
              <h3>Templates</h3>
              {templates.map((template, index) => (
                <TemplateItem key={`template_${index}`} onClick={() => handleSelectTemplate(template)}>
                  {template.title}
                </TemplateItem>
              ))}
            </div>
            <div className="modal_col grid">
              {defaultTemplates.map(({img: Image, title, snippet}) => (
                <DefaultTemplateWrapper key={snippet.screen} onClick={() => handleDefaultTemplate(snippet)}>
                  <Image style={{filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.1))'}} />
                  <span>{title}</span>
                </DefaultTemplateWrapper>
              ))}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default React.memo(LeftSidebar);
