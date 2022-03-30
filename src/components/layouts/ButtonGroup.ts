import styled from "styled-components";

export const ButtonGroup = styled.div`
  & button:not(:last-child) {
    border-radius: 4px 0px 0px 4px;
    border-right: none !important;
  }

  & button:last-child {
    border-radius: 0px 4px 4px 0px;
    border-left: none !important;
  }
  & button.secondary {
    border: 1px solid #8c8c8c;
    color: #333333;
  }
`;