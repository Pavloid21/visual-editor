import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React from 'react';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';
import {Input} from 'components/controls';
import FilterAction from 'components/Actions/FilterAction';
import {ActionTypes} from 'store/types';
import {setActionNameFilter, setActiveTabActions} from 'store/left-bar-menu.slice';
import {setSelectAction} from 'store/actions.slice';
import {useAppDispatch, useAppSelector} from 'store';

type TSideBarSubheaderActions = {
  activeTab: string;
  handleAddAction: () => void;
};

const SubheaderActions: React.FC<TSideBarSubheaderActions> = ({
  activeTab,
  handleAddAction,
}) => {
  const dispatch = useAppDispatch();
  const actionNameFilter = useAppSelector((state) => state.leftBarMenu.actionNameFilter);

  const setFilterValue = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setActionNameFilter(e.target.value));
  };
  const getClassTabById = (actionType: string) => {
    return activeTab === actionType ? 'tab_active' : '';
  };

  const handlerClickAction = (event: React.MouseEvent<HTMLDivElement>) => {
    const activeTabAction = (event.target as HTMLDivElement)?.dataset?.tabId || ActionTypes.actions;
    dispatch(setActiveTabActions(activeTabAction as ActionTypes));
    dispatch(setSelectAction(null));
  };

  return (
    <>
      <SideBarSubheader>
        <div className="actions_tab" onClick={handlerClickAction}>
          <span data-tab-id={ActionTypes.actions} className={getClassTabById(ActionTypes.actions)}>
            Actions
          </span>
          <span data-tab-id={ActionTypes.cronTasks} className={getClassTabById(ActionTypes.cronTasks)}>
            Cron Tasks
          </span>
          <span data-tab-id={ActionTypes.push} className={getClassTabById(ActionTypes.push)}>
            Push
          </span>
        </div>
        <Plus className="icon" onClick={handleAddAction} />
      </SideBarSubheader>
      <Search>
        <Input
          $isWide
          placeholder="Action name"
          value={actionNameFilter}
          onChange={setFilterValue}
        />
      </Search>
      {activeTab === ActionTypes.actions && <FilterAction />}
    </>
  );
};

export default SubheaderActions;
