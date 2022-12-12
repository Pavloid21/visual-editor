import React from 'react';
import {Modal as CustomModal} from 'components';
import {Button, FileInput, Input, Label} from 'components/controls';
import {Controller} from 'react-hook-form';
import {ReactComponent as Close} from 'assets/close.svg';
import {Bar, ButtonGroup, Actions} from './Modal.styled';
import type {ModalProps} from '../types';

const Modal: React.FC<ModalProps> = (props) => {
  const {itemModalOpen, setItemModalOpen, form, control, handleSave, handleSubmit, isEdit, setValue} = props;
  const formRef = React.createRef<HTMLFormElement>();
  const handlePlatformButtonClick = (event: React.MouseEvent, value: any) => {
    const platform = event.currentTarget.attributes.getNamedItem('data-platform')?.value;
    if (platform) {
      // @ts-ignore
      setValue('form.platform', JSON.stringify({...value, [platform]: value ? !value[platform] : true}));
    }
  };

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
            render={({field: {value}}) => {
              const platform = JSON.parse(value ? value.toString() : '{}');
              return (
                <div>
                  <Label>Platform</Label>
                  <ButtonGroup>
                    <Button
                      data-platform="ios"
                      className={platform?.ios ? undefined : 'secondary'}
                      onClick={(event) => handlePlatformButtonClick(event, platform)}
                    >
                      iOS
                    </Button>
                    <Button
                      data-platform="android"
                      className={platform?.android ? undefined : 'secondary'}
                      onClick={(event) => handlePlatformButtonClick(event, platform)}
                    >
                      Android
                    </Button>
                    <Button
                      data-platform="aurora"
                      className={platform?.aurora ? undefined : 'secondary'}
                      onClick={(event) => handlePlatformButtonClick(event, platform)}
                    >
                      Aurora
                    </Button>
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
          <Button onClick={handleSubmit(handleSave)}>{isEdit ? 'Save1' : 'Create1'}</Button>
          <Button className="secondary" onClick={() => setItemModalOpen(false)}>
            Cancel
          </Button>
        </Actions>
      </div>
    </CustomModal>
  );
};

export default Modal;
