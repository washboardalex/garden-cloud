import { ISignInState, SIGN_IN_PENDING, SIGN_IN_FAILED, SIGN_IN_SUCCESS } from './signin.types';
import IActionWithPayload from '../../types/utils/IActionWithPayload';

const INITIAL_STATE : ISignInState = {
    isSignedIn: false,
    userId: null
}

const signInReducer = (state: ISignInState = INITIAL_STATE, action: IActionWithPayload) => {
    switch(action.type) {
        case SIGN_IN_PENDING:
            return { 
                ...state,
            }
        case SIGN_IN_SUCCESS:
            console.log('well lets check it old boy')
            console.log(action.payload.id);
            return { 
                ...state,
                isSignedIn: true,
                userId: action.payload.id
            }
        case SIGN_IN_FAILED:
            return { 
                ...state,
            }
        default:
            return state;
    }
}
