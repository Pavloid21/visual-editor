import {RootStore} from '../types';
import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: RootStore) => state;

const snippets = (state: RootStore) => state.actions;

const selected = (state: RootStore) => state.actions.selected;

export const snippetsSelector = createSelector(selectSelf, snippets);
export const selectedActionSelector = createSelector(selectSelf, selected);
