import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectIsGardenCreated } from '../../redux/garden/garden.selectors';
import { AppState } from '../../redux/root-reducer';
import axios from 'axios';

import GardenCreator from '../../components/garden-creator/garden-creator.component';
import Garden from '../../components/garden/garden.component';

import './gardenpage.styles.scss';

interface IGardenPageProps {
    isGardenCreated: boolean
}

class GardenPage extends React.Component<IGardenPageProps> {

    componentDidMount() {
        console.log(window.sessionStorage.getItem('gardenCloudToken'));
        axios.get(
            `http://localhost:3001/api/garden/1`,
            {headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": window.sessionStorage.getItem('gardenCloudToken')
            }}
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            this.props.isGardenCreated 
                ? <Garden /> : <GardenCreator />
        );
    }
}
 
const mapStateToProps = createStructuredSelector<AppState, IGardenPageProps>({
    isGardenCreated: selectIsGardenCreated
}); 

export default connect(mapStateToProps)(GardenPage);
