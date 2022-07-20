import styled from 'styled-components';

export const Container = styled.div<{show: boolean}>`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  z-index: 1;
  & > div:nth-child(2n + 1) {
    ${(props) => (props.show ? 'height: 50%;' : '')}
  }
  & > div {
    overflow: hidden;
    & .rst__virtualScrollOverride > div {
      position: static !important;
    }
  }

  @media (max-width: 1500px) {
    min-width: 300px;
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

export const ScreenTitle = styled.div`
  display: flex;
  align-items: center;
`;
