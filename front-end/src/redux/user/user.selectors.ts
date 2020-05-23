import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';

export const selectSignin = (state : AppState) => state.user;

export const selectIsUserSignedIn = createSelector(
    [selectSignin],
    user => !!user.userData
);
