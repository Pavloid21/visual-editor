import React from 'react';
import {Modal, ModalBackground, ModalContent, Title} from './Modal.styled';

const CustomModal: React.FC<any> = ({isActive, children, handleClose, ...props}) => {
  return (
    <Modal isActive={isActive}>
      <ModalBackground onClick={handleClose} />
      <ModalContent
        style={{
          backgroundColor: 'white',
          maxWidth: '100vw',
          width: '60%',
          maxHeight: '800px',
          padding: props.padding,
          ...props.style,
        }}
      >
        {props.title && <Title isSize={6}>{props.title}</Title>}
        {children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
