import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {orderBy} from 'external/lodash';
import {ReactComponent as ActionDots} from 'assets/left-sidebar-menu/actionDots.svg';
import {ReactComponent as ActionObject} from 'assets/left-sidebar-menu/actionObject.svg';
import {ActionImage, Container} from './Actions.styled';
import {deleteAction, fetchActions, setActions, setSelectAction} from 'store/actions.slice';
import {ActionItem, ActionTypes, RootStore} from 'store/types';
import {Option} from 'react-dropdown';
import {DropdownIcon} from 'components/Actions/Actions.styled';
import {ActionDropdownItem} from './components/ActionDropdownItem';
import {ActionsDropdown} from './types';
import {DROPDOWN_VALUES} from './constants';
import {snippetsSelector} from 'store/selectors/left-bar-selector';
import {ReactComponent as Copy} from 'assets/copy-item.svg';
import {ReactComponent as Trash} from 'assets/trash-item.svg';

type ActionsProps = {
  activeTabActions: string
};

const Actions: React.FC<ActionsProps> = ({activeTabActions}) => {
  const dispatch = useDispatch();
  const actionNameFilter = useSelector((state: RootStore) => state.leftBarMenu.actionNameFilter);
  const filterActionType = useSelector((state: RootStore) => state.leftBarMenu.filterAction);
  const snippets = useSelector(snippetsSelector);

  const filterActionsType = (arr: ActionItem[], type: ActionTypes) => {
    return arr.filter((item: ActionItem) => item.type === type);
  };

  let availableActions: ActionItem[] = orderBy(
      [
        ...snippets.actions.map((item) => ({...item, type: ActionTypes.actions})),
        ...snippets.data.map((item) => ({...item, type: ActionTypes.data})),
        ...snippets.externals.map((item) => ({...item, type: ActionTypes.externals}))
      ],
      ActionTypes.actions,
      'asc'
    );

  const cronTasksActions: ActionItem[] = orderBy(
      [
        ...snippets.cronTasks.map((item) => ({...item, type: ActionTypes.cronTasks}))
      ],
      'action',
      'asc'
    );

  const pushListActions: ActionItem[] = orderBy(
      [
        ...snippets.push.map((item) => ({...item, type: ActionTypes.push}))
      ],
      'action',
      'asc'
    );

  if (filterActionType !== 'all') {
    availableActions = filterActionsType(availableActions, ActionTypes[filterActionType]);
  }

  let renderActions: ActionItem[] = [];

  switch (activeTabActions) {
    case 'actions':
      renderActions = [...availableActions];
      break;
    case 'cronTasks':
      renderActions = [...cronTasksActions];
      break;
    case 'push':
      renderActions = [...pushListActions];
      break;
    default:
      renderActions = [...availableActions];
    break;
  }

  const regex = new RegExp(actionNameFilter, 'gi');
  const renderActionsFilter = renderActions.filter((item: ActionItem) => item.action.match(regex));

  const selectedAction = useSelector((state: RootStore) => state.actions.selected);
  const projectID = useSelector((state: RootStore) => state.project.id);
  const project_id = projectID || location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(fetchActions(project_id));
  }, []);

  const handleSelectSnippet = (action: ActionItem | null) => {
    dispatch(setSelectAction(action));
  };

  const handleDeleteAction = (action: ActionItem) => {
    const newActions = renderActions.filter((item) => item.type === action.type && item.action !== action.action);
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
      case DROPDOWN_VALUES.DELETE:
        handleDeleteAction(action);
        break;
      case DROPDOWN_VALUES.COPY:
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
                      {label: <ActionDropdownItem label={ActionsDropdown.Copy} icon={<Copy />} />, value: 'Copy'},
                      {label: <ActionDropdownItem label={ActionsDropdown.Delete} icon={<Trash />} />, value: 'Delete'}
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
