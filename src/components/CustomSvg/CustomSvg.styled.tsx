import styled from 'styled-components';

export const CustomSvgStyled = styled.div<{
  fill: string,
  width?: string,
  height?: string
}>`
  & svg {
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    
    & path {
        fill: ${(props) => props.fill || ''};
    }
  }
`;
