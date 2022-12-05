import React, {FC} from 'react';
import {ActionForm} from './ActionForm';
import {ActionItem, ActionTypes} from 'store/types';
import {useAppSelector} from 'store';
import ActionPushForm from './ActionPushForm';
import ActionCronTasksForm from './ActionCronTasksForm';

type ActionsTabsFormsType = {
  selectedAction: ActionItem
}

const ActionsTabsForms: FC<ActionsTabsFormsType> = ({selectedAction}) => {
  const {activeTabActions} = useAppSelector((state) => state.leftBarMenu);

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
