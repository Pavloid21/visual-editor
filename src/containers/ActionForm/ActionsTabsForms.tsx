import React, {FC} from 'react';
import {ActionForm} from './ActionForm';
import {ActionItem, RootStore} from 'store/types';
import {useSelector} from 'react-redux';
import ActionPushForm from './ActionPushForm';
import ActionCronTasksForm from './ActionCronTasksForm';

type ActionsTabsFormsType = {
  selectedAction: ActionItem
}

const ActionsTabsForms: FC<ActionsTabsFormsType> = ({selectedAction}) => {
  const activeTabActions = useSelector((state: RootStore) => state.leftBarMenu.activeTabActions);

  return (
    <>
      {activeTabActions === 'actions' && <ActionForm action={selectedAction} />}
      {activeTabActions === 'cronTasks' && <ActionCronTasksForm action={selectedAction} />}
      {activeTabActions === 'push' && <ActionPushForm action={selectedAction} />}
    </>
  );
};

export default ActionsTabsForms;
