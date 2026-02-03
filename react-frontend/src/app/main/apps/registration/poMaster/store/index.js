import { combineReducers } from '@reduxjs/toolkit';
import poMaster from './poMasterSlice';

const reducerPoMaster = combineReducers({
    poMaster,
});

export default reducerPoMaster;
