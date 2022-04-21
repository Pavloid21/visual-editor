import React from 'react';
import {Input, Select, Label} from 'components/controls';
import styled from 'styled-components';
import {UnitsInputProps} from './types';
import {ISelect} from '../Select/types';
import {NeoInputProps} from '../Input/types';

const Wrapper = styled.div`
  & > div {
    display: flex;
    & > section {
      margin-bottom: 12px;
    }
    & > section:first-child {
      width: 100%;
    }
    & > section:last-child {
      width: 90px;
    }
  }
`;

const StyledInput = styled(Input)<NeoInputProps>`
  & > .rc-input,
  &[type='text'] {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const StyledSelect = styled(Select)<ISelect>`
  margin-top: 4px;
  & > [class*='control'] {
    min-height: 36px;
    border: 1px solid var(--neo-gray);
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #2a356c;
    }
    &:focus {
      border: 1px solid #2a356c;
      outline: none;
    }
    & > [class*='ValueContainer'] {
      padding-top: 0;
      padding-bottom: 0;
      & > div {
        font-size: 14px;
      }
    }
  }
`;

export const UnitsInput = (props: UnitsInputProps) => {
  const {label, value, onChange, select} = props;
  return (
    <Wrapper>
      <Label>{label}</Label>
      <div>
        <StyledInput
          $isWide
          type="number"
          min={0}
          max={select.value === '%' ? 100 : undefined}
          $clearable={false}
          value={value}
          onChange={(e: any) => onChange!(e)}
        />
        <StyledSelect className="UNIT" options={select.options} onChange={select.onChange} value={select.value} />
      </div>
    </Wrapper>
  );
};
