import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import divider from 'assets/divider.svg';
import {backgroundColor} from 'views/configs';

const HR = styled.hr`
  align-self: center;
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <HR {...settingsUI} {...props} className="draggable" />
    </Wrapper>
  );
};

const block = {
  Component,
  name: 'DIVIDER',
  title: 'Divider',
  description: 'A visual element that can be used to separate other content.',
  previewImageUrl: divider,
  category: 'Element',
  defaultData: {
    backgroundColor: '#000000',
  },
  config: {
    backgroundColor,
  },
};

export default block;
