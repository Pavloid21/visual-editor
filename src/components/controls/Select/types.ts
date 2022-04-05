export interface IOption {
  label: string;
  value: string;
}

export interface ISelect {
  options: IOption[];
  onChange(value: string | undefined): void;
  value: string;
  className?: string;
}
