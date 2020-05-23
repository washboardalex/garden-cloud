
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import gardenReducer from './garden/garden.reducer';
import signInReducer from './user/user.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['garden']
}

const rootReducer = combineReducers({
    garden: gardenReducer,
    user: signInReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);