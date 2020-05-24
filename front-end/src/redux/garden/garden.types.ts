import IGarden from '../../types/models/IGarden';
import FetchState from '../../types/utils/FetchState';

export const CREATE_GARDEN : string = 'CREATE_GARDEN';
export const CREATE_BED : string = 'CREATE_BED';
export const GET_GARDEN_PENDING  : string = 'GET_GARDEN_PENDING';
export const GET_GARDEN_SUCCESS : string = 'GET_GARDEN_SUCCESS';
export const GET_GARDEN_FAILED : string = 'GET_GARDEN_FAILED';

export interface IGardenState {
    gardenData: IGarden | null,
    fetchState: FetchState
}