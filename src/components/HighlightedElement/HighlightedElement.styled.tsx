import styled from 'styled-components';
import {TPosition} from './types';

export const Wrapper = styled.div<TPosition>`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height || 0 + 20}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top - 20}px;
  box-shadow: 0px 2px 10px rgba(51, 51, 51, 0.1), 0px 3px 8px rgba(244, 69, 50, 0.15);
  & > .options {
    background-color: white;
    display: flex;
    background-color: #ffffff;
    padding: 4px;
    border-radius: 4px 4px 0px 0px;
    height: 20px;
    width: 100%;
    align-items: center;
    justify-content: end;
    & > div {
      position: fixed;
      display: flex;
      gap: 8px;
      & > svg {
        width: 12px;
        height: 12px;
      }
    }
  }
`;
