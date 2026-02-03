/* eslint-disable consistent-return */
/* eslint-disable no-empty-pattern */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
// import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken}`,
  },
};

export const getOldMachine = createAsyncThunk(
  'oldMachineApp/oldMachine/getOldMachine',
  async datas => {
    const idPo = datas?.idPo.split('-')[0];
    const idMesin = datas?.idPo.split('-')[1];
    // const dispatch = useDispatch();

    // console.log("CeekUrlss", `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${idPo}/${idMesin}`);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${idPo}/${idMesin}`,
        config
      );
      const data = await response?.data?.data;
      const totalData = await response?.data?.totalDatas;
      return { data, totalData };
    } catch (err) {
      // console.log(err, 'error');
      const errMessage = err?.response?.statusText;
      const errStatus = err?.response?.status;
      // console.log(errMessage, 'errMessage');
      let messages = '';
      if (errStatus === 401) {
        messages = 'Unauthorized!!';
        window.location.href = '/login';
      } else if (errStatus === 500) {
        messages = 'Server Error!!';
      } else if (errStatus === 404) {
        messages = 'Not Found Error!!!';
      } else if (errStatus === 408) {
        messages = 'TimeOut Error!!';
      } else if (errStatus === 400) {
        messages = errMessage;
      } else if (errStatus === 429) {
        messages = 'Too Many Request!!';
      } else {
        messages = 'Something Wrong!!';
      }
      const data = [];
      const totalData = 0;
      toast?.error(messages, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return { data, totalData };
      // dispatch(
      //   showMessage({
      //     message: err?.response?.message,
      //     autoHideDuration: 2000,
      //     anchorOrigin: {
      //       // vertical: 'center',
      //       horizontal: 'center',
      //     },
      //     variant: 'error',
      //   })
      // );
    }
  }
);

const oldMachineAdapter = createEntityAdapter({});
export const { selectAll: selectOldMachine, selectById: selectOldMachineById } =
  oldMachineAdapter.getSelectors(state => state.oldMachineApp.OldMachine);

const oldMachine = createSlice({
  name: 'oldMachineApp/oldMachine',
  initialState: oldMachineAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    totalElements: 0,
    number: 0,
  }),
  reducers: {},
  extraReducers: {
    [getOldMachine.fulfilled]: (state, action) => {
      // console.log('ceekDatass', action.payload);
      const { data, totalData } = action?.payload;
      oldMachineAdapter?.setAll(state, data);
      state.totalElements = totalData;
      // state.number = number;
      state.searchText = '';
    },
    [getOldMachine.rejected]: err => {
      console.log(err);
    },
  },
});

export const {} = oldMachine.actions;

export default oldMachine.reducer;
