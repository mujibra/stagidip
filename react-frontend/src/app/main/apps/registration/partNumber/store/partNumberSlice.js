import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

export const getPartNumber = createAsyncThunk(
  'partNumberApp/partNumber/getPartNumber',
  async (paging) => {
    let urlPartNumber = '';
    if (paging?.tipeMesin?.id && paging?.status && paging?.type && paging?.partColum) {
      urlPartNumber = `master-part/${paging?.tipeMesin?.id}/${paging?.max}/${paging?.status}/${paging?.type}/${paging?.partColum}?page=1`;
    } else if (paging?.tipeMesin?.id && paging?.status && paging?.type) {
      urlPartNumber = `master-part/${paging?.tipeMesin?.id}/${paging?.max}/${paging?.status}/${paging?.type}?page=1`;
    } else if (paging?.tipeMesin?.id && paging?.status) {
      urlPartNumber = `master-part/${paging?.tipeMesin?.id}/${paging?.max}/${paging?.status}?page=1`;
    } else if (paging?.tipeMesin?.id && paging?.type) {
      urlPartNumber = `master-part/${paging?.tipeMesin?.id}/${paging?.max}/all-data/${paging?.type}/types?page=1`;
    } else if (paging?.type && !paging?.tipeMesin?.id && !paging?.status) {
      urlPartNumber = `master-parts/${paging?.max}/${paging?.type}?page=1`;
    } else if (paging?.tipeMesin?.id && paging?.partColum) {
      urlPartNumber = `master-parts/typeMesinPartColumn/${paging?.tipeMesin?.id}/${paging?.max}/${paging?.partColum}?page=1`;
    } else if (paging?.tipeMesin?.id && !paging?.partColumn && !paging?.status && !paging?.type) {
      urlPartNumber = `master-part/${paging?.tipeMesin?.id}/${paging?.max}?page=1`;
    } else {
      urlPartNumber = `master-part/${paging?.max}?page=${paging?.page + 1}`;
    }

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}${urlPartNumber}`,
      config
    );

    const data = await response.data.data;
    const totalData = await response.data.totalDatas;
    return { data, totalData };
  }
);

export const addPartNumber = createAsyncThunk(
  'partNumberApp/partNumber/addPartNumber',
  async (params, { dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-part`,
        params.form,
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
        getPartNumber({
          page: params.page,
          max: params.rowsPerPage,
          tipeMesin: {
            id: params?.tipeMesin?.valueTypeMesin?.id || '',
            nama: params?.tipeMesin?.valueTypeMesin?.name || '',
            json: params?.tipeMesin?.valueTypeMesin,
          },
          type: params?.tipeMesin?.valueType,
          partColum: params?.tipeMesin?.valuePartColumn,
        })
      );
      return data;
    } catch (error) {
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

      return { ...params.form, id: 0 };
    }
  }
);

export const updatePartNumber = createAsyncThunk(
  'partNumberApp/partNumber/updatePartNumber',
  async (params, { dispatch }) => {
    // console.log('ceehkParams', params);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-part/${params?.form?.id}`,
        params.form,
        config
      );
      const data = await response?.data;

      dispatch(
        showMessage({
          message: data?.message,
          autoHideDuration: 4000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center', // left center right
          },
          variant: 'success', // success error info warning null
        })
      );

      dispatch(
        getPartNumber({
          page: params.page,
          max: params.rowsPerPage,
          tipeMesin: {
            id: params?.tipeMesin?.valueTypeMesin?.id || '',
            nama: params?.tipeMesin?.valueTypeMesin?.name || '',
            json: params?.tipeMesin?.valueTypeMesin,
          },
          type: params?.tipeMesin?.valueType,
          partColum: params?.tipeMesin?.valuePartColumn,
        })
      );

      return data;
    } catch (error) {
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

export const deletePartNumber = createAsyncThunk(
  'partNumberApp/partNumber/deletePartNumber',
  async (params, { dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-part/${params?.form?.id}`,
        config
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
        getPartNumber({
          page: params.page,
          max: params.rowsPerPage,
          tipeMesin: {
            id: params?.tipeMesin?.valueTypeMesin?.id || '',
            nama: params?.tipeMesin?.valueTypeMesin?.name || '',
            json: params?.tipeMesin?.valueTypeMesin,
          },
          type: params?.tipeMesin?.valueType,
          partColum: params?.tipeMesin?.valuePartColumn,
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Failed to Delete Data of partNumber', // text or html
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

const partNumberAdapter = createEntityAdapter({});

export const { selectAll: selectPartNumber, selectById: selectPartNumberById } =
  partNumberAdapter.getSelectors((state) => state?.partNumberApp?.partNumber);

const partNumberSlice = createSlice({
  name: 'partNumberApp/partNumber',
  initialState: partNumberAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    totalElements: 0,
    number: 0,
    partNumberDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewPartNumberDialog: (state, action) => {
      state.partNumberDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewPartNumberDialog: (state, action) => {
      state.partNumberDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openDeletePartNumberDialog: (state, action) => {
      state.partNumberDialog = {
        type: 'delete',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeDeletePartNumberDialog: (state, action) => {
      state.partNumberDialog = {
        type: 'delete',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditPartNumberDialog: (state, action) => {
      state.partNumberDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditPartNumberDialog: (state, action) => {
      state.partNumberDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getPartNumber.fulfilled]: (state, action) => {
      const { data, number } = action.payload;
      partNumberAdapter.setAll(state || [], data?.data ? data?.data : []);
      state.totalElements = data?.total;
      state.number = number;
      state.searchText = '';
    },
    [addPartNumber.fulfilled]: partNumberAdapter.addOne,
    [deletePartNumber.fulfilled]: (state, action) =>
      partNumberAdapter.removeOne(state, action.payload),
  },
});

export const {
  openNewPartNumberDialog,
  closeNewPartNumberDialog,
  openEditPartNumberDialog,
  closeEditPartNumberDialog,
  openDeletePartNumberDialog,
  closeDeletePartNumberDialog,
} = partNumberSlice.actions;

export default partNumberSlice.reducer;
