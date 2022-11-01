import React, {FC} from 'react';
import {FilterActionContainer} from './Actions.styled';
import {Radio} from 'components/controls';
import {useDispatch, useSelector} from 'react-redux';
import {ActionTypes, RootStore} from 'store/types';
import {setLeftBarActionFilter} from 'store/left-bar-menu.slice';

const FilterAction: FC = () => {
  const dispatch = useDispatch();
  const filterAction = useSelector((state: RootStore) => state.leftBarMenu.filterAction);

  const isRadioSelected = (value: string): boolean => filterAction === value;

  const handleModeClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLeftBarActionFilter(e.target.value as ActionTypes));
  };

  return (
    <FilterActionContainer>
      <Radio
        value={ActionTypes.all}
        checked={isRadioSelected(ActionTypes.all)}
        name='sample'
        onChange={handleModeClick}
        label='All'
      />
      <Radio
        value={ActionTypes.data}
        checked={isRadioSelected(ActionTypes.data)}
        name='sample'
        onChange={handleModeClick}
        label='Data Usage'
      />
      <Radio
        value={ActionTypes.actions}
        checked={isRadioSelected(ActionTypes.actions)}
        name='sample'
        onChange={handleModeClick}
        label='Castom Action'
      />
      <Radio
        value={ActionTypes.externals}
        checked={isRadioSelected(ActionTypes.externals)}
        name='sample'
        onChange={handleModeClick}
        label='External action'
      />
    </FilterActionContainer>
  );
};

export default FilterAction;
