import styles from './Toggle.module.scss';

export const Toggle = ({value, onChange}: {value: boolean, onChange: any}) => {
    const classOn = !value ? styles.onbtn + ' ' + styles.noVisible :  styles.onbtn;
    const classOf = value ? styles.ofbtn + ' ' + styles.noVisible :  styles.ofbtn;

    return (
        <div>
            <div className={styles.toggleBox}>
                <div className={styles.toggle}>
                    <input type="checkbox" onChange={onChange} checked={value} />
                    <label htmlFor="" className={classOn}>ON</label>
                    <label htmlFor="" className={classOf}>OFF</label>
                </div>
            </div>
        </div>
    );
};
