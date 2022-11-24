import {IconTabObjectType, IconTabType} from './types';

export const groupTabs = (array: IconTabType[]) => {
  return array.reduce((acc: IconTabObjectType, obj: IconTabType) => {
    const property = obj.tabsType;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};
