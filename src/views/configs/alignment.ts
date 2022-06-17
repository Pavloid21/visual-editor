export enum AlignmentValues {
  Center = 'CENTER',
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP',
  Bottom = 'BOTTOM'
}

const alignmentCommonConfig = {
  type: 'select',
  name: 'Alignment'
};

export const alignmentConfig = {
  horizontally: {
    ...alignmentCommonConfig,
    options: [
      {label: 'Center', value: AlignmentValues.Center},
      {label: 'Left', value: AlignmentValues.Left},
      {label: 'Right', value: AlignmentValues.Right}
    ]
  },
  vertically: {
    ...alignmentCommonConfig,
    options: [
      {label: 'Center', value: AlignmentValues.Center},
      {label: 'Top', value: AlignmentValues.Top},
      {label: 'Bottom', value: AlignmentValues.Bottom}
    ]
  },
  both: {
    ...alignmentCommonConfig,
    options: [
      {label: 'Center', value: AlignmentValues.Center},
      {label: 'Left', value: AlignmentValues.Left},
      {label: 'Right', value: AlignmentValues.Right},
      {label: 'Top', value: AlignmentValues.Top},
      {label: 'Bottom', value: AlignmentValues.Bottom},
    ]
  }
};
