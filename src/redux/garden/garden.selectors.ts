import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';

const selectGarden = (state : AppState) => state.garden;

export const selectIsGardenCreated = createSelector(
    [selectGarden],
    garden => !!garden.length
);
