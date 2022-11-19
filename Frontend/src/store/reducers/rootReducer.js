import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
// import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage';
// Dùng để lưu redux state vào storeage mỗi khi thay đổi
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo'] // add two field whenever it's value changed
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: appReducer
})