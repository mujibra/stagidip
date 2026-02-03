import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { showMessage } from 'app/store/fuse/messageSlice';



export const getPoMaster = createAsyncThunk('poMasterApp/poMaster/getPoMaster', async (paging) => {

    const response = await axios.get(`${urlCustomer}/page/${paging?.page}/max/${paging?.max}`);
    const data = await response.data.data;
    const totalData = await response.data.totalDatas;
    return { data, totalData };
})

const poMasterAdapter = createEntityAdapter({});
export const { selectAll: selectPoMaster, selectById: selectPoMasterById} = 
    poMasterAdapter.getSelectors((state) => state?.poMasterApp?.poMaster);

const poMasterSlice = createSlice({
    name: 'poMasterApp/poMaster', 
    initialState: poMasterAdapter.getInitialState({
        searchText: '',
        routeParams: {},
        totalElements: 0,
        number: 0,
        poMasterDialog: {
        type: 'new',
        props: {
            open: false,
        },
            data: null,
        },
    }), 
    reducers: {}, 
    extraReducers: {}
})

export const {} = poMasterSlice.actions;

export default poMasterSlice.reducer;