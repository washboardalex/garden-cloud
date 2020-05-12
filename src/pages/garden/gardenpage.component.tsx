import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectIsGardenCreated } from '../../redux/garden/garden.selectors';
import { AppState } from '../../redux/root-reducer';

import GardenCreator from '../../components/gardencreator/gardencreator.component';
import Garden from '../../components/garden/garden.component';

import './gardenpage.styles.scss';

interface IGardenPageProps {
    isGardenCreated: boolean
}

const GardenPage : React.FC<IGardenPageProps> = ({ isGardenCreated }) => (
    isGardenCreated ? <Garden /> : <GardenCreator />
);
 
const mapStateToProps = createStructuredSelector<AppState, IGardenPageProps>({
    isGardenCreated: selectIsGardenCreated
}); 

export default connect(mapStateToProps)(GardenPage);
