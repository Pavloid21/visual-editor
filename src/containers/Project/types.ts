import {Control, FieldError, UseFormHandleSubmit, UseFormSetValue} from 'react-hook-form';
import {Inputs} from './Project';

export type ModalProps = {
  itemModalOpen: boolean;
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form?: {
    name?: FieldError | undefined;
    icon?: FieldError[] | undefined;
    description?: FieldError | undefined;
  };
  control: Control<Inputs, any>;
  handleSave: () => void;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  isEdit?: boolean;
};

export type PlatformTypeValues = {
  ios: boolean;
  android: boolean;
  aurora: boolean;
};
