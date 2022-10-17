import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React from 'react';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';
import {Input} from 'components/controls';
import FilterAction from 'components/Actions/FilterAction';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {setActionNameFilter} from 'store/left-bar-menu.slice';
import {setSelectAction} from 'store/actions.slice';

type TSideBarSubheaderActions = {
  activeTab: number;
  setActiveTab: any;
  handleAddAction: () => void;
};

const SubheaderActions: React.FC<TSideBarSubheaderActions> = ({
  activeTab,
  setActiveTab,
  handleAddAction,
}) => {
  const dispatch = useDispatch();
  const actionNameFilter = useSelector((state: RootStore) => state.leftBarMenu.actionNameFilter);
  const setFilterValue = (e: any) => {
    dispatch(setActionNameFilter(e.target.value));
  };
  const getClassTabById = (index: number) => {
    return activeTab === index ? 'tab_active' : '';
  };

  const handlerClickAction = (event: React.MouseEvent<HTMLDivElement>) => {
    const activeTabAction = +((event.target as HTMLDivElement)?.dataset?.tabId || 0);
    dispatch(setActiveTab(activeTabAction));
    dispatch(setSelectAction(null));
  };

  return (
    <>
      <SideBarSubheader>
        <div className="actions_tab" onClick={handlerClickAction}>
          <span data-tab-id={0} className={getClassTabById(0)}>
            Actions
          </span>
          <span data-tab-id={1} className={getClassTabById(1)}>
            Cron Tasks
          </span>
          <span data-tab-id={2} className={getClassTabById(2)}>
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
      {activeTab === 0 && <FilterAction />}
    </>
  );
};

export default SubheaderActions;
