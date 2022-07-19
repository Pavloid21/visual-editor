import {InputProps} from 'rc-input';

export interface NeoInputProps extends InputProps {
  $isWide?: boolean;
  $clearable: boolean;
  label?: string;
  $textarea?: boolean;
  $extraText?: string;
  status?: 'error' | 'success';
  type?: string;
}
