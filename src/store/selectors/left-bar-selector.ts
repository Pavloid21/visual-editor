import {orderBy} from 'external/lodash';
import {createSelector} from '@reduxjs/toolkit';
import {ActionItem, Actions, ActionTypes, RootStore} from 'store/types';

const selectSelf = (state: RootStore) => state;

const snippets = (state: RootStore) => state.actions;

const selected = (state: RootStore) => state.actions.selected;

export const snippetsSelector = createSelector(selectSelf, snippets);

const normalizer = (type: ActionTypes) => (item: ActionItem) => ({
  ...item,
  type,
});

const order = (data: ActionItem[], type: string) => orderBy(
  data,
  type,
  'asc',
);

const getAvailableActions = (snippets: Actions, type: ActionTypes) => {
  if (type !== ActionTypes.all) {
    return order(
      snippets[type].map(normalizer(type)),
      'action'
    );
  }

  return order(
    [
      ...snippets.actions.map(normalizer(ActionTypes.actions)),
      ...snippets.data.map(normalizer(ActionTypes.data)),
      ...snippets.externals.map(normalizer(ActionTypes.externals))
    ],
    'action',
  );
};

export const filteredSnippetsSelector = createSelector(
  snippets,
  (_state: RootStore, tab: ActionTypes) => tab,
  (_state: RootStore, type: ActionTypes) => type,
  (snippets, tab, type) => {
    if ([ActionTypes.cronTasks, ActionTypes.push].includes(tab)) {
      return order(
        [
          ...snippets[type].map(normalizer(type))
        ],
        'action'
      );
    }
    return getAvailableActions(snippets, type);
  }
);
export const selectedActionSelector = createSelector(selectSelf, selected);
