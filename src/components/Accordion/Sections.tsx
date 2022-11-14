import React, {FC, useState} from 'react';
import styles from './Accordion.module.scss';
import {ReactComponent as ArrowUp} from 'assets/left-sidebar-images/arrow-up.svg';
import {ReactComponent as ArrowDown} from 'assets/left-sidebar-images/arrow-down.svg';

const Sections: FC<any> = ({itemTabs}) => {
    const [isActive, setIsActive] = useState(false);

    const styleContent = isActive ? styles.contentWrapper + ' ' + styles.showcontentWrapper : styles.contentWrapper;

    return (
        <div>
            <div className={styles.accordionTitle} onClick={() => setIsActive(!isActive)}>
                <div className={styles.arrowList}>{isActive ? <ArrowUp /> : <ArrowDown />}</div>
                <div>{itemTabs.title}</div>
            </div>
            <div className={styleContent}>
                <div className={styles.accordionContent}>
                  {itemTabs.content}
                </div>
            </div>
        </div>
    );
};

export default Sections;
