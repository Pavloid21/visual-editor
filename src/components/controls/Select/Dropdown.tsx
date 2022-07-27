import React from 'react';
import {components, DropdownIndicatorProps} from 'react-select';
import type {IOption} from 'components/controls/Select/types';
import {ReactComponent as Arrow} from 'assets/arrow.svg';

export const DropdownIndicator = (props: DropdownIndicatorProps<IOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow />
    </components.DropdownIndicator>
  );
};
