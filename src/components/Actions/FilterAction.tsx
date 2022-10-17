import React, {FC} from 'react';
import {FilterActionContainer} from './Actions.styled';
import {Radio} from 'components/controls';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {setLeftBarActionFilter} from 'store/left-bar-menu.slice';

const FilterAction: FC = () => {
  const dispatch = useDispatch();
  const filterAction = useSelector((state: RootStore) => state.leftBarMenu.filterAction);

  const isRadioSelected = (value: number): boolean => filterAction === value;

  const handleModeClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLeftBarActionFilter(+e.target.value));
  };

  return (
    <FilterActionContainer>
      <Radio
        value={0}
        checked={isRadioSelected(0)}
        name='sample'
        onChange={handleModeClick}
        label='All'
      />
      <Radio
        value={1}
        checked={isRadioSelected(1)}
        name='sample'
        onChange={handleModeClick}
        label='Data Usage'
      />
      <Radio
        value={2}
        checked={isRadioSelected(2)}
        name='sample'
        onChange={handleModeClick}
        label='Castom Action'
      />
      <Radio
        value={3}
        checked={isRadioSelected(3)}
        name='sample'
        onChange={handleModeClick}
        label='External action'
      />
    </FilterActionContainer>
  );
};

export default FilterAction;
