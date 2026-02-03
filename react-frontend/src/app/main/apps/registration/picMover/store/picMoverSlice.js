import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

export const getPicMover = createAsyncThunk(
    'picMoverApp/picMover/getPicMover',
    async (paging) => {
        // console.log("cceee", paging);
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}picMover/${paging?.max}?page=${paging?.page + 1}`,
            config
        );

        const data = await response.data.data;
        const totalData = await response.data.totalDatas;
        return { data, totalData };
    }
)

export const addPicMover = createAsyncThunk(
    'picMoverApp/picMover/addPicMover',
    async (picMover, {dispatch}) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}picMover`, picMover.form, config);
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
              getPicMover({
                page: picMover.page,
                max: picMover.rowsPerPage
              })
            );

            return data;
        }catch(error) {
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

            return { ...picMover.form, id: 0 };
        }
    }
);

export const updatePicMover = createAsyncThunk(
    'partNumberApp/partNumber/updatePartNumber',
    async (params, { dispatch}) => {

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}picMover/${params?.form?.id}`, params.form, config);
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
              getPicMover({
                page: params.page,
                max: params.rowsPerPage
              })
            );

            return data;
        }catch (error){
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

export const deletePicMover = createAsyncThunk(
  'partNumberApp/partNumber/deletePicMover',
  async ( params, { dispatch}) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}picMover/${params?.form?.id}`, config
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
        getPicMover({
          page: params.page,
          max: params.rowsPerPage
        })
      );
     
      return data;
    }catch( error){

      dispatch(
        showMessage({
          message: 'Failed to Delete Data of PIC Mover', // text or html
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


const picMoverAdapter = createEntityAdapter({});

export const { selectAll: selectPicMover, selectById: selectPicMoverById} = 
    picMoverAdapter.getSelectors((state) => state?.picMoverApp?.picMover);

const picMoverSlice = createSlice({
    name: 'picMoverApp/picMover', 
    initialState: picMoverAdapter.getInitialState({
        searchText: '',
        routeParams: {},
        totalElements: 0,
        number: 0,
        picMoverDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
        },
    }), 
    reducers: {
        openNewPicMoverDialog: (state, action) => {
            state.picMoverDialog = {
                type: 'new',
                props: {
                    open: true,
                },
                data: null,
            };
        }, 
        closeNewPicMoverDialog: (state, action) => {
            state.picMoverDialog = {
                type: 'new',
                props: {
                  open: false,
                },
                data: null,
            };
        }, 
        openEditPicMoverDialog: (state, action) => {
            state.picMoverDialog = {
              type: 'edit', 
              props: {
                open: true
              }, 
              data: action.payload
            }
        }, 
        closeEditPicMoverDialog: (state, action) => {
            state.picMoverDialog = {
              type: 'edit',
              props: {
                open: false,
              },
              data: null,
            };
        },
    }, 
    extraReducers: {
        [getPicMover.fulfilled]: (state, action) => {
            const { data, number } = action.payload;
            picMoverAdapter.setAll(state || [], data?.data ? data?.data: []);
            state.totalElements = data?.total;
            state.number = number;
            state.searchText = '';
        }, 
        [addPicMover.fulfilled]: picMoverAdapter.addOne, 
        [deletePicMover.fulfilled]: (state, action) => 
          picMoverAdapter.removeOne(state, action.payload)
    }
});

export const {
    openNewPicMoverDialog, 
    closeNewPicMoverDialog, 
    openEditPicMoverDialog, 
    closeEditPicMoverDialog
} = picMoverSlice.actions;

export default picMoverSlice.reducer;