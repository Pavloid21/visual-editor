import {Container, H4, Settings} from './ActionForm.styled';
import {Button, Input} from 'components/controls';
import {Controller, useForm} from 'react-hook-form';
import React, {FC, useEffect} from 'react';
import {ActionItem, ActionPushItem, RootStore} from 'store/types';
import {deleteActionEdit, setActions, setSelectAction} from '../../store/actions.slice';
import {useDispatch, useSelector} from 'react-redux';

const ActionPushForm: FC<{action: ActionPushItem}> = ({action}) => {
  const dispatch = useDispatch();
  const {setValue, getValues, control} = useForm();
  const snippets = useSelector((state: RootStore) => state.actions);
  const selected = useSelector((state: RootStore) => state.actions.selected);

  useEffect(() => {
    setValue('topicName', action.action);
  }, [action]);

  const handleSave = () => {
    const {topicName} = getValues();
    const nextActions = [...snippets.actions];
    const nextData = [...snippets.data];
    const nextExternals = [...snippets.externals];
    const nextPush = [...snippets.push];
    const nextCronTasks = [...snippets.cronTasks];
    snippets.push.forEach((item: ActionItem, index: number) => {
      const ref = nextPush;
      if (item.action === selected?.action) {
        ref.splice(index, 1);
          dispatch(setActions({
            push: [
              ...nextPush,
              {
                action: topicName,
                type: 'push'
              },
            ],
            data: nextData,
            actions: nextActions,
            externals: nextExternals,
            cronTasks: nextCronTasks
          }));

        if (selected?.action !== topicName) {
          dispatch(deleteActionEdit(action));
        }
      }
    });
    dispatch(setSelectAction(null));
  };

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
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Container>
    </>
  );
};

export default ActionPushForm;
