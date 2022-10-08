import {AlignmentValues} from './alignment';

export * from './alignment';
export * from './shape';
export * from './shadow';
export * from './size';

export const textAlignment = {
  type: 'select',
  name: 'Text alignment',
  options: [
    {label: 'Center', value: AlignmentValues.Center},
    {label: 'Left', value: AlignmentValues.Left},
    {label: 'Right', value: AlignmentValues.Right},
  ],
};

export const padding = {
  top: {
    type: 'number',
    name: 'Top',
  },
  bottom: {
    type: 'number',
    name: 'Bottom',
  },
  left: {
    type: 'number',
    name: 'Left',
  },
  right: {
    type: 'number',
    name: 'Right',
  },
};

export const fontWeight = {
  type: 'select',
  name: 'Font weight',
  options: [
    {label: 'Ultralight', value: 'ULTRALIGHT'},
    {label: 'Thin', value: 'THIN'},
    {label: 'Light', value: 'LIGHT'},
    {label: 'Regular', value: 'REGULAR'},
    {label: 'Medium', value: 'MEDIUM'},
    {label: 'Semibold', value: 'SEMIBOLD'},
    {label: 'Bold', value: 'BOLD'},
    {label: 'Heavy', value: 'HEAVY'},
    {label: 'Black', value: 'BLACK'},
  ],
};

export const borderColor = {type: 'color', name: 'Border color'};

export const borderWidth = {type: 'number', name: 'Border width'};

export const size = {
  height: {
    type: 'units',
    name: 'Height',
    options: [
      {label: 'px', value: 'px'},
      {label: '%', value: '%'},
    ],
  },
  width: {
    type: 'units',
    name: 'Width',
    options: [
      {label: 'px', value: 'px'},
      {label: '%', value: '%'},
    ],
  },
};

