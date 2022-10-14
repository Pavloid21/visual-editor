import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {orderBy} from 'external/lodash';
import {ReactComponent as CodeIcon} from 'assets/code.svg';
import {ReactComponent as DataIcon} from 'assets/folder-upload.svg';
import {ReactComponent as ActionDots} from 'assets/left-sidebar-menu/actionDots.svg';
import {ReactComponent as ActionObject} from 'assets/left-sidebar-menu/actionObject.svg';
import {getActionsList, getActionByName, getDataActionsList, getDataActionByName} from 'services/ApiService';
import {ActionImage, Container} from './Actions.styled';
import {setActions, setSelectAction} from 'store/actions.slice';
import {ActionItem, ActionTypes, RootStore} from 'store/types';

const Actions: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  const availableActions: ActionItem[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.actions.map((item) => ({...item, type: ActionTypes.action})),
        ...state.actions.data.map((item) => ({...item, type: ActionTypes.data})),
      ],
      ActionTypes.action,
      'asc'
    )
  );
  const selectedAction = useSelector((state: RootStore) => state.actions.selected);
  const projectID = useSelector((state: RootStore) => state.project.id);
  const project_id = projectID || location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  useEffect(() => {
    getActionsList(project_id)
      .then((response) => response.data)
      .then((actions: string[]) => {
        const actionsArr = actions?.map(async (action) => {
          try {
            const response = await getActionByName(project_id, action);
            const data = response.data;
            return {action, object: data};
          } catch (e) {
            console.log('e :>> ', e);
          }
        });
        Promise.allSettled(actionsArr)
          .then((resolves) => {
            const actions: any[] = [];
            resolves.forEach((result) => {
              if (result.status === 'fulfilled') {
                actions.push({...result.value, selected: false});
              }
            });
            dispatch(setActions({actions}));
          })
          .catch(console.log);
      });
    getDataActionsList(project_id)
      .then((response) => response.data)
      .then((actions: string[]) => {
        const actionsArr = actions?.map(async (action) => {
          try {
            const response = await getDataActionByName(project_id, action);
            const data = response.data;
            return {action, object: data};
          } catch (e) {
            console.log('e :>> ', e);
          }
        });
        Promise.allSettled(actionsArr)
          .then((resolves) => {
            const actions: any[] = [];
            resolves.forEach((result) => {
              if (result.status === 'fulfilled') {
                actions.push({...result.value, selected: false});
              }
            });
            dispatch(setActions({data: actions}));
          })
          .catch(console.log);
      });
  }, []);

  const handleSelectSnippet = (action: ActionItem | null) => {
    dispatch(setSelectAction(action));
  };

  return (
    <Container>
      {availableActions &&
        availableActions.map((action, index) => {
          return (
            <div
              className={
                'action-item ' +
                (selectedAction?.action === action.action && selectedAction?.type === action.type ? 'active' : '')
              }
              key={`action_snippet_${index}`}
              onClick={() => handleSelectSnippet(action)}
            >
              <div>
                {action.type === ActionTypes.action ? <CodeIcon /> : <DataIcon />}
                <span>{action.action}</span>
              </div>
              <ActionImage>
                <ActionObject />
                <ActionDots />
              </ActionImage>
            </div>
          );
        })}
    </Container>
  );
};

export default Actions;
