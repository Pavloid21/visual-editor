import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px 16px;
`;

export const SearchImageContainer = styled.div`
  display: flex;
  align-items: center;
  & .inputImage {
    flex-grow: 1;
    margin-right: 15px;
  }
  & .folderImage:hover {
    cursor: pointer;
    & path {
      fill: var(--main-color);
    };
  }
`;
