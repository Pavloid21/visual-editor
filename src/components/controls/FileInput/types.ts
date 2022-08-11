export interface FileInputProps {
  label?: string;
  placeholder?: string;
  onFileChange: (arg: File[]) => void;
  value: File[];
  accept: string;
}
