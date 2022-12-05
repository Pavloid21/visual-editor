import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React, {ChangeEvent} from 'react';
import {Input} from 'components/controls';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';
import {setScreenNameFilter} from 'store/left-bar-menu.slice';
import {useAppDispatch, useAppSelector} from 'store';

type TSideBarSubheaderScreens = {
  handleAddScreen: () => void;
};

const SubheaderScreens: React.FC<TSideBarSubheaderScreens> = ({
  handleAddScreen,
}) => {
  const dispatch = useAppDispatch();
  const screenNameFilter = useAppSelector((state) => state.leftBarMenu.screenNameFilter);
  const setFilterValue = (e: ChangeEvent<HTMLTextAreaElement> & ChangeEvent<HTMLInputElement>) => {
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
