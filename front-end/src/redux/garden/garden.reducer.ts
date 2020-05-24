import IActionWithPayload from '../../types/utils/IActionWithPayload';
import { 
    CREATE_GARDEN,
    CREATE_BED,
    GET_GARDEN_PENDING,
    GET_GARDEN_FAILED,
    GET_GARDEN_SUCCESS,
    IGardenState
 } from './garden.types';

const INITIAL_STATE : IGardenState = {
    gardenData: null,
    fetchState: 'notFetched'
}

const gardenReducer = (state : IGardenState = INITIAL_STATE, action: IActionWithPayload) => {
    switch(action.type) {
        case CREATE_GARDEN:
            const { length, width } = action.payload;
            return ({ 
                ...state,
                gardenData: {
                    length, width, beds: []
                }
            });

        case CREATE_BED:
            return ({
                ...state,
                gardenData: { 
                    ...state.gardenData, 
                    beds: [ 
                        ...state.gardenData!.beds, 
                        { ...action.payload }
                    ]  
                }
            });

        case GET_GARDEN_PENDING:
            return ({
                ...state,
                fetchState: 'fetching'
            });
        
        case GET_GARDEN_FAILED:
            return ({
                ...state,
                fetchState: 'hasFetched'
            });
        
        case GET_GARDEN_SUCCESS:
            return ({
                ...state,
                gardenData: action.payload,
                fetchState: 'hasFetched'
            });

        default:
            return state;
    }
}

export default gardenReducer;