import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';

export const selectUser = (state : AppState) => state.user;

export const selectIsUserSignedIn = createSelector(
    [selectUser],
    user => !!user.userData
);

export const selectUserId = createSelector(
    [selectUser],
    user => user.userData.id
);