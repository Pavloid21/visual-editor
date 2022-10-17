import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {orderBy} from 'external/lodash';
import {ReactComponent as CodeIcon} from 'assets/code.svg';
import {ReactComponent as DataIcon} from 'assets/folder-upload.svg';
import {ReactComponent as ActionDots} from 'assets/left-sidebar-menu/actionDots.svg';
import {ReactComponent as ActionObject} from 'assets/left-sidebar-menu/actionObject.svg';
import {
  getActionsList,
  getActionByName,
  getDataActionsList,
  getExternalActionsList,
  getCronTaskList,
  getPushList,
  deleteProject,
  getScreenesList,
  getScreenByName,
  createProject,
  saveScreen,
} from 'services/ApiService';
import {ActionImage, Container} from './Actions.styled';
import {setActions, setSelectAction} from 'store/actions.slice';
import {ActionItem, ActionTypes, Project, RootStore} from 'store/types';
import {useOutside} from '../../utils';
import {Option} from 'react-dropdown';
import {DropdownIcon} from 'components/Actions/Actions.styled';
import {v4} from 'uuid';

type ActionsProps = {
  activeTabActions: number
};

const Actions: React.FC<ActionsProps> = ({activeTabActions}) => {
  const dispatch = useDispatch();
  const actionNameFilter = useSelector((state: RootStore) => state.leftBarMenu.actionNameFilter);
  const filterActionType = useSelector((state: RootStore) => state.leftBarMenu.filterAction);

  let availableActions: ActionItem[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.actions.map((item) => ({...item, type: ActionTypes.action})),
        ...state.actions.data.map((item) => ({...item, type: ActionTypes.data})),
        ...state.actions.externals.map((item) => ({...item, type: ActionTypes.external}))
      ],
      ActionTypes.action,
      'asc'
    )
  );

  const cronTasksActions: ActionItem[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.cronTasks.map((item) => ({...item, type: ActionTypes.cronTask}))
      ],
      'action',
      'asc'
    )
  );

  const pushListActions: ActionItem[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.push.map((item) => ({...item, type: ActionTypes.push}))
      ],
      'action',
      'asc'
    )
  );

  if (filterActionType === 1) {
    availableActions = availableActions.filter((item: any) => item.type === 'data');
  }
  if (filterActionType === 2) {
    availableActions = availableActions.filter((item: any) => item.type === 'action');
  }
  if (filterActionType === 3) {
    availableActions = availableActions.filter((item: any) => item.type === 'external');
  }
  const availableActionsFilter = availableActions.filter((item: any) => item.action.toUpperCase().includes(actionNameFilter.toUpperCase()));

  let renderActions: ActionItem[] = [];

  switch (activeTabActions) {
    case 0:
      renderActions = [...availableActionsFilter];
      break;
    case 1:
      renderActions = [...cronTasksActions];
      break;
    case 2:
      renderActions = [...pushListActions];
      break;
    default:
      renderActions = [...availableActionsFilter];
    break;
  }

  const selectedAction = useSelector((state: RootStore) => state.actions.selected);
  const projectID = useSelector((state: RootStore) => state.project.id);
  const project_id = projectID || location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const getActions = (getActionsArr: any, project_id: string, actionType: string, actionPath: string) => {
    getActionsArr(project_id)
      .then((response: any) => response.data)
      .then((actions: string[]) => {
        const actionsArr = actions?.map(async (action) => {
          try {
            const response = await getActionByName(project_id, action, actionPath);
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
            dispatch(setActions({[actionType]: actions}));
          })
          .catch(console.log);
      });
  };

  useEffect(() => {
    getActions(getActionsList, project_id, 'actions', 'actions');
    getActions(getDataActionsList, project_id, 'data', 'data');
    getActions(getExternalActionsList, project_id, 'externals', 'externalActions');
    getActions(getCronTaskList, project_id, 'cronTasks', 'cron/tasks');
    getActions(getPushList, project_id, 'push', 'push/defaultTopics');
  }, []);

  const handleSelectSnippet = (action: ActionItem | null) => {
    dispatch(setSelectAction(action));
  };

  const handleChangeDropdown = async (arg: Option) => {
    switch (arg.value) {
      case 'Delete':
        console.log('delete');
        break;
      case 'Copy':
       console.log('Copy');
    }
  };

  return (
    <Container>
      {renderActions &&
        renderActions.map((action, index) => {
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
                <span>{action.action}</span>
              </div>
              <ActionImage>
                <ActionObject />
                <div>
                  <DropdownIcon
                    options={['Copy', 'Delete']}
                    placeholder=" "
                    arrowClosed={<ActionDots />}
                    arrowOpen={<ActionDots />}
                    onChange={(arg: Option) => handleChangeDropdown(arg)}
                  />
                </div>
              </ActionImage>
            </div>
          );
        })}
    </Container>
  );
};

export default Actions;
