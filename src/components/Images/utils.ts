import {IconTabObjectType, IconTabType} from './types';

export const groupTabs = (array: IconTabType[]) => {
  return array.reduce((acc: IconTabObjectType, obj: IconTabType) => {
    acc[obj.dir] = acc[obj.dir] || [];
    acc[obj.dir].push(obj);
    return acc;
  }, {});
};

export const trimExtension = (str: string) => str.replace(/\.[^/.]+$/, "");
export const haveExtension = (str: string, extension: string) => str.match(`${extension}$`);
