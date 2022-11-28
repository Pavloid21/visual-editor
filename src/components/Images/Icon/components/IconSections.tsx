import {IconSection} from './IconSection';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {IconSectionsProps, IconTabType} from 'components/Images/types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const IconSections = ({sections}: IconSectionsProps) => {
  const iconNameFilter = useSelector((state: RootStore) => state.leftBarMenu.iconNameFilter);
  const regex = new RegExp(iconNameFilter, 'gi');
  const filterSections = sections.filter((item: IconTabType) => item.name.match(regex));

  return(
    <Container>
      {filterSections.map((item: IconTabType, i: number) => <IconSection key={i} name={item.name} url={item.url} />)}
    </Container>
  );
};
