import {BlockItem} from 'store/types';

export const getEnrichedBlockConfig = (block: BlockItem): BlockItem => {
  if (!block.settingsUI) block.settingsUI = {};
  return block;
};
