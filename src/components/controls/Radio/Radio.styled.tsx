import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 12px 0 0;
  & .custom-radio-btn {
    min-width: 14px;
    width: 14px;
    height: 14px;
    border: 1px solid #E63C32;
    border-radius: 50%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & .checkmark {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #E63C32;
      display: none;
    }

    & input {
      display: none;
    }

    & input:checked + .checkmark {
      display: inline-block;
    }
  }
`;
