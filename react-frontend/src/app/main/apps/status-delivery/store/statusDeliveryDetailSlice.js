/* eslint-disable consistent-return */
import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

export const getStatusDeliveryDetail = createAsyncThunk(
  'statusDeliveryApp/statusDeliveryDetail/getStatusDeliveryDetail',
  async (paging, { dispatch }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDeliveryDetail/${paging?.id_header}`,
        config
      );

      const data = await response.data.data;
      const totalData = await response.data.totalDatas;
      return { data, totalData };
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
    }
  }
);

export const addStatusDeliveryDetail = createAsyncThunk(
  'statusDeliveryApp/statusDeliveryDetail/addStatusDeliveryDetail',
  async (statusDelivery, { dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDeliveryDetail`,
        statusDelivery.form,
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
        getStatusDeliveryDetail({
          id_header: statusDelivery?.form?.id_header,
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

      return { ...statusDelivery.form, id: 0 };
    }
  }
);

export const updateStatusDeliveryDetail = createAsyncThunk(
  'statusDeliveryApp/statusDeliveryDetail/updateStatusDeliveryDetail',
  async (params, { dispatch }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDeliveryDetail/${params?.form?.id}`,
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
        getStatusDeliveryDetail({
          id_header: params?.form?.id_header,
        })
      );
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

const statusDeliveryDetailAdapter = createEntityAdapter({});

export const { selectAll: selectStatusDeliveryDetail, selectById: selectStatusDeliveryDetailById } =
  statusDeliveryDetailAdapter.getSelectors(
    (state) => state?.statusDeliveryApp.statusDeliveryDetail
  );

const statusDeliveryDetailSlice = createSlice({
  name: 'statusDeliveryApp/statusDeliveryDetail',
  initialState: statusDeliveryDetailAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    totalElements: 0,
    number: 0,
    statusDeliveryDetailDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewStatusDeliveryDetailDialog: (state, action) => {
      state.statusDeliveryDetailDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewStatusDeliveryDetailDialog: (state, action) => {
      state.statusDeliveryDetailDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditStatusDeliveryDetailDialog: (state, action) => {
      state.statusDeliveryDetailDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditStatusDeliveryDetailDialog: (state, action) => {
      state.statusDeliveryDetailDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [addStatusDeliveryDetail.fulfilled]: statusDeliveryDetailAdapter.addOne,
  },
});

export const {
  openNewStatusDeliveryDetailDialog,
  closeNewStatusDeliveryDetailDialog,
  openEditStatusDeliveryDetailDialog,
  closeEditStatusDeliveryDetailDialog,
} = statusDeliveryDetailSlice.actions;

export default statusDeliveryDetailSlice.reducer;
