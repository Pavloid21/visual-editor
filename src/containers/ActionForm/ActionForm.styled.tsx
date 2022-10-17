import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  max-width: 422px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 110px);
  & > .buttons {
    display: flex;
    gap: 16px;
  }
  justify-content: space-between;
  & .input-rows {
    & > section {
      margin-top: 15px;
    }

  }
`;

export const EditorWrapper = styled.div<{icon: string}>`
  max-height: 638px;
  overflow: auto;
  padding: 8px 12px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;
  position: relative;
  height: 100%;
  & > button.fullScreen {
    position: absolute;
    right: 12px;
    padding: 0;
    border: none;
    background: transparent;
    background-image: url(${(props) => props.icon});
    width: 16px;
    height: 16px;
    z-index: 2;
  }
`;

export const H4 = styled.h4`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
  margin: 0;
`;

export const Settings = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;
