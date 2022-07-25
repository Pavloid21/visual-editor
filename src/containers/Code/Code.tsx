import React, {useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useSelector, useDispatch} from 'react-redux';
import {snippet} from 'utils';
import {Store} from 'reducers/types';
import {Container, EditorWrapper} from './Code.styled';
import {saveCode} from 'store/code.slice';
import {setSnippet} from 'store/layout.slice';

const Code: React.FC<any> = (props) => {
  const code = useSelector((state: Store) => state.code);
  const dispatch = useDispatch();
  const api = useSelector((state: Store) => state.api);
  const {bottomBar, blocks, selectedScreen, topAppBar, snippets} = useSelector((state: Store) => state.layout);
  const initial = useSelector((state: Store) => state.output);

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
      dispatch(saveCode(constants));
      dispatch(setSnippet({
        snippet: constants,
        selectedScreen,
      }));
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
