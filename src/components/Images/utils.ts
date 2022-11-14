export const groupTabs = (array: any) => {
  return array.reduce((acc: any, obj: any) => {
    const property = obj.tabsType;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};
