export type IconTabType = {
  name: string,
  dir: string,
  url: string,
  file: string
}

export type IconSectionsProps = {
  sections: IconTabType[],
  projectId?: string | undefined,
  folderName?: string | undefined
}

export type IconTabObjectType = {
  [key: string]: IconTabType[]
}

export type ImageDataType = {
  lastModified: string,
  name: string,
  size: number,
  type: string
}

export type IconDataObjectType = {
  [key: string]: string[]
}
