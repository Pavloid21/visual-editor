import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import webview from '../../assets/webview.svg';
import Wrapper from '../../utils/wrapper';
import {observer} from '../../utils/observer';

const WebView = styled.iframe`
  flex: 1 1 auto;
  border: none;
`;

const Component = ({settingsUI, uuid, ...props}) => {
  const callback = () => {
    setTimeout(() => {
      if (document.activeElement.tagName === 'IFRAME') {
        observer.broadcast({blockId: props.id, event: 'click'});
      }
    });
  };

  useEffect(() => {
    window.addEventListener('blur', callback);
    return () => {
      window.removeEventListener('blur', callback);
    };
  }, []);

  const contentRef = useRef(null);
  if (contentRef.current && contentRef.current.contentDocument) {
    const document = contentRef.current.contentDocument;
    document.body.innerHTML = settingsUI.mainSiteHtml;
  }

  return (
    <Wrapper id={props.id} {...settingsUI} sizeModifier={'FULLWIDTH'} style={{flex: 1}}>
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
  category: 'Element',
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
