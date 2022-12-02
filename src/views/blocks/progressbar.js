import React from 'react';
import styled from 'styled-components';
import progressbar from 'assets/progressbar.svg';
import Wrapper from 'utils/wrapper';
import {
  strokeWidth,
  progressBarColor,
} from 'views/configs';
import {getDimensionStyles} from '../utils/styles/size';

const Progressbar = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    & @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id}>
      <Progressbar {...props} {...settingsUI} className="draggable">
        <span></span>
      </Progressbar>
    </Wrapper>
  );
};

const block = () => ({
  Component,
  name: 'PROGRESSBAR',
  title: 'Progressbar',
  description: 'Progress indicator inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.',
  previewImageUrl: progressbar,
  category: 'Controls',
  defaultData: {
    strokeWidth: 1,
    progressBarColor: '#FA6621',
  },
  config: {
    strokeWidth,
	progressBarColor,
  },
});

export default block;
