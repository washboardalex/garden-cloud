import React from 'react';

import IGardenBed from '../../types/models/IGardenBed';

import './garden-bed.styles.scss';

interface IRecievedProps extends IGardenBed {
    referenceDimension: string,
    index: number
};

const GardenBed : React.FC<IRecievedProps> = ({ width, length, positionTop, positionLeft, referenceDimension, id, index }) => (
    <div 
        style={{
            border:'1px solid black', 
            width: width.toString().concat(`${referenceDimension}`), 
            height: length.toString().concat(`${referenceDimension}`), 
            top:positionTop.toString().concat(`${referenceDimension}`), 
            left:positionLeft.toString().concat(`${referenceDimension}`), 
            position:'absolute'
        }} 
        key={index}
    >
        {`It's garden bed ${id}`}
    </div>
);


export default GardenBed;



