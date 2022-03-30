import React, { useEffect } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";
import { snippet } from "../utils/prepareModel";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const EditorWrapper = styled.div`
  overflow-y: auto;
  width: 100%;
`;

const Code = (props) => {
  const code = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const api = useSelector((state) => state.api);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const selectedScreen = useSelector((state) => state.layout.selectedScreen);
  const topAppBar = useSelector((state) => state.layout.topAppBar);
  const blocks = useSelector((state) => state.layout.blocks);
  const initial = useSelector((state) => state.output);
  const snippets = useSelector((state) => state.layout.snippets);

  useEffect(() => {
    if (api) {
      const constants = snippet(
        {
          screen: initial.screen,
          listItems: blocks,
        },
        api,
        blocks,
        topAppBar,
        bottomBar,
        "code"
      );
      dispatch({ type: actionTypes.SAVE_CODE, code: constants });
      dispatch({
        type: actionTypes.SET_SNIPPET,
        snippet: constants,
        selectedScreen,
      });
    }
  }, [api, initial, blocks, bottomBar, topAppBar, code]);

  return (
    <Container {...props}>
      <EditorWrapper>
        <SyntaxHighlighter
          language="javascript"
          style={stackoverflowLight}
          showLineNumbers
          wrapLongLines
        >
          {(initial.logic || "return") +
            snippets
              .filter((item) => item.screenID === selectedScreen)[0]
              ?.snippet.replace(/"{{|}}"/g, "")}
        </SyntaxHighlighter>
      </EditorWrapper>
    </Container>
  );
};

export default Code;
