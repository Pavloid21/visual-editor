import React, {FC} from 'react';
import {Modal as CustomModal} from 'components/index';
import {ReactComponent as Close} from 'assets/close.svg';
import {Button, Input} from 'components/controls';
import {FieldValues, UseFormHandleSubmit} from 'react-hook-form';
import {Bar, ModalWrapper, Actions} from './Modal.styled';
import {useAppDispatch, useAppSelector} from 'store';
import {setNewFolder} from 'store/images.slice';

type ModalProps = {
  itemModalOpen: boolean;
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
};

export const Modal = (props: ModalProps) => {
  const newFolder = useAppSelector((state) => state.imagesList.newFolder);
  const dispatch = useAppDispatch();
  const {itemModalOpen, setItemModalOpen, handleSave, handleSubmit} = props;

  const changeNewFolder = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNewFolder(e.target.value));
  }

  const handleCancel = () => {
    setItemModalOpen(false);
    dispatch(setNewFolder(''));
  }

  return (
    <ModalWrapper>
      <CustomModal
        isActive={itemModalOpen}
        handleClose={handleCancel}
        style={{width: '464px'}}
      >
        <Bar>
          <h3>Create image folder</h3>
          <div>
            <Close className="icon" onClick={handleCancel} />
          </div>
        </Bar>
        <div className="folderName">
          <p>folder name</p>
          <Input $isWide placeholder="People" onChange={changeNewFolder} value={newFolder} />
        </div>
        <Actions>
          <Button onClick={handleSubmit(handleSave)}>Create</Button>
          <Button className="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Actions>
      </CustomModal>
    </ModalWrapper>
  );
};
