export interface IOption {
  label: string;
  value: string;
  _uuid: string;
}

export interface ISelect {
  options: any;
  onChange(value: string): void;
  value: string;
  className?: string;
}
