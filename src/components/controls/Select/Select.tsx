import React from 'react';
import SelectBase from 'react-select';
import {ISelect} from './types';
import {Label} from '../Input';
import {WithLabel} from './WithLabel';
import {DropdownIndicator} from './Dropdown';
import {baseStyleSelect} from './style';

export const Select = (props: ISelect) => {
  const {onChange, options, value, className, label, menuPlacement, styles, clearable} = props;

  const currentOption = options.find((e) => value === e.value);

  return (
    <WithLabel label={!!label}>
      {label && <Label>{label}</Label>}
      <SelectBase
        onChange={(e) => {
          onChange(e?.value);
        }}
        options={options}
        value={currentOption}
        isMulti={false}
        // defaultValue={value}
        isClearable={clearable}
        className={className}
        menuPlacement={menuPlacement}
        styles={{
          ...baseStyleSelect,
          ...styles,
        }}
        components={{DropdownIndicator}}
      />
    </WithLabel>
  );
};

