import styled from 'styled-components';

export const Container = styled.div`
  min-width: 458px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  max-width: 458px;
  z-index: 1;
  & > .screen-list {
    flex: 1;
  }


  @media (max-width: 1500px) {
    min-width: 336px;
  }
`;

export const SideBarContent = styled.div`
  flex: 1;
  height: calc(100vh - 120px);
  overflow: hidden;
  & > div {
    overflow: hidden;
    & .rst__virtualScrollOverride > div {
      position: static !important;
    }
  }
  display: flex;
  flex-direction: column;
`;

export const SideBarBody = styled.div`
  display: flex;
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

export const ModalContent = styled.div`
  padding: 8px 0 0 0 !important;
  #center {
    border-bottom: 1px solid var(--neo-gray);
    text-align: center;
  }
  .modal_columns {
    display: flex;
  }
  .modal_col {
    padding: 10px 20px 20px 20px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }
  .modal_col.side {
    border-right: 1px solid var(--neo-gray);
    padding: 16px;
    & > h3 {
      font-weight: 700;
      font-size: 24px;
      line-height: 20px;
      color: var(--neo-secondary-gray);
      margin-bottom: 20px;
      margin-right: 106px;
    }
  }
`;

export const TemplateItem = styled.div`
  &:hover {
    cursor: pointer;
    background-color: var(--light-orange);
  }
`;

export const DefaultTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > span {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 32px;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--light-orange);
  }
`;
