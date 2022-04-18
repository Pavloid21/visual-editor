import React, {Dispatch, useState} from 'react';

export const useModal = (
  initialMode: boolean = false
): [modalOpen: boolean, setModalOpen: Dispatch<React.SetStateAction<boolean>>, toggle: () => void] => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};
