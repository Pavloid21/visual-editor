import {InputHTMLAttributes} from 'react';

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  onFileChange: (arg: File[]) => void;
}
