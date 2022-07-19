import React, {Dispatch, useState, useRef, useEffect} from 'react';
import {SortEvent, SortEventWithTag} from 'react-sortable-hoc';

export const useModal = (
  initialMode = false
): [modalOpen: boolean, setModalOpen: Dispatch<React.SetStateAction<boolean>>, toggle: () => void] => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};

export const useOutside = (initialIsVisible: boolean, canSelfOpen?: boolean) => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (evt: MouseEvent) => {
    //@ts-ignore
    if (ref.current && !ref.current.contains(evt.target)) {
      setIsShow(false);
    } else if (canSelfOpen) {
      setIsShow(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return {ref, isShow, setIsShow};
};

export const onSortMove = (event: SortEvent | SortEventWithTag): boolean => {
  return event.altKey;
};

export const useOutsideAlerter = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
