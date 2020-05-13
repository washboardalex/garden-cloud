import React, { ChangeEvent } from 'react';


import './form-input.styles.scss';

interface IFormProps {
    name: string,
    type: string,
    value: string,
    label?: string,
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}

const FormInput: React.FC<IFormProps> = ({handleChange, name, label, value, type, required}) => (
    <div className='group'>
        <input className='form-input' name={name} onChange={handleChange} type={type} required={required} />
        {
            label 
            ?
            (<label className={`${value.length ? 'shrink' : ''} form-input-label`}>{ label }</label>)
            : 
            null
        }
    </div>
);

export default FormInput;