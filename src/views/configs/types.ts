export type FieldConfigType = {
  type: string, name: string
};

type SelectionFieldOptionType = {
  label: string;
  value: string;
};

export type SelectionFieldConfigType = FieldConfigType & {
  options: SelectionFieldOptionType[]
};
