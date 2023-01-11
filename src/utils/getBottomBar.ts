import {v4 as uuidv4} from 'uuid';

import {getScreenByName} from 'services/ApiService';
import {replaceBottomBar} from 'store/layout.slice';
import {parseReturnStatement} from 'utils';

import type {Dispatch} from 'redux';

export const getBottomBar = (screenName: string, projectId?: string) => async (dispatch: Dispatch) => {
  const response = await getScreenByName(screenName, false, projectId);
  const {bottomBar} = parseReturnStatement(response);

  
  const result = {
      settingsUI: bottomBar?.settingsUI ? {...bottomBar.settingsUI, navigationItems: bottomBar.navigationItems} : {},
      uuid: uuidv4(),
      blockId: 'bottombar'
  };

  dispatch(replaceBottomBar(result));
};
