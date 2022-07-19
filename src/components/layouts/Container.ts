import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  margin-bottom: 12px;
  & svg {
    position: absolute;
    right: 12px;
    top: 41px;
    &:hover {
      cursor: pointer;
    }
  }
`;
