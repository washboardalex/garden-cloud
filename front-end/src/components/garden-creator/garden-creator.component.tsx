import React, { ChangeEvent } from 'react';
import {  } from 'redux';
import { connect } from 'react-redux'
import { createGarden } from '../../redux/garden/garden.actions';
import './garden-creator.styles.scss';
import { Dispatch, AnyAction } from 'redux';
import { fArgReturn } from '../../types/utils/FunctionTypes';

interface ILocalState {
    gardenLength?: number,
    gardenWidth?: number
} 

interface IDispatchProps {
    createNewGarden: fArgReturn
}

class GardenCreator extends React.Component<IDispatchProps,ILocalState> {

    state : ILocalState = {
        gardenLength: undefined,
        gardenWidth: undefined
    }

    handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        const valNum = parseFloat(value);

        const stateUpdate = { [name]: valNum } as Pick<ILocalState, keyof ILocalState>
        console.log(stateUpdate)
        this.setState(stateUpdate)
    }

    validateAndDispatch = () => {
        const {gardenLength, gardenWidth} : ILocalState = this.state;

        if (this.state.gardenLength && this.state.gardenWidth)
            this.props.createNewGarden(gardenLength!, gardenWidth!)
    }

    render() {

        const { gardenLength, gardenWidth } : ILocalState = this.state;

        return (
            <div className='garden-creator-container' >
                <div>
                    Width: <input 
                                type="number"
                                name="gardenWidth" 
                                value={gardenWidth ? gardenWidth.toString() : ''} 
                                onChange={(e) => this.handleChange(e)} 
                                placeholder="0"
                            /> m x Length: 
                            <input
                                type="number" 
                                name="gardenLength"
                                value={gardenLength ? gardenLength.toString() : ''}
                                onChange={(e) => this.handleChange(e)} 
                                placeholder="0"
                            /> m
                    <button onClick={(e) => this.validateAndDispatch()}>Create Garden</button>
                </div>
            </div>
        );

    }   
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    createNewGarden: (length : string, width: string) => dispatch(createGarden(parseFloat(length), parseFloat(width)))
});

export default connect(null, mapDispatchToProps)(GardenCreator);