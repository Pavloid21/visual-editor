import {Container} from './Toggle.styled';

export const Toggle = ({value, onChange}: {value: boolean, onChange: any}) => {
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
