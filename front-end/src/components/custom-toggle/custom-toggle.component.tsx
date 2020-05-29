import React from 'react';
import './custom-toggle.styles.scss';
import { fArgVoid } from '../../types/utils/FunctionTypes';

interface IProps {
    onClick: fArgVoid
}

export const CustomToggle : React.FC<IProps> = ({onClick}) => {

    return (
        <label className="switch">
            <input type="checkbox" onClick={onClick}/>
            <span className="slider"></span>
        </label>
    );

}

export default CustomToggle;
