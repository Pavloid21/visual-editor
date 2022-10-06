import styled from 'styled-components';

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.span<{isWide?: boolean}>`
  display: inline-flex;
  align-items: center;
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

  & .chrome-picker {
    position: absolute;
    z-index: 2;
    top: 64px;
    left: 0;
  }

  input[type='color'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    max-width: 20px;
    max-height: 20px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--neo-gray);
    margin-right: 8px;
    &::-webkit-color-swatch {
      border-radius: 50%;
      border: none;
    }
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-moz-color-swatch {
      border-radius: 50%;
      border: none;
    }
    &::-moz-color-swatch-wrapper {
      padding: 0;
    }
  }

  input[type='text'] {
    border: none;
    width: 100%;
  }
`;
