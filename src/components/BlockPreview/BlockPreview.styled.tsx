import styled from 'styled-components';

export const Container = styled.div<{mode: string}>`
  border: 1px dashed #b3b3b3;
  box-sizing: border-box;
  border-radius: 4px;
  ${(props) => props.mode === 'list' && 'margin: 10px 0px; padding: 16px;'};
  width: ${(props) => (props.mode === 'grid' ? '118px' : '390px')};
  height: ${(props) => (props.mode === 'grid' ? '118px' : '92px')};
  ${(props) => props.mode === 'list' && 'display: flex; gap: 20px; align-items: center;'}
  ${(props) => props.mode === 'grid' && 'flex: 1 1 30%;'}
  text-align: ${(props) => (props.mode === 'grid' ? 'center' : 'left')};
  @media (max-width: 1500px) {
    width: ${(props) => (props.mode === 'grid' ? '118px' : '270px')};
  }
  & img {
    margin-top: ${(props) => (props.mode === 'grid' ? '16px' : '0px')};
    width: 60px;
    height: 60px;
  }
  & p {
    padding: ${(props) => (props.mode === 'grid' ? '13px 8px' : '0px')};
    margin-bottom: ${(props) => (props.mode === 'grid' ? '0' : '2px')};
    font-size: 12px;
    line-height: 16px;
    overflow-wrap: break-word;
    @media (max-width: 1500px) {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;
