import actionTypes from "../constants/actionTypes";
import blocks from "../views/blocks/";
import { v4 as uuidv4 } from "uuid";
import { getData } from "../utils/prepareModel";

const initialState = {
  blocks: [],
  selectedBlockUuid: "",
  documentId: "document2",
};

export const findInTree = (tree, uuid) => {
  let result = null;
  tree.forEach((item) => {
    if (item.uuid === uuid) {
      result = item;
    }
    if (!result && item.listItems) {
      result = findInTree(item.listItems, uuid);
    }
  });

  return result;
};

const removeFromList = (tree, uuid) => {
  const result = [...tree];
  tree.forEach((item, index) => {
    if (item.uuid === uuid) {
      result.splice(index, 1);
    } else if (item.listItems) {
      item.listItems = removeFromList(item.listItems, uuid);
    }
  });
  return result;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PUSH_TOPAPPBAR:
      const appBar = {
        uuid: uuidv4(),
        blockId: action.blockId,
        data: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      return { ...state, appBar };
    case actionTypes.PUSH_BOTTOMBAR:
      const bottomBar = {
        uuid: uuidv4(),
        blockId: action.blockId,
        data: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      return { ...state, bottomBar };
    case actionTypes.ADD_BOTTOMBAR_ITEM:
      const extendedItems = [...state.bottomBar.data.navigationItems];
      extendedItems.push({
        ...blocks.bottombar.defaultData.navigationItems[0],
        uuid: uuidv4(),
      });
      const bar = { ...state.bottomBar };
      bar.data.navigationItems = extendedItems;
      return { ...state, bottomBar: { ...bar } };
    case actionTypes.ADD_TOPAPPBAR_ITEM:
      const nextItems = [...state.appBar.data.appBarItems];
      nextItems.push({
        ...blocks.topappbar.defaultData.appBarItems[0],
        uuid: uuidv4(),
      });
      const abar = { ...state.appBar };
      abar.data.appBarItems = nextItems;
      return { ...state, appBar: { ...abar } };
    case actionTypes.REMOVE_BOTTOMBAR_ITEM:
      const newBarItems = [...state.bottomBar.data.navigationItems];
      newBarItems.splice(action.index, 1);
      const newBottomBar = { ...state.bottomBar };
      newBottomBar.data.navigationItems = newBarItems;
      return { ...state, bottomBar: { ...newBottomBar } };
    case actionTypes.REMOVE_TOPAPPBAR_ITEM:
      const newAppBarItems = [...state.appBar.data.appBarItems];
      newAppBarItems.splice(action.index, 1);
      const newAppBar = { ...state.appBar };
      newAppBar.data.appBarItems = newAppBarItems;
      return { ...state, appBar: { ...newAppBar } };
    case actionTypes.PUSH_BLOCK:
      const listItems = blocks[action.blockId].listItems;
      const newBlock = {
        uuid: uuidv4(),
        blockId: action.blockId,
        data: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      if (listItems) {
        newBlock.listItems = listItems;
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
      const target = findInTree(state.blocks, action.uuid);
      const list = blocks[action.blockId].listItems;
      const newBloc = {
        uuid: uuidv4(),
        blockId: action.blockId,
        data: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      if (list) {
        newBloc.listItems = list;
      }
      target.listItems = [
        ...(target.listItems || []),
        {
          ...newBloc,
        },
      ];
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
        blocks: [...action.newBlocksLayout],
      };
    case actionTypes.REPLACE_ELEMENT:
      const blocksRef = [...state.blocks];
      let parentElement = findInTree(blocksRef, action.element.uuid);
      parentElement = action.element;
      return {
        ...state,
        blocks: blocksRef,
      };
    case actionTypes.CHANGE_BLOCK_DATA:
      const newBlocks = [...state.blocks];
      const element =
        findInTree(newBlocks, action.blockUuid) ||
        (action.blockUuid === state.bottomBar.uuid
          ? {
              ...state.bottomBar,
            }
          : { ...state.appBar });
      if (action.parentKey && Array.isArray(action.parentKey)) {
        element.data[action.parentKey[1]][action.parentKey[0]][action.key] =
          action.value;
      } else if (action.parentKey) {
        element.data[action.parentKey][action.key] = action.value;
      } else {
        element.data[action.key] = action.value;
      }
      return {
        ...state,
        blocks: [...newBlocks],
      };
    case actionTypes.DELETE_BLOCK:
      const newArr = [...state.blocks];
      const mustBeRemoved = removeFromList(newArr, action.blockUuid);
      const stateReference = { ...state };
      if (action.blockUuid === state.bottomBar?.uuid) {
        delete stateReference.bottomBar;
      }
      if (action.blockUuid === state.appBar?.uuid) {
        delete stateReference.appBar;
      }
      return {
        ...stateReference,
        blocks: [...mustBeRemoved],
        selectedBlockUuid: "",
      };
    case actionTypes.CHANGE_DOCUMENT_ID:
      return {
        ...state,
        documentId: action.documentId,
      };
    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        blocks: [action.layout],
        bottomBar: action.bottomBar,
        appBar: action.appBar,
      };
    default:
      return state;
  }
}
