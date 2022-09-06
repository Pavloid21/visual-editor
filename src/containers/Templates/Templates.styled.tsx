import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 32px 36px;
  flex-direction: column;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding-top: 19px;
`;

export const TemplatesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 217px);
  gap: 32px;
  max-width: 1280px;
  width: 100%;
  margin-top: 20px;
  background-color: white;
  padding: 32px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;
`;
