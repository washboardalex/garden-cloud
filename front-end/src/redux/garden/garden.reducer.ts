import IGarden from '../../types/models/IGarden';
import IActionWithPayload from '../../types/utils/IActionWithPayload';
import { 
    CREATE_GARDEN,
    CREATE_BED
 } from './garden.types';

const INITIAL_STATE : IGarden = {
    length: null,
    width: null,
    beds: []
}

const gardenReducer = (state : IGarden = INITIAL_STATE, action: IActionWithPayload) => {
    switch(action.type) {
        case CREATE_GARDEN:
            const { length, width } = action.payload;
            return ({ 
                ...state,
                length,
                width
            })
        case CREATE_BED:
            return ({
                ...state,
                beds: [ ...state.beds, { ...action.payload }]
            })
        default:
            return state;
    }
}

export default gardenReducer;