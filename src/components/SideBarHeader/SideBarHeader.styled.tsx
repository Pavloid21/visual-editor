import styled from 'styled-components';

export const Header = styled.div`
  min-height: 60px;
  background-color: var(--background);
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: var(--neo-black);
  padding: 18px 16px;
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
  gap: 18px;
`;

export const Subheader = styled.div`
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div {
    display: flex;
    font-size: 16px;
    line-height: 20px;
    gap: 8px;
  }
  & span {
    color: var(--neo-secondary-gray);
    &:hover {
      cursor: pointer;
    }
  }
`;

export const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  & > svg {
    margin-bottom: 30px;
  }
  & > h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 24px;
  }
  & > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    max-width: 384px;
    text-align: center;
    margin-bottom: 28px;
  }
  & > .button_group {
    display: flex;
    gap: 16px;
  }
`;

export const Search = styled.div`
  padding: 0 16px;
  margin-bottom: 15px;
`;
