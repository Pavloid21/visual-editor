/* eslint-disable react/jsx-key */
import React, {useCallback, useEffect, useState} from 'react';
import actionTypes from 'constants/actionTypes';
import {Gallery} from 'containers/Gallery';
import {Actions, ButtonSelector, LeftSideBarMenu, Modal, SideBarHeader} from 'components';
import {v4} from 'uuid';
import {getScreenByName, getScreensList, getScreenTemplates, getTemplateData} from 'services/ApiService';
import {useParams} from 'react-router-dom';
import {
  buildLayout,
  observer,
  prepareTree,
  snippet,
  useModal,
  deleteEmptyKey,
  parseReturnStatement,
  separateScreenUrl,
  getBottomBar
} from 'utils';
import {
  Container,
  DefaultTemplateWrapper,
  ModalContent,
  SideBarBody,
  SideBarContent,
  TemplateItem,
} from './LeftSideBar.styled';
import {addAction} from 'store/actions.slice';
import {setActiveTab as setActiveTabAction} from 'store/config.slice';
import {saveCode} from 'store/code.slice';
import {cloneBlock, deleteBlock, pushBottomBar, selectScreen, setLayout, setSelectedBlock, setSnippet} from 'store/layout.slice';
import {ActionTypes, SnippetType} from 'store/types';
import {Bar} from 'containers/Project/Modal/Modal.styled';
import {ReactComponent as Close} from 'assets/close.svg';
import {screenTemplates as defaultTemplates} from 'constants/screenTemplates';
import {setScreens} from 'store/screens.slice';
import {Screens} from 'components/Screens';
import {SubheaderScreens, SubheaderActions, SubheaderImages} from 'components/LeftSideBar/Subheader';
import {Images} from 'components/Images';
import {ACTION_TEMPLATES} from 'components/Actions/constants';
import {useAppDispatch, useAppSelector} from 'store';
import {removeNavigationSettings, setBottomBar} from 'store/output.slice';

