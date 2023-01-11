import Sections from './Sections';
import React from 'react';
import {Container} from './Accordion.styled';
import {AccordionProps, AccordionTab} from './types';

export const Accordion = ({tabs}: AccordionProps) => {
    return (
      <Container>
        {tabs.map((item: AccordionTab, i: number) => <Sections key={i} itemTabs={item} />)}
      </Container>
    );
};
