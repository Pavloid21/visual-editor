import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import SideBarHeader from './SideBarHeader';
import {Inspector} from 'containers/Inspector';
import Screen from 'containers/Screen';
import {Button, Input} from './controls';
import {ActionForm} from 'containers/ActionForm';
import {useSelector, useDispatch} from 'react-redux';
import {ReactComponent as Plus} from 'assets/plus.svg';
import {ReactComponent as Remove} from 'assets/trash.svg';
import {ReactComponent as Pencil} from 'assets/pencil.svg';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {noop} from 'external/lodash';
import {useOutsideAlerter} from 'utils';
import {addAPI, editAPI, removeAPI} from 'store/api-settings.slice';
import {setSelectedBlock} from 'store/layout.slice';
import {RootStore} from 'store/types';

const Container = styled.div`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  & > div {
    height: 100%;
  }
  @media (max-width: 1500px) {
    min-width: 300px;
  }
`;

const APIContainer = styled.div`
  padding: 16px;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 8px;
  }
`;

const RowContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 17px;
  & > svg {
    align-self: end;
    margin-bottom: 10px;
  }
  & input {
    max-width: 160px;
  }
`;

const APIRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightSidebar: React.FC<any> = ({children, ...props}) => {
  const APIs = useSelector((state: RootStore) => state.api.list);
  const activeTab = useSelector((state: RootStore) => state.config.activeTab);
  const {selectedBlockUuid: selectedBlock, selectedScreen} = useSelector((state: RootStore) => state.layout);
  const selectedAction = useSelector((state: RootStore) => state.actions.selected);
  const [showForm, setAPIFormShow] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [selected, setSelected] = useState<number | undefined>();
  const dispatch = useDispatch();
  const {handleSubmit, resetField, setValue, control, watch} = useForm();
  const {fields, append, replace, remove} = useFieldArray({
    control,
    name: 'headers',
  });
  const paramsFieldsArray = useFieldArray({
    control,
    name: 'params',
  });

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () =>
    dispatch(setSelectedBlock(''))
  );

  const watchFieldArray = watch('headers');
  const watchParamsArray = watch('params');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const controlledParams = paramsFieldsArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchParamsArray[index],
    };
  });

  const handleAddHeaderButton = () => {
    append({
      key: '',
      value: '',
    });
  };

  const handleAddParamButton = () => {
    paramsFieldsArray.append({
      key: '',
      value: '',
    });
  };

  const handleAddButton = () => {
    resetField('varName');
    resetField('url');
    resetField('headers');
    resetField('params');
    setAPIFormShow(true);
  };

  const onSubmit = (data: any) => {
    if (isEditing && selected) {
      dispatch(editAPI({
        api: data,
        index: selected,
      }));
    } else {
      dispatch(addAPI(data));
    }
    setAPIFormShow(false);
  };

  const handleItemClick = (index: number) => {
    setSelected(index);
    setValue('varName', APIs[index].varName);
    setValue('url', APIs[index].url);
    setValue('headers', APIs[index].headers);
    setValue('params', APIs[index].params);
    replace(APIs[index].headers);
    paramsFieldsArray.replace(APIs[index].params);
    setAPIFormShow(true);
    setEditing(true);
  };

  if (!props.display) {
    return null;
  }

  return (
    <Container ref={wrapperRef}>
      <div>
        <SideBarHeader title="Properties" />
        <Inspector display />
        {selectedAction && !selectedBlock && <ActionForm action={selectedAction} />}
        {activeTab === 5 && selectedScreen && (
          <Screen category="screen" display={activeTab === 5} onPushBlock={noop} onPushBlockInside={noop} />
        )}
        {!selectedBlock && !selectedAction && activeTab !== 5 && (
          <APIContainer>
            <div>
              <span>API Settings</span>
              <Plus className="icon" onClick={handleAddButton} />
            </div>
            {showForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Controller
                  name="varName"
                  control={control}
                  render={({field}) => <Input type="text" label="Endpoint name" $clearable $isWide {...field} />}
                />
                <Controller
                  name="url"
                  control={control}
                  render={({field}) => <Input type="text" label="URL" $clearable $isWide {...field} />}
                />
                <div>
                  <span>Headers</span>
                  <Plus className="icon" onClick={handleAddHeaderButton} />
                </div>
                {controlledFields.map((field, index) => (
                  <RowContainer key={field.id}>
                    <Controller
                      //@ts-ignore
                      name={`headers.${index}.key`}
                      control={control}
                      render={({field}) => {
                        return <Input placeholder="Key" label="Key" $clearable {...field} />;
                      }}
                    />
                    <Controller
                      //@ts-ignore
                      name={`headers.${index}.value`}
                      control={control}
                      render={({field}) => <Input placeholder="Value" label="Value" $clearable {...field} />}
                    />
                    <Remove
                      className="icon"
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </RowContainer>
                ))}
                <div>
                  <span>Parameters</span>
                  <Plus className="icon" onClick={handleAddParamButton} />
                </div>
                {controlledParams.map((field, index) => (
                  <RowContainer key={field.id}>
                    <Controller
                      //@ts-ignore
                      name={`params.${index}.key`}
                      control={control}
                      render={({field}) => {
                        return <Input placeholder="Key" label="Key" $clearable {...field} />;
                      }}
                    />
                    <Controller
                      //@ts-ignore
                      name={`params.${index}.value`}
                      control={control}
                      render={({field}) => <Input placeholder="Value" label="Value" $clearable {...field} />}
                    />
                    <Remove
                      className="icon"
                      onClick={() => {
                        paramsFieldsArray.remove(index);
                      }}
                    />
                  </RowContainer>
                ))}
                <Button onClick={handleSubmit(onSubmit)}>{isEditing ? 'Edit' : 'Save'} API</Button>
              </form>
            )}
            <div style={{marginTop: '16px'}}>
              <span>API List</span>
            </div>
            {APIs.map((item, index) => {
              return (
                <APIRow style={{display: 'flex', justifyContent: 'space-between'}} key={`api_${index}`}>
                  <span>{item.varName}</span>
                  <span>
                    <Pencil className="icon" onClick={() => handleItemClick(index)} />
                    <Remove
                      className="icon"
                      onClick={() => {
                        dispatch(removeAPI(index));
                      }}
                    />
                  </span>
                </APIRow>
              );
            })}
          </APIContainer>
        )}
      </div>
    </Container>
  );
};

export default RightSidebar;
