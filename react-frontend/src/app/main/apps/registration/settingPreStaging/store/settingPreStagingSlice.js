import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';


const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

export const getSettingPreStaging = createAsyncThunk(
    'settingPreStagingApp/settingPreStaging/getSettingPreStaging', 
    async (paging) => {

        let urlPreStaging = '';
        if (paging?.types){
            urlPreStaging = `settingPreStaging/${paging?.types}/${paging?.max}?page=${paging?.page + 1}`;
        } else {
            urlPreStaging = `settingPreStaging/${paging?.max}?page=${paging?.page + 1}`;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}${urlPreStaging}`,config);

        const data = await response.data.data;
        const totalData = await response.data.totalDatas;
        return { data, totalData };
    }    
);


export const addSettingPreStaging = createAsyncThunk(
    'settingPreStagingApp/settingPreStaging/addSettingPreStaging', 
    async ( settingPrestaging, {dispatch}) => {
        try {

            // console.log("CeeejssR", settingPrestaging);

            const response = await axios.post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}settingPreStaging`, settingPrestaging.form, config)
            const data = await response?.data;

            dispatch(
                showMessage({
                  message: response.data.message, // 'Data Part Number Berhasil Ditambah', // text or html
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: 'top', // top bottom
                    horizontal: 'center', // left center right
                  },
                  variant: 'success', // success error info warning null
                })
            );

            dispatch(
                getSettingPreStaging({
                    page: settingPrestaging.page, 
                    max: settingPrestaging.rowsPerPage, 
                    types: settingPrestaging?.form?.types
                })
            );

            return data;
        }catch(error){
            // console.log();
            dispatch(
                showMessage({
                  message: error.response.data.message, // text or html
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: 'top', // top bottom
                    horizontal: 'center', // left center right
                  },
                  variant: 'error', // success error info warning null
                })
            );

            return { ...settingPrestaging.form, id: 0 };
        }
    }
);

export const updateSettingPreStaging = createAsyncThunk(
    'settingPreStagingApp/settingPreStaging/updateSettingPreStaging',
    async (params, {dispatch}) => {
        try {
            // console.log('updateeeParams', params);
            const response = await axios.put(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}settingPreStaging/${params?.form?.id}`, params.form, config);
            const data = await response?.data;
            dispatch(
                showMessage({
                  message: response.data.message,
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: "top", // top bottom
                    horizontal: "center", // left center right
                  },
                  variant: "success", // success error info warning null
                })
            );

            dispatch(
                getSettingPreStaging({
                    page: params?.page, 
                    max: params?.rowsPerPage
                })
            );

            return data;
        }catch(error){
            dispatch(
                showMessage({
                  message: error.response.data.message,
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: 'top', // top bottom
                    horizontal: 'center', // left center right
                  },
                  variant: 'error', // success error info warning null
                })
            );
            return { ...params.form, id: 0 };
        }
    } 

)

export const deleteSettingPreStaging = createAsyncThunk(
    'settingPreStagingApp/settingPreStaging/deleteSettingPreStaging', 
    async ( params, {dispatch}) => {
        try {

            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}settingPreStaging/${params?.form?.id}`, config
            );
            const data = await response?.data;

            dispatch(
                showMessage({
                  message: response.data.message, // text or html
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: 'top', // top bottom
                    horizontal: 'center', // left center right
                  },
                  variant: 'success', // success error info warning null
                })
            );

            dispatch(
                getSettingPreStaging({
                    page: params.page, 
                    max: params.rowsPerPage
                })
            );

            return data;
        }catch( error){

            dispatch(
                showMessage({
                  message: 'Failed to Delete Data of Pre Staging Setting', // text or html
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: 'top', // top bottom
                    horizontal: 'center', // left center right
                  },
                  variant: 'error', // success error info warning null
                })
            );
        
            return { ...params.form, id: 0 };
        }
    }
)

const settingPreStagingAdapter = createEntityAdapter({});

export const { selectAll: selectSettingPreStaging, selectById: selectSettingPreStagingById } = 
        settingPreStagingAdapter.getSelectors((state) => state?.settingPreStagingApp?.settingPreStaging);

const settingPreStagingSlice = createSlice({
    name: 'settingPreStagingApp/settingPreStaging', 
    initialState: settingPreStagingAdapter.getInitialState({
        searchText: '', 
        routeParams: {}, 
        totalElements: 0, 
        number: 0, 
        settingPreStagingDialog: {
            type: 'new', 
            props: {
                open: false,
            }, 
            data: null
        }
    }), 
    reducers: {
        openNewSettingPreStagingDialog: (state, action) => {
            state.settingPreStagingDialog = {
                type: 'new', 
                props: {
                    open: true, 
                }, 
                data: null
            };
        }, 
        closeNewSettingPreStagingDialog: (state, action) => {
            state.settingPreStagingDialog = {
                type: 'new', 
                props: {
                    open: false, 
                }, 
                data: null
            };
        }, 
        openEditSettingPreStagingDialog: (state, action) => {
            state.settingPreStagingDialog = {
                type: 'edit', 
                props: {
                    open: true, 
                }, 
                data: action.payload
            };
        },
        closeEditSettingPreStagingDialog: (state, action) => {
            state.settingPreStagingDialog = {
                type: 'edit', 
                props: {
                    open: false, 
                }, 
                data: null
            };
        },
    }, 
    extraReducers: {
        [getSettingPreStaging.fulfilled]: (state, action) => {
            const { data, number } = action.payload;
            settingPreStagingAdapter.setAll(state || [], data?.data ? data?.data: []);
            state.totalElements = data?.total;
            state.number = number;
            state.searchText = '';
        }, 
        [addSettingPreStaging.fulfilled]: settingPreStagingAdapter.addOne, 
        [deleteSettingPreStaging.fulfilled]: (state, action) =>
            settingPreStagingAdapter.removeOne(state, action.payload)
    }
});

export const {
    openNewSettingPreStagingDialog, 
    closeNewSettingPreStagingDialog, 
    openEditSettingPreStagingDialog, 
    closeEditSettingPreStagingDialog
} = settingPreStagingSlice.actions;

export default settingPreStagingSlice.reducer;
