export type AccordionTab = {
  title: string,
  content: JSX.Element
}

export type AccordionProps = {
  tabs: AccordionTab[];
}

export type SectionsType = {
  itemTabs: AccordionTab;
}
