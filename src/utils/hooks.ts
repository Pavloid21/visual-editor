import React, {Dispatch, useState, useRef, useEffect} from 'react';

export const useModal = (
  initialMode: boolean = false
): [modalOpen: boolean, setModalOpen: Dispatch<React.SetStateAction<boolean>>, toggle: () => void] => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};

export const useOutside = (initialIsVisible: boolean) => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (evt: MouseEvent) => {
    //@ts-ignore
    if (ref.current && !ref.current.contains(evt.target)) {
      setIsShow(false);
    } else {
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
