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
import {setActions, setSelectAction} from 'store/actions.slice';
import {ActionItem, RootStore, ActionTypes} from 'store/types';

const ActionForm: React.FC<{action: ActionItem}> = ({action}) => {
  const dispatch = useDispatch();
  const {setValue, getValues, control} = useForm();
  const snippets = useSelector((state: RootStore) => state.actions);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  useEffect(() => {
    setValue('actionName', action.action);
    setValue('type', action.type);
    setValue('code', action.object);
  }, [action]);

  const handleSave = () => {
    const {actionName, code, type} = getValues();
    const nextActions = [...snippets.actions];
    const nextData = [...snippets.data];
    const key = action.type === ActionTypes.actions ? 'actions' : 'data';
    snippets[key].forEach((item, index) => {
      const ref = type === 'data' ? nextData : nextActions;
      if (item.action === actionName) {
        ref.splice(index, 1);
        if (type === 'data') {
          dispatch(setActions({
            actions: nextActions,
            data: [
              ...nextData,
              {
                action: actionName,
                object: code,
              },
            ],
          }));
        } else {
          dispatch(setActions({
            actions: [
              ...nextActions,
              {
                action: actionName,
                object: code,
              },
            ],
            data: nextData,
          }));
        }
      } else {
        const param = type === 'action' ? 'actions' : 'data';
        dispatch(setActions({
          [param]: [
            ...snippets[param],
            {
              action: actionName,
              object: code,
            },
          ],
        }));
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
            render={({field}) => (
              <ButtonSelector
                label="Action type"
                buttons={[
                  {title: 'Data usage', key: 'data', uuid: v4()},
                  {title: 'Custom action', key: 'action', uuid: v4()},
                ]}
                {...field}
              />
            )}
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
