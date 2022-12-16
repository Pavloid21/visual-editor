import styled from 'styled-components';
import {transformHexWeb} from 'utils/color';

const Wrapper = styled.div<{
  backgroundColor: string;
  styled: any;
}>`
  position: absolute;
  width: 428px;
  height: 836px;
  border-radius: 37px;
  border: 1px solid #000;
  overflow: hidden;
  padding: 56px 26px 0;
  ${(props) => {
    return props.styled;
  }}
`;

const AlignCenterButton = styled.div`
  position: absolute;
  right: 16px;
  bottom: 25px;
  background-color: #fff;
  padding: 20px;
  border-radius: 50px;
  border: 1px solid var(--neo-gray);
  cursor: pointer;
`;

const BottomSheetContainer = styled.div<{
  backgroundColor: string,
  heightTop?: string,
  heightInPercent: string,
}>`
  height: 100%;
  display: flex;
  flex-direction: column;

  & .top-block {
    background-color: ${(props) => transformHexWeb(props.backgroundColor || '#FFFFFF')};
    height: ${(props) => (props.heightTop || '100%')};
  }

  & .bottom-sheet {
    width: 100%;
    margin-top: auto;
    height: ${(props) => (props.heightInPercent || '100%')};
  }
`;

export {
  Wrapper,
  AlignCenterButton,
  BottomSheetContainer
};
