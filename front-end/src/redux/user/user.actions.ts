import axios, { AxiosResponse, AxiosError } from 'axios';
import { generateAuthHeaders } from '../../utils/generateAuthHeaders';
import { Dispatch } from 'redux';
import { 
	SIGN_IN_FAILED,
	SIGN_IN_PENDING,
	SIGN_IN_SUCCESS,
} from './user.types';

export const signin = (email = "", password = "") => (dispatch : Dispatch) => {

    dispatch({ type: SIGN_IN_PENDING });

    axios.post(
		'http://localhost:3001/api/signin', 
		{ email, password },
		{ headers: generateAuthHeaders() })
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