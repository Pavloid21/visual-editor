import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../constants/actionTypes";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { RemoveButton } from "./Inspector";
import styled from "styled-components";

const ApiSettings = (props) => {
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

  const [showForm, setAPIFormShow] = useState(false);
  const APIs = useSelector((state) => state.api.list);
  const [isEditing, setEditing] = useState(false);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  if (!props.display) {
    return null;
  }

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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h5>API Settings</h5>
        <button className="btn btn-primary" onClick={handleAddButton}>
          Add API
        </button>
      </div>
      <hr />
      {showForm && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-group">
              <label>Endpoint name</label>
              <Controller
                name="varName"
                control={control}
                render={({ field }) => (
                  <input className="form-control" {...field} />
                )}
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <input className="form-control" {...field} />
                )}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <h5>Headers</h5>
                <button
                  className="btn btn-primary"
                  onClick={handleAddHeaderButton}
                >
                  Add header
                </button>
              </div>
              {controlledFields.map((field, index) => (
                <RowContainer key={field.id}>
                  <Controller
                    name={`headers.${index}.key`}
                    control={control}
                    render={({ field }) => {
                      return <input {...field} placeholder="Key" />;
                    }}
                  />
                  <Controller
                    name={`headers.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <input placeholder="Value" {...field} />
                    )}
                  />
                  <RemoveButton
                    className="material-icons"
                    onClick={(e) => {
                      remove(index);
                    }}
                  >
                    remove_circle_outline
                  </RemoveButton>
                </RowContainer>
              ))}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <h5>Params</h5>
                <button
                  className="btn btn-primary"
                  onClick={handleAddParamButton}
                >
                  Add parameter
                </button>
              </div>
              {controlledParams.map((field, index) => (
                <RowContainer key={field.id}>
                  <Controller
                    name={`params.${index}.key`}
                    control={control}
                    render={({ field }) => {
                      return <input {...field} placeholder="Key" />;
                    }}
                  />
                  <Controller
                    name={`params.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <input placeholder="Value" {...field} />
                    )}
                  />
                  <RemoveButton
                    className="material-icons"
                    onClick={(e) => {
                      paramsFieldsArray.remove(index);
                    }}
                  >
                    remove_circle_outline
                  </RemoveButton>
                </RowContainer>
              ))}
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
            >
              {isEditing ? "Edit" : "Save"} API
            </button>
          </form>
          <hr />
        </>
      )}
      <div>
        <label>APIs:</label>
        {APIs.map((item, index) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              key={`api_${index}`}
            >
              <p onClick={() => handleItemClick(index)}>{item.varName}</p>
              <RemoveButton
                className="material-icons"
                onClick={(e) => {
                  dispatch({
                    type: actionTypes.REMOVE_API_ITEM,
                    index,
                  });
                }}
              >
                remove_circle_outline
              </RemoveButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RowContainer = styled.div`
  display: flex;
  & * {
    flex: 1 1 auto;
    width: 100%;
    margin-bottom: 8px;
  }
  & *:last-child {
    width: 30px;
  }
`;

export default ApiSettings;
