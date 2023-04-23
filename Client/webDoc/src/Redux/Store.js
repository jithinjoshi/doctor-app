// import {combineReducers, configureStore} from '@reduxjs/toolkit'
// import doctorReducer from '../Redux/Doctor/doctorSlice'
// import storage from 'redux-persist/lib/storage'
// import {persistReducer} from 'redux-persist'
// import { useReducer } from 'react';

// const persistConfig = {
//     key : "root",
//     version : 1,
//     storage
// };

// const reducer = combineReducers({
//     doctor :doctorReducer,
//     user:useReducer
// });

// const persistedReducer = persistReducer(persistConfig,reducer)


// export const store = configureStore({
//     reducer: persistedReducer
// });

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import doctorReducer from '../Redux/Doctor/doctorSlice';
import userReducer from '../Redux/User/userSlice';
import loadingReducer from '../Redux/Loader/LoadingSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  doctor: doctorReducer,
  user: userReducer,
  loading:loadingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});




