import axios, { AxiosResponse, AxiosError } from 'axios';
import { generateAuthHeaders } from '../../utils/generateAuthHeaders';
import { Dispatch } from 'redux';
import { 
	SIGN_IN_FAILED,
	SIGN_IN_PENDING,
    SIGN_IN_SUCCESS,
    REGISTER_PENDING,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from './user.types';

export const signin = (email : string, password : string) => (dispatch : Dispatch) => {

    dispatch({ type: SIGN_IN_PENDING });

    axios.post(
		'http://localhost:3001/api/signin', 
		{ email, password },
        { headers: generateAuthHeaders() }    
    )
	.then((response : AxiosResponse)  =>  
		response.status === 200 && response.data.user.id
			? dispatch({ type: SIGN_IN_SUCCESS, payload: response.data })
            : dispatch ({ type:SIGN_IN_FAILED })
	)
	.catch((error : AxiosError) => {
        dispatch ({ type:SIGN_IN_FAILED });
        console.error(error);
    });

}

export const register = (email : string, password: string, name: string) => (dispatch : Dispatch) => {
    dispatch({ type: REGISTER_PENDING });

    axios.post(
        'http://localhost:3001/api/register',
        { email, password, name },
        { headers: generateAuthHeaders() }
    )
    .then((response : AxiosResponse) =>
    response.status === 200 && response.data.user
        ? dispatch({ type: REGISTER_SUCCESS, payload: response.data })
        : dispatch ({ type:REGISTER_FAILED })
    )

}
