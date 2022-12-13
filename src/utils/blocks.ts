import {v4 as uuidv4} from 'uuid';
import blocks from 'views/blocks';
import {blockStateUnsafeSelector} from 'store/selectors';
import rootStore from 'store';
import {getData} from 'utils/prepareModel';

import type {IListItem} from 'store/types';

export const getEnrichedBlockConfig = (block: IListItem | null): IListItem | null => {
  if (!block) {
    return null;
  }
  if (!block.settingsUI) {
    block.settingsUI = {};
  }
  return block;
};

export const findInTree = (tree: IListItem[], uuid: string): IListItem | null => {
  let result: IListItem | null = null;
  for (const item of tree) {
    if (item.uuid === uuid) {
      result = item;
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

export const findParentInTree = (tree: IListItem[], uuid: string, parentItem: IListItem | null = null): IListItem | null => {
  let result: IListItem | null = null;
  for (const item of tree) {
    if (item.uuid === uuid) {
      result = parentItem;
      break;
    }
    if (!result && item.listItems) {
      result = findParentInTree(item.listItems, uuid, item);
    }
    if (!result && item.listItem) {
      result = findParentInTree([item.listItem], uuid, item);
    }
  }

  return result;
};

export const removeFromList = (tree: IListItem[], uuid: string) => {
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

export const createBlockByConfig = (blockId: string, config?: IListItem): IListItem => {
  const blockConfig = config || blocks[blockId](blockStateUnsafeSelector(rootStore.getState()));

  const {
    listItem,
    listItems,
    defaultData,
    defaultInteractiveOptions,
  } = blockConfig;

  const block: IListItem = {
    blockId,
    uuid: uuidv4(),
    ...listItems,
    settingsUI: {
      ...getData(defaultData),
    },
  };
  if (defaultInteractiveOptions) {
    block.interactive = {
      ...getData(defaultInteractiveOptions),
    };
  }
  if (listItems) {
    block.listItems = listItems;
  }
  if (listItem !== undefined) {
    block.listItem = listItem;
  }

  return block;
};

export const cloneToList = (tree: IListItem[], uuid: string) => {
  const result = [...tree];
  tree.forEach((item) => {
    if (item.uuid === uuid) {
      const newItem = {...item, uuid: uuidv4()};
      result.push(newItem);
    } else if (item.listItems) {
      item.listItems = cloneToList(item.listItems, uuid);
    } else if (item.listItem && item.listItem.listItems) {
      item.listItem.listItems = cloneToList(item.listItem.listItems, uuid);
    }
  });
  return result;
};
