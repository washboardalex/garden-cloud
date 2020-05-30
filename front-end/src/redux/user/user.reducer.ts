import { 
    ICurrentUserState, 
    SIGN_IN_PENDING, 
    SIGN_IN_FAILED, SIGN_IN_SUCCESS, REGISTER_PENDING, REGISTER_FAILED, REGISTER_SUCCESS } from './user.types';
import IActionWithPayload from '../../types/utils/IActionWithPayload';


const INITIAL_STATE : ICurrentUserState = {
    userData: null
}

const signInReducer = (state: ICurrentUserState = INITIAL_STATE, action: IActionWithPayload) => {

    switch(action.type) {
        case SIGN_IN_PENDING || REGISTER_PENDING:
            return { 
                ...state,
            }

        case SIGN_IN_SUCCESS:
            window.sessionStorage.setItem('gardenCloudToken', action.payload.token);
            return { 
                ...state,
                userData: action.payload.user
            }
        
        case REGISTER_SUCCESS:
            console.log('aww yiss');
            console.log(action.payload)
            window.sessionStorage.setItem('gardenCloudToken', action.payload.token);
            return { 
                ...state,
                userData: action.payload.user
            }

        case SIGN_IN_FAILED || REGISTER_FAILED:
            return { 
                ...state,
            }


        default:
            return state;
    }
}

export default signInReducer;
