import React from 'react';
import styled from 'styled-components';
import {Container} from './layouts/Container';
import {PacmanLoader} from 'react-spinners';

const FullScreenLoader = styled(Container)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
`;

const Loader: React.FC<{loading: boolean; size?: number}> = ({loading, size = 60}) => {
  return (
    <FullScreenLoader>
      <PacmanLoader color={'#F44532'} loading={loading} size={size} />;
    </FullScreenLoader>
  );
};

export default Loader;
