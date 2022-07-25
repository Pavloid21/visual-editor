import {BlockItem, Layout} from 'reducers/types';
import {v4 as uuidv4} from 'uuid';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import {getData} from 'utils/prepareModel';
import blocks from 'views/blocks';
import {get} from 'external/lodash';
import {EditScreenNamePayloadAction} from './types';

type ChangeUnitsPayloadAction = PayloadAction<{
  blockUuid: string;
  key: string;
  value: string | undefined;
  parentKey?: string;
}>;

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
  tree.forEach((item) => {
    if (item.uuid === uuid) {
      result = item;
    }
    if (!result && item.listItems) {
      result = findInTree(item.listItems, uuid);
    }
    if (!result && item.listItem) {
      result = findInTree([item.listItem], uuid);
    }
  });

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

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
      changesSaved: (state) => {
        state.editedScreens = [];
        state.deletedScreens = [];
      },
      pushTopAppBar: (state, action: PayloadAction<string>) => {
        const topAppBar = {
          uuid: uuidv4(),
          blockId: action.payload,
          settingsUI: {
            ...getData(blocks[action.payload].defaultData),
          },
          interactive: {
            ...getData(blocks[action.payload].defaultInteractiveOptions),
          },
        };

        return {...state, topAppBar};
      },
      pushBottomBar: (state, action: PayloadAction<string>) => {
        const bottomBar = {
          uuid: uuidv4(),
          blockId: action.payload,
          settingsUI: {
            ...getData(blocks[action.payload].defaultData),
          },
        };
        return {...state, bottomBar};
      },
      addBottomBarItem: (state) => {
        const extendedItems = [...get(state, 'bottomBar.settingsUI.navigationItems', [])];
        extendedItems.push({
          ...blocks.bottombar.defaultData.navigationItems[0],
          uuid: uuidv4(),
        });
        const bar = {...state.bottomBar};
        bar.settingsUI.navigationItems = extendedItems;
        return {...state, bottomBar: {...bar}};
      },
      addTopAppBarItem: (state) => {
        const nextItems = [...get(state, 'topAppBar.settingsUI.topAppBarItems', [])];
        nextItems.push({
          ...blocks.topappbar.defaultData.topAppBarItems[0],
          uuid: uuidv4(),
        });
        const abar = {...state.topAppBar};
        abar.settingsUI.topAppBarItems = nextItems;
        return {...state, topAppBar: {...abar}};
      },
      removeBottomBarItem: (state, action: PayloadAction<number>) => {
        const newBarItems = [...state.bottomBar.settingsUI.navigationItems];
        newBarItems.splice(action.payload, 1);
        const newBottomBar = {...state.bottomBar};
        newBottomBar.settingsUI.navigationItems = newBarItems;
        return {...state, bottomBar: {...newBottomBar}};
      },
      removeTopAppBarItem: (state, action: PayloadAction<number>) => {
        const newAppBarItems = [...state.topAppBar.settingsUI.topAppBarItems];
        newAppBarItems.splice(action.payload, 1);
        const newAppBar = {...state.topAppBar};
        newAppBar.settingsUI.topAppBarItems = newAppBarItems;
        return {...state, topAppBar: {...newAppBar}};
      },
      pushBlock: (state, action: PayloadAction<string>) => {
        const listItems = blocks[action.payload].listItems;
        const listItem = blocks[action.payload].listItem;
        const newBlock: BlockItem = {
          uuid: uuidv4(),
          blockId: action.payload,
          settingsUI: {
            ...getData(blocks[action.payload].defaultData),
          },
        };
        if (blocks[action.payload].defaultInteractiveOptions) {
          newBlock.interactive = {
            ...getData(blocks[action.payload].defaultInteractiveOptions),
          };
        }
        if (listItems) {
          newBlock.listItems = listItems;
        }
        if (listItem) {
          newBlock.listItem = listItem;
        }
        return {
          ...state,
          blocks: [
            ...state.blocks,
            {
              ...newBlock,
            },
          ],
        };
      },
      pushBlockInside: (state, action: PayloadAction<{blockId: string, uuid: string}>) => {
        if (action.payload.blockId === 'bottombar' || action.payload.blockId === 'topappbar') {
          return state;
        }
        const target = findInTree(state.blocks, action.payload.uuid!);
        const list = blocks[action.payload.blockId].listItems;
        const obj = blocks[action.payload.blockId].listItem;
        const newBloc: BlockItem = {
          uuid: uuidv4(),
          blockId: action.payload.blockId,
          settingsUI: {
            ...getData(blocks[action.payload.blockId].defaultData),
          },
        };
        if (blocks[action.payload.blockId].defaultInteractiveOptions) {
          newBloc.interactive = {
            ...getData(blocks[action.payload.blockId].defaultInteractiveOptions),
          };
        }
        if (list) {
          newBloc.listItems = list;
        }
        if (obj !== undefined) {
          newBloc.listItem = obj;
        }
        if (blocks[target!.blockId].listItems) {
          target!.listItems = [
            ...(target!.listItems || []),
            {
              ...newBloc,
            },
          ];
        } else if (blocks[target!.blockId].listItem !== undefined) {
          target!.listItem = {
            ...newBloc,
          };
        }
        const nextBlocks = state.blocks.map((block, index) => {
          if (block.uuid === action.payload.uuid) {
            return target;
          }
          return block;
        });
        return {
          ...state,
          blocks: nextBlocks,
        };
      },
      setSelectedBlock: (state, action: PayloadAction<string>) => {
        state.selectedBlockUuid = action.payload;
      },
      reOrderLayout: (state, action: PayloadAction<BlockItem[]>) => {
        state.blocks = [...action.payload];
      },
      replaceElement: (state, action: PayloadAction<BlockItem>) => {
        const blocksRef = [...state.blocks];
        let parentElement = findInTree(blocksRef, action.payload.uuid);
        parentElement = action.payload;
        state.blocks = blocksRef;
        return {
          ...state,
          blocks: blocksRef,
        };
      },
      changeUnits: (state, action: ChangeUnitsPayloadAction) => {
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
          const val = test[action.payload.key!];
          delete test[action.payload.key!];
          test[
            action.payload.value! === '%' ? action.payload.key + 'InPercent' : action.payload.key!.substring(0, action.payload.key?.indexOf('InPercent'))
            ] = val;
        }
        return {
          ...state,
          blocks: [...newBlocksSet],
        };
      },
      changeBlockData: (state, action: ChangeUnitsPayloadAction) => {
        const newBlocks = JSON.parse(JSON.stringify(state.blocks));
        const element: BlockItem =
          findInTree(newBlocks, action.payload.blockUuid!) ||
          (action.payload.blockUuid === state.bottomBar?.uuid
            ? {
              ...state.bottomBar,
            }
            : {...state.topAppBar});
        if (action.payload.parentKey && Array.isArray(action.payload.parentKey)) {
          element.settingsUI[action.payload.parentKey[1]][action.payload.parentKey[0]][action.payload.key!] = action.payload.value;
        } else if (action.payload.parentKey) {
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
            action.payload.parentKey,
            action.payload.key!,
          );
          if (valueKeeper) {
            valueKeeper[action.payload.key!] = action.payload.value;
          } else {
            element.settingsUI[action.payload.parentKey] = {[action.payload.key!]: action.payload.value};
          }
        } else {
          if (element.settingsUI[action.payload.key!] !== undefined || blocks[element.blockId].config[action.payload.key!]) {
            element.settingsUI[action.payload.key!] = action.payload.value;
          } else if (element.interactive) {
            element.interactive[action.payload.key!] = action.payload.value;
          }
        }
        return {
          ...state,
          blocks: [...newBlocks],
        };
      },
      deleteBlock: (state, action: PayloadAction<string>) => {
        const newArr = [...state.blocks];
        const mustBeRemoved = removeFromList(newArr, action.payload!);
        const stateReference = {...state};
        if (action.payload === state.bottomBar?.uuid) {
          delete stateReference.bottomBar;
        }
        if (action.payload === state.topAppBar?.uuid) {
          delete stateReference.topAppBar;
        }
        return {
          ...stateReference,
          blocks: [...mustBeRemoved],
          selectedBlockUuid: '',
        };
      },
      changeDocumentId: (state, action: PayloadAction<string>) => {
        state.documentId = action.payload;
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
        const blocksArray = [...state.blocks];
        const withClone = cloneToList(blocksArray, action.payload!);
        const stateRef = {...state};
        if (action.payload === state.bottomBar?.uuid) {
          delete stateRef.bottomBar;
        }
        if (action.payload === state.topAppBar?.uuid) {
          delete stateRef.topAppBar;
        }
        return {
          ...stateRef,
          blocks: withClone,
          selectedBlockUuid: '',
        };
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
        return {...state, blocks: blocksArr};
      },
    },
    extraReducers: (builder) => {
      builder.addCase(actionTypes.ERASE, () => initialState);
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
  pushTopAppBar,
  pushBottomBar,
  addBottomBarItem,
  addTopAppBarItem,
  removeBottomBarItem,
  removeTopAppBarItem,
  pushBlock,
  pushBlockInside,
  setSelectedBlock,
  reOrderLayout,
  replaceElement,
  changeUnits,
  changeBlockData,
  deleteBlock,
  changeDocumentId,
  setLayout,
  selectScreen,
  cloneBlock,
  setSnippet,
  switchElementType
} = layoutSlice.actions;
export default layoutSlice.reducer;
