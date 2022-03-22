import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";
import actionTypes from "../constants/actionTypes";
import styled from "styled-components";

const Container = styled.div`
  padding: 14px;
`;

const Screen = (props) => {
  const screenName = useSelector((state) => state.output.screen);
  const dispatch = useDispatch();
  return props.display ? (
    <Container>
      <div className="form-group">
        <Input
          isWide
          clearable
          label="Screen name"
          type="text"
          placeholder="Screen name"
          value={screenName}
          onChange={(e) =>
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: e.target.value,
            })
          }
        />
      </div>
    </Container>
  ) : null;
};

export default Screen;
