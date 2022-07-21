import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ReactComponent as Copy} from '../../assets/sm_copy.svg';
import {ReactComponent as Remove} from '../../assets/close-c.svg';
import actionTypes from '../../constants/actionTypes';
import {Store} from 'reducers/types';
import {TPosition} from './types';
import {Wrapper} from './HighlightedElement.styled';

const HighlightedElement: React.FC<any> = () => {
  const selectedBlock = useSelector((state: Store) => state.layout.selectedBlockUuid);
  const uiMode = useSelector((state: Store) => state.editorMode.mode);
  const dispatch = useDispatch();
  const [position, setPosition] = useState<TPosition>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedBlock) {
      const element = document.getElementById(selectedBlock);
      if (element) {
        const clone = element.cloneNode(true);
        const rect = element.getBoundingClientRect();
        setPosition({
          width: rect.width,
          // height: rect.height,
          left: rect.left,
          top: rect.top,
        });
        ref!.current!.innerHTML = '';
        ref!.current!.appendChild(clone);
      }
    }
  }, [selectedBlock]);

  if (!selectedBlock || uiMode !== 'editor') {
    return null;
  }

  const handleRemove: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    dispatch({
      type: actionTypes.DELETE_BLOCK,
      blockUuid: selectedBlock,
    });
  };

  const handleClone: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    dispatch({
      type: actionTypes.CLONE_BLOCK,
      blockUuid: selectedBlock,
    });
  };

  const {width, height, left, top} = position;

  return (
    <Wrapper width={width} height={height} left={left} top={top}>
      <div className="options">
        <div>
          <Copy className="icon" onClick={handleClone} />
          <Remove className="icon" onClick={handleRemove} />
        </div>
      </div>
      <div ref={ref} style={{visibility: 'hidden'}}></div>
    </Wrapper>
  );
};

export default HighlightedElement;
