import React from 'react';
import {Modal as CustomModal} from 'components';
import {Button, FileInput, Input, Label} from 'components/controls';
import {Controller} from 'react-hook-form';
import {ReactComponent as Close} from 'assets/close.svg';
import {Bar, ButtonGroup, Actions} from './Modal.styled';
import type {ModalProps} from '../types';

const Modal: React.FC<ModalProps> = (props) => {
  const {itemModalOpen, setItemModalOpen, form, formRef, control, handleSave, handleSubmit, isEdit} = props;

  return (
    <CustomModal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)} style={{maxWidth: '502px'}}>
      <Bar>
        <h3>{isEdit ? 'Edit' : 'Create New'} Project</h3>
        <div>
          <Close className="icon" onClick={() => setItemModalOpen(false)} />
        </div>
      </Bar>
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
            name="form.platform"
            control={control}
            render={({field}) => {
              return (
                <div>
                  <Label>Platform</Label>
                  <ButtonGroup>
                    <Button>iOS</Button>
                    <Button className="secondary">Android</Button>
                    <Button className="secondary">Aurora</Button>
                  </ButtonGroup>
                </div>
              );
            }}
          />
          <Controller
            name="form.url"
            control={control}
            render={({field}) => {
              return (
                <div id="portal">
                  <Input $clearable $isWide label="Backend URL" placeholder="http://yourbackend.com" {...field} />
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
                    maxLength={500}
                    showCount={true}
                    $extraText={`${field.value?.length || 0}/500`}
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
                  <FileInput
                    label="Project icon"
                    placeholder="Drag and drop image (512 × 512)"
                    onFileChange={field.onChange}
                    accept="image/*"
                    {...field}
                  />
                </div>
              );
            }}
          />
        </form>
        <Actions>
          <Button onClick={handleSubmit(handleSave)}>{isEdit ? 'Save' : 'Create'}</Button>
          <Button className="secondary" onClick={() => setItemModalOpen(false)}>
            Cancel
          </Button>
        </Actions>
      </div>
    </CustomModal>
  );
};

export default Modal;
