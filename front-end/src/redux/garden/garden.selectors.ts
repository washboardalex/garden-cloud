import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import IGarden from '../../types/models/IGarden';

const selectGarden = (state : AppState) => state.garden;

export const selectIsGardenCreated = createSelector(
    [selectGarden],
    garden => !!garden.length
);

export const selectGardenDimensions = createSelector(
    [selectGarden],
    ( garden : IGarden ) => { 
        const length = garden.length!; //this needs refactoring - should always be able to call it in a way that is predictable
        const width = garden.width!;
        return { length, width }
    }
)

export const selectGardenBeds = createSelector(
    [selectGarden],
    garden => garden.beds
)