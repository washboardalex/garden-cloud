import React, { ReactNode } from 'react';
import { fEmptyVoid, fEmptyReturn, fArgVoid, fArgReturn } from '../../types/utils/FunctionTypes';

import './custom-button.styles.scss';


interface ICustomButtonProps {
    children: ReactNode,
    type?:  'submit' | 'reset' | 'button',
    onClick?: fEmptyVoid | fEmptyReturn | fArgVoid | fArgReturn,
    inverted?: boolean,
    alignment?: 'flex-start' | 'flex-end' | 'center'
}

const CustomButton : React.FC<ICustomButtonProps> = ({ children, type, onClick, inverted, alignment } ) => (
    <div style={{display: 'flex', justifyContent: alignment ? alignment : 'center'}}>
        <button 
            type={type} 
            className={`${inverted ? 'inverted' : '' } custom-button`} 
            onClick={onClick ? onClick : undefined} 
        >
            { children }
        </button>
    </div>
);

export default CustomButton;
