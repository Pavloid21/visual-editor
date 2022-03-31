import {InputProps} from 'rc-input';

export interface NeoInputProps extends InputProps {
  isWide: boolean;
  clearable: boolean;
  label?: string;
  bordered?: boolean;
}
