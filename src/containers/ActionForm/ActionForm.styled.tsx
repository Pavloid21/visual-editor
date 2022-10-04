import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  max-width: 422px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 60px);
  & > .buttons {
    display: flex;
    gap: 16px;
  }
`;

export const EditorWrapper = styled.div<{icon: string}>`
  max-height: 638px;
  overflow: auto;
  padding: 8px 12px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;
  position: relative;
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
