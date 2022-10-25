import React, {FC} from 'react';
import {ActionForm} from './index';
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
      {activeTabActions === 0 && <ActionForm action={selectedAction} />}
      {activeTabActions === 1 && <ActionCronTasksForm action={selectedAction} />}
      {activeTabActions === 2 && <ActionPushForm action={selectedAction} />}
    </>
  );
};

export default ActionsTabsForms;
