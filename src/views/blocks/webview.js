import React, {useRef} from 'react';
import styled from 'styled-components';
import webview from '../../assets/webview.svg';
import Wrapper from '../../utils/wrapper';

const WebView = styled.iframe`
  flex: 1 1 auto;
  border: none;
`;

const Component = ({settingsUI, uuid, ...props}) => {
  const contentRef = useRef(null);
  if (contentRef.current && contentRef.current.contentDocument) {
    const document = contentRef.current.contentDocument;
    document.body.innerHTML = settingsUI.mainSiteHtml;
  }
  return (
    <Wrapper id={props.id} {...settingsUI} style={{flex: 1}}>
      <WebView
        {...props}
        ref={contentRef}
        className="draggable"
        src={settingsUI.mainSiteUrl}
        sandbox="allow-scripts allow-same-origin"
      ></WebView>
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'WEBVIEW',
  title: 'WebView',
  description: 'A View that displays web pages.',
  previewImageUrl: webview,
  category: 'Layouts',
  defaultData: {
    mainSiteHtml: '',
    mainSiteUrl: 'https://ya.ru',
  },
  config: {
    mainSiteHtml: {type: 'string', name: 'HTML'},
    mainSiteUrl: {type: 'string', name: 'URL'},
  },
};

export default block;
