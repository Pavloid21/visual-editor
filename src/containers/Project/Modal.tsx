import React from 'react';
import {Modal as CustomModal, VerticalDivider} from 'components';
import {Button, Input} from 'components/controls';
import {Control, Controller, FieldError, UseFormHandleSubmit} from 'react-hook-form';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Close} from '../../assets/close.svg';
import styled from 'styled-components';
import {Inputs} from './Project';

const Bar = styled.div<any>`
  height: 60px;
  width: 100%;
  background: var(--background);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 0;
  z-index: 3;
  & > div {
    display: flex;
    position: relative;
    & > h3 {
      font-weight: 500;
      font-size: 20px;
      align-self: center;
      margin-bottom: 0;
    }
    & > div {
      gap: 16px;
    }
    &.user {
      color: #ffffff;
      background-color: #333333;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
    }
  }
`;

const Subheader = styled.div`
  height: 36px;
  background: var(--background);
  padding: 6px 16px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  & > div:first-child {
    padding: 8px 16px;
    border-right: 1px solid #e6e6e6;
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    padding: 26px 28px;
  }
`;

type ModalProps = {
  itemModalOpen: boolean;
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form?: {
    name?: FieldError | undefined;
    icon?: FieldError | undefined;
    description?: FieldError | undefined;
  };
  formRef: React.RefObject<HTMLFormElement>;
  control: Control<Inputs, any>;
  handleSave: () => void;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  isEdit?: boolean;
};

const Modal: React.FC<ModalProps> = (props) => {
  const {itemModalOpen, setItemModalOpen, form, formRef, control, handleSave, handleSubmit, isEdit} = props;
  return (
    <CustomModal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)}>
      <Bar>
        <div>
          <Logo />
          <VerticalDivider />
          <h3>{isEdit ? 'Edit' : 'Create New'} Project</h3>
        </div>
        <div>
          <Close className="icon" onClick={() => setItemModalOpen(false)} />
        </div>
      </Bar>
      <Subheader>
        <span>Project Settings</span>
      </Subheader>
      <Columns>
        <div>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Controller
              name="form.name"
              control={control}
              rules={{required: 'Name is required'}}
              render={({field}) => {
                return (
                  <div>
                    <Input
                      $clearable
                      $isWide
                      label="Project name"
                      placeholder="Project name"
                      $extraText={form?.name?.message}
                      status={form?.name ? 'error' : undefined}
                      {...field}
                    />
                  </div>
                );
              }}
            />
            <Controller
              name="form.icon"
              control={control}
              render={({field}) => {
                return (
                  <div>
                    <Input $clearable $isWide label="Project icon" placeholder="Icon URL" {...field} />
                  </div>
                );
              }}
            />
            <Controller
              name="form.description"
              control={control}
              render={({field}) => {
                return (
                  <div>
                    <Input
                      $clearable
                      $isWide
                      $textarea
                      label="Description"
                      placeholder="Your project description"
                      {...field}
                    />
                  </div>
                );
              }}
            />
          </form>
        </div>
        <div>
          <Button onClick={handleSubmit(handleSave)}>{isEdit ? 'SAVE' : 'CREATE'}</Button>
        </div>
      </Columns>
    </CustomModal>
  );
};

export default Modal;
