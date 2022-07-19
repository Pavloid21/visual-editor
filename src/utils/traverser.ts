import {v4} from 'uuid';

export const traverse = function (tree: Record<string, any>[]) {
  return tree.map((item) => {
    const {settingsUI, action, listItems, listItem, ...interactive} = item;
    const reference: Record<string, any> = {};
    reference.uuid = v4();
    reference.blockId = item.type.toLowerCase();
    reference.settingsUI = settingsUI;
    reference.interactive = interactive;
    if (listItems) {
      reference.listItems = traverse(listItems);
    }
    if (listItem) {
      reference.listItem = traverse([listItem])[0];
    }
    if (action) {
      reference.interactive = {action};
    }
    return reference;
  });
};
