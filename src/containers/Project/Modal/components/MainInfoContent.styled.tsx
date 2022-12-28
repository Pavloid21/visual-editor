import styled from 'styled-components';

export const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;

    & > form {
      & > div {
        margin-top: 12px;
      }
    }
`;
