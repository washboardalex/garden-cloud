import IUser from '../../types/models/IUser';

export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const SIGN_IN_PENDING = 'SIGN_IN_PENDING';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'; 


export interface ICurrentUserState { 
    userData: IUser | null
}