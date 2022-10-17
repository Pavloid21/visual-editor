import React, {FC} from 'react';
import {ActionForm} from './index';
import {ActionCronTaskItem, ActionItem, ActionPushItem, RootStore} from 'store/types';
import {useSelector} from 'react-redux';
import ActionPushForm from './ActionPushForm';
import ActionCronTasksForm from './ActionCronTasksForm';

type ActionsTabsFormsType = {
  selectedAction: ActionItem | ActionPushItem | ActionCronTaskItem
}

const ActionsTabsForms: FC<ActionsTabsFormsType> = ({selectedAction}) => {
  const activeTabActions = useSelector((state: RootStore) => state.leftBarMenu.activeTabActions);

  return (
    <>
      {activeTabActions === 0 && <ActionForm action={selectedAction as ActionItem} />}
      {activeTabActions === 1 && <ActionCronTasksForm action={selectedAction as ActionCronTaskItem} />}
      {activeTabActions === 2 && <ActionPushForm action={selectedAction as ActionPushItem} />}
    </>
  );
};

export default ActionsTabsForms;
