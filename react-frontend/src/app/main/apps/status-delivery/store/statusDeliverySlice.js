/* eslint-disable camelcase */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
import axios from 'axios';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

export const getStatusDelivery = createAsyncThunk(
  'statusDeliveryApp/statusDelivery/getStatusDelivery',
  async (paging) => {
    let url_statusDeliv = '';
    const { date } = paging;
    // console.log(paging?.date, 'tesss');

    if (paging?.page === 0) {
      url_statusDeliv = `statusDelivery/${paging?.max}/${
        paging?.user_login
      }?page=1&dataSearch=${paging?.snMesin?.toUpperCase()}`;
    } else {
      url_statusDeliv = `statusDelivery/${paging?.max}/${paging?.user_login}?page=${
        paging?.page + 1
      }&dataSearch=${paging?.snMesin?.toUpperCase()}`;
    }

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}${url_statusDeliv}`,
      config
    );

    const data = await response.data.data;
    // console.log(data, 'data')
    const totalData = await response.data.totalDatas;
    return { data, totalData };
  }
);

export const addStatusDelivery = createAsyncThunk(
  'statusDeliveryApp/statusDelivery/addStatusDelivery',
  async (statusDelivery, { dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDelivery`,
        statusDelivery.form,
        config
      );
      const data = await response?.data;
      // console.log('add')
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
        getStatusDelivery({
          page: statusDelivery.page,
          max: statusDelivery.rowsPerPage,
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

export const updateStatusDelivery = createAsyncThunk(
  'statusDeliveryApp/statusDelivery/updateStatusDelivery',
  async (params, { dispatch }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDelivery/${params?.form?.id}`,
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
        getStatusDelivery({
          page: params.page,
          max: params.rowsPerPage,
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

export const deleteStatusDelivery = createAsyncThunk(
  'statusDeliveryApp/statusDelivery/deleteStatusDelivery',
  async (statusDelivery, { dispatch }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDelivery/${statusDelivery?.form.id}`,
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
        getStatusDelivery({
          page: statusDelivery.page,
          max: statusDelivery.rowsPerPage,
        })
      );
      return data;
    } catch (error) {}
  }
);

const statusDeliveryAdapter = createEntityAdapter({});

export const { selectAll: selectStatusDelivery, selectById: selectStatusDeliveryById } =
  statusDeliveryAdapter.getSelectors((state) => state?.statusDeliveryApp?.statusDelivery);

const statusDeliverySlice = createSlice({
  name: 'statusDeliveryApp/statusDelivery',
  initialState: statusDeliveryAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    totalElements: 0,
    number: 0,
    statusDeliveryDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewStatusDeliveryDialog: (state, action) => {
      state.statusDeliveryDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewStatusDeliveryDialog: (state, action) => {
      state.statusDeliveryDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditStatusDeliveryDialog: (state, action) => {
      state.statusDeliveryDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditStatusDeliveryDialog: (state, action) => {
      state.statusDeliveryDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getStatusDelivery.fulfilled]: (state, action) => {
      const { data, number } = action.payload;
      statusDeliveryAdapter.setAll(state || [], data?.data ? data?.data : []);
      state.totalElements = data?.total;
      state.number = number;
      state.searchText = '';
    },
    [addStatusDelivery.fulfilled]: statusDeliveryAdapter.addOne,
    [deleteStatusDelivery.fulfilled]: (state, action) =>
      statusDeliveryAdapter.removeOne(state, action.payload),
  },
});

export const {
  openNewStatusDeliveryDialog,
  closeNewStatusDeliveryDialog,
  openEditStatusDeliveryDialog,
  closeEditStatusDeliveryDialog,
} = statusDeliverySlice.actions;

export default statusDeliverySlice.reducer;
