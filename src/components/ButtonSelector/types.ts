export type TButtonSelector = {
  label?: string;
  buttons: TButton[];
  onChange(button: string): void;
  className?: string;
  value: string;
}

export type TButton = {
  title: string;
  key: string;
  uuid: string;
}
