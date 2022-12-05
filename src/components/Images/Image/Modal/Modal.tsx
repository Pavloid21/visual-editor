import React, {FC} from 'react';
import {Modal as CustomModal} from 'components/index';
import {ReactComponent as Close} from 'assets/close.svg';
import {Button, Input} from 'components/controls';
import {FieldValues, UseFormHandleSubmit} from 'react-hook-form';
import {Bar, ModalWrapper, Actions} from './Modal.styled';

type ModalProps = {
  itemModalOpen: boolean;
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
};

export const Modal = (props: ModalProps) => {
  const {itemModalOpen, setItemModalOpen, handleSave, handleSubmit} = props;
  return (
    <ModalWrapper>
      <CustomModal
        isActive={itemModalOpen}
        handleClose={() => setItemModalOpen(false)}
        style={{width: '464px'}}
      >
        <Bar>
          <h3>Create image folder</h3>
          <div>
            <Close className="icon" onClick={() => setItemModalOpen(false)} />
          </div>
        </Bar>
        <div className="folderName">
          <p>folder name</p>
          <Input $isWide placeholder="People" />
        </div>
        <Actions>
          <Button onClick={handleSubmit(handleSave)}>Create</Button>
          <Button className="secondary" onClick={() => setItemModalOpen(false)}>
            Cancel
          </Button>
        </Actions>
      </CustomModal>
    </ModalWrapper>
  );
};
