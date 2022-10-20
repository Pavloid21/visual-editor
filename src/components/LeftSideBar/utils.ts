import {getScreenByName} from 'services/ApiService';
import {buildLayout} from 'utils';

export const generatePromiseStack = (data: any[], parsed: boolean, project?: string) => {
  const screenesArr = data.map(async (screen: string) => {
    try {
      const response = await getScreenByName(screen, parsed, project);
      return {
        screen,
        object: response.data,
        logic: response.data,
        project,
      };
    } catch (e) {
      console.log('e :>> ', e);
    }
  });
  return screenesArr;
};

const parseRuturnStatement = (script: any) => {
  const string: string = script.data.indexOf(' ') === 0 ? `${script.data}`.replace(' ', '') : script.data;
  //@ts-ignore
  const func = eval(`(() => {return {${string.match(/(?<=^return.{).*$/gms)[0]}})`);
  return func();
};

export const updateScreenList = function (
  this: Record<string, any>[],
  script: any,
  screenLayout: Record<string, any>,
  screenPositionInList: number,
  project?: string
) {
  if (script.data) {
    const rawData = {
      screen,
      logic: parseRuturnStatement(script),
      object: parseRuturnStatement(script),
      project,
    };
    const {newBlock, action, screenEndpoint} = buildLayout(rawData);
    const newScreenData = {
      uuid: screenLayout.uuid,
      value: newBlock,
      action,
      screenEndpoint,
      logic: rawData.logic[0],
      project,
    };
    const nextList = [...this];
    nextList[screenPositionInList] = newScreenData;
    return nextList;
  }
  return this;
};
