import {FC} from 'react';
import {ImageSection} from './ImageSection';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ImageSections: FC<any> = ({sections}) => {

  return(
    <Container>
      {sections.map((item: any, i: number) => <ImageSection key={i} name={item.name} url={item.url} />)}
    </Container>
  );
};
