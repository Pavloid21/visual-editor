import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../constants/actionTypes";
import { useForm, Controller } from "react-hook-form";
import { RemoveButton } from "./Inspector";

const ApiSettings = (props) => {
  const {
    handleSubmit,
    resetField,
    setValue,
    control,
    formState: { errors },
  } = useForm();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label>Endpoint name</label>
              <Controller
                name="varName"
                control={control}
                render={({ field }) => (
                  <input className="form-control" {...field} />
                )}
              />
            </div>
            <div class="form-group">
              <label>URL</label>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <input className="form-control" {...field} />
                )}
              />
            </div>
            <button type="submit" class="btn btn-primary">
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

export default ApiSettings;
