import styled from 'styled-components';

export const Container = styled.div`
  width: 118px;
  height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  margin: 7px;
  position: relative;
  & img {
    max-width: 118px;
    max-height: 118px;
  }
  &:hover .deleteImage {
    display: block;
    cursor: pointer;
  }
  & .deleteImage {
    position: absolute;
    bottom: 1px;
    right: 1px;
    display: none;
  }
`;
