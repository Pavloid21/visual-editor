import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React, {memo} from 'react';
import {Input} from '../../controls';
import {Search} from '../../SideBarHeader/SideBarHeader.styled';

type TSideBarSubheaderScreens = {
  handleClick: React.MouseEventHandler;
  activeTab: number;
  handleAddScreen: () => void;
  handleAddAction: () => void;
};

const SubheaderScreens: React.FC<TSideBarSubheaderScreens> = memo(({
  handleClick,
  activeTab,
  handleAddScreen,
  handleAddAction,
}) => {
  return (
    <>
      <SideBarSubheader>
        <div>
          <span className={activeTab === 0 ? 'tab_active' : ''} onClick={handleClick}>
            Screens
          </span>
        </div>
        <Plus className="icon" onClick={handleAddScreen} />
      </SideBarSubheader>
      <Search>
        <Input
          $isWide
          placeholder="Screen name"
        />
      </Search>
    </>
  );
});

export default SubheaderScreens;
