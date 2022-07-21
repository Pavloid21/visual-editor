import actionTypes from 'constants/actionTypes';
import {BlockItem} from 'reducers/types';
import {AnyAction} from 'redux';
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

const buildTreeitem = (block: Record<string, any>) => {
  if (block) {
    const data: Record<string, any> = {
      subtitle: block.uuid,
      title: block.blockId.toUpperCase(),
      expanded: true,
      children: [],
    };
    if (block.listItems) {
      data.children = block.listItems.map((item: Record<string, any>) => buildTreeitem(item));
    }
    if (block.listItem) {
      data.children = [buildTreeitem(block.listItem)];
    }
    return data;
  }
  return null;
};

export const prepareTree = (
  treeData: Record<string, any>,
  selectedScreen: string,
  topAppBar: Record<string, any>,
  bottomBar: Record<string, any>
) => {
  const root = {...treeData.value};
  root.subtitle = 'screen';
  root.title = 'Screen';
  root.uuid = treeData.uuid;
  root.endpoint = treeData.screenEndpoint;
  root.logic = treeData.logic;
  root.expanded = treeData.uuid === selectedScreen;
  if (treeData.value.listItems) {
    root.children = treeData.value.listItems.map((block: Record<string, any>) => {
      return buildTreeitem(block);
    });
  } else if (treeData.value.listItem) {
    root.children = [buildTreeitem(treeData.value.listItem)];
  }
  if (topAppBar) {
    root.children.unshift({
      title: 'TOPAPPBAR',
      subtitle: topAppBar?.uuid,
    });
  }
  if (bottomBar) {
    root.children.push({
      title: 'BOTTOMBAR',
      subtitle: bottomBar?.uuid,
    });
  }
  return root;
};

export const buildLayout = ({screen, object}: Record<string, any>) => {
  const tree = object.listItems;
  const newBlock: Record<string, any> = {
    screen: object.screen,
    listItems: [],
  };
  newBlock.listItems = tree?.length ? traverse(tree) : [];
  const action: AnyAction = {
    type: actionTypes.SET_LAYOUT,
    layout: newBlock.listItems,
  };
  if (object.bottomBar) {
    action.bottomBar = {
      blockId: 'bottombar',
      uuid: v4(),
      settingsUI: {
        ...object.bottomBar.settingsUI,
        navigationItems: object.bottomBar.navigationItems,
      },
    };
  }
  if (object.topAppBar) {
    action.topAppBar = {
      blockId: 'topappbar',
      uuid: v4(),
      settingsUI: {
        ...object.topAppBar.settingsUI,
      },
      interactive: {
        appBarItems: {...object.topAppBar.appBarItems},
      },
    };
  }
  return {newBlock, action, screenEndpoint: screen};
};

export const findInTree = (tree: BlockItem[], uuid: string): BlockItem | null => {
  let result: BlockItem | null = null;
  tree.forEach((item) => {
    if (item.uuid === uuid) {
      result = item;
    }
    if (!result && item.listItems) {
      result = findInTree(item.listItems, uuid);
    }
    if (!result && item.listItem) {
      result = findInTree([item.listItem], uuid);
    }
  });

  return result;
};
