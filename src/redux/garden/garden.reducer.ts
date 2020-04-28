import IGarden from '../../types/models/IGarden';
import IActionWithPayload from '../../types/utils/IActionWithPayload';
import { CREATE_GARDEN } from './garden.types';

const INITIAL_STATE : IGarden = {
    length: null,
    width: null,
    beds: []
}

const gardenReducer = (state : IGarden = INITIAL_STATE, action: IActionWithPayload) => {
    console.log('we are here')
    switch(action.type) {
        case CREATE_GARDEN:
            const { length, width } = action.payload;
            return ({ 
                ...state,
                length,
                width
            })
        default:
            return state;
    }
}

export default gardenReducer;