import {Button} from 'components/controls';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {deleteAction, deleteScreen, editProject, saveAction, saveScreen} from 'services/ApiService';
import {Store} from 'react-notifications-component';
import {successNotification} from 'constants/notifications';
import {changesSaved} from 'store/layout.slice';
import {currentEditorStateSafeSelector} from 'store/selectors';

export const SaveAppWrapper: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {currentProject, actions, deletedActions, deletedScreens, editedScreens, snippets} =
    useSelector(currentEditorStateSafeSelector);
  const projectID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const handleSaveApplication: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      event.stopPropagation();
      const snippetsPromises: Promise<any>[] = snippets.filter((item) => {
        if (editedScreens.includes(item.screenID) && !deletedScreens.includes(item.screenID)) {
          return saveScreen(projectID, item.endpoint, `${item.logic.replace(/return$/g, '')}${item.snippet}`);
        }
      });
      const deletedSnippetsPromises: Promise<any>[] = snippets.filter((item) => {
        if (deletedScreens.includes(item.screenID)) {
          return deleteScreen(projectID, item.endpoint);
        }
      });

      const actionsPromises: Promise<any>[] = actions.map((item) => {
        return saveAction(projectID, item.type, item.action, item.object);
      });
      const deletedActionsPromises: Promise<any>[] = deletedActions.map((item) => {
        return deleteAction(projectID, item.type, item.action);
      });
      await editProject(projectID, JSON.stringify({...currentProject, icon: undefined}));
      Promise.all([
        ...snippetsPromises,
        ...deletedSnippetsPromises,
        ...actionsPromises,
        ...deletedActionsPromises,
      ]).then(() => {
        Store.addNotification({
          ...successNotification,
          title: 'Success',
          message: 'All your changes is saved.',
        });
      });
      dispatch(changesSaved());
    },
    [actions, currentProject, deletedActions, deletedScreens, dispatch, editedScreens, projectID, snippets]
  );

  return <Button onClick={handleSaveApplication}>Save application</Button>;
};
