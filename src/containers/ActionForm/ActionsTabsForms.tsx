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

  const renderActionForm = () => {
    switch (activeTabActions) {
      case 'cronTasks':
        return <ActionCronTasksForm action={selectedAction} />;
      case 'push':
        return <ActionPushForm action={selectedAction} />;
    }
    return <ActionForm action={selectedAction} />;
  };

  return (
    <>
      {renderActionForm()}
    </>
  );
};

export default ActionsTabsForms;
