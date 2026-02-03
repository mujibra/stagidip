import { combineReducers } from '@reduxjs/toolkit';
import partNumber from './partNumberSlice';

const reducerPartNumber = combineReducers({
    partNumber
});

export default reducerPartNumber;