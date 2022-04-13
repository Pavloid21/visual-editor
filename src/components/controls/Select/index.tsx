import React, {useMemo} from 'react';
import SelectBase, {components, DropdownIndicatorProps} from 'react-select';
import {IOption, ISelect} from './types';
import {ReactComponent as Arrow} from 'assets/arrow.svg';
import styled, {StyledComponent} from 'styled-components';
import {Label, Container} from '../Input';

const DropdownIndicator = (props: DropdownIndicatorProps<IOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow />
    </components.DropdownIndicator>
  );
};

const WithLabel: StyledComponent<'section', any, {}, any> = styled(Container)`
  margin-bottom: 0;
  svg {
    position: static;
  }
  ${(props: any) => {
    if (props.label) {
      return `
      margin-bottom: 12px;
      [class$='control'] {
        border-color: var(--neo-gray) !important;
        font-size: 14px;
        min-height: 36px;
        & > div:first-child {
          padding: 0 12px;
        }
        & > div:last-child {
          max-height: 36px;
        }
      }  
    `;
    }
  }}
`;

export const Select = (props: ISelect) => {
  const {onChange, options, value, className, label} = props;

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
        isClearable={false}
        className={className}
        styles={{
          indicatorSeparator: () => ({display: 'none'}),
          control: (props) => ({
            ...props,
            borderColor: '#8c8c8c',
            minHeight: 42,
          }),
        }}
        components={{DropdownIndicator}}
      />
    </WithLabel>
  );
};
