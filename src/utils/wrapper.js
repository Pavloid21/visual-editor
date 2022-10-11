import styled from 'styled-components';
import {getSizeStyle} from 'views/utils/styles/size';
import {useSelector} from 'react-redux';
import {blockStateUnsafeSelector} from 'store/selectors';

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 4px;
  border: 1px dashed var(--main-color);
  width: ${(props) => getSizeStyle('width', props)};
  height: ${(props) => getSizeStyle('height', props)};
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
