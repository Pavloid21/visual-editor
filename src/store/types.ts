import {Action} from 'redux';

export type EditScreenNamePayloadAction = Action<string> & {
  screen: string,
  snippet: {
    snippet: string,
    endpoint: string,
    selectedScreen: string,
    screenID: string,
    logic: string
  }
};
