import {Controller, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import {Container, H4, Settings} from './ActionForm.styled';
import {Button, Input, Select} from 'components/controls';
import {ActionItem, ActionTypes, RootStore} from 'store/types';
import {snippetTypeOptions} from './constants';
import {useDispatch, useSelector} from 'react-redux';
import {orderBy} from 'external/lodash';
import {ActionOption} from 'components/Actions/types';
import {deleteActionEdit, setActions, setSelectAction} from 'store/actions.slice';

const ActionCronTasksForm: FC<{action: any}> = ({action}) => {
  const dispatch = useDispatch();
  const {setValue, getValues, control} = useForm();
  const snippets = useSelector((state: RootStore) => state.actions);
  const selected = useSelector((state: RootStore) => state.actions.selected);
  const actionsAll: ActionOption[] = useSelector((state: RootStore) =>
    orderBy(
      [
        ...state.actions.actions.map((item) => ({label: item.action, value: item.action, type: ActionTypes.actions})),
        ...state.actions.data.map((item) => ({label: item.action, value: item.action, type: ActionTypes.data})),
        ...state.actions.externals.map((item) => ({label: item.action, value: item.action, type: ActionTypes.externals}))
      ],
      'value',
      'asc'
    )
  );

  useEffect(() => {
    setValue('id', action?.object?.id);
    setValue('pattern', action?.object?.pattern);
    setValue('snippetType', action?.object?.snippetType);
    setValue('snippetName', action?.object?.snippetName);
  }, [action]);

  const [snippetTypeValue, setSnippetTypeValue] = useState<string | undefined>(action?.object?.snippetType || '');
  const [snippetNameValue, setSnippetNameValue] = useState<string | undefined>(action?.object?.snippetName || '');

  let availableActions: ActionOption[] = [];

  switch (snippetTypeValue) {
    case 'action':
      availableActions = [{label: '', value: ''}, ...actionsAll.filter((item) => item.type === 'action')];
      break;
    case 'data':
      availableActions = [{label: '', value: ''}, ...actionsAll.filter((item) => item.type === 'data')];
      break;
    case 'externalActions':
      availableActions = [{label: '', value: ''}, ...actionsAll.filter((item) => item.type === 'externals')];
      break;
    default:
      availableActions = actionsAll;
  }

  const changeSnippetTypeValue = (e: string) => {
    setSnippetTypeValue(e);
    setValue('snippetName', '');
    setSnippetNameValue('');
  };

  const handleSave = () => {
    const {id, pattern, snippetType, snippetName} = getValues();
    const nextActions = [...snippets.actions];
    const nextData = [...snippets.data];
    const nextExternals = [...snippets.externals];
    const nextPush = [...snippets.push];
    const nextCronTasks = [...snippets.cronTasks];
    snippets.cronTasks.forEach((item: ActionItem, index: number) => {
      const ref = nextCronTasks;
      if (item.action === selected?.action) {
        ref.splice(index, 1);
        dispatch(setActions({
          cronTasks: [
            ...nextCronTasks,
            {
              action: id,
              object: {
                id: id,
                pattern,
                snippetType,
                snippetName
              },
              selected: false,
              type: 'cronTasks'
            },
          ],
          data: nextData,
          actions: nextActions,
          externals: nextExternals,
          push: nextPush
        }));

        if (selected?.action !== id) {
          dispatch(deleteActionEdit(action));
        }
      }
    });
    dispatch(setSelectAction(null));
  };

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
            render={({field}) =>
              <Select
                {...field}
                options={snippetTypeOptions}
                value={snippetTypeValue}
                label="Snippet Type"
                onChange={(e: string) => changeSnippetTypeValue(e)}
              />}
          />
          <Controller
            name="snippetName"
            control={control}
            render={({field}) =>
              <Select
                {...field}
                options={availableActions}
                label="Snippet Name"
                value={snippetNameValue}
                onChange={(e: string) => setSnippetNameValue(e)}
              />}
          />
        </div>
        <div className="buttons">
          <Button className="secondary">Back</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Container>
    </>
  );
};

export default ActionCronTasksForm;
