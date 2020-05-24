import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectIsGardenCreated, selectGardenFetchState } from '../../redux/garden/garden.selectors';
import { AppState } from '../../redux/root-reducer';

import GardenCreator from '../../components/garden-creator/garden-creator.component';
import Garden from '../../components/garden/garden.component';

import './gardenpage.styles.scss';
import { Dispatch, AnyAction } from 'redux';
import { selectUserId } from '../../redux/user/user.selectors';
import { readGarden } from '../../redux/garden/garden.actions';
import { fArgReturn } from '../../types/utils/FunctionTypes';
import FetchState from '../../types/utils/FetchState';


interface IReduxStateProps {
    isGardenCreated: boolean,
    fetchState: FetchState,
    userId: number
}

interface IDispatchProps {
    readGarden: fArgReturn
}

type GardenPageProps = IReduxStateProps & IDispatchProps;

class GardenPage extends React.Component<GardenPageProps> {

    componentDidMount() {
        const {isGardenCreated, fetchState, userId, readGarden} = this.props; 

        console.log(isGardenCreated, fetchState, userId);

        if (!isGardenCreated && fetchState === 'notFetched') {
            console.log('here we are')
            readGarden(userId)
        }
            
    }

    render() {
        return (
            this.props.isGardenCreated 
                ? <Garden /> 
                : <GardenCreator />
        )
    }
} 
 
const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    isGardenCreated: selectIsGardenCreated,
    fetchState: selectGardenFetchState,
    userId: selectUserId 
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    readGarden: (userId : number) => dispatch<any>(readGarden(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GardenPage);
