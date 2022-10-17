import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React, {ChangeEvent, MouseEventHandler} from 'react';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';
import {Input} from 'components/controls';
import FilterAction from 'components/Actions/FilterAction';

type TSideBarSubheaderActions = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  handleAddAction: () => void;
};

const SubheaderActions: React.FC<TSideBarSubheaderActions> = ({
  activeTab,
  setActiveTab,
  handleAddAction,
}) => {
  const getClassTabById = (index: number) => activeTab === index ? 'tab_active' : '';

  const handlerClickAction = (event: React.MouseEvent<HTMLDivElement>) => {
    const activeTab = +((event.target as HTMLDivElement)?.dataset?.tabId || 0);
    setActiveTab(activeTab);
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
        />
      </Search>
      {activeTab === 0 && <FilterAction />}
    </>
  );
};

export default SubheaderActions;
