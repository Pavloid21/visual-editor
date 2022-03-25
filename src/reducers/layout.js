import actionTypes from "../constants/actionTypes";
import blocks from "../views/blocks/";
import { v4 as uuidv4 } from "uuid";
import { getData } from "../utils/prepareModel";
import { v4 } from "uuid";

const initialState = {
  blocks: [],
  selectedBlockUuid: "",
  documentId: "document2",
  selectedScreen: null,
  editedScreens: [],
  deletedScreens: [],
  snippets: [],
};

const buildLayout = ({ screen, object }) => {
  const tree = object.listItems;
  let newBlock = {
    screen: object.screen,
    listItems: [],
  };
  const traverse = function (tree) {
    return tree.map((item) => {
      const { settingsUI, action, listItems } = item;
      let reference = {};
      reference.uuid = v4();
      reference.blockId = item.type.toLowerCase();
      reference.settingsUI = settingsUI;
      if (listItems) {
        reference.listItems = traverse(listItems);
      }
      if (action) {
        reference.interactive = { action };
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
      blockId: "bottombar",
      uuid: v4(),
      settingsUI: {
        ...object.bottomBar.settingsUI,
        navigationItems: object.bottomBar.navigationItems,
      },
    };
  }
  if (object.appBar) {
    action.appBar = {
      settingsUI: "topappbar",
      uuid: v4(),
      data: {
        ...object.appBar.settingsUI,
        appBarItems: object.appBar.appBarItems,
      },
    };
  }
  return { newBlock, action, screenEndpoint: screen };
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

const cloneToList = (tree, uuid) => {
  const result = [...tree];
  tree.forEach((item) => {
    if (item.uuid === uuid) {
      const newItem = { ...item, uuid: v4() };
      result.push(newItem);
    } else if (item.listItems) {
      item.listItems = cloneToList(item.listItems, uuid);
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
        settingsUI: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      return { ...state, appBar };
    case actionTypes.PUSH_BOTTOMBAR:
      const bottomBar = {
        uuid: uuidv4(),
        blockId: action.blockId,
        settingsUI: {
          ...getData(blocks[action.blockId].defaultData),
        },
      };
      return { ...state, bottomBar };
    case actionTypes.ADD_BOTTOMBAR_ITEM:
      const extendedItems = [...state.bottomBar.settingsUI.navigationItems];
      extendedItems.push({
        ...blocks.bottombar.defaultData.navigationItems[0],
        uuid: uuidv4(),
      });
      const bar = { ...state.bottomBar };
      bar.settingsUI.navigationItems = extendedItems;
      return { ...state, bottomBar: { ...bar } };
    case actionTypes.ADD_TOPAPPBAR_ITEM:
      const nextItems = [...state.appBar.settingsUI.appBarItems];
      nextItems.push({
        ...blocks.topappbar.defaultData.appBarItems[0],
        uuid: uuidv4(),
      });
      const abar = { ...state.appBar };
      abar.settingsUI.appBarItems = nextItems;
      return { ...state, appBar: { ...abar } };
    case actionTypes.REMOVE_BOTTOMBAR_ITEM:
      const newBarItems = [...state.bottomBar.settingsUI.navigationItems];
      newBarItems.splice(action.index, 1);
      const newBottomBar = { ...state.bottomBar };
      newBottomBar.settingsUI.navigationItems = newBarItems;
      return { ...state, bottomBar: { ...newBottomBar } };
    case actionTypes.REMOVE_TOPAPPBAR_ITEM:
      const newAppBarItems = [...state.appBar.settingsUI.appBarItems];
      newAppBarItems.splice(action.index, 1);
      const newAppBar = { ...state.appBar };
      newAppBar.settingsUI.appBarItems = newAppBarItems;
      return { ...state, appBar: { ...newAppBar } };
    case actionTypes.PUSH_BLOCK:
      const listItems = blocks[action.blockId].listItems;
      let newBlock = {
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
      if (action.blockId === "bottombar" || action.blockId === "topappbar") {
        return state;
      }
      const target = findInTree(state.blocks, action.uuid);
      const list = blocks[action.blockId].listItems;
      const newBloc = {
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
      const newBlocks = JSON.parse(JSON.stringify(state.blocks));
      const element =
        findInTree(newBlocks, action.blockUuid) ||
        (action.blockUuid === state.bottomBar?.uuid
          ? {
              ...state.bottomBar,
            }
          : { ...state.appBar });
      if (action.parentKey && Array.isArray(action.parentKey)) {
        element.settingsUI[action.parentKey[1]][action.parentKey[0]][
          action.key
        ] = action.value;
      } else if (action.parentKey) {
        const findDataBlock = (data, parentKey, key) => {
          let ref = null;
          Object.keys(data).forEach((item) => {
            if (item === parentKey) {
              ref = data[item];
            } else if (typeof data[item] === "object" && !ref) {
              ref = findDataBlock(data[item], parentKey, key);
            }
          });
          return ref;
        };
        const valueKeeper = findDataBlock(
          { settingsUI: element.settingsUI, interactive: element.interactive },
          action.parentKey,
          action.key
        );
        if (valueKeeper) {
          valueKeeper[action.key] = action.value;
        } else {
          element.settingsUI[action.parentKey] = { [action.key]: action.value };
        }
      } else {
        if (element.settingsUI[action.key] !== undefined) {
          element.settingsUI[action.key] = action.value;
        } else if (element.interactive) {
          element.interactive[action.key] = action.value;
        }
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
        blocks: [...action.layout],
        bottomBar: action.bottomBar,
        appBar: action.appBar,
      };
    case actionTypes.SELECT_SCREEN:
      let nextScreenState = { ...state };
      if (action.delete) {
        nextScreenState.deletedScreens.push(action.screen);
      } else {
        nextScreenState = {
          ...state,
          selectedScreen: action.screen,
          editedScreens: [...state.editedScreens, action.screen],
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
      const withClone = cloneToList(blocksArray, action.blockUuid);
      const stateRef = { ...state };
      if (action.blockUuid === state.bottomBar?.uuid) {
        delete stateRef.bottomBar;
      }
      if (action.blockUuid === state.appBar?.uuid) {
        delete stateRef.appBar;
      }
      return {
        ...stateRef,
        blocks: withClone,
        selectedBlockUuid: "",
      };
    case actionTypes.SET_SNIPPET:
      const snippetsRef = [...state.snippets];
      const snippetRef = snippetsRef.filter(
        (item) => item.screenID === action.selectedScreen
      )[0];
      if (snippetRef) {
        snippetRef.snippet = action.snippet;
        return {
          ...state,
          snippets: snippetsRef,
        };
      }
      return state;
    default:
      return state;
  }
}
