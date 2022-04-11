import React from 'react';
import SelectBase, {components, DropdownIndicatorProps} from 'react-select';
import {IOption, ISelect} from './types';
import {ReactComponent as Arrow} from 'assets/arrow.svg';

const DropdownIndicator = (props: DropdownIndicatorProps<IOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow />
    </components.DropdownIndicator>
  );
};

export const Select = (props: ISelect) => {
  return (
    <SelectBase
      onChange={(e) => {
        props.onChange(e?.value);
      }}
      options={props.options}
      //   value={props.value}
      isMulti={false}
      defaultValue={props.options.find((e) => props.value === e.value)}
      isClearable={false}
      className={props.className}
      styles={{
        indicatorSeparator: () => ({display: 'none'}),
        control: (props) => ({
          ...props,
          borderColor: 'var(--neo-secondary-gray)',
          minHeight: 42,
        }),
      }}
      components={{DropdownIndicator}}
    />
  );
};
