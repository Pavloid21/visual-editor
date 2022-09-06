import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 4px;
  border: 1px dashed var(--main-color);
  width: ${(props) => {
    if ((props.size?.widthInPercent !== undefined) || ['FULLWIDTH', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    if (props?.size?.width) {
      return props.size.width+'px';
    }
    if (props?.size?.widthInPercent) {
      return props.size.widthInPercent+'%';
    }
    return 'fit-content';
  }};
  height: ${(props) => {
    if ((props.size?.heightInPercent !== undefined) || ['FULLHEIGHT', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    if (props?.size?.height) {
      return props.size.height+'px';
    }
    if (props?.size?.heightInPercent) {
      return props.size.heightInPercent+'%';
    }
    return 'fit-content';
  }};
  display: flex;
  flex-direction: column;
  ${(props) => props.scroll && 'flex: 1 1 auto; overflow-y: auto'};
`;

export default Wrapper;
