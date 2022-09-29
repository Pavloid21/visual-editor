import React, {ReactNode} from 'react';

export type TSortableList = {
  backgroundColor: string;
  drop: React.Ref<any>;
  list: ReactNode[];
};
