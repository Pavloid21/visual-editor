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
    formState: { errors },
  } = useForm();
  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "headers",
  });
  const handleAddHeaderButton = () => {
    append({
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
    setValue("varName", APIs[index].varName);
    setValue("url", APIs[index].url);
    replace(APIs[index].headers);
    setSelected(index);
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
              {fields.map((field, index) => (
                <RowContainer>
                  <Controller
                    name={`headers.${index}.key`}
                    control={control}
                    render={({ field }) => (
                      <input {...field} placeholder="Key" />
                    )}
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
            <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
              {isEditing ? "Edit" : "Add"}
            </button>
          </form>
          <hr />
        </>
      )}
      <div>
        <label>APIs:</label>
        {APIs.map((item, index) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
