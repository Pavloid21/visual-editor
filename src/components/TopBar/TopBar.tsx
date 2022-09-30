import React, {useCallback} from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as HideLeft} from '../../assets/hide_left.svg';
import {ReactComponent as HideRight} from '../../assets/hide_right.svg';
import {Button} from 'components/controls';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAction, deleteScreen, editProject, saveAction, saveScreen} from '../../services/ApiService';
import {useKeycloak} from '@react-keycloak/web';
import {useLocation} from 'react-router-dom';
import {Store} from 'react-notifications-component';
import {successNotification} from 'constants/notifications';
import {useOutside} from 'utils';
import {changesSaved} from 'store/layout.slice';
import {toggleLeftBar, toggleRightBar} from 'store/side-bar.slice';
import type {RootStore} from 'store/types';
import {Bar, VerticalDivider} from './TopBar.styled';

const TopBar = () => {
  const dispatch = useDispatch();
  const {keycloak} = useKeycloak();
  const location = useLocation();
  const isEditorPath = location.pathname.indexOf('editor') >= 0;
  const snippets = useSelector((state: RootStore) => state.layout.snippets);
  const currentProject = useSelector((state: RootStore) => state.project);
  const {ref, isShow, setIsShow} = useOutside(false);
  const actions = useSelector((state: RootStore) => [
    ...state.actions.actions.map((item) => ({...item, type: 'actions'})),
    ...state.actions.data.map((item) => ({...item, type: 'data'})),
  ]);
  const deletedActions = useSelector((state: RootStore) => [
    ...state.actions.deleted.actions.map((item) => ({
      ...item,
      type: 'actions',
    })),
    ...state.actions.deleted.data.map((item) => ({...item, type: 'data'})),
  ]);
  const deletedScreens = useSelector((state: RootStore) => state.layout.deletedScreens);
  const editedScreens = useSelector((state: RootStore) => state.layout.editedScreens);
  const projectID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const handleHideLeft = useCallback(() => {
    dispatch(toggleLeftBar());
  }, [dispatch]);

  const handleHideRight = useCallback(() => {
    dispatch(toggleRightBar());
  }, [dispatch]);

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
    [dispatch]
  );

  const openMenu = useCallback(() => {
    setIsShow(true);
  }, [setIsShow]);

  const handleLogOut = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  return (
    <React.StrictMode>
      <Bar isHidden={keycloak.authenticated}>
        <div>
          <Logo className="icon" />
          <VerticalDivider />
          {isEditorPath && <HideLeft className="icon" onClick={handleHideLeft} />}
        </div>
        <div>
          <div>
            {isEditorPath && (
              <>
                <Button onClick={handleSaveApplication}>Save application</Button>
                <HideRight className="icon" onClick={handleHideRight} />
              </>
            )}
          </div>
          <VerticalDivider />
          <div className="user" onClick={openMenu}>
            {keycloak?.idTokenParsed?.given_name[0]}
            {keycloak?.idTokenParsed?.family_name[0]}
            {isShow && (
              <div className="account_menu" ref={ref}>
                <span>{keycloak?.idTokenParsed?.given_name + ' ' + keycloak?.idTokenParsed?.family_name}</span>
                <Button onClick={handleLogOut}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      </Bar>
    </React.StrictMode>
  );
};

export default React.memo(TopBar);
