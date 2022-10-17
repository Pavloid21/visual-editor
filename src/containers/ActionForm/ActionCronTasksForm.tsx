import {Controller, useForm} from 'react-hook-form';
import React, {FC} from 'react';
import {Container, H4, Settings} from './ActionForm.styled';
import {Button, Input, Select} from '../../components/controls';

const ActionCronTasksForm: FC = () => {

  const {control} = useForm();
  return (
    <>
      <Settings>
        <H4>Cron Tasks Settings</H4>
      </Settings>
      <Container>
        <div className="input-rows">
          <Controller
            name="id"
            control={control}
            render={({field}) => <Input type="text" label="id" $isWide {...field} />}
          />
          <Controller
            name="pattern"
            control={control}
            render={({field}) => <Input type="text" label="Pattern" $clearable $isWide {...field} />}
          />
          <Controller
            name="snippetType"
            control={control}
            render={({field}) => <Select options={[]} label="Snippet Type" {...field} />}
          />
          <Controller
            name="snippetName"
            control={control}
            render={({field}) => <Select options={[]} label="Snippet Name" {...field} />}
          />
        </div>
        <div className="buttons">
          <Button className="secondary">Back</Button>
          <Button>Save</Button>
        </div>
      </Container>
    </>
  );
};

export default ActionCronTasksForm;
