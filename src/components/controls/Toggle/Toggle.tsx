import {Container} from './Toggle.styled';
import React, {ChangeEventHandler} from 'react';

type ToggleProps = {
  value: boolean | undefined,
  onChange: ChangeEventHandler<HTMLInputElement>
};

export const Toggle = ({value, onChange}: ToggleProps) => {
    const classOn = !value ? 'onbtn noVisible' :  'onbtn';
    const classOf = value ? 'ofbtn noVisible' :  'ofbtn';

    return (
        <div>
            <Container>
                <div className='toggle'>
                  <input type="checkbox" onChange={onChange} checked={value} />

                    <label htmlFor="" className={classOn}>ON</label>
                    <label htmlFor="" className={classOf}>OFF</label>
                </div>
            </Container>
        </div>
    );
};
