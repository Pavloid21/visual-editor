import {IconSection} from './IconSection';
import styled from 'styled-components';
import {IconSectionsProps, IconTabType} from 'components/Images/types';
import {useAppSelector} from 'store';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const IconSections = ({sections}: IconSectionsProps) => {
  const iconNameFilter = useAppSelector((state) => state.leftBarMenu.iconNameFilter);
  const regex = new RegExp(iconNameFilter, 'gi');
  const filterSections = sections.filter((item: IconTabType) => item.name.match(regex));

  return(
    <Container>
      {filterSections.map((item: IconTabType, i: number) => <IconSection key={i} name={item.name} url={item.url} />)}
    </Container>
  );
};
