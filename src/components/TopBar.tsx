import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {ReactComponent as HideLeft} from '../assets/hide_left.svg';
import {ReactComponent as HideRight} from '../assets/hide_right.svg';
import {Button} from 'components/controls';
import {useDispatch, useSelector} from 'react-redux';
import actionTypes from '../constants/actionTypes';
import {deleteAction, deleteScreen, saveAction, saveScreen} from '../services/ApiService';
import {useKeycloak} from '@react-keycloak/web';
import {useLocation} from 'react-router-dom';
import {Store} from 'react-notifications-component';
import {Store as RuduxStore} from 'reducers/types';
import { successNotification } from 'constants/notifications';

const Bar = styled.div<any>`
  height: 60px;
  width: 100%;
  background: var(--background);
  display: ${(props) => (props.isHidden ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  z-index: 3;
  & div {
    display: flex;
    position: relative;
    & div {
      gap: 16px;
    }
    &.user {
      color: #ffffff;
      background-color: #333333;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
    }
  }
`;

export const VerticalDivider = styled.div`
  width: 1px;
  background: #b3b3b3;
  margin: 0 16px;
`;

const TopBar = () => {
  const dispatch = useDispatch();
  const {keycloak} = useKeycloak();
  const location = useLocation();
  const snippets = useSelector((state: RuduxStore) => state.layout.snippets);
  const actions = useSelector((state: RuduxStore) => [
    ...state.actions.actions.map((item) => ({...item, type: 'actions'})),
    ...state.actions.data.map((item) => ({...item, type: 'data'})),
  ]);
  const deletedActions = useSelector((state: RuduxStore) => [
    ...state.actions.deleted.actions.map((item) => ({
      ...item,
      type: 'actions',
    })),
    ...state.actions.deleted.data.map((item) => ({...item, type: 'data'})),
  ]);
  const deletedScreens = useSelector((state: RuduxStore) => state.layout.deletedScreens);
  const editedScreens = useSelector((state: RuduxStore) => state.layout.editedScreens);
  const projectID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const handleHideLeft = () => {
    dispatch({type: actionTypes.TOGGLE_LEFT_BAR});
  };
  const handleHideRight = () => {
    dispatch({type: actionTypes.TOGGLE_RIGHT_BAR});
  };
  const handleSaveApplication: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
    Promise.all([
      ...snippetsPromises,
      ...deletedSnippetsPromises,
      ...actionsPromises,
      ...deletedActionsPromises,
    ]).then((result) => {
      Store.addNotification({
        ...successNotification,
        title: 'Success',
        message: 'All your changes is saved.',
      });
    });
    dispatch({
      type: actionTypes.CHANGES_SAVED,
    });
  };
  return (
    <Bar isHidden={keycloak.authenticated}>
      <div>
        <Logo className="icon" />
        <VerticalDivider />
        {location.pathname.indexOf('editor') >= 0 && <HideLeft className="icon" onClick={handleHideLeft} />}
      </div>
      <div>
        <div>
          {location.pathname.indexOf('editor') >= 0 && (
            <>
              <Button onClick={handleSaveApplication}>Save application</Button>
              <HideRight className="icon" onClick={handleHideRight} />
            </>
          )}
        </div>
        <VerticalDivider />
        <div className="user">
          {keycloak?.idTokenParsed?.given_name[0]}
          {keycloak?.idTokenParsed?.family_name[0]}
        </div>
      </div>
    </Bar>
  );
};

export default TopBar;