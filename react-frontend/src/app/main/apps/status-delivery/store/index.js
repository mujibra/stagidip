
import { combineReducers } from '@reduxjs/toolkit';
import statusDelivery from './statusDeliverySlice';
import statusDeliveryDetail from './statusDeliveryDetailSlice';

const reducerStatusDelivery = combineReducers({
    statusDelivery, 
    statusDeliveryDetail
});

export default reducerStatusDelivery;