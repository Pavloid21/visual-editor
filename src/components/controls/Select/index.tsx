import React from 'react';
import SelectBase, {components, DropdownIndicatorProps} from 'react-select';
import {IOption, ISelect} from './types';
import {ReactComponent as Arrow} from 'assets/arrow.svg';

const DropdownIndicator = (props: DropdownIndicatorProps) => (
  <components.DropdownIndicator {...props}>
    <Arrow />
  </components.DropdownIndicator>
);

export const Select = (props: ISelect) => {
  return (
    <SelectBase
      onChange={(e) => props.onChange(e as string)}
      options={props.options}
      value={props.value}
      defaultValue={props.options[0]}
      className={props.className}
      styles={{
        indicatorSeparator: () => ({display: 'none'}),
        control: (props) => ({
            ...props,
            borderColor: '#8c8c8c',
            minHeight: 42
        })
      }}
      components={{DropdownIndicator}}
      defaultInputValue={props.options.find((e:IOption) => e.value === props.value).label}
    />
  );
};
