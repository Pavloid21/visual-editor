import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";
import styled from "styled-components";
import { ReactComponent as CodeIcon } from "../assets/code.svg";
import { ReactComponent as DataIcon } from "../assets/folder-upload.svg";
import { ReactComponent as Trash } from "../assets/trash.svg";
import _ from "lodash";

const Container = styled.div`
  height: calc(100% - 104px);
  padding: 9px 19px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  & > .action-item {
    min-height: 36px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    & > div > svg > * {
      fill: #404040;
    }
    &:hover {
      cursor: pointer;
      background-color: var(--light-orange);
    }
    &.active {
      & > div > svg > * {
        fill: #ffffff;
      }
      color: #ffffff;
      background-color: var(--main-color);
    }
  }
`;

const Actions = () => {
  const dispatch = useDispatch();
  const availableActions = useSelector((state) =>
    _.orderBy(
      [
        ...state.actions.actions.map((item) => ({ ...item, type: "action" })),
        ...state.actions.data.map((item) => ({ ...item, type: "data" })),
      ],
      "action",
      "asc"
    )
  );
  const selectedAction = useSelector((state) => state.actions.selected);
  useEffect(() => {
    fetch(
      "http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/actions/"
    )
      .then((response) => response.json())
      .then((actions) => {
        const actionsArr = actions.map((action, index) => {
          return fetch(
            `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/actions/${action}`
          )
            .then((response) => response.text())
            .then((data) => ({ action, object: data }))
            .catch((e) => {
              console.log("e :>> ", e);
            });
        });
        Promise.allSettled(actionsArr)
          .then((resolves) => {
            const actions = [];
            resolves.forEach((result) => {
              if (result.status === "fulfilled") {
                actions.push({ ...result.value, selected: false });
              }
            });
            dispatch({
              type: actionTypes.SET_ACTIONS,
              actions,
            });
          })
          .catch(console.log);
      });
    fetch(
      "http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/data/"
    )
      .then((response) => response.json())
      .then((actions) => {
        const actionsArr = actions.map((action, index) => {
          return fetch(
            `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/data/${action}`
          )
            .then((response) => response.text())
            .then((data) => ({ action, object: data }))
            .catch((e) => {
              console.log("e :>> ", e);
            });
        });
        Promise.allSettled(actionsArr)
          .then((resolves) => {
            const actions = [];
            resolves.forEach((result) => {
              if (result.status === "fulfilled") {
                actions.push({ ...result.value, selected: false });
              }
            });
            dispatch({
              type: actionTypes.SET_ACTIONS,
              data: actions,
            });
          })
          .catch(console.log);
      });
  }, []);

  const handleSelectSnippet = (action) => {
    dispatch({
      type: actionTypes.SELECT_ACTION,
      selected: action,
    });
  };

  const handleDeleteSnippet = (action) => {
    dispatch({
      type: actionTypes.DELETE_ACTION,
      selected: action,
    });
  };

  return (
    <Container>
      {availableActions &&
        availableActions.map((action, index) => {
          return (
            <div
              className={
                "action-item " +
                (selectedAction?.action === action.action &&
                selectedAction?.type === action.type
                  ? "active"
                  : "")
              }
              key={`action_snippet_${index}`}
              onClick={() => handleSelectSnippet(action)}
            >
              <div>
                {action.type === "action" ? <CodeIcon /> : <DataIcon />}
                <span>{action.action}</span>
              </div>
              <Trash
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('action', action)
                  handleDeleteSnippet(action);
                }}
              />
            </div>
          );
        })}
    </Container>
  );
};

export default Actions;
