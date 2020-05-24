import IActionWithPayload from '../../types/utils/IActionWithPayload';
import IGardenBed from '../../types/models/IGardenBed';
import { 
    GET_GARDEN_PENDING,
    GET_GARDEN_SUCCESS,
    GET_GARDEN_FAILED,
    CREATE_GARDEN ,
    CREATE_BED
} from './garden.types';
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { generateAuthHeaders } from '../../utils/generateAuthHeaders';

export const createGarden = (length: number, width: number) : IActionWithPayload => ({
    type: CREATE_GARDEN,
    payload: { length, width }
});

export const readGarden = (userId : number) => (dispatch : Dispatch) => {

    dispatch({ type: GET_GARDEN_PENDING });
    console.log('Im doin it')

    axios.get(
        `http://localhost:3001/api/garden/${userId.toString()}`,
        { headers: generateAuthHeaders() }
    )
    .then(function (response : AxiosResponse) {
        response.status === 200 && response.data.dimensions
            ? dispatch({ type: GET_GARDEN_SUCCESS, payload: response.data })
            : dispatch({ type: GET_GARDEN_FAILED });
    })
    .catch(function (error : AxiosError) {
        console.log(error);
        dispatch({ type: GET_GARDEN_FAILED })
    });

}

export const createBed = ( bed : IGardenBed ) : IActionWithPayload => ({
    type: CREATE_BED,
    payload: bed
});




console.log(window.sessionStorage.getItem('gardenCloudToken'));
        