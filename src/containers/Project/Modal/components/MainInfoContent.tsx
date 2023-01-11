import {Control, Controller, FieldError, UseFormHandleSubmit, UseFormSetValue} from 'react-hook-form';
import {Button, FileInput, Input, Label} from 'components/controls';
import {Actions, ButtonGroup} from 'containers/Project/Modal/Modal.styled';
import React from 'react';
import {Inputs} from 'containers/Project/Project';
import {MainInfoContainer} from './MainInfoContent.styled';
import {PlatformTypeValues} from 'containers/Project/types';

type MainInfoContentProps = {
  control: Control<Inputs>;
  handleSave: () => void;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  form?: {
    name?: FieldError | undefined;
    icon?: FieldError[] | undefined;
    description?: FieldError | undefined;
  };
  isEdit?: boolean;
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<Inputs>;
}

export const MainInfoContent = ({
  control, handleSave, form, handleSubmit, setItemModalOpen, isEdit, setValue}: MainInfoContentProps
) => {
  const formRef = React.createRef<HTMLFormElement>();
  const handlePlatformButtonClick = (event: React.MouseEvent, value: PlatformTypeValues) => {
    const platform = event.currentTarget.attributes.getNamedItem('data-platform')?.value;
    if (platform) {
      setValue('form.platform', JSON.stringify({...value, [platform]: value ? !value[platform as keyof PlatformTypeValues] : true}));
    }
  };

  return (
    <MainInfoContainer>
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
                    className={platform?.ios ? '' : 'secondary'}
                    onClick={(event) => handlePlatformButtonClick(event, platform)}
                  >
                    iOS
                  </Button>
                  <Button
                    data-platform="android"
                    className={platform?.android ? '' : 'secondary'}
                    onClick={(event) => handlePlatformButtonClick(event, platform)}
                  >
                    Android
                  </Button>
                  <Button
                    data-platform="aurora"
                    className={platform?.aurora ? '' : 'secondary'}
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
    </MainInfoContainer>
  );
};