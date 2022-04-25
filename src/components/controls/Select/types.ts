import {GroupBase, MenuPlacement, StylesConfig} from 'react-select';

export interface IOption {
  label: string;
  value: string;
}

export interface ISelect {
  options: IOption[];
  onChange(value: string | undefined): void;
  value: string;
  className?: string;
  label?: string;
  menuPlacement?: MenuPlacement | undefined;
  styles?: StylesConfig<IOption, false, GroupBase<IOption>>;
  clearable?: boolean;
}
