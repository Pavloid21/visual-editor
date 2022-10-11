import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React from 'react';
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
  const setClassTabs = (index: number) => activeTab === index ? 'tab_active' : '';

  return (
    <>
      <SideBarSubheader>
        <div className="actions_tab" onClick={(event) => {
          const activeTab = +((event.target as HTMLDivElement)?.dataset?.tabId || 0);
          setActiveTab(activeTab);
        }}>
          <span data-tab-id={0} className={setClassTabs(0)}>
            Actions
          </span>
          <span data-tab-id={1} className={setClassTabs(1)}>
            Cron Tasks
          </span>
          <span data-tab-id={2} className={setClassTabs(2)}>
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
