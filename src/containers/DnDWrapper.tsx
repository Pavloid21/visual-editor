import React, {useState, useEffect} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export const DndWrapper = (props: any) => {
  const [context, setContext] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContext(document.getElementById(props.id));
  }, [props.id]);

  return context ? (
    <DndProvider backend={HTML5Backend} key={1} options={{rootElement: context}}>
      {props.children}
    </DndProvider>
  ) : null;
};