const LeftSidebar: React.FC<unknown> = () => {
  const {
    topAppBar,
    bottomBar,
    selectedScreen,
    blocks: layout,
    snippets
  } = useAppSelector((state) => state.layout);
  const {activeTab, activeTabActions, filterAction} = useAppSelector((state) => state.leftBarMenu);
  const [loading, setLoading] = useState(false);
  const barState = useAppSelector((state) => state.sideBar);
  const api = useAppSelector((state) => state.api);
  const {screen: output, navigationSettings, settingsUI} = useAppSelector((state) => state.output);
  const currentSnippet = useAppSelector(
    (state) => state.layout.snippets.filter((snippetData) => snippetData.screenID === selectedScreen)[0]
  );
  const projectName = useAppSelector((state) => state.project.name);
  const {screen} = useAppSelector((state) => state.output);
  const {project} = useParams();
  const [activeTabScreens, setActiveTabScreens] = useState(0);
  const [availableScreens, setAvailableScreens] = useState<Record<string, any>[]>([]);
  const [treeData, setTree] = useState<Record<string, any>[]>([]);
  const [load, setLoadScreen] = useState<{uuid: string; load: boolean}>();
  const [templates, setScreenTemplates] = useState<Record<string, any>[]>([]);
  const [itemModalOpen, setItemModalOpen] = useModal();

  const dispatch = useAppDispatch();

  const generatePromiseStack = useCallback(
    (data: any[], parsed: boolean) => {
      const screensArr = data.map(async (screen: string) => {
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
      return screensArr;
    },
    [project]
  );

  useEffect(() => {
    setLoading(true);
    getScreensList(project).then(({data}) => {
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
          setAvailableScreens(layouts);
          dispatch(setScreens(data.map((item: string) => ({label: item, value: `screens/${item}`}))));
          setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
          setLoading(false);
        })
        .catch(console.log);
    });
    const screenLayouts = availableScreens.map((screen) => {
      if (screen.uuid === selectedScreen) {
        return {
          layout,
          uuid: screen.uuid,
        };
      }
      return screen;
    });
    setAvailableScreens(screenLayouts);
  }, []);

  useEffect(() => {
    const layouts: Record<string, any>[] = [];
    availableScreens.forEach((item) => {
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

    setAvailableScreens(layouts);
    setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
  }, [layout, topAppBar, bottomBar, output, currentSnippet]);

  useEffect(() => {
    const screenLayout = availableScreens.filter((screen) => screen.uuid === selectedScreen)[0];
    if (screenLayout) {
      const constants = snippet(
        {
          screen: output,
          navigationSettings,
          settingsUI,
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
        settingsUI,
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

  useEffect(() => {
    const {showBottomBar, updateUrlBottomBar} = navigationSettings;
    const getCorrectScreenName = separateScreenUrl(updateUrlBottomBar || '');

    if(showBottomBar && !bottomBar && !updateUrlBottomBar) {
      dispatch(pushBottomBar('bottombar'));
    }
    if(!showBottomBar && bottomBar) {
      dispatch(deleteBlock(bottomBar.uuid));
      dispatch(setBottomBar(false));
    }
    if(updateUrlBottomBar && showBottomBar && getCorrectScreenName !== screen) {
      dispatch(getBottomBar(getCorrectScreenName, project));
    }
  }, [
    dispatch,
    navigationSettings.updateUrlBottomBar,
    navigationSettings.showBottomBar,
    screen,
  ]);

  useEffect(() => {
    if(bottomBar) {
      dispatch(setBottomBar(true));
    }
  }, [bottomBar, dispatch]);

  const updateScreenList = (script: any, screenLayout: Record<string, any>, screenPositionInList: number) => {
    if (script.data) {
      const parseJson = parseReturnStatement(script);
      const transform = deleteEmptyKey(parseJson);
      const rawData = {
        screen,
        logic: transform,
        object: transform,
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
      const nextList = [...availableScreens];
      nextList[screenPositionInList] = newScreenData;
      return nextList;
    }
    return availableScreens;
  };

  const handleItemClick = async (event: React.MouseEvent, item: Record<string, any>) => {
    event.stopPropagation();
    const uuid = item.node.subtitle;
    if (uuid === 'screen') {
      setLoadScreen({uuid: item.node.uuid, load: true});
      const script = await getScreenByName(item.node.endpoint, false, project);
      snippets.forEach((snippet: SnippetType) => {
        if (snippet.screenID === item.node.uuid) {
          script.data = snippet.snippet;
        }
      });
      setLoadScreen({uuid: item.node.uuid, load: false});
      let screenPositionInList = 0;
      const screenLayout = availableScreens.filter((screen, index) => {
        if (screen.uuid === item.node.uuid) {
          screenPositionInList = index;
          return true;
        }
      })[0];
      const nextList = updateScreenList.call(availableScreens, script, screenLayout, screenPositionInList);
      dispatch(setActiveTabAction(5));
      dispatch(
        selectScreen({
          screen: item.node.uuid,
        })
      );
      dispatch(setSelectedBlock(''));

      if(item.node.navigationSettings === undefined) {
        dispatch(removeNavigationSettings());
      }

      dispatch({
        type: actionTypes.EDIT_SCREEN_NAME,
        screen: item.node.screen,
        navigationSettings: item.node.navigationSettings,
        settingsUI: item.node.settingsUI,
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
      if(blockUuid === bottomBar.uuid) {
        dispatch(setBottomBar(false));
        dispatch(deleteBlock(blockUuid));
      }
      dispatch(deleteBlock(blockUuid));
    },
    [bottomBar, dispatch]
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
      const layouts = [...availableScreens];
      setAvailableScreens(layouts.filter((layout) => layout.uuid !== node.uuid));
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
    [availableScreens, dispatch, layout, treeData]
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
  }, [availableScreens, bottomBar, selectedScreen, topAppBar]);

  const handleAddAction = useCallback(() => {
    let actionNew = ActionTypes.actions;
    let added: any;
    let objectAction = '';
    if (activeTabActions === ActionTypes.actions) {
      switch (filterAction) {
        case ActionTypes.data:
          actionNew = ActionTypes.data;
          objectAction = ACTION_TEMPLATES.DATA_USAGE;
          break;
        case ActionTypes.externals:
          actionNew = ActionTypes.externals;
          objectAction = ACTION_TEMPLATES.EXTERNAL_ACTION;
          break;
        default:
          actionNew = ActionTypes.actions;
          objectAction = ACTION_TEMPLATES.CASTOM_ACTION;
          break;
      }
      added = {
        action: 'new_action',
        object: objectAction,
        type: actionNew
      };
    } else if (activeTabActions === ActionTypes.cronTasks) {
      actionNew = ActionTypes.cronTasks;
      added = {
        action: 'new_action',
        object: {
          id: 'new_action',
          pattern: '',
          snippetType: '',
          snippetName: ''
        },
        selected: false,
        type: actionNew
      };
    } else if (activeTabActions === ActionTypes.push) {
      actionNew = ActionTypes.push;
      added = {
        action: 'new_action',
        type: actionNew
      };
    }


    dispatch(addAction(added));
  }, [dispatch, activeTabActions, filterAction]);

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
        const screens = [...availableScreens];
        screens.push({
          ...screens[cloneIndex],
          uuid: v4(),
        });
        setAvailableScreens(screens);
        setTree(screens.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
      }
    },
    [availableScreens, bottomBar, selectedScreen, topAppBar, treeData]
  );

  const handleSelectTemplate = useCallback(
    (template: Record<string, any>) => {
      const {snippets} = template;
      const screenName = Object.keys(snippets.screens)[0];
      const code: string = snippets.screens[screenName].replace(/return/g, '');
      const layouts = [...availableScreens];
      const {newBlock, action, screenEndpoint} = buildLayout({
        screen: screenName,
        object: JSON.parse(code),
      });
      layouts.push({uuid: v4(), value: newBlock, action, screenEndpoint});
      setAvailableScreens(layouts);
      setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
      setItemModalOpen(false);
    },
    [availableScreens, bottomBar, selectedScreen, topAppBar]
  );

  const handleDefaultTemplate = useCallback(
    (snippet: any) => {
      const layouts = [...availableScreens];
      const {newBlock, action, screenEndpoint} = buildLayout({
        screen: snippet.screen,
        object: snippet,
      });
      layouts.push({uuid: v4(), value: newBlock, action, screenEndpoint});
      setAvailableScreens(layouts);
      setTree(layouts.map((layout) => prepareTree(layout, selectedScreen, topAppBar, bottomBar)));
      setItemModalOpen(false);
    },
    [availableScreens, bottomBar, selectedScreen, setItemModalOpen, topAppBar]
  );

  if (!barState.left) {
    return null;
  }

  return (
    <Container>
      <SideBarHeader title={projectName} left />
      <SideBarBody>
        <LeftSideBarMenu />
        <SideBarContent>
          <div className="screen-list" style={{flex: 1}}>
            {activeTab === 'screen' &&
              <SubheaderScreens
                handleAddScreen={handleAddScreen}
              />}
            {activeTab === 'action' &&
              <SubheaderActions
                activeTab={activeTabActions}
                handleAddAction={handleAddAction}
              />}
            {activeTab === 'image' &&
            <SubheaderImages />}
            {activeTab === 'screen' && activeTabScreens === 0 &&
              <Screens
                loading={loading}
                treeData={treeData}
                setTree={setTree}
                handleItemClick={handleItemClick}
                load={load}
                handleCloneScreen={handleCloneScreen}
                handleCloneBlock={handleCloneBlock}
                handleDeleteScreen={handleDeleteScreen}
                handleDeleteBlock={handleDeleteBlock}
              />}
            {activeTab === 'action' && <Actions activeTabActions={activeTabActions} />}
            {activeTab === 'image' && <Images />}
          </div>
          <Gallery />
        </SideBarContent>
      </SideBarBody>

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
