import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React, {memo} from 'react';
import {Search} from '../../SideBarHeader/SideBarHeader.styled';
import {Input} from '../../controls';
import FilterAction from '../../Actions/FilterAction';

type TSideBarSubheaderActions = {
  handleClick: React.MouseEventHandler;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  handleAddAction: () => void;
};

const SubheaderActions: React.FC<TSideBarSubheaderActions> = memo(({
  handleClick,
  activeTab,
  setActiveTab,
  handleAddAction,
}) => {
  console.log(activeTab);
  return (
    <>
      <SideBarSubheader>
        <div className="actions_tab">
          <span className={activeTab === 0 ? 'tab_active' : ''} onClick={() => setActiveTab(0)}>
            Actions
          </span>
          <span className={activeTab === 1 ? 'tab_active' : ''} onClick={() => setActiveTab(1)}>
            Cron Tasks
          </span>
          <span className={activeTab === 2 ? 'tab_active' : ''} onClick={() => setActiveTab(2)}>
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
});

export default SubheaderActions;
