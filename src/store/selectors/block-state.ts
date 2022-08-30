import {createDraftSafeSelector, createSelector} from '@reduxjs/toolkit';
import {RootStore} from 'store/types';
import {BlocksState} from 'views/blocks/types';
import {Device} from 'containers/MobileSelect/consts';

const selectSelf = (state: RootStore) => state;

const getBlockState = ({editorMode}: RootStore): BlocksState => ({
  deviceInfo: {
    device: editorMode.device as Device,
    model: editorMode.model,
    dpi: editorMode.dpi
  }
});

export const blockStateUnsafeSelector = createSelector(selectSelf, getBlockState);
export const blockStateSafeSelector = createDraftSafeSelector(selectSelf, getBlockState);
