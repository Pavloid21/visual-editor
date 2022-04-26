import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 4px;
  border: 1px dashed var(--main-color);
  width: ${(props) => {
    if (['FULLWIDTH', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    return 'fit-content';
  }};
  height: ${(props) => {
    if (['FULLHEIGHT', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    return 'fit-content';
  }};
  display: flex;
  flex-direction: column;
  ${(props) => props.scroll && 'flex: 1 1 auto; overflow-y: auto'};
`;

export default Wrapper;
