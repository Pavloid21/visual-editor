import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Editor from 'react-simple-code-editor';
import {gruvboxLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import fullScreenIcon from 'assets/full-screen.svg';
import {Modal} from 'components';
import {useModal} from 'utils';
import {Button, Input, Label} from 'components/controls';
import ButtonSelector from 'components/ButtonSelector';
import {useSelector, useDispatch} from 'react-redux';
import {v4} from 'uuid';
import {Container, EditorWrapper, H4, Settings} from './ActionForm.styled';
import {deleteActionEdit, setActions, setSelectAction} from 'store/actions.slice';
import {ActionItem, RootStore} from 'store/types';

const ActionForm: React.FC<{action: ActionItem}> = ({action}) => {
  const dispatch = useDispatch();
  const {setValue, getValues, control} = useForm();
  const snippets = useSelector((state: RootStore) => state.actions);
  const selected = useSelector((state: RootStore) => state.actions.selected);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  useEffect(() => {
    setValue('actionName', action.action);
    setValue('type', action.type);
    setValue('code', action.object);
  }, [action]);

  const handleSave = () => {
    console.log('handleSave');
    const {actionName, code, type} = getValues();
    const nextActions = [...snippets.actions];
    const nextData = [...snippets.data];
    const nextExternals = [...snippets.externals];
    const nextPush = [...snippets.push];
    const nextCronTasks = [...snippets.cronTasks];
    const key = action.type;
    snippets[key].forEach((item: ActionItem, index: number) => {
      let ref = [];
      switch (selected?.type) {
        case 'actions':
          ref = nextActions;
          break;
        case 'data':
          ref = nextData;
          break;
        case 'externals':
          ref = nextExternals;
          break;
        default:
          ref = nextActions;
          break;
      }

      if (item.action === selected?.action) {
        ref.splice(index, 1);
        if (type === 'data') {
          dispatch(setActions({
            actions: nextActions,
            externals: nextExternals,
            push: nextPush,
            cronTasks: nextCronTasks,
            data: [
              ...nextData,
              {
                action: actionName,
                object: code,
                type: 'data'
              },
            ],
          }));
        } else if (type === 'actions') {
          dispatch(setActions({
            actions: [
              ...nextActions,
              {
                action: actionName,
                object: code,
                type: 'actions'
              },
            ],
            data: nextData,
            externals: nextExternals,
            push: nextPush,
            cronTasks: nextCronTasks,
          }));
        } else if (type === 'externals') {
          dispatch(setActions({
            externals: [
              ...nextExternals,
              {
                action: actionName,
                object: code,
                type: 'externals'
              },
            ],
            data: nextData,
            actions: nextActions,
            push: nextPush,
            cronTasks: nextCronTasks,
          }));
        }
        if (selected?.action !== actionName || selected?.type !== type) {
          dispatch(deleteActionEdit(action));
        }
      }
    });
    dispatch(setSelectAction(null));
  };

  return (
    <>
      <Settings>
        <H4>Action settings</H4>
      </Settings>
      <div style={{height: '1px', background: '#E6E6E6'}}></div>
      <Container>
          <Controller
            name="actionName"
            control={control}
            render={({field}) => <Input type="text" label="Action name" $clearable $isWide {...field} />}
          />
          <Controller
            name="type"
            control={control}
            render={({field}) => {
              return (
                <ButtonSelector
                  label="Action type"
                  buttons={[
                    {title: 'Data usage', key: 'data', uuid: v4()},
                    {title: 'Custom action', key: 'actions', uuid: v4()},
                    {title: 'External action', key: 'externals', uuid: v4()},
                  ]}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="code"
            control={control}
            render={({field}) => {
              return (
                <>
                  <Label>Code for the Action</Label>
                  <EditorWrapper icon={fullScreenIcon}>
                    <button
                      className="fullScreen"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModal();
                      }}
                    ></button>
                    <Editor
                      textareaClassName="code"
                      highlight={(code) => Prism.highlight(code, Prism.languages.js, 'javascript')}
                      onValueChange={field.onChange}
                      style={{
                        ...gruvboxLight,
                        fontSize: '16px',
                        lineHeight: '20px',
                        height: '100%'
                      }}
                      tabSize={4}
                      insertSpaces
                      {...field}
                      value={field.value || ''}
                    />
                  </EditorWrapper>
                </>
              );
            }}
          />
          <div className="buttons">
             <Button className="secondary">Back</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Container>
      <Modal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)}>
        <Controller
          name="code"
          control={control}
          render={({field}) => {
            return (
              <>
                <EditorWrapper icon={fullScreenIcon}>
                  <Editor
                    highlight={(code) => Prism.highlight(code, Prism.languages.js, 'javascript')}
                    onValueChange={field.onChange}
                    style={{
                      ...gruvboxLight,
                      fontSize: '16px',
                      lineHeight: '20px',
                    }}
                    tabSize={4}
                    insertSpaces
                    {...field}
                    value={field.value || ''}
                  />
                </EditorWrapper>
              </>
            );
          }}
        />
      </Modal>
    </>
  );
};

export default ActionForm;
