/* eslint-disable consistent-return */
/* eslint-disable no-empty-pattern */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken}`,
  },
};

export const getOldMachine = createAsyncThunk(
  'oldMachineApp/oldMachine/getOldMachine',
  async (datas) => {
    const idPo = datas?.idPo.split('-')[0];
    const idMesin = datas?.idPo.split('-')[1];

    // console.log("CeekUrlss", `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${idPo}/${idMesin}`);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${idPo}/${idMesin}`,
        config
      );
      const data = await response?.data?.data;
      // console.log(data, 'resss')
      const totalData = await response?.data?.totalDatas;
      return { data, totalData };
    } catch (err) {
      console.log(err, 'error');
      const data = [];
      const totalData = 0;
      return { data, totalData };
    }
  }
);

const oldMachineAdapter = createEntityAdapter({});
export const { selectAll: selectOldMachine, selectById: selectOldMachineById } =
  oldMachineAdapter.getSelectors((state) => state.oldMachineApp.OldMachine);

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
      const { data, totalData } = action.payload;
      console.log(data, 'data');
      // console.log(totalData, 'totalData')
      oldMachineAdapter?.setAll(state, data);
      state.totalElements = totalData;
      // state.number = number;
      state.searchText = '';
    },
  },
});

export const {} = oldMachine.actions;

export default oldMachine.reducer;
