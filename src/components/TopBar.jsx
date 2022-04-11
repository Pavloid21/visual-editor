import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {ReactComponent as HideLeft} from '../assets/hide_left.svg';
import {ReactComponent as HideRight} from '../assets/hide_right.svg';
import {ReactComponent as Settings} from '../assets/settings.svg';
import {Button} from 'components/controls';
import {useDispatch, useSelector} from 'react-redux';
import actionTypes from '../constants/actionTypes';
import {deleteAction, deleteScreen, saveAction, saveScreen} from '../services/ApiService';
import {AuthContext} from 'auth';

const Bar = styled.div`
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

const VerticalDivider = styled.div`
  width: 1px;
  background: #b3b3b3;
  margin: 0 16px;
`;

const TopBar = () => {
  const dispatch = useDispatch();
  const snippets = useSelector((state) => state.layout.snippets);
  const actions = useSelector((state) => [
    ...state.actions.actions.map((item) => ({...item, type: 'actions'})),
    ...state.actions.data.map((item) => ({...item, type: 'data'})),
  ]);
  const deletedActions = useSelector((state) => [
    ...state.actions.deleted.actions.map((item) => ({
      ...item,
      type: 'actions',
    })),
    ...state.actions.deleted.data.map((item) => ({...item, type: 'data'})),
  ]);
  const deletedScreens = useSelector((state) => state.layout.deletedScreens);
  const editedScreens = useSelector((state) => state.layout.editedScreens);
  const handleHideLeft = () => {
    dispatch({type: actionTypes.TOGGLE_LEFT_BAR});
  };
  const handleHideRight = () => {
    dispatch({type: actionTypes.TOGGLE_RIGHT_BAR});
  };
  const handleSaveApplication = (event) => {
    event.stopPropagation();
    snippets.forEach((item) => {
      if (editedScreens.includes(item.screenID)) {
        saveScreen(item.endpoint, `${item.logic.replace(/return$/g, '')}${item.snippet}`);
      }
    });
    snippets.forEach((item) => {
      if (deletedScreens.includes(item.screenID)) {
        deleteScreen(item.endpoint);
      }
    });

    actions.forEach((item) => {
      saveAction(item.type, item.action, item.object);
    });
    deletedActions.forEach((item) => {
      deleteAction(item.type, item.action);
    });
  };
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Bar isHidden={context.authenticated}>
          <div>
            <Logo className="icon" />
            <VerticalDivider />
            <HideLeft className="icon" onClick={handleHideLeft} />
          </div>
          <div>
            <div>
              <Button onClick={handleSaveApplication} disabled>
                Save application
              </Button>
              <HideRight className="icon" onClick={handleHideRight} />
              <Settings className="icon" />
            </div>
            <VerticalDivider />
            <div className="user">FN</div>
          </div>
        </Bar>
      )}
    </AuthContext.Consumer>
  );
};

export default TopBar;
