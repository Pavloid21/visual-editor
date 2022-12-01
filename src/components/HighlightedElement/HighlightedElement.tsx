import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as Copy} from '../../assets/sm_copy.svg';
import {ReactComponent as Remove} from '../../assets/close-c.svg';
import {Wrapper} from './HighlightedElement.styled';
import {cloneBlock, deleteBlock} from 'store/layout.slice';
import {useAppDispatch, useAppSelector} from 'store';

import type {TPosition} from './types';

const HighlightedElement: React.FC<any> = () => {
  const selectedBlock = useAppSelector((state) => state.layout.selectedBlockUuid);
  const uiMode = useAppSelector((state) => state.editorMode.mode);
  const dispatch = useAppDispatch();
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
    dispatch(deleteBlock(selectedBlock));
  };

  const handleClone: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    dispatch(cloneBlock(selectedBlock));
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
