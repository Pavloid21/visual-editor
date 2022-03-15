const actionTypes = {
  CHANGE_ACTIVE_TAB: "CONFIG/CHANGE_ACTIVE_TAB",
  CHANGE_PREVIEW_MODE: "CONFIG/CHANGE_PREVIEW_MODE",
  SET_SELECTED_BLOCK: "LAYOUT/SET_SELECTED_BLOCK",
  PUSH_BLOCK: "LAYOUT/PUSH_BLOCK",
  PUSH_BLOCK_INSIDE: "LAYOUT/PUSH_BLOCK_INSIDE",
  CHANGE_BLOCK_DATA: "LAYOUT/CHANGE_BLOCK_DATA",
  REPLACE_ELEMENT: "LAYOUT/REPLACE_ELEMENT",
  REORDER_LAYOUT: "LAYOUT/REORDER_LAYOUT",
  DELETE_BLOCK: "LAYOUT/DELETE_BLOCK",
  CHANGE_DOCUMENT_ID: "LAYOUT/CHANGE_DOCUMENT_ID",
  EDIT_SCREEN_NAME: "OUTPUT/EDIT_SCREEN_NAME",
  SET_LAYOUT: "LAYOUT/SET_LAYOUT",
  PUSH_BOTTOMBAR: "LAYOUT/PUSH_BOTTOMBAR",
  REMOVE_BOTTOMBAR_ITEM: "LAYOUT/REMOVE_BOTTOMBAR_ITEM",
  ADD_BOTTOMBAR_ITEM: "LAYOUT/ADD_BOTTOMBAR_ITEM",
  PUSH_TOPAPPBAR: "LAYOUT/PUSH_TOPAPPBAR",
  ADD_TOPAPPBAR_ITEM: "LAYOUT/ADD_TOPAPPBAR_ITEM",
  REMOVE_TOPAPPBAR_ITEM: "LAYOUT/REMOVE_TOPAPPBAR_ITEM",
  ADD_API: "API/ADD_API",
  REMOVE_API_ITEM: "API/REMOVE_API_ITEM",
  EDIT_API: "API/EDIT_API",
  SET_CURRENT_SCREEN_NAME: "API/SET_CURRENT_SCREEN_NAME",
  TOGGLE_LEFT_BAR: "UI/TOGGLE_LEFT_BAR",
  TOGGLE_RIGHT_BAR: "UI/TOGGLE_RIGHT_BAR",
  SET_EDITOR_MODE: "UI/SET_EDITOR_MODE",
  SAVE_CODE: "CODE/SAVE_CODE",
  SELECT_SCREEN: "SCREEN/SELECT_SCREEN",
};

export const ItemTypes = {
  BOX: "box",
};

export default actionTypes;
