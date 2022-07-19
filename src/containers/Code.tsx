import React, {useEffect} from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from '../constants/actionTypes';
import {snippet} from 'utils';
import {Store} from 'reducers/types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const EditorWrapper = styled.div`
  overflow-y: auto;
  width: 100%;
`;

const Code: React.FC<any> = (props) => {
  const code = useSelector((state: Store) => state.code);
  const dispatch = useDispatch();
  const api = useSelector((state: Store) => state.api);
  const bottomBar = useSelector((state: Store) => state.layout.bottomBar);
  const selectedScreen = useSelector((state: Store) => state.layout.selectedScreen);
  const topAppBar = useSelector((state: Store) => state.layout.topAppBar);
  const blocks = useSelector((state: Store) => state.layout.blocks);
  const initial = useSelector((state: Store) => state.output);
  const snippets = useSelector((state: Store) => state.layout.snippets);

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
        'code'
      );
      dispatch({type: actionTypes.SAVE_CODE, code: constants});
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
        <SyntaxHighlighter language="javascript" style={atomOneLight} showLineNumbers wrapLongLines>
          {initial.logic +
            snippets.filter((item) => item.screenID === selectedScreen)[0]?.snippet.replace(/"{{|}}"/g, '')}
        </SyntaxHighlighter>
      </EditorWrapper>
    </Container>
  );
};

export default Code;
