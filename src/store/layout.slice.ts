import {v4 as uuidv4} from 'uuid';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import {getData} from 'utils/prepareModel';
import blocks from 'views/blocks';
import {get} from 'external/lodash';
import type {
  BlockItem,
  EditScreenNamePayloadAction,
  Layout
} from './types';
import {blockStateUnsafeSelector} from './selectors';
import rootStore from 'store';
import {getKeyByUnit} from 'utils/units';

type ChangeUnitsPayloadAction = {
  blockUuid: string;
  key: string;
  value: string | undefined;
  parentKey?: string;
};

type SelectScreenPayloadAction = PayloadAction<{
  delete?: boolean;
  screen: string;
}>;

type SetSnippetPayloadAction = PayloadAction<{
  snippet: string,
  selectedScreen: string
}>;

type SetLayoutPayloadAction = PayloadAction<{
  bottomBar?: BlockItem,
  topAppBar?: BlockItem,
  layout: Layout[]
}>;

const initialState: Layout = {
  blocks: [],
  selectedBlockUuid: '',
  documentId: 'document2',
  selectedScreen: null,
  editedScreens: [],
  deletedScreens: [],
  snippets: [],
};

export const findInTree = (tree: BlockItem[], uuid: string): BlockItem | null => {
  let result: BlockItem | null = null;
  for (const item of tree) {
    if (item.uuid === uuid) {
      result = {...item};
    }
    if (!result && item.listItems) {
      result = findInTree(item.listItems, uuid);
    }
    if (!result && item.listItem) {
      result = findInTree([item.listItem], uuid);
    }
  }

  return result;
};

const removeFromList = (tree: any[], uuid: string) => {
  const result = [...tree];
  tree.forEach((item, index) => {
    if (item.uuid === uuid) {
      result.splice(index, 1);
    } else if (item.listItems) {
      item.listItems = removeFromList(item.listItems, uuid);
    } else if (item.listItem) {
      item.listItem = removeFromList([item.listItem], uuid)[0];
    }
  });
  return result;
};

const cloneToList = (tree: any[], uuid: string) => {
  const result = [...tree];
  tree.forEach((item) => {
    if (item.uuid === uuid) {
      const newItem = {...item, uuid: uuidv4()};
      result.push(newItem);
    } else if (item.listItems) {
      item.listItems = cloneToList(item.listItems, uuid);
    }
  });
  return result;
};

export const pushTopAppBar = createAction('layout/pushTopAppBar', (payload) => {
  const blockConfig = blocks[payload](blockStateUnsafeSelector(rootStore.getState()));
  const topAppBar = {
    uuid: uuidv4(),
    blockId: payload,
    settingsUI: {
      ...getData(blockConfig.defaultData),
    },
    interactive: {
      ...getData(blockConfig.defaultInteractiveOptions),
    },
  };

  return {
    payload: topAppBar,
  };
});

export const pushBottomBar = createAction('layout/pushBottomBar', (payload) => {
  const bottomBar = {
    uuid: uuidv4(),
    blockId: payload,
    settingsUI: {
      ...getData(blocks[payload](blockStateUnsafeSelector(rootStore.getState())).defaultData),
    },
  };

  return {
    payload: bottomBar,
  };
});

export const addBottomBarItem = createAction('layout/addBottomBarItem', () => {
  const store = rootStore.getState();
  const {layout: state} = store;

  const extendedItems = [...get(state, 'bottomBar.settingsUI.navigationItems', [])];
  extendedItems.push({
    ...blocks.bottombar(blockStateUnsafeSelector(store)).defaultData.navigationItems[0],
    uuid: uuidv4(),
  });

  return {
    payload: extendedItems,
  };
});

export const pushBlockInside = createAction('layout/pushBlockInside', (payload) => {
  const store = rootStore.getState();
  const {layout: state} = store;
  const blockState = blockStateUnsafeSelector(store);

  if (payload.blockId === 'bottombar' || payload.blockId === 'topappbar') {
    return {
      payload: null
    };
  }
  const target = findInTree(state.blocks, payload.uuid)!;
  const blockConfig = blocks[payload.blockId](blockState);
  const list = blockConfig.listItems;
  const obj = blockConfig.listItem;
  const newBloc: BlockItem = {
    uuid: uuidv4(),
    blockId: payload.blockId,
    settingsUI: {
      ...getData(blockConfig.defaultData),
    },
  };
  if (blockConfig.defaultInteractiveOptions) {
    newBloc.interactive = {
      ...getData(blockConfig.defaultInteractiveOptions),
    };
  }
  if (list) {
    newBloc.listItems = list;
  }
  if (obj !== undefined) {
    newBloc.listItem = obj;
  }
  if (target) {
    if (blocks[target.blockId](blockState).listItems) {
      target.listItems = [
        ...(target.listItems || []),
        {
          ...newBloc,
        },
      ];
    } else if (blocks[target.blockId](blockState).listItem !== undefined) {
      target.listItem = {
        ...newBloc,
      };
    }
  }

  const nextBlocks = state.blocks.map((block) => {
    if (target && (block.uuid === payload.uuid)) {
      return target;
    }
    return block;
  });

  return {
    payload: nextBlocks
  };
});

export const pushBlock = createAction('layout/pushBlock', (payload) => {
  const store = rootStore.getState();
  const {layout: state} = store;

  const blockConfig = blocks[payload](blockStateUnsafeSelector(store));
  const listItems = blockConfig.listItems;
  const listItem = blockConfig.listItem;
  const newBlock: BlockItem = {
    uuid: uuidv4(),
    blockId: payload,
    settingsUI: {
      ...getData(blockConfig.defaultData),
    },
  };
  if (blockConfig.defaultInteractiveOptions) {
    newBlock.interactive = {
      ...getData(blockConfig.defaultInteractiveOptions),
    };
  }
  if (listItems) {
    newBlock.listItems = listItems;
  }
  if (listItem) {
    newBlock.listItem = listItem;
  }
  return {
    payload: [
      ...state.blocks,
      {
        ...newBlock,
      },
    ],
  };
});

export const changeBlockData = createAction('layout/changeBlockData', (payload: ChangeUnitsPayloadAction) => {
  const store = rootStore.getState();
  const {layout: state} = store;

  const newBlocks = JSON.parse(JSON.stringify(state.blocks));
  const element: BlockItem =
    findInTree(newBlocks, payload.blockUuid!) ||
    (payload.blockUuid === state.bottomBar?.uuid
      ? {
        ...state.bottomBar,
      }
      : {...state.topAppBar});
  if (payload.parentKey && Array.isArray(payload.parentKey)) {
    element.settingsUI[payload.parentKey[1]][payload.parentKey[0]][payload.key!] = payload.value;
  } else if (payload.parentKey) {
    const findDataBlock = (data: any, parentKey: string, key: string) => {
      let ref: any = null;
      Object.keys(data).forEach((item) => {
        if (item === parentKey) {
          ref = data[item];
        } else if (typeof data[item] === 'object' && !ref) {
          ref = findDataBlock(data[item], parentKey, key);
        }
      });
      return ref;
    };
    const valueKeeper = findDataBlock(
      {settingsUI: element.settingsUI, interactive: element.interactive},
      payload.parentKey,
      payload.key!,
    );
    if (valueKeeper) {
      valueKeeper[payload.key!] = payload.value;
    } else {
      element.settingsUI[payload.parentKey] = {[payload.key!]: payload.value};
    }
  } else {
    if (element.settingsUI[payload.key!] !== undefined || blocks[element.blockId](blockStateUnsafeSelector(store)).config[payload.key!]) {
      element.settingsUI[payload.key!] = payload.value;
    } else if (element.interactive) {
      element.interactive[payload.key!] = payload.value;
    }
  }
  return {
    payload: [...newBlocks],
  };
});

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
      changesSaved: (state) => {
        state.editedScreens = [];
        state.deletedScreens = [];
      },
      addTopAppBarItem: (state) => {
        const nextItems = [...get(state, 'topAppBar.settingsUI.topAppBarItems', [])];
        nextItems.push({
          ...blocks.topappbar().defaultData.topAppBarItems[0],
          uuid: uuidv4(),
        });
        const abar = {...state.topAppBar};
        abar.settingsUI.topAppBarItems = nextItems;
        state.topAppBar = {...abar};
      },
      removeBottomBarItem: (state, action: PayloadAction<number>) => {
        const newBarItems = [...state.bottomBar.settingsUI.navigationItems];
        newBarItems.splice(action.payload, 1);
        const newBottomBar = {...state.bottomBar};
        newBottomBar.settingsUI.navigationItems = newBarItems;
        state.bottomBar = {...newBottomBar};
      },
      removeTopAppBarItem: (state, action: PayloadAction<number>) => {
        const newAppBarItems = [...state.topAppBar.settingsUI.topAppBarItems];
        newAppBarItems.splice(action.payload, 1);
        const newAppBar = {...state.topAppBar};
        newAppBar.settingsUI.topAppBarItems = newAppBarItems;
        state.topAppBar = {...newAppBar};
      },
      setSelectedBlock: (state, action: PayloadAction<string>) => {
        state.selectedBlockUuid = action.payload;
      },
      reOrderLayout: (state, action: PayloadAction<BlockItem[]>) => {
        state.blocks = [...action.payload];
      },
      replaceElement: (state, action: PayloadAction<BlockItem>) => { // todo не работало, надо починить
        // const blocksRef = [...state.blocks];
        // let parentElement = findInTree(state.blocks, action.payload.uuid);
        // parentElement = action.payload;
        // state.blocks = state.blocks;
        // return {
        //   ...state,
        //   blocks: state.blocks,
        // };
      },
      changeUnits: (state, action: PayloadAction<ChangeUnitsPayloadAction>) => {
        const newBlocksSet = JSON.parse(JSON.stringify(state.blocks));
        const targetElement: BlockItem =
          findInTree(newBlocksSet, action.payload.blockUuid!) ||
          (action.payload.blockUuid === state.bottomBar?.uuid
            ? {
              ...state.bottomBar,
            }
            : {...state.topAppBar});
        if (action.payload.parentKey && !Array.isArray(action.payload.parentKey)) {
          let test = targetElement.settingsUI[action.payload.parentKey];
          if (!test) {
            test = targetElement.settingsUI.shadow[action.payload.parentKey];
          }
          const val = test[action.payload.key!] || test[action.payload.key! + 'InPercent'];
          delete test[action.payload.key!];
          delete test[action.payload.key! + 'InPercent'];
          test[getKeyByUnit(action.payload.value, action.payload.key)] = val;
        }
        return {
          ...state,
          blocks: [...newBlocksSet],
        };
      },
      deleteBlock: (state, action: PayloadAction<string>) => {
        state.blocks = removeFromList(state.blocks, action.payload);
        if (action.payload === state.bottomBar?.uuid) {
          delete state.bottomBar;
        }
        if (action.payload === state.topAppBar?.uuid) {
          delete state.topAppBar;
        }

        state.selectedBlockUuid = '';
      },
      setLayout: (state, action: SetLayoutPayloadAction) => {
        return {
          ...state,
          blocks: [...action.payload.layout],
          bottomBar: action.payload.bottomBar,
          topAppBar: action.payload.topAppBar,
        };
      },
      selectScreen: (state, action: SelectScreenPayloadAction) => {
        let nextScreenState = {...state};
        if (action.payload.delete) {
          nextScreenState.deletedScreens = Array.from(new Set([...state.deletedScreens, action.payload.screen]));
          nextScreenState.editedScreens = nextScreenState.editedScreens.filter((screen) => screen !== action.payload.screen);
        } else {
          nextScreenState = {
            ...state,
            selectedScreen: action.payload.screen,
            editedScreens: Array.from(new Set([...state.editedScreens, action.payload.screen])),
          };
        }
        return nextScreenState;
      },
      cloneBlock: (state, action: PayloadAction<string>) => {
        const withClone = cloneToList(state.blocks, action.payload!);
        if (action.payload === state.bottomBar?.uuid) {
          delete state.bottomBar;
        }
        if (action.payload === state.topAppBar?.uuid) {
          delete state.topAppBar;
        }
        state.blocks = withClone;
        state.selectedBlockUuid = '';
      },
      setSnippet: (state, action: SetSnippetPayloadAction) => {
        const snippetsRef = [...state.snippets];
        const snippetRef = snippetsRef.filter((item) => item.screenID === action.payload.selectedScreen!)[0];
        if (snippetRef) {
          snippetRef.snippet = action.payload.snippet;
          state.snippets = snippetsRef;
        }
        return state;
      },
      switchElementType: (state, action: PayloadAction<string>) => {
        const blocksArr = [...state.blocks];
        const currentElement = findInTree(blocksArr, state.selectedBlockUuid);
        currentElement!.blockId = action.payload.toLowerCase();
        state.blocks = blocksArr;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(actionTypes.ERASE, () => initialState);
      builder.addCase(pushTopAppBar, (state, action) => {
        state.topAppBar = action.payload;
      });
      builder.addCase(pushBottomBar, (state, action) => {
        state.bottomBar = action.payload;
      });
      builder.addCase(addBottomBarItem, (state, action) => {
        state.bottomBar.settingsUI.navigationItems = action.payload;
      });
      builder.addCase(pushBlockInside, (state, action) => {
        if (action.payload) {
          state.blocks = action.payload;
        }
      });
      builder.addCase(changeBlockData, (state, action) => {
        state.blocks = action.payload;
      });
      builder.addCase(pushBlock, (state, action) => {
        state.blocks = action.payload;
      });
      builder.addCase(actionTypes.EDIT_SCREEN_NAME, (state, action: EditScreenNamePayloadAction) => {
        if (action.snippet?.screenID) {
          const next = [...state.snippets];
          let finded = false;
          state.snippets.forEach((item, index) => {
            if (item.screenID === action.snippet.screenID) {
              next[index] = {
                ...next[index],
                endpoint: action.snippet.endpoint,
                snippet: action.snippet.snippet,
              };
              finded = true;
            }
          });
          if (!finded) {
            next.push(action.snippet);
          }
          return {
            ...state,
            snippets: [...next],
          };
        } else {
          return state;
        }
      });
    },
  })
;

export const {
  changesSaved,
  addTopAppBarItem,
  removeBottomBarItem,
  removeTopAppBarItem,
  setSelectedBlock,
  reOrderLayout,
  replaceElement,
  changeUnits,
  deleteBlock,
  setLayout,
  selectScreen,
  cloneBlock,
  setSnippet,
  switchElementType
} = layoutSlice.actions;
export default layoutSlice.reducer;
