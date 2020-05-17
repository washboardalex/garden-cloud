import React from 'react';
import { selectGardenDimensions, selectGardenBeds } from '../../redux/garden/garden.selectors';
import {connect} from 'react-redux';
import IGardenBed from '../../types/models/IGardenBed';
import { AppState } from '../../redux/root-reducer';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { createBed } from '../../redux/garden/garden.actions';
import IActionWithPayload from '../../types/utils/IActionWithPayload';
import { fArgReturn } from '../../types/utils/FunctionTypes';

import NewBed from '../new-bed/new-bed.component';
import GardenBed from '../garden-bed/garden-bed.component';

import './garden.styles.scss';


/*
Interfaces for local and app state
*/ 
interface ILocalState {
    referenceDimension: string,
    isNewBedInCreation: boolean,
    widthCSSProp: string,
    lengthCSSProp: string
}

interface IGardenDimensions {
    length: number,
    width: number
}

interface IReduxStateProps {
    dimensions: IGardenDimensions,
    beds: Array<IGardenBed>
}

interface IDispatchProps {
    createBed: fArgReturn
}

type GardenProps = IReduxStateProps & IDispatchProps;

/* 
Interfaces for function return data
*/

interface IReferenceDimensionObject {
    length: number,
    width: number,
    referenceDimension: string
}

class Garden extends React.Component<GardenProps, ILocalState> {
    state : ILocalState = {
        isNewBedInCreation: false,
        widthCSSProp: '',
        lengthCSSProp: '',
        referenceDimension: ''
    }

    componentDidMount() {
        this.renderGarden();
        window.addEventListener('resize', this.resizeGardenToWindow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeGardenToWindow);
    }

    /* 
    Maximises the size of the garden div relative to window size for a given length and width
    of the garden.
    Sets final values as vh or vw values
    
    This function needs to be highly optimised - go back to it if need be until satisfied
    */
    checkReferenceDimension = () : IReferenceDimensionObject => {
        let { length, width } = this.props.dimensions;
        const { innerHeight, innerWidth } = window;
        let referenceDimension : string;

        if ( width > length ) {
            length/width*0.9*innerWidth > innerHeight ? 
            [referenceDimension, length, width] = ['vh', 90, width/length*90] : 
            [referenceDimension, length, width] = ['vw', length/width*90, 90]; 
        } else {
            width/length*0.9*innerHeight > innerWidth ? 
            [referenceDimension, length, width] = ['vw', length/width*90, 90] : 
            [referenceDimension, length, width] = ['vh', 90, width/length*90];
        }

        return { length, width, referenceDimension };
    }

    renderGarden = () => {
        //box will be scaled to 90% view width or height. Reference (vw or vh) depends on ensuring no overflow. All done in checkReferenceDimension() function. 
        //I'll leave you to figure out the boolean logic involved, it's quite straightforward
        let {length, width, referenceDimension} = this.checkReferenceDimension();
        this.setState({ 
            lengthCSSProp: length.toString(), 
            widthCSSProp: width.toString(), 
            referenceDimension
        });
    }

    resizeGardenToWindow = () => {
        let { referenceDimension } = this.checkReferenceDimension();
        this.setState(prevState => ({ referenceDimension }));
    }

    createBed = (div : any) => {
        //changes bed height from pixel to vw/vh terms, also will be resized on window resize
        const [element, parent, garden] = [document.querySelector(div), document.querySelector(div).offsetParent, document.getElementById('garden')!] ;

        console.log(element);
        console.log(parent);
        console.log(garden);

        let [bedWidth, bedLength]  = [element.offsetWidth, element.offsetHeight]; 

        console.log(bedWidth, bedLength, ', measured in pixels')

        let [top, left] =  [element.getBoundingClientRect().top-parent.getBoundingClientRect().top, element.getBoundingClientRect().left-parent.getBoundingClientRect().left];

        console.log(top, left, 'pix')

        const [gardenPixWidth, gardenPixLength]  = [garden.offsetWidth, garden.offsetHeight];
        const [gardenRatioWidth, gardenRatioLength] = [parseFloat(this.state.widthCSSProp), parseFloat(this.state.lengthCSSProp)];

        [bedWidth, bedLength] = [bedWidth/gardenPixWidth*gardenRatioWidth, bedLength/gardenPixLength*gardenRatioLength];
        [top, left] = [top/gardenPixLength*gardenRatioLength, left/gardenPixWidth*gardenRatioWidth];
 
        let newBed = {
            id: 1, 
            length: bedLength, 
            width: bedWidth, 
            positionTop: top, 
            positionLeft: left
        };
        console.log('newbed after', newBed)

        this.setState({
            isNewBedInCreation: !this.state.isNewBedInCreation, 
        });

        this.props.createBed(newBed);
    }

    render() {
        const { beds } : IReduxStateProps = this.props;
        const { referenceDimension, isNewBedInCreation, lengthCSSProp, widthCSSProp } : ILocalState = this.state;

        return (
            <div id="garden-wrapper" >
                {isNewBedInCreation 
                    ?   <button id="confirm-placement" onClick={() => this.createBed('.resizable')}>Confirm Placement</button>
                    :   <button 
                            id="add-bed" 
                            value="inCreation" 
                            onClick={() => this.setState({ isNewBedInCreation: !isNewBedInCreation })}
                        >
                            Add Bed
                        </button>
                }
                
                <div 
                    id="garden" 
                    style={{
                        width:`${widthCSSProp}${referenceDimension}`, 
                        height:`${lengthCSSProp}${referenceDimension}`
                    }} 
                >
                    <div 
                        id="buffer-for-click-drag" 
                        style={{
                            marginLeft:`1${referenceDimension}`, 
                            marginTop:`1${referenceDimension}`, 
                            marginRight: `1${referenceDimension}`, 
                            marginBottom:`1.5${referenceDimension}`
                        }}
                    > 
                        {beds.map((bed, i) => <GardenBed index={i} referenceDimension={referenceDimension} {...bed} />)}
                        {isNewBedInCreation && <NewBed /> }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    dimensions: selectGardenDimensions,
    beds: selectGardenBeds
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    createBed: (newBed : IGardenBed) : IActionWithPayload => dispatch(createBed(newBed))
});

export default connect(mapStateToProps, mapDispatchToProps)(Garden);