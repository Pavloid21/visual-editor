import React, { useState } from "react";
import styled from "styled-components";
import SideBarHeader from "./SideBarHeader";
import Inspector from "../containers/Inspector";
import Screen from "../containers/Screen";
import Button from "../components/Button";
import actionTypes from "../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { ReactComponent as Remove } from "../assets/trash.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import Input from "./Input";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const Container = styled.div`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  z-index: 2;
  & > div {
    height: 100%;
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

export default function RightSidebar({ children, ...props }) {
  const APIs = useSelector((state) => state.api.list);
  const activeTab = useSelector((state) => state.config.activeTab);
  const selectedBlock = useSelector((state) => state.layout.selectedBlockUuid);
  const [showForm, setAPIFormShow] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    resetField,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "headers",
  });
  const paramsFieldsArray = useFieldArray({
    control,
    name: "params",
  });

  const watchFieldArray = watch("headers");
  const watchParamsArray = watch("params");
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
      key: "",
      value: "",
    });
  };

  const handleAddParamButton = () => {
    paramsFieldsArray.append({
      key: "",
      value: "",
    });
  };

  const handleAddButton = () => {
    resetField("varName");
    resetField("url");
    resetField("headers");
    resetField("params");
    setAPIFormShow(true);
  };

  const onSubmit = (data) => {
    if (isEditing) {
      dispatch({
        type: actionTypes.EDIT_API,
        api: data,
        index: selected,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_API,
        api: data,
      });
    }
    setAPIFormShow(false);
  };

  const handleItemClick = (index) => {
    setSelected(index);
    setValue("varName", APIs[index].varName);
    setValue("url", APIs[index].url);
    setValue("headers", APIs[index].headers);
    setValue("params", APIs[index].params);
    replace(APIs[index].headers);
    paramsFieldsArray.replace(APIs[index].params);
    setAPIFormShow(true);
    setEditing(true);
  };

  if (!props.display) {
    return null;
  }

  return (
    <Container>
      <div>
        <SideBarHeader title="Properties" />
        <Inspector display />
        {activeTab === 5 && (
          <Screen
            category="screen"
            display={activeTab === 5}
            onPushBlock={() => {}}
            onPushBlockInside={() => {}}
          />
        )}
        {!selectedBlock && (
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
                  render={({ field }) => (
                    <Input
                      type="text"
                      label="Endpoint name"
                      clearable
                      isWide
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="url"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      label="URL"
                      clearable
                      isWide
                      {...field}
                    />
                  )}
                />
                <div>
                  <span>Headers</span>
                  <Plus className="icon" onClick={handleAddHeaderButton} />
                </div>
                {controlledFields.map((field, index) => (
                  <RowContainer key={field.id}>
                    <Controller
                      name={`headers.${index}.key`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            placeholder="Key"
                            label="Key"
                            clearable
                            {...field}
                          />
                        );
                      }}
                    />
                    <Controller
                      name={`headers.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Value"
                          label="Value"
                          clearable
                          {...field}
                        />
                      )}
                    />
                    <Remove
                      className="icon"
                      onClick={(e) => {
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
                      name={`params.${index}.key`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            placeholder="Key"
                            label="Key"
                            clearable
                            {...field}
                          />
                        );
                      }}
                    />
                    <Controller
                      name={`params.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Value"
                          label="Value"
                          clearable
                          {...field}
                        />
                      )}
                    />
                    <Remove
                      className="icon"
                      onClick={(e) => {
                        paramsFieldsArray.remove(index);
                      }}
                    />
                  </RowContainer>
                ))}
                <Button onClick={handleSubmit(onSubmit)}>
                  {isEditing ? "Edit" : "Save"} API
                </Button>
              </form>
            )}
            <div style={{ marginTop: "16px" }}>
              <span>API List</span>
            </div>
            {APIs.map((item, index) => {
              return (
                <APIRow
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={`api_${index}`}
                >
                  <span>{item.varName}</span>
                  <span>
                    <Pencil
                      className="icon"
                      onClick={() => handleItemClick(index)}
                    />
                    <Remove
                      className="icon"
                      onClick={(e) => {
                        dispatch({
                          type: actionTypes.REMOVE_API_ITEM,
                          index,
                        });
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
}
