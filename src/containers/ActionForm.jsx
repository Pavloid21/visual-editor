import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import Editor from "react-simple-code-editor";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import styled from "styled-components";
import { Label } from "../components/Input";
import fullScreenIcon from "../assets/full-screen.svg";
import CustomModal from "../components/Modal";
import { useModal } from "../utils/hooks";
import Button from "../components/Button";
import ButtonSelector from "../components/ButtonSelector";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";

const Container = styled.div`
  padding: 16px;
  max-width: 422px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 60px);
  & > .buttons {
    display: flex;
    gap: 16px;
  }
`;

const EditorWrapper = styled.div`
  max-height: 638px;
  overflow: auto;
  padding: 8px 12px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;
  position: relative;
  & > button.fullScreen {
    position: absolute;
    right: 12px;
    padding: 0;
    border: none;
    background: transparent;
    background-image: url(${(props) => props.icon});
    width: 16px;
    height: 16px;
    z-index: 2;
  }
`;

const ActionForm = ({ action }) => {
  const dispatch = useDispatch();
  const { setValue, getValues, control } = useForm();
  const snippets = useSelector((state) => state.actions);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  useEffect(() => {
    setValue("actionName", action.action);
    setValue("type", action.type);
    setValue("code", action.object);
  }, [action]);

  const handleSave = () => {
    const { actionName, code, type } = getValues();
    const nextActions = [...snippets.actions];
    const nextData = [...snippets.data];
    const key = action.type === "action" ? "actions" : "data";
    snippets[key].forEach((item, index) => {
      const ref = type === "data" ? nextData : nextActions;
      if (item.action === actionName) {
        ref.splice(index, 1);
        if (type === "data") {
          dispatch({
            type: actionTypes.SET_ACTIONS,
            actions: nextActions,
            data: [
              ...nextData,
              {
                action: actionName,
                object: code,
              },
            ],
          });
        } else {
          dispatch({
            type: actionTypes.SET_ACTIONS,
            actions: [
              ...nextActions,
              {
                action: actionName,
                object: code,
              },
            ],
            data: nextData,
          });
        }
      } else {
        const param = type === "action" ? "actions" : "data";
        dispatch({
          type: actionTypes.SET_ACTIONS,
          [param]: [
            ...snippets[param],
            {
              action: actionName,
              object: code,
            },
          ],
        });
      }
    });
    dispatch({
      type: actionTypes.SELECT_ACTION,
      selected: null,
    });
  };

  return (
    <>
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Controller
            name="actionName"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                label="Action name"
                clearable
                isWide
                {...field}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonSelector
                label="Action type"
                variants={["data", "action"]}
                titles={["Data usage", "Custom action"]}
                {...field}
              />
            )}
          />
          <Controller
            name="code"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Label>Code for the Action</Label>
                  <EditorWrapper icon={fullScreenIcon}>
                    <button
                      className="fullScreen"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("toggleModal", toggleModal);
                        toggleModal();
                      }}
                    ></button>
                    <Editor
                      textareaClassName="code"
                      highlight={(code) =>
                        Prism.highlight(code, Prism.languages.js, "javascript")
                      }
                      onValueChange={field.onChange}
                      style={{
                        ...stackoverflowLight,
                        fontSize: "16px",
                        lineHeight: "20px",
                      }}
                      tabSize={4}
                      insertSpaces
                      {...field}
                      value={field.value || ""}
                    />
                  </EditorWrapper>
                </>
              );
            }}
          />
        </form>
        <div className="buttons">
          {/* <Button className="secondary">Back</Button> */}
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Container>
      <CustomModal
        isActive={itemModalOpen}
        handleClose={() => setItemModalOpen(false)}
      >
        <Controller
          name="code"
          control={control}
          render={({ field }) => {
            return (
              <>
                <EditorWrapper icon={fullScreenIcon}>
                  <Editor
                    highlight={(code) =>
                      Prism.highlight(code, Prism.languages.js, "javascript")
                    }
                    onValueChange={field.onChange}
                    style={{
                      ...stackoverflowLight,
                      fontSize: "16px",
                      lineHeight: "20px",
                    }}
                    tabSize={4}
                    insertSpaces
                    {...field}
                    value={field.value || ""}
                  />
                </EditorWrapper>
              </>
            );
          }}
        />
      </CustomModal>
    </>
  );
};

export default ActionForm;
