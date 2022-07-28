import React from 'react';
import CreatableSelect from 'react-select/creatable';
import {baseStyleSelect} from './style';
import {DropdownIndicator} from './Dropdown';
import type {ICreateSelectProps} from './types';



export const SelectCreatable = ({
  onChange,
  value,
  styles,
  onCreateOption,
  options,
  formatCreateLabel,
  onInputChange,
  menuPlacement,
  clearable,
  isValidNewOption
}: ICreateSelectProps) => {

  const currentOption = options.find((e) => value === e.value);

  return (
    <CreatableSelect
      isClearable={clearable}
      menuPlacement={menuPlacement ? menuPlacement : 'top'}
      onChange={(e) => {
        onChange(e?.value);
      }}
      options={options}
      value={currentOption}
      onInputChange={onInputChange}
      formatCreateLabel={formatCreateLabel}
      onCreateOption={onCreateOption}
      createOptionPosition="first"
      styles={{
        ...baseStyleSelect,
        ...styles,
      }}
      components={{DropdownIndicator}}
      isValidNewOption={isValidNewOption}
      isOptionSelected={() => false}
    />
  );
};
