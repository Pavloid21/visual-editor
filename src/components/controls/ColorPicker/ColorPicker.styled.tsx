import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div<{isWide?: boolean, color: string}>`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: ${(props) => (props.isWide ? '100%' : 'auto')};
  padding: 4px 12px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;

  & > .swatch {
    min-height: 20px;
    min-width: 20px;
    border-radius: 50%;
    border: 1px solid var(--neo-gray);
    margin-right: 8px;
    background: ${(props) => props.color};
    &:hover {
      cursor: pointer;
    }
  }
  & .input-color {
    border: none;
    width: 100%;
    text-transform: uppercase;
  }
`;
export const WrapperPopoverColor = styled.div<{position?: string}>`
  position: absolute;
  top: calc(100% + 2px);
  transform: ${(props) => props.position === 'top' ? `translateY(calc(-100% - 20px))` : "none"};
  transition: all 0.3s ease;
  left: 0;
  border-radius: 9px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.7);
  border: 1px solid var(--neo-gray);
  z-index: 2;
  background-color: var(--ctrl-background);
  padding: 12px;
  & .react-colorful {
    border-radius: 8px;
    border: 2px solid var(--neo-gray);
  }
  & .react-colorful__saturation-pointer {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background-color: transparent;
    border-color: var(--ctrl-background);
    &:hover {
      border-color: #2a356c;
    }
  }
  & .react-colorful__hue-pointer,
  & .react-colorful__alpha-pointer {
    width: 16px;
    border-radius: 3px;
    background-color: transparent;
    border-color: var(--ctrl-background);
    &:hover {
      border-color: #2a356c;
    }
  }
  & .wrapper-palette {
    & .title {
      text-align: center;
      margin-top: 15px;
      font-size: 16px;
      font-weight: 500;
      color: var(--neo-black);
    }
    & .palette {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
  & .input-popover {
    margin-top: 10px;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const ColorItem = styled.div<{color: string}>`
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid var(--neo-gray);
  cursor: pointer;
  &:hover {
    border: 2px solid #2a356c;
  }
`;
