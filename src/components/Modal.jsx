import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  align-items: center;
`;

const ModalBackground = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.15);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalContent = styled.div`
  margin: 0 auto;
  max-height: calc(100vh - 40px);
  width: 640px;
  overflow: auto;
  position: relative;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const Title = styled.div``;

const CustomModal = ({ isActive, children, title, handleClose }) => {
  return (
    <Modal isActive={isActive}>
      <ModalBackground onClick={handleClose} />
      <ModalContent
        style={{
          backgroundColor: "white",
          padding: "2rem",
          maxWidth: "100vw",
          width: "60%",
          maxHeight: "800px",
        }}
      >
        <Title isSize={6}>{title}</Title>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
