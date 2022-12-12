import {createDraftSafeSelector, createSelector} from '@reduxjs/toolkit';
import {RootStore} from 'store/types';
import {BlocksState} from 'views/blocks/types';
import {Device} from 'containers/MobileSelect/consts';

const selectSelf = (state: RootStore) => state;
const getBlocksSelector = (state: RootStore) => state.layout.blocks;

const getBlockState = ({editorMode}: RootStore): BlocksState => ({
  deviceInfo: {
    device: editorMode.device as Device,
    model: editorMode.model,
    dpi: editorMode.dpi
  }
});

export const getListItemCollectionSelector = createSelector(getBlocksSelector, (blocks) => {
  const firstIndex = 0;

  if(blocks.length) {
    const checkBlocksLength =  blocks[firstIndex].listItems.map((item) => {
      if(item.blockId === 'collection' && item.listItem !== null) {
        return item.listItem;
      }
    });
    return checkBlocksLength.filter((item) => item !== undefined);
  }
});

export const blockStateUnsafeSelector = createSelector(selectSelf, getBlockState);
export const blockStateSafeSelector = createDraftSafeSelector(selectSelf, getBlockState);