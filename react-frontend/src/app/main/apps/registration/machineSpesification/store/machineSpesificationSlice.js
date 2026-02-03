import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

export const getMachineSpesification = createAsyncThunk(
    'machineSpesificationApp/machineSpesification/getMachineSpesification', 
    async (paging) => {
        let urlmachineSpek = `master-spekmesin/${paging?.max}?page=${paging?.page + 1}`;
        const response = await axios.get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}${urlmachineSpek}`, config);

        const data = await response.data.data;
        const totalData = await response.data.totalDatas;
        return { data, totalData };
    }
);

export const addMachineSpesification = createAsyncThunk(
    'machineSpesificationApp/machineSpesification/addMachineSpesification', 
    async ( spekMesin, {dispatch}) => {
        try {

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-spekmesin`,
                spekMesin.form,
                config
              );

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
                getMachineSpesification({
                    page: spekMesin.page,
                    max: spekMesin.rowsPerPage,
                })
            );

            return data;
        } catch(error){
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

            return { ...spekMesin.form, id:0 };
        }
    }
);

export const updateMachineSpesification = createAsyncThunk(
    'machineSpesificationApp/machineSpesification/updateMachineSpesification', 
    async (params, {dispatch}) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-spekmesin/${params?.form?.id}`, params.form, config);
            const data = await response?.data;

            dispatch(
                showMessage({
                  message: data?.message, 
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: "top", // top bottom
                    horizontal: "center", // left center right
                  },
                  variant: "success", // success error info warning null
                })
            );

            dispatch(
                getMachineSpesification({
                    page: params.page,
                    max: params.rowsPerPage,
                })
            );

            return data;
        } catch (error){
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
);

export const deleteMachineSpesification = createAsyncThunk(
    'machineSpesificationApp/machineSpesification/deleteMachineSpesification', 
    async (spekMesin, { dispatch }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-spekmesin/${spekMesin?.form?.id}`,config);
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
                getMachineSpesification({
                    page: spekMesin.page,
                    max: spekMesin.rowsPerPage,
                })
            );

            return data;
        } catch (error){

            dispatch(
                showMessage({
                  message: 'Failed to Delete Data of Machine Spesification', // text or html
                  autoHideDuration: 4000, // ms
                  anchorOrigin: {
                    vertical: 'top', // top bottom
                    horizontal: 'center', // left center right
                  },
                  variant: 'error', // success error info warning null
                })
            );

            return { ...spekMesin.form, id: 0 };
        }
    }
)

const machineSpesificationAdapter = createEntityAdapter({});

export const { selectAll: selectMachineSpesification, selectById: selectMachineSpesificationById} = 
    machineSpesificationAdapter.getSelectors((state) => state?.machineSpesificationApp?.machineSpesification);

const machineSpesificationSlice = createSlice({
    name: 'machineSpesificationApp/machineSpesification', 
    initialState: machineSpesificationAdapter.getInitialState({
        searchText: '', 
        routeParams: {}, 
        totalElements: 0, 
        number: 0, 
        machineSpesificationDialog: {
            type: 'new', 
            props: {
                open: false
            }, 
            data:null
        }
    }), 
    reducers: {
        openNewMachineSpesificationDialog: (state, action) => {
            state.machineSpesificationDialog = {
                type: 'new', 
                props: {
                    open: true
                }, 
                data: null
            }
        }, 
        closeNewMachineSpesificationDialog: (state, action) => {
            state.machineSpesificationDialog = {
                type: 'new', 
                props: {
                    open: false
                }, 
                data: null
            }
        }, 
        openEditMachineSpesificationDialog: (state, action) => {
            state.machineSpesificationDialog = {
                type: 'edit', 
                props: {
                    open: true
                }, 
                data: action.payload
            }
        }, 
        closeEditMachineSpesificationDialog: (state, action) => {
            state.machineSpesificationDialog = {
                type: 'edit', 
                props: {
                    open: false
                }, 
                data: null
            }
        }
    }, 
    extraReducers: {
        [getMachineSpesification.fulfilled]: (state, action) => {
            const { data, number } = action.payload;
            machineSpesificationAdapter.setAll(state || [], data?.data ? data?.data: []);
            state.totalElements = data?.total;
            state.number = number;
            state.searchText = '';
        }, 
        [addMachineSpesification.fulfilled]: machineSpesificationAdapter.addOne, 
        [deleteMachineSpesification.fulfilled]: (state, action) => 
            machineSpesificationAdapter.removeOne(state, action.payload)
    }
});

export const {
    openNewMachineSpesificationDialog, 
    closeNewMachineSpesificationDialog, 
    openEditMachineSpesificationDialog, 
    closeEditMachineSpesificationDialog
} = machineSpesificationSlice.actions;

export default machineSpesificationSlice.reducer;