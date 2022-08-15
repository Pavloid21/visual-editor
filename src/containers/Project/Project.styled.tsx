import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 48px 36px;
  flex-direction: column;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const H1 = styled.h1`
  font-size: 40px;
`;

export const P = styled.p`
  color: var(--neo-secondary-gray);
`;

export const Header = styled.div`
  background-color: #f3f3f3;
  border: 1px solid #e6e6e6;
  border-radius: 4px 4px 0 0;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  & > section {
    margin-bottom: 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 422px);
  grid-auto-rows: min-content;
  gap: 32px;
  overflow-y: auto;
  background: #fafafa;
  border: 1px solid #e6e6e6;
  border-radius: 0 0 4px 4px;
  border-top: none;
  padding: 32px;
  height: 100%;
  align-items: start;
`;
