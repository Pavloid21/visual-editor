import {FC} from 'react';
import {IconSection} from './IconSection';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootStore} from 'store/types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const IconSections: FC<any> = ({sections}) => {const iconNameFilter = useSelector((state: RootStore) => state.leftBarMenu.iconNameFilter);
  const regex = new RegExp(iconNameFilter, 'gi');
  const filterSections = sections.filter((item: any) => item.name.match(regex));

  return(
    <Container>
      {filterSections.map((item: any, i: number) => <IconSection key={i} name={item.name} url={item.url} />)}
    </Container>
  );
};
