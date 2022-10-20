import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Item = styled.div<{isActive?: boolean, pure?: boolean}>`
  width: ${(props) => props.pure ? '' : '100%'};
  ${(props) => props.isActive ? 'font-weight: bold;' : ''}
  &:hover {
    cursor: pointer;
  }
`;

export const Indicator = styled(motion.div)`
  height: 2px;
  width: 100%;
  background: var(--neo-black);
`;

export const TabsContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
    & > div {
        font-size: 0.83rem;
        text-align: center;
    }
`;