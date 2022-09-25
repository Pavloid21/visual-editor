import styled from 'styled-components';
import {ReactComponent as CollapseIcon} from 'assets/collapse.svg';

export const GalleryHeader = styled.div`
  border-top: 1px solid var(--neo-gray);
  border-bottom: 1px solid var(--neo-gray);
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span {
    font-size: 20px;
    line-height: 24px;
  }
`;

export const Container = styled.div<{mode: string}>`
  padding: 4px 6px 0px 16px;
  height: calc(100% - 46px);
  & > div {
    height: calc(100% - 50px);
    overflow-y: auto;
    overflow-x: hidden;
    display: ${(props) => (props.mode === 'grid' ? 'grid' : 'flex')};
    ${(props) =>
      props.mode === 'grid'
        ? `grid-template-columns: 118px 118px 118px;
    grid-template-rows: 118px 118px 118px;
    column-gap: 18px;
    row-gap: 18px;`
        : ''}
    ${(props) => (props.mode === 'list' ? 'flex-direction: column;' : '')}
    padding-top: 10px;
    padding-bottom: 10px;
    @media (max-width: 1500px) {
      ${(props) =>
        props.mode === 'grid'
          ? `grid-template-columns: 118px 118px;
    grid-template-rows: 118px 118px;
    column-gap: 18px;
    row-gap: 18px;`
          : ''}
    }
  }
`;

export const Collapse = styled(CollapseIcon)<{collapse: boolean}>`
  ${(props) => {
    if (!props.collapse) {
      return 'transform: rotate(180deg);';
    }
  }}
`;

export const Wrapper = styled.div<{show: boolean}>`
  height: ${(props) => (props.show ? '50%' : '46px')};
`;
