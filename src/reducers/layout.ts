import actionTypes from '../constants/actionTypes';
import blocks from '../views/blocks';
import {v4 as uuidv4} from 'uuid';
import {getData} from '../utils/prepareModel';
import {v4} from 'uuid';
import {Layout, BlockItem, LayoutAction} from './types';

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
      const newItem = {...item, uuid: v4()};
      result.push(newItem);
    } else if (item.listItems) {
      item.listItems = cloneToList(item.listItems, uuid);
    }
  });
  return result;
};

export default function reducer(state = initialState, action: LayoutAction) {
  switch (action.type) {
    case actionTypes.ERASE:
      return initialState;
    case actionTypes.CHANGES_SAVED:
      return {
        ...state,
        editedScreens: [],
        deletedScreens: [],
      };
    case actionTypes.PUSH_TOPAPPBAR:
      const topAppBar = {
        uuid: uuidv4(),
        blockId: action.blockId,
        settingsUI: {
          ...getData(blocks[action.blockId].defaultData),
        },
        interactive: {
          ...getData(blocks[action.blockId].defaultInteractiveOptions),
        },
      };
      return {...state, topAppBar};
    case actionTypes.PUSH_BOTTOMBAR:
      const bottomBar = {
        uuid: uuidv4(),
        blockId: action.blockId,
        settingsUI: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      return {...state, bottomBar};
    case actionTypes.ADD_BOTTOMBAR_ITEM:
      const extendedItems = [...state.bottomBar?.settingsUI.navigationItems];
      extendedItems.push({
        ...blocks.bottombar.defaultData.navigationItems[0],
        uuid: uuidv4(),
      });
      const bar = {...state.bottomBar};
      bar.settingsUI.navigationItems = extendedItems;
      return {...state, bottomBar: {...bar}};
    case actionTypes.ADD_TOPAPPBAR_ITEM:
      const nextItems = [...state.topAppBar?.settingsUI.topAppBarItems];
      nextItems.push({
        ...blocks.topappbar.defaultData.topAppBarItems[0],
        uuid: uuidv4(),
      });
      const abar = {...state.topAppBar};
      abar.settingsUI.topAppBarItems = nextItems;
      return {...state, topAppBar: {...abar}};
    case actionTypes.REMOVE_BOTTOMBAR_ITEM:
      const newBarItems = [...state.bottomBar.settingsUI.navigationItems];
      newBarItems.splice(action.index, 1);
      const newBottomBar = {...state.bottomBar};
      newBottomBar.settingsUI.navigationItems = newBarItems;
      return {...state, bottomBar: {...newBottomBar}};
    case actionTypes.REMOVE_TOPAPPBAR_ITEM:
      const newAppBarItems = [...state.topAppBar.settingsUI.topAppBarItems];
      newAppBarItems.splice(action.index, 1);
      const newAppBar = {...state.topAppBar};
      newAppBar.settingsUI.topAppBarItems = newAppBarItems;
      return {...state, topAppBar: {...newAppBar}};
    case actionTypes.PUSH_BLOCK:
      const listItems = blocks[action.blockId].listItems;
      const listItem = blocks[action.blockId].listItem;
      let newBlock: BlockItem = {
        uuid: uuidv4(),
        blockId: action.blockId,
        settingsUI: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      if (blocks[action.blockId].defaultInteractiveOptions) {
        newBlock.interactive = {
          ...getData(blocks[action.blockId].defaultInteractiveOptions),
        };
      }
      if (listItems) {
        newBlock.listItems = listItems;
      }
      if (listItem) {
        newBlock.listItem = listItem;
      }
      const nextState = {
        ...state,
        blocks: [
          ...state.blocks,
          {
            ...newBlock,
          },
        ],
      };
      return nextState;
    case actionTypes.PUSH_BLOCK_INSIDE:
      if (action.blockId === 'bottombar' || action.blockId === 'topappbar') {
        return state;
      }
      const target = findInTree(state.blocks, action.uuid!);
      const list = blocks[action.blockId].listItems;
      const obj = blocks[action.blockId].listItem;
      const newBloc: BlockItem = {
        uuid: uuidv4(),
        blockId: action.blockId,
        settingsUI: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      if (blocks[action.blockId].defaultInteractiveOptions) {
        newBloc.interactive = {
          ...getData(blocks[action.blockId].defaultInteractiveOptions),
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
        if (block.uuid === action.uuid) {
          return target;
        }
        return block;
      });
      return {
        ...state,
        blocks: nextBlocks,
      };
    case actionTypes.SET_SELECTED_BLOCK:
      return {
        ...state,
        selectedBlockUuid: action.blockUuid,
      };
    case actionTypes.REORDER_LAYOUT:
      return {
        ...state,
        blocks: [...action.newBlocksLayout!],
      };
    case actionTypes.REPLACE_ELEMENT:
      const blocksRef = [...state.blocks];
      let parentElement = findInTree(blocksRef, action.element.uuid);
      parentElement = action.element;
      return {
        ...state,
        blocks: blocksRef,
      };
    case actionTypes.CHANGE_UNITS:
      const newBlocksSet = JSON.parse(JSON.stringify(state.blocks));
      const targetElement: BlockItem =
        findInTree(newBlocksSet, action.blockUuid!) ||
        (action.blockUuid === state.bottomBar?.uuid
          ? {
              ...state.bottomBar,
            }
          : {...state.topAppBar});
      if (action.parentKey && !Array.isArray(action.parentKey)) {
        const val = targetElement.settingsUI[action.parentKey][action.key!];
        delete targetElement.settingsUI[action.parentKey][action.key!];
        targetElement.settingsUI[action.parentKey][
          action.value! === '%' ? action.key + 'InPercent' : action.key!.substring(0, action.key?.indexOf('InPercent'))
        ] = val;
      }
      return {
        ...state,
        blocks: [...newBlocksSet],
      };
    case actionTypes.CHANGE_BLOCK_DATA:
      const newBlocks = JSON.parse(JSON.stringify(state.blocks));
      const element: BlockItem =
        findInTree(newBlocks, action.blockUuid!) ||
        (action.blockUuid === state.bottomBar?.uuid
          ? {
              ...state.bottomBar,
            }
          : {...state.topAppBar});
      if (action.parentKey && Array.isArray(action.parentKey)) {
        element.settingsUI[action.parentKey[1]][action.parentKey[0]][action.key!] = action.value;
      } else if (action.parentKey) {
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
          action.parentKey,
          action.key!
        );
        if (valueKeeper) {
          valueKeeper[action.key!] = action.value;
        } else {
          element.settingsUI[action.parentKey] = {[action.key!]: action.value};
        }
      } else {
        if (element.settingsUI[action.key!] !== undefined || blocks[element.blockId].config[action.key!]) {
          element.settingsUI[action.key!] = action.value;
        } else if (element.interactive) {
          element.interactive[action.key!] = action.value;
        }
      }
      return {
        ...state,
        blocks: [...newBlocks],
      };
    case actionTypes.DELETE_BLOCK:
      const newArr = [...state.blocks];
      const mustBeRemoved = removeFromList(newArr, action.blockUuid!);
      const stateReference = {...state};
      if (action.blockUuid === state.bottomBar?.uuid) {
        delete stateReference.bottomBar;
      }
      if (action.blockUuid === state.topAppBar?.uuid) {
        delete stateReference.topAppBar;
      }
      return {
        ...stateReference,
        blocks: [...mustBeRemoved],
        selectedBlockUuid: '',
      };
    case actionTypes.CHANGE_DOCUMENT_ID:
      return {
        ...state,
        documentId: action.documentId,
      };
    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        blocks: [...action.layout],
        bottomBar: action.bottomBar,
        topAppBar: action.topAppBar,
      };
    case actionTypes.SELECT_SCREEN:
      let nextScreenState = {...state};
      if (action.delete) {
        nextScreenState.deletedScreens = Array.from(new Set([...state.deletedScreens, action.screen]));
      } else {
        nextScreenState = {
          ...state,
          selectedScreen: action.screen,
          editedScreens: Array.from(new Set([...state.editedScreens, action.screen])),
        };
      }
      return nextScreenState;
    case actionTypes.EDIT_SCREEN_NAME:
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
    case actionTypes.CLONE_BLOCK:
      const blocksArray = [...state.blocks];
      const withClone = cloneToList(blocksArray, action.blockUuid!);
      const stateRef = {...state};
      if (action.blockUuid === state.bottomBar?.uuid) {
        delete stateRef.bottomBar;
      }
      if (action.blockUuid === state.topAppBar?.uuid) {
        delete stateRef.topAppBar;
      }
      return {
        ...stateRef,
        blocks: withClone,
        selectedBlockUuid: '',
      };
    case actionTypes.SET_SNIPPET:
      const snippetsRef = [...state.snippets];
      const snippetRef = snippetsRef.filter((item) => item.screenID === action.selectedScreen!)[0];
      if (snippetRef) {
        snippetRef.snippet = action.snippet;
        return {
          ...state,
          snippets: snippetsRef,
        };
      }
      return state;
    case actionTypes.SWITCH_ELEMENT_TYPE:
      const blocksArr = [...state.blocks];
      const currentElement = findInTree(blocksArr, state.selectedBlockUuid);
      currentElement!.blockId = action.blockId.toLowerCase();
      return {...state, blocks: blocksArr};
    default:
      return state;
  }
}
