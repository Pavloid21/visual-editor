import styles from './Accordion.module.scss';
import Sections from './Sections';
import React, {FC} from 'react';

const Accordion: FC<any> = ({tabs}) => {
    return (
        <>
            <div className={styles.accordion}>
              {tabs.map((item: any, i: number) => <Sections key={i} itemTabs={item} />)}
            </div>
        </>
    );
};

export default Accordion;