export const sizeModifier = {
  type: 'select',
  name: 'Size modifier',
  options: [
    {label: 'Full width', value: 'FULLWIDTH'},
    {label: 'Full height', value: 'FULLHEIGHT'},
    {label: 'Full size', value: 'FULLSIZE'},
  ],
};
export const startPage = {type: 'number', name: 'startPage'};
export const pageSize = {type: 'number', name: 'pageSize'};
export const backgroundColor = {type: 'color', name: 'Background color'};
export const text = {type: 'string', name: 'Text'};
export const fontSize = {type: 'number', name: 'Font size'};
export const textColor = {type: 'color', name: 'Text color'};
export const buttonTextPadding = {
  top: {type: 'number', name: 'Text padding top'},
  right: {type: 'number', name: 'Text padding right'},
  bottom: {type: 'number', name: 'Text padding bottom'},
  left: {type: 'number', name: 'Text padding left'},
};
export const buttonImagePadding = {
  top: {type: 'number', name: 'Image padding top'},
  right: {type: 'number', name: 'Image padding right'},
  bottom: {type: 'number', name: 'Image padding bottom'},
  left: {type: 'number', name: 'Image padding left'},
};
export const imageUrl = {type: 'string', name: 'image Url'};
export const distribution = {
  type: 'select',
  name: 'Distribution',
  options: [{label: 'Space between', value: 'SPACEBETWEEN'}],
};
export const spacing = {
  type: 'number',
  name: 'Spacing',
};
export const corners = {
  topLeftRadius: {
    type: 'number',
    name: 'Top left radius',
  },
  topRightRadius: {
    type: 'number',
    name: 'Top right radius',
  },
  bottomLeftRadius: {
    type: 'number',
    name: 'Bottom left radius',
  },
  bottomRightRadius: {
    type: 'number',
    name: 'Bottom right radius',
  },
};
export const interactive = {
  action: {
    url: {
      type: 'select',
      name: 'Action URL',
      action_types: 'actions,screens'
    },
    method: {
      type: 'select',
      name: 'Method',
      options: [
        {label: 'Get', value: 'get'},
        {label: 'Post', value: 'post'},
      ],
    },
    clearAppSettings: {
      type: 'select',
      name: 'Logout',
      options: [
        {label: 'True', value: true},
        {label: 'False', value: false},
      ],
    },
    triggresBottomSheet: {
      type: 'select',
      name: 'Open bottom sheet',
      options: [
        {label: 'True', value: true},
        {label: 'False', value: false},
      ],
    },
    closeBottomSheet: {
      type: 'select',
      name: 'Close bottom sheet',
      options: [
        {label: 'True', value: true},
        {label: 'False', value: false},
      ],
    },
    confirmationDialog: {
      title: {
        type: 'string',
        name: 'Title'
      },
      message: {
        type: 'string',
        name: 'Message'
      },
      confirmText: {
        type: 'string',
        name: 'Confirm text'
      },
      cancelledText: {
        type: 'string',
        name: 'Cancelled text'
      },
    },
    callEmailMessengersHolder: {
      phoneNumber: {
        type: 'string',
        name: 'Phone number'
      },
      emailAddress: {
        type: 'string',
        name: 'Email address'
      },
      packageName: {
        type: 'string',
        name: 'Package name'
      },
      urlApiMessenger: {
        type: 'string',
        name: 'Api messenger'
      },
    },
  },
};
export const dataSourceSettings = {
  dataSource: {
    type: 'select',
    name: 'Data source',
    action_types: 'data'
  },
  startPage: {
    type: 'number', 
    name: 'Start page'
  },
  pageSize: {
    type: 'number', 
    name: 'Page size'
  },
};
export const metricStyle = {
  type: 'select',
  name: 'Metric style',
  options: [
    {label: 'Points and items in', value: 'pointsAndItemsIn'},
    {label: 'Points', value: 'points'},
    {label: 'Items in and proportional', value: 'itemsInAndProportional'},
    {label: 'Items in', value: 'itemsIn'},
  ],
};
export const elevation = {type: 'number', name: 'Elevation'};
export const placeholder = {type: 'string', name: 'Placeholder'};
export const placeholderColor = {type: 'color', name: 'Placeholder color'};
export const thumbOnColor = {type: 'color', name: 'Thumb on color'};
export const isActive = {type: 'boolean', name: 'isActive'};
export const action = {
  url: {type: 'string', name: 'URL'},
};
export const scroll = {
  type: 'select',
  name: 'Scroll',
  options: [
    {label: 'Enable scroll', value: true},
    {label: 'Disable scroll', value: false},
  ],
};

export const systemCalendar = {
  systemDialog: {
    type: 'select',
    name: 'System dialog',
    options: [
      {label: 'Wheel calendar with time', value: 'WHEEL_CALENDAR_WITH_SELECTING_TIME '},
      {label: 'Calendar with time', value: 'CALENDAR_WITH_SELECTING_TIME '},
      {label: 'Calendar', value: 'CALENDAR'},
      {label: 'Wheel calendar', value: 'WHEEL_CALENDAR'},
    ]
  },
  timeFormat: {
    type: 'select',
    name: 'Time format',
    options: [
      {label: 'DD.MM.YYYY', value: 'DD.MM.YYYY'},
      {label: 'DD-MM-YYYY', value: 'DD-MM-YYYY'},
      {label: 'DD/MM/YYYY', value: 'DD/MM/YYYY'},
      {label: 'DD.MM.YYYY HH:mm', value: 'DD.MM.YYYY HH:mm'},
      {label: 'DD-MM-YYYY HH:mm', value: 'DD-MM-YYYY HH:mm'},
      {label: 'DD/MM/YYYY HH:mm', value: 'DD/MM/YYYY HH:mm'},
    ]
  }
};

export const iconSelectedColor = {
  type: 'color',
    name: 'Icon selected color',
};
export const iconUnselectedColor = {
  type: 'color',
    name: 'Icon unselected color',
};
export const textSelectedColor = {
  type: 'color',
    name: 'Text selected color',
};
export const textUnselectedColor = {
  type: 'color',
    name: 'Text unselected color',
};
export const showUnselectedText = {
  type: 'select',
  name: 'Show unselected text',
  options: [
    {label: 'True', value: true},
    {label: 'False', value: false},
  ],
};
