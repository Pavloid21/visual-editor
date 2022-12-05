import {ImageSection} from './ImageSection';
import styled from 'styled-components';
import {IconSectionsProps} from 'components/Images/types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ImageSections = ({sections}: IconSectionsProps) => {

  return(
    <Container>
      {sections.map((item: any, i: number) => <ImageSection key={i} name={item.name} url={item.url} />)}
    </Container>
  );
};
