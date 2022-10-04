import styled from 'styled-components';
import {Select as SelectBase} from 'components/controls';
import {ButtonSelector as ButtonSelectorBase} from 'components';
import {Container} from 'components/layouts';

const ButtonGroup = styled.div`
  & button:not(:last-child) {
    border-radius: 4px 0px 0px 4px;
    border-right: none !important;
  }

  & button:last-child {
    border-radius: 0px 4px 4px 0px;
    border-left: none !important;
  }
  & button.secondary {
    border: 1px solid var(--neo-secondary-gray);
    color: #333333;
  }
`;

const Select = styled(SelectBase)`
  margin-left: 16px;
  min-width: 200px;
`;

const ButtonSelector = styled(ButtonSelectorBase)`
  ${Container.className} {
    margin-bottom: 0px;
  }
`;

export {ButtonGroup, Select, ButtonSelector};
