
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { AppState } from '../../redux/root-reducer';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsGardenFetching } from '../../redux/garden/garden.selectors';
import gardenpageComponent from './gardenpage.component';

interface IStateProps {
    isLoading: boolean
}

const mapStateToProps = createStructuredSelector<AppState,IStateProps>({
    isLoading: selectIsGardenFetching
});

export default connect(mapStateToProps)(WithSpinner(gardenpageComponent));