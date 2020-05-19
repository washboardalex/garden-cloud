import axios from 'axios';
import { generateAuthHeaders } from './signin.utils';
import { 
	SIGN_IN_FAILED,
	SIGN_IN_PENDING,
	SIGN_IN_SUCCESS,
} from './signin.types';

export const signin = (email = "", password = "") => (dispatch) => {

    dispatch({ type: SIGN_IN_PENDING });
    
    axios.post('http://localhost:3001/api/signin', {
		headers: generateAuthHeaders(),
		data: { email, password }
	})
	.then(response => console.log(response))

	// fetch('http://localhost:3001/signin', {
	// 	method: 'post',
	// 	headers: requestHeaders,
	// 	body: JSON.stringify({ email, password })
  	// })
	// .then(response => response.json())
	// .then(data => {
	// 	if (!data.userId) {
	// 		dispatch ({ type:SIGN_IN_FAILED, payload: data})
	// 	} else {
	// 		dispatch({ type: SIGN_IN_SUCCESS, payload: data })
	// 	}
	// })
	// .catch(error => dispatch ({ type:SIGN_IN_FAILED, payload: error}))
}