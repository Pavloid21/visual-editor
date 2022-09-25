import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React, {memo} from 'react';

type TSideBarSubheader = {
  handleClick: React.MouseEventHandler;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  handleAddScreen: () => void;
  handleAddAction: () => void;
};

export const Subheader: React.FC<TSideBarSubheader> = memo(({
  handleClick,
  activeTab,
  setActiveTab,
  handleAddScreen,
  handleAddAction,
}) => {
  return (
    <SideBarSubheader>
      <div>
        <span className={activeTab === 0 ? 'tab_active' : ''} onClick={handleClick}>
          Screens
        </span>
        <span className={activeTab === 1 ? 'tab_active' : ''} onClick={() => setActiveTab(1)}>
          Actions
        </span>
      </div>
      <Plus className="icon" onClick={activeTab === 0 ? handleAddScreen : handleAddAction} />
    </SideBarSubheader>
  );
});
