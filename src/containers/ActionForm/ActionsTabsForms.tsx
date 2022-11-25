import React, {FC} from 'react';
import {ActionForm} from './ActionForm';
import {ActionItem, ActionTypes, RootStore} from 'store/types';
import {useSelector} from 'react-redux';
import ActionPushForm from './ActionPushForm';
import ActionCronTasksForm from './ActionCronTasksForm';

type ActionsTabsFormsType = {
  selectedAction: ActionItem
}

const ActionsTabsForms: FC<ActionsTabsFormsType> = ({selectedAction}) => {
  const activeTabActions = useSelector((state: RootStore) => state.leftBarMenu.activeTabActions);

    switch (activeTabActions) {
      case ActionTypes.cronTasks:
        return <ActionCronTasksForm action={selectedAction} />;
      case ActionTypes.push:
        return <ActionPushForm action={selectedAction} />;
      default:
        return <ActionForm action={selectedAction} />;
    }
};

export default ActionsTabsForms;
