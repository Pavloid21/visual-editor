import React from 'react';
import {ButtonSelector} from '../../components';
import {buttons} from './consts'

interface IMobileSelect {
  editorMode: string;
}

const MobileSelect = (props: IMobileSelect) => {
  const {editorMode} = props;
  return (
    <ButtonSelector
        buttons={buttons}
        value={editorMode}
        onChange={() => null}
        
    />
  );
};

export default MobileSelect;
