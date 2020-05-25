import React from 'react';

import IGardenBed from '../../types/models/IGardenBed';

import './garden-bed.styles.scss';

interface IRecievedProps extends IGardenBed {
    referenceDimension: string,
    index: number,
    scaleFactor: number
};

const GardenBed : React.FC<IRecievedProps> = ({ widthMetres, lengthMetres, scaleFactor, positionTop, positionLeft, referenceDimension, id, index }) => {
    
    let widthCSS = widthMetres * scaleFactor;
    let lengthCSS = lengthMetres * scaleFactor;

    return (
        <div 
            style={{
                border:'1px solid black', 
                width: widthCSS.toString().concat(`${referenceDimension}`), 
                height: lengthCSS.toString().concat(`${referenceDimension}`), 
                top:positionTop.toString().concat(`${referenceDimension}`), 
                left:positionLeft.toString().concat(`${referenceDimension}`), 
                position:'absolute'
            }} 
            key={index}
        >
            {`It's garden bed ${id}`}
        </div>
    );

}
export default GardenBed;



