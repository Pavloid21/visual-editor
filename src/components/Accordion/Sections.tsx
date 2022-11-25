import React, {FC, useState} from 'react';
import {ReactComponent as ArrowUp} from 'assets/left-sidebar-images/arrow-up.svg';
import {ReactComponent as ArrowDown} from 'assets/left-sidebar-images/arrow-down.svg';
import {SectionsType} from './types';

const Sections: FC<SectionsType> = ({itemTabs}) => {
    const [isActive, setIsActive] = useState(false);

    const styleContent = isActive ? 'contentWrapper' + ' ' + 'showcontentWrapper' : 'contentWrapper';

    return (
        <div>
            <div className="accordionTitle" onClick={() => setIsActive(!isActive)}>
                <div className="arrowList">{isActive ? <ArrowUp /> : <ArrowDown />}</div>
                <div>{itemTabs.title}</div>
            </div>
            <div className={styleContent}>
                <div className="accordionContent">
                  {itemTabs.content}
                </div>
            </div>
        </div>
    );
};

export default Sections;
