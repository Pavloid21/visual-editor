import styled from 'styled-components';

export const CustomSvgStyled = styled.div<{fill: string}>`
  & svg {
    & path {
        fill: ${(props) => props.fill || 'black'};
    }
  }
`;
