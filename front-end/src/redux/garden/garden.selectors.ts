import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import IGarden from '../../types/models/IGarden';
import { IGardenState } from './garden.types';
import FetchState from '../../types/utils/FetchState';

const selectGarden = (state : AppState) => state.garden;

export const selectIsGardenCreated = createSelector(
    [selectGarden],
    ( garden : IGardenState ) => !!garden.gardenData
);

export const selectGardenData = createSelector(
    [selectGarden],
    ( garden: IGardenState ) => garden.gardenData!
)

export const selectGardenDimensions = createSelector(
    [selectGardenData],
    ( gardenData : IGarden ) => { 
        return gardenData.dimensions!;
    }
);

export const selectGardenFetchState = createSelector(
    [selectGarden],
    (garden : IGardenState) => {
        return garden.fetchState
    }
)

export const selectIsGardenFetching = createSelector(
    [selectGardenFetchState],
    (fetchState : FetchState) => {
        return fetchState === 'fetching'
    }
)

export const selectGardenBeds = createSelector(
    [selectGardenData],
    gardenData => gardenData.beds
);