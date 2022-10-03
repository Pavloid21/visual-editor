import {BlockItem} from 'store/types';
import {v4 as uuidv4} from 'uuid';
import blocks from 'views/blocks';
import {blockStateUnsafeSelector} from 'store/selectors';
import rootStore from 'store';
import {getData} from 'utils/prepareModel';

export const getEnrichedBlockConfig = (block: BlockItem | null): BlockItem | null => {
  if (!block) {
    return null;
  }
  if (!block.settingsUI) {
    block.settingsUI = {};
  }
  return block;
};

export const findInTree = (tree: BlockItem[], uuid: string): BlockItem | null => {
  let result: BlockItem | null = null;
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

export const removeFromList = (tree: BlockItem[], uuid: string) => {
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

export const createBlockByConfig = (blockId: string, config?: BlockItem): BlockItem => {
  const blockConfig = config || blocks[blockId](blockStateUnsafeSelector(rootStore.getState()));

  const {
    listItem,
    listItems,
    defaultData,
    defaultInteractiveOptions,
  } = blockConfig;

  const block: BlockItem = {
    blockId,
    uuid: uuidv4(),
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

export const cloneToList = (tree: BlockItem[], uuid: string) => {
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
