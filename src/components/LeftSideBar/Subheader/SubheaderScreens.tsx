import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React from 'react';
import {Input} from 'components/controls';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';

type TSideBarSubheaderScreens = {
  handleAddScreen: () => void;
};

const SubheaderScreens: React.FC<TSideBarSubheaderScreens> = ({
  handleAddScreen,
}) => {
  return (
    <>
      <SideBarSubheader>
        <div>
          <span className='tab_active'>
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
};

export default SubheaderScreens;
