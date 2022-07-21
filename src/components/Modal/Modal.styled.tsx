import styled from 'styled-components';

export const Modal = styled.div<{isActive: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  align-items: center;
  z-index: 1;
`;

export const ModalBackground = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.15);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const ModalContent = styled.div`
  margin: 0 auto;
  max-height: calc(100vh - 40px);
  width: 640px;
  overflow: auto;
  position: relative;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 2;
`;

export const Title = styled.div<{isSize: number}>``;
