import {Control, FieldError, UseFormHandleSubmit} from 'react-hook-form';
import {Inputs} from './Project';

export type ModalProps = {
  itemModalOpen: boolean;
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form?: {
    name?: FieldError | undefined;
    icon?: FieldError[] | undefined;
    description?: FieldError | undefined;
  };
  formRef: React.RefObject<HTMLFormElement>;
  control: Control<Inputs, any>;
  handleSave: () => void;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  isEdit?: boolean;
};
