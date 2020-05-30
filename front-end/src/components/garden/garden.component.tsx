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
import IGardenDimensions from '../../types/models/IGardenDimensions';

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
    lengthCSSProp: string,
    scaleFactor: number 
}

interface IReduxStateProps {
    beds: Array<IGardenBed>,
    dimensions: IGardenDimensions,
}

interface IDispatchProps {
    createBed: fArgReturn
}

type GardenProps = IReduxStateProps & IDispatchProps;

/* 
Interfaces for function return data
*/

interface IReferenceDimensionObject {
    lengthCSS: number,
    widthCSS: number,
    referenceDimension: string
}

class Garden extends React.Component<GardenProps, ILocalState> {
    state : ILocalState = {
        isNewBedInCreation: false,
        widthCSSProp: '',
        lengthCSSProp: '',
        referenceDimension: '',
        scaleFactor: 0
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
        let { lengthMetres, widthMetres } = this.props.dimensions;
        const { innerHeight, innerWidth } = window;
        let referenceDimension : string;
        let lengthCSS : number;
        let widthCSS : number;

        if ( widthMetres > lengthMetres ) {
            
            lengthMetres/widthMetres*0.9*innerWidth > innerHeight ? 
                [referenceDimension, lengthCSS, widthCSS] = ['vh', 90, widthMetres/lengthMetres*90] : 
                [referenceDimension, lengthCSS, widthCSS] = ['vw', lengthMetres/widthMetres*90, 90]; 
        } else {
            widthMetres/lengthMetres*0.9*innerHeight > innerWidth ? 
                [referenceDimension, lengthCSS, widthCSS] = ['vw', lengthMetres/widthMetres*90, 90] : 
                [referenceDimension, lengthCSS, widthCSS] = ['vh', 90, widthMetres/lengthMetres*90];
        }

        return { lengthCSS, widthCSS, referenceDimension };
    }

    renderGarden = () => {
        //box will be scaled to 90% view width or height. Reference (vw or vh) depends on ensuring no overflow. All done in checkReferenceDimension() function. 
        //I'll leave you to figure out the boolean logic involved, it's quite straightforward
        let {lengthCSS, widthCSS, referenceDimension} = this.checkReferenceDimension();
        let { lengthMetres } = this.props.dimensions;

        const scaleFactor = lengthCSS / lengthMetres;

        this.setState({ 
            lengthCSSProp: lengthCSS.toString(), 
            widthCSSProp: widthCSS.toString(), 
            referenceDimension,
            scaleFactor
        });
    }

    resizeGardenToWindow = () => {
        let { referenceDimension } = this.checkReferenceDimension();
        this.setState(prevState => ({ referenceDimension }));
    }

    createBed = (div : any) => {
        //changes bed height from pixel to vw/vh terms, also will be resized on window resize
        const [element, parent, garden] = [document.querySelector(div), document.querySelector(div).offsetParent, document.getElementById('garden')!] ;

        let [bedWidth, bedLength]  = [element.offsetWidth, element.offsetHeight]; 

        let [top, left] =  [element.getBoundingClientRect().top-parent.getBoundingClientRect().top, element.getBoundingClientRect().left-parent.getBoundingClientRect().left];

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

        this.setState({
            isNewBedInCreation: !this.state.isNewBedInCreation, 
        });

        this.props.createBed(newBed);
    }

    render() {
        const { beds } : IReduxStateProps = this.props;
        const { referenceDimension, isNewBedInCreation, lengthCSSProp, widthCSSProp, scaleFactor } : ILocalState = this.state;

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
                        {beds.map((bed, i) => 
                            <GardenBed 
                                index={i} 
                                scaleFactor={scaleFactor} 
                                referenceDimension={referenceDimension} 
                                {...bed} 
                            />)}
                        {isNewBedInCreation && <NewBed /> }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    beds: selectGardenBeds,
    dimensions: selectGardenDimensions,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    createBed: (newBed : IGardenBed) : IActionWithPayload => dispatch(createBed(newBed))
});

export default connect(mapStateToProps, mapDispatchToProps)(Garden);