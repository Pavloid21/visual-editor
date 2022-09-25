import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  & svg {
    position: absolute;
    right: 12px;
    top: 41px;
    &:hover {
      cursor: pointer;
    }
  }
`;
