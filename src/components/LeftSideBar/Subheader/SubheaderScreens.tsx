import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React from 'react';
import {Input} from 'components/controls';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {setScreenNameFilter} from 'store/left-bar-menu.slice';

type TSideBarSubheaderScreens = {
  handleAddScreen: () => void;
};

const SubheaderScreens: React.FC<TSideBarSubheaderScreens> = ({
  handleAddScreen,
}) => {
  const dispatch = useDispatch();
  const screenNameFilter = useSelector((state: RootStore) => state.leftBarMenu.screenNameFilter);
  const setFilterValue = (e: any) => {
    dispatch(setScreenNameFilter(e.target.value));
  };

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
          value={screenNameFilter}
          onChange={setFilterValue}
        />
      </Search>
    </>
  );
};

export default SubheaderScreens;
