import styled from 'styled-components';
import {Select as SelectBase} from 'components/controls';

export const Division = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 8px;
`;

export const Select = styled(SelectBase)`
  svg {
    position: static;
  }
  [class$='control'] {
    border-color: var(--neo-gray) !important;
    font-size: 14px;
    min-height: 36px;
    & > div:first-child {
      padding: 0 12px;
    }
    & > div:last-child {
      max-height: 36px;
    }
  }
`;

export const GroupedFields = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
