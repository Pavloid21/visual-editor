import {v4 as uuidv4} from 'uuid';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import {getData} from 'utils/prepareModel';
import blocks from 'views/blocks';
import {clone, cloneDeep, get} from 'external/lodash';
import type {BlockItem, EditScreenNamePayloadAction, Layout} from './types';
import {blockStateUnsafeSelector} from './selectors';
import rootStore from 'store';
import {getKeyByUnit} from 'utils/units';
import {cloneToList, createBlockByConfig, findInTree, getEnrichedBlockConfig, removeFromList} from 'utils/blocks';

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
  snippet: string;
  selectedScreen: string;
}>;

type SetLayoutPayloadAction = PayloadAction<{
  bottomBar?: BlockItem;
  topAppBar?: BlockItem;
  layout: Layout[];
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

export const pushTopAppBar = createAction('layout/pushTopAppBar', (blockId) => {
  const topAppBar = createBlockByConfig(blockId);

  return {
    payload: topAppBar,
  };
});

export const pushBottomBar = createAction('layout/pushBottomBar', (blockId) => {
  const bottomBar = createBlockByConfig(blockId);

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

function goThrough(array: any, uuid: string, extendedFields: any) {
  const arr = JSON.parse(JSON.stringify(array));
  for (const index in arr) {
    if (arr[index].uuid === uuid) {
      arr[index].interactive.action = {
        fields: {},
        url: '',
        ...arr[index].interactive.action,
      };
      arr[index].interactive.action.fields = extendedFields;
    } else if (arr[index].listItems) {
      arr[index].listItems = goThrough(arr[index].listItems, uuid, extendedFields);
    }
  }
  return arr;
}

export const addActionField = createAction('layout/addActionField', (uuid: string) => {
  const store = rootStore.getState();
  const {layout: state} = store;
  const targetBlock = findInTree(state.blocks, uuid);

  let extendedFields = {...get(targetBlock, 'interactive.action.fields', {})};
  extendedFields = {
    ...extendedFields,
    key: 'value',
  };

  let extendedItems = [...get(state, 'blocks', [])];

  extendedItems = goThrough(extendedItems, uuid, extendedFields);

  return {
    payload: extendedItems,
  };
});

export const removeActionField = createAction('layout/removeActionField', (uuid: string, key: string) => {
  const store = rootStore.getState();
  const {layout: state} = store;
  const targetBlock = findInTree(state.blocks, uuid);

  const extendedFields = {...get(targetBlock, 'interactive.action.fields', {})};
  delete extendedFields[key];

  let extendedItems = [...get(state, 'blocks', [])];

  extendedItems = goThrough(extendedItems, uuid, extendedFields);

  return {
    payload: extendedItems,
  };
});

export const changeKeyActionField = createAction(
  'layout/changeKeyActionField',
  (uuid: string, n: number, nextValue: string, isValue = false) => {
    const store = rootStore.getState();
    const {layout: state} = store;
    const targetBlock = findInTree(state.blocks, uuid);

    const extendedFields = {...get(targetBlock, 'interactive.action.fields', {})};
    let fields: Record<string, string> = {};
    const targetFieldKey = Object.keys(extendedFields)[n];
    const order = Object.keys(extendedFields);
    if (isValue) {
      fields = {
        ...extendedFields,
        [targetFieldKey]: nextValue,
      };
    } else {
      const value = extendedFields[targetFieldKey];
      delete extendedFields[targetFieldKey];
      order.forEach((key: string, index: number) => {
        if (index !== n) {
          fields[key] = extendedFields[key];
        } else {
          fields[nextValue] = value;
        }
      });
    }

    let extendedItems = [...get(state, 'blocks', [])];

    extendedItems = goThrough(extendedItems, uuid, fields);

    return {
      payload: extendedItems,
    };
  }
);

export const addTopAppBarButton = createAction('layout/addTopAppBarButton', () => {
  const store = rootStore.getState();
  const {layout: state} = store;
  const extendedItems = [...get(state, 'topAppBar.interactive.rightButtons', [])];
  extendedItems.push({
    ...blocks.topappbar(blockStateUnsafeSelector(store)).defaultInteractiveOptions.rightButtons[0],
    uuid: uuidv4(),
  });

  return {
    payload: extendedItems,
  };
});

export const pushBlockInside = createAction('layout/pushBlockInside', (payload) => {
  if (['bottombar', 'topappbar'].includes(payload.blockId)) {
    return {
      payload: null,
    };
  }

  const store = rootStore.getState();
  const {layout: state} = store;
  const blockState = blockStateUnsafeSelector(store);
  const newBlock = createBlockByConfig(payload.blockId);

  // add block in target node
  const target = clone(findInTree(state.blocks, payload.uuid));

  if (target) {
    if (blocks[target.blockId](blockState).listItems) {
      target.listItems = [
        ...(target.listItems || []),
        {
          ...newBlock,
        },
      ];
    } else if (blocks[target.blockId](blockState).listItem !== undefined) {
      target.listItem = {
        ...newBlock,
      };
    }
  }

  // create next blocks model
  const replaceTargetBlock = (blocks: BlockItem[]): BlockItem[] =>
    blocks.map((block) => {
      if (target && block.uuid === payload.uuid) {
        return target;
      } else if (block.listItems) {
        return {
          ...block,
          listItems: replaceTargetBlock(block.listItems),
        };
      }
      return block;
    });
  const nextBlocks = replaceTargetBlock(state.blocks);

  return {
    payload: nextBlocks,
  };
});

export const pushBlock = createAction('layout/pushBlock', (blockId) => {
  const store = rootStore.getState();
  const {layout: state} = store;

  // const blockConfig = blocks[blockId](blockStateUnsafeSelector(store));
  const newBlock = createBlockByConfig(blockId);
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

  const newBlocks = cloneDeep({
    blocks: state.blocks,
    bottomBar: state.bottomBar,
    topAppBar: state.topAppBar,
  });
  const element: BlockItem =
    getEnrichedBlockConfig(findInTree(newBlocks.blocks, payload.blockUuid)) ||
    (payload.blockUuid === state.bottomBar?.uuid ? newBlocks.bottomBar : newBlocks.topAppBar);
  if (payload.parentKey && Array.isArray(payload.parentKey)) {
    element.interactive.rightButtons[0].tintColor = payload.value;
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
      payload.key
    );
    if (valueKeeper) {
      valueKeeper[payload.key] = payload.value;
    } else {
      element.settingsUI[payload.parentKey] = {[payload.key]: payload.value};
    }
  } else {
    if (
      element.settingsUI[payload.key] !== undefined ||
      blocks[element.blockId](blockStateUnsafeSelector(store)).config[payload.key]
    ) {
      element.settingsUI[payload.key] = payload.value;
    } else if (element.interactive) {
      element.interactive[payload.key] = payload.value;
    }
  }
  return {
    payload: newBlocks,
  };
});

export const removeProperty = createAction('layout/removeProperty', (payload) => {
  const store = rootStore.getState();
  const {layout: state} = store;

  const newBlocks = JSON.parse(JSON.stringify(state.blocks));
  const element: BlockItem =
    findInTree(newBlocks, payload.blockUuid) ||
    (payload.blockUuid === state.bottomBar?.uuid
      ? {
          ...state.bottomBar,
        }
      : {...state.topAppBar});
  if (payload.parentKey && Array.isArray(payload.parentKey)) {
    delete element.settingsUI[payload.parentKey[1]][payload.parentKey[0]][payload.key];
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
      payload.key
    );
    if (valueKeeper) {
      delete valueKeeper[payload.key];
    } else {
      element.settingsUI[payload.parentKey] = {[payload.key]: payload.value};
    }
  } else {
    if (
      element.settingsUI[payload.key] !== undefined ||
      blocks[element.blockId](blockStateUnsafeSelector(store)).config[payload.key]
    ) {
      delete element.settingsUI[payload.key];
    } else if (element.interactive) {
      delete element.interactive[payload.key];
    }
  }
  return {
    payload: [...newBlocks],
  };
});

export const switchElementType = createAction('layout/switchElementType', (payload: string) => {
  const store = rootStore.getState();
  const {layout: state} = store;

  const blocksArr = cloneDeep(state.blocks);
  const block = blocks[payload.toLowerCase()](blockStateUnsafeSelector(store));

  const currentElement = findInTree(blocksArr, state.selectedBlockUuid);

  const isInput = ['CALENDAR_TEXT_FIELD', 'PASSWORDTEXTFIELD', 'BASICTEXTFIELD'].includes(payload);

  if ((isInput && currentElement) || currentElement) {
    currentElement.blockId = payload.toLowerCase();

    currentElement.interactive = {
      ...currentElement.interactive,
      ...getData(block.defaultInteractiveOptions),
    };
    currentElement.settingsUI = {
      ...currentElement.settingsUI,
      placeholder: block.defaultData.placeholder,
      text: block.defaultData.text,
    };
  }
  return {
    payload: [...blocksArr],
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
    removeTopAppBarButton: (state, action: PayloadAction<number>) => {
      const newBarItems = [...state.topAppBar.interactive.rightButtons];
      newBarItems.splice(action.payload, 1);
      const newTopAppBar = {...state.topAppBar};
      newTopAppBar.interactive.rightButtons = newBarItems;
      state.topAppBar = {...newTopAppBar};
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
    replaceElement: (state, action: PayloadAction<BlockItem>) => {
      // todo не работало, надо починить
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
        findInTree(newBlocksSet, action.payload.blockUuid) ||
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
        let val = null;
        if (test) {
          val = test[action.payload.key] || test[action.payload.key + 'InPercent'] || null;
          delete test[action.payload.key];
          delete test[action.payload.key + 'InPercent'];
          test[getKeyByUnit(action.payload.value, action.payload.key)] = val;
        } else {
          targetElement.settingsUI[action.payload.parentKey] = {
            [getKeyByUnit(action.payload.value, action.payload.key)]: val,
          };
        }
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
        nextScreenState.editedScreens = nextScreenState.editedScreens.filter(
          (screen: any) => screen !== action.payload.screen
        );
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
      const withClone = cloneToList(state.blocks, action.payload);
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
      const snippetRef = snippetsRef.find((item) => item.screenID === action.payload.selectedScreen);
      if (snippetRef) {
        snippetRef.snippet = action.payload.snippet;
        state.snippets = snippetsRef;
      }
      return state;
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
    builder.addCase(addTopAppBarButton, (state, action) => {
      state.topAppBar.interactive.rightButtons = action.payload;
    });
    builder.addCase(addActionField, (state, action) => {
      state.blocks = action.payload;
    });
    builder.addCase(removeActionField, (state, action) => {
      state.blocks = action.payload;
    });
    builder.addCase(changeKeyActionField, (state, action) => {
      state.blocks = action.payload;
    });
    builder.addCase(pushBlockInside, (state, action) => {
      if (action.payload) {
        state.blocks = action.payload;
      }
    });
    builder.addCase(changeBlockData, (state, action) => {
      state.blocks = action.payload.blocks;
      state.bottomBar = action.payload.bottomBar;
      state.topAppBar = action.payload.topAppBar;
    });
    builder.addCase(pushBlock, (state, action) => {
      state.blocks = action.payload;
    });
    builder.addCase(removeProperty, (state, action) => {
      state.blocks = action.payload;
    });
    builder.addCase(switchElementType, (state, action) => {
      state.blocks = action.payload;
    });
    builder.addCase(actionTypes.EDIT_SCREEN_NAME, (state, action: EditScreenNamePayloadAction) => {
      if (action.snippet?.screenID) {
        const next = [...state.snippets];
        let finded = false;
        state.snippets.forEach((item: {screenID: string}, index: any) => {
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
});

export const {
  changesSaved,
  addTopAppBarItem,
  removeBottomBarItem,
  removeTopAppBarItem,
  removeTopAppBarButton,
  setSelectedBlock,
  reOrderLayout,
  replaceElement,
  changeUnits,
  deleteBlock,
  setLayout,
  selectScreen,
  cloneBlock,
  setSnippet,
} = layoutSlice.actions;
export default layoutSlice.reducer;
