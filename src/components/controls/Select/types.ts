import {GroupBase, MenuPlacement, StylesConfig} from 'react-select';
import {Options} from 'react-select/dist/declarations/src/types';

export interface IOption {
  label: string;
  value: string | boolean;
}

interface IBaseSelect {
  options: IOption[];
  onChange(value: string | boolean | undefined, event?: any): void;
  value: string;
  styles?: StylesConfig<IOption, false, GroupBase<IOption>>;
  menuPlacement?: MenuPlacement | undefined;
  clearable?: boolean;
}

export interface ISelect extends IBaseSelect {
  className?: string;
  label?: string;
  async?: string;
  placeholder?: string;
}

export interface ICreateSelectProps extends IBaseSelect {
  onCreateOption(value: string): void;
  formatCreateLabel(value: string): string;
  onInputChange(value: string): string;
  isValidNewOption?: (
    inputValue: string,
    value: Options<IOption>,
    options: any,
    accessors: any
  ) => boolean;
}
