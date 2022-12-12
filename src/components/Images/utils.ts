import {IconTabObjectType, IconTabType} from './types';

export const groupTabs = (array: IconTabType[]) => {
  return array.reduce((acc: IconTabObjectType, obj: IconTabType) => {
    const property = obj.dir;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};

export const trimExtension = (str: string) => str.replace(/\.[^/.]+$/, "");
export const haveExtension = (str: string, extension: string) => str.match(`\.${extension}$`);
