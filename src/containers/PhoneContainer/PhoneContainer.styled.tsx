import styled from 'styled-components';

export const BottomSheetContainer = styled.div<{
  backgroundColor: string,
  heightTop?: string
  heightInPercent: string,
}>`
  height: 100%;
  display: flex;
  flex-direction: column;

  & .top-block {
    background-color: ${(props) => props.backgroundColor || '#FFFFFF'};
    height: ${(props) => (props.heightTop || '100%')};
  }

  & .bottom-sheet {
    width: 100%;
    margin-top: auto;
    height: ${(props) => (props.heightInPercent || '100%')};
  }
`;
