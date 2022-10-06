import styled, {StyledComponent} from 'styled-components';
import {Container} from 'components/controls';

export const WithLabel: StyledComponent<'section', any, Record<string, unknown>, any> = styled(Container)`
  margin-bottom: 0;
  svg {
    position: static;
  }
  ${(props: any) => {
  if (props.label) {
    return `
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
  }
}}
`;
