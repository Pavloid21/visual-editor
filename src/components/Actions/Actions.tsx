import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {orderBy} from 'external/lodash';
import {ReactComponent as ActionDots} from 'assets/left-sidebar-menu/actionDots.svg';
import {ReactComponent as ActionObject} from 'assets/left-sidebar-menu/actionObject.svg';
import {
  getActionByName,
  getActionsList,
  getCronTaskList,
  getDataActionsList,
  getExternalActionsList,
  getPushList,
} from 'services/ApiService';
import {ActionImage, Container} from './Actions.styled';
import {deleteAction, setActions, setSelectAction} from 'store/actions.slice';
import {ActionItem, ActionTypes, RootStore} from 'store/types';
import {Option} from 'react-dropdown';
import {DropdownIcon} from 'components/Actions/Actions.styled';
import ActionDropdownItem from './ActionDropdownItem';

type ActionsProps = {
  activeTabActions: number
};

const Actions: React.FC<ActionsProps> = ({activeTabActions}) => {
  const dispatch = useDispatch();
  const actionNameFilter = useSelector((state: RootStore) => state.leftBarMenu.actionNameFilter);
  const filterActionType = useSelector((state: RootStore) => state.leftBarMenu.filterAction);

  const filterActionsType = (arr: ActionItem[], type: ActionTypes) => {
    return arr.filter((item: ActionItem) => item.type === type);
  };

  let availableActions: ActionItem[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.actions.map((item) => ({...item, type: ActionTypes.actions})),
        ...state.actions.data.map((item) => ({...item, type: ActionTypes.data})),
        ...state.actions.externals.map((item) => ({...item, type: ActionTypes.externals}))
      ],
      ActionTypes.actions,
      'asc'
    )
  );

  const cronTasksActions: ActionItem[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.cronTasks.map((item) => ({...item, type: ActionTypes.cronTasks}))
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
    availableActions = filterActionsType(availableActions, ActionTypes.data);
  }
  if (filterActionType === 2) {
    availableActions = filterActionsType(availableActions, ActionTypes.actions);
  }
  if (filterActionType === 3) {
    availableActions = filterActionsType(availableActions, ActionTypes.externals);
  }

  let renderActions: ActionItem[] = [];

  switch (activeTabActions) {
    case 0:
      renderActions = [...availableActions];
      break;
    case 1:
      renderActions = [...cronTasksActions];
      break;
    case 2:
      renderActions = [...pushListActions];
      break;
    default:
      renderActions = [];
    break;
  }

  const renderActionsFilter = renderActions.filter((item: any) => item.action.toUpperCase().includes(actionNameFilter.toUpperCase()));

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
                actions.push({...result.value, type: actionType, selected: false});
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
    getPushList(project_id)
      .then((response: any) => response.data)
      .then((actionsArr: string[]) => {
        const actions: any[] = [];
        actionsArr.forEach((action) => {
            actions.push({action, selected: false});
        });
        dispatch(setActions({push: actions}));
      })
      .catch(console.log);
  }, []);

  const handleSelectSnippet = (action: ActionItem | null) => {
    dispatch(setSelectAction(action));
  };

  const handleDeleteAction = (action: ActionItem) => {
    const newActions = filterActionsType(renderActions, action.type).filter((item) => item.action !== action.action);
    dispatch(deleteAction(action));
    dispatch(setActions({[action.type]: newActions}));
  };

  const handleCopyAction = (action: ActionItem) => {
    const availableActions = [...filterActionsType(renderActions, action.type)];
    const indexAction = availableActions.findIndex((item: ActionItem) => item.action === action.action && item.type === action.type);
    const newActions = [...availableActions.slice(0, indexAction + 1), {...action, action: action.action + '_copy'}, ...availableActions.slice(indexAction + 1)];
    dispatch(setActions({[action.type]: newActions}));
  };

  const handleChangeDropdown = async (arg: Option, action: ActionItem) => {
    switch (arg.value) {
      case 'Delete':
        handleDeleteAction(action);
        break;
      case 'Copy':
        handleCopyAction(action);
        break;
    }
  };

  return (
    <Container>
      {renderActionsFilter &&
        renderActionsFilter.map((action, index) => {
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
                    options={[
                      {label: <ActionDropdownItem label='Copy' />, value: 'Copy'},
                      {label: <ActionDropdownItem label='Delete' />, value: 'Delete'}
                    ]}
                    placeholder=" "
                    arrowClosed={<ActionDots />}
                    arrowOpen={<ActionDots />}
                    onChange={(arg: Option) => handleChangeDropdown(arg, action)}
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
