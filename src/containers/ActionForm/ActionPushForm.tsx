import {Container, H4, Settings} from './ActionForm.styled';
import {Button, Input} from 'components/controls';
import {Controller, useForm} from 'react-hook-form';
import React, {FC, useEffect} from 'react';
import {ActionPushItem} from 'store/types';

const ActionPushForm: FC<{action: ActionPushItem}> = ({action}) => {
  const {setValue, control} = useForm();

  useEffect(() => {
    setValue('topicName', action.action);
  }, [action]);

  return (
    <>
      <Settings>
        <H4>Push settings</H4>
      </Settings>
      <Container>
        <Controller
          name="topicName"
          control={control}
          render={({field}) => <Input type="text" label="Topic name" $isWide {...field} />}
        />
        <div className="buttons">
          <Button className="secondary">Back</Button>
          <Button>Save</Button>
        </div>
      </Container>
    </>
  );
};

export default ActionPushForm;
