import styled from 'styled-components';
import {getSizeStyle} from 'views/utils/styles/size';
import {useSelector} from 'react-redux';
import {blockStateUnsafeSelector} from 'store/selectors';

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0;
  border-radius: 4px;
  outline: 1px dashed var(--main-color);
  width: ${(props) => {
    if (props.isRoot || ['FULLWIDTH', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    return getSizeStyle('width', props);
  }};
  height: ${(props) => {
    if (props.isRoot || ['FULLHEIGHT', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    return getSizeStyle('height', props);
  }};
  align-items: inherit;
  display: flex;
  flex-direction: column;
  ${(props) => props.scroll && 'flex: 1 1 auto; overflow-y: auto'};
`;

const WrapperContainer = (props) => {
  const blockState = useSelector(blockStateUnsafeSelector);
  return (<Wrapper {...props} blockState={blockState}/>);
};

export default WrapperContainer;
