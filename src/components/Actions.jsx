import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";
import styled from "styled-components";
import { ReactComponent as CodeIcon } from "../assets/code.svg";

const Container = styled.div`
  padding: 9px 19px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  & > .action-item {
    height: 36px;
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
  const availableActions = useSelector((state) => state.actions.list);
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
              list: actions,
            });
          })
          .catch(console.log);
      });
  }, []);

  const handleSelectSnippet = (index) => {
    const snippets = availableActions.map((action, i) => {
      return {
        ...action,
        selected: index === i,
      };
    });
    dispatch({
      type: actionTypes.SET_ACTIONS,
      list: snippets,
    });
  };

  return (
    <Container>
      {availableActions.map((action, index) => {
        return (
          <div
            className={"action-item " + (action.selected ? "active" : "")}
            key={`action_snippet_${index}`}
            onClick={() => handleSelectSnippet(index)}
          >
            <div>
              <CodeIcon />
              <span>{action.action}</span>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Actions;
