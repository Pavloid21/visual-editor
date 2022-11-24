export type IconTabType = {
  name: string,
  tabsType: string,
  url: string
}

export type IconSectionsProps = {
  sections: IconTabType[]
}

export type IconTabObjectType = {
  [key: string]: IconTabType[]
}
