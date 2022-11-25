import styled from 'styled-components';

export const ModalWrapper = styled.div`
  & .folderName {
    padding-bottom: 20px;
    & p {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #333333;
      margin: 0 0 5px 0;
    }
  }
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 0 0 32px 32px;
    & button {
      padding: 8px 16px;
    }
`;

export const Bar = styled.div`
  height: 60px;
  background: var(--background);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  border-bottom: 1px solid var(--neo-gray);
  position: sticky;
  top: 0;
  z-index: 3;

  & > h3 {
    font-weight: 500;
    font-size: 20px;
    align-self: center;
    margin-bottom: 0;
  }

  & + div {
    padding: 32px;
  }
`;
