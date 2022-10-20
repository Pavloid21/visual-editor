import {SideBarSubheader} from 'components';
import {ReactComponent as Plus} from 'assets/plus.svg';
import React from 'react';
import {Search} from 'components/SideBarHeader/SideBarHeader.styled';
import {Input} from 'components/controls';
import FilterAction from 'components/Actions/FilterAction';
import {AnimateSharedLayout} from 'framer-motion';
import {Item, Indicator} from 'components/controls/Select/Select.styled';
import {TabWrapper} from './SubheaderActions.styled';

type TSideBarSubheaderActions = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  handleAddAction: () => void;
};

const SubheaderActions: React.FC<TSideBarSubheaderActions> = ({activeTab, setActiveTab, handleAddAction}) => {
  const getClassTabById = (index: number) => (activeTab === index ? 'tab_active' : '');

  const handlerClickAction = (event: React.MouseEvent<HTMLDivElement>) => {
    const activeTab = +((event.target as HTMLDivElement)?.dataset?.tabId || 0);
    setActiveTab(activeTab);
  };

  const menus = ['Actions', 'Cron Tasks', 'Push'];

  return (
    <>
      <SideBarSubheader>
        <TabWrapper>
          <AnimateSharedLayout>
            {menus.map((item, index) => {
              return (
                <Item
                  pure
                  data-tab-id={index}
                  isActive={activeTab === index}
                  key={`sideBarActionsTabs_${index}`}
                  onClick={handlerClickAction}
                >
                  {item}
                  {getClassTabById(index) && <Indicator layoutId="idk" />}
                </Item>
              );
            })}
          </AnimateSharedLayout>
        </TabWrapper>
        <Plus className="icon" onClick={handleAddAction} />
      </SideBarSubheader>
      <Search>
        <Input $isWide placeholder="Action name" />
      </Search>
      {activeTab === 0 && <FilterAction />}
    </>
  );
};

export default SubheaderActions;
