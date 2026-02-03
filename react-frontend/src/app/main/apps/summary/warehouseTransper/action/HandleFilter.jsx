/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/prefer-default-export */
import { Autocomplete, TextField } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';

export const HandleFilter = (props) => {
  const body = props?.body;
  const setBody = props?.setBody;
  const getUser = props?.getUser[0];
  // console.log(getUser, 'ii')
  const getAccessToken = props?.getAccessToken;
  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };
  const dispatch = useDispatch();
  const [Datapo, setDatapo] = useState([]);
  // console.log(Datapo, 'dataspo')
  const [DataSnMesin, setDataSnMesin] = useState([]);
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [DataModel, setDataModel] = useState([]);
  const [DataType, setDataType] = useState([]);
  const [loadingPO, setloadingPO] = useState(true);
  const [loadingWarehouse, setloadingWarehouse] = useState(true);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [loadingModel, setloadingModel] = useState(true);
  const [loadingPicStagging, setloadingPicStagging] = useState(true);
  const [loadingType, setloadingType] = useState(true);
  const [loadingBrand, setloadingBrand] = useState(true);
  const [loadingBatch, setloadingBatch] = useState(true);
  // console.log(DataSnMesin, 'DataSnMesin');

  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${getUser?.id}`, config)
      .then((res) => {
        setDatapo(res?.data?.data);
        setloadingPO(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setloadingPO(false);
        setDatapo([]);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = 'Bad Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  const getDataListSnMesin = async () => {
    setloadingPO(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}allsnmesin/${body?.id_po?.id}`,
        config
      )
      .then((res) => {
        setDataSnMesin(res?.data?.data);
        setloadingPO(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setloadingPO(false);
        setDataSnMesin([]);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = 'Bad Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  const getDataListCustomer = async () => {
    setloadingCustomer(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-customer`, config)
      .then((res) => {
        setDataCustomer(res?.data?.data);
        setloadingCustomer(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setloadingCustomer(false);
        setDataCustomer([]);
        console.log(err);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = 'Bad Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };
  const getDataListWarehouse = async () => {
    setloadingWarehouse(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-gudang`, config)
      .then((res) => {
        setDataWarehouse(
          res?.data?.data.map((value) => ({
            id: value.id,
            name: value.gudang_desc,
            object: value,
          }))
        );
        // setDataWarehouse(res?.data?.data);
        setloadingWarehouse(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataWarehouse([]);
        setloadingWarehouse(false);
        console.log(err);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = 'Bad Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };
  const getDataListModel = async () => {
    setloadingModel(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-model`, config)
      .then((res) => {
        // console.log(res)
        setDataModel(res?.data?.data);
        setloadingModel(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataModel([]);
        setloadingModel(false);
        console.log(err);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = 'Bad Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };
  // console.log(body.model, 'body.model ');
  useEffect(() => {
    if (body?.id_po !== null) {
      getDataListSnMesin();
    }
  }, [body?.id_po]);
  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'idPO':
        getDataListPO();
        // props.getDataPoById();
        break;
      case 'idCustomer':
        getDataListCustomer();
        break;
      case 'idModel':
        getDataListModel();
        break;
      case 'idWarehouse':
        getDataListWarehouse();
        break;
      default:
    }
  };
  // console.log(Datapo, 'dataa')
  return (
    <div className="m-10">
      {/* po */}
      <div>
        <Autocomplete
          disablePortal
          id="idPO"
          options={Datapo}
          value={body?.id_po}
          fullWidth
          onFocus={handleFocus}
          getOptionLabel={(n) => (n?.no_po === undefined ? '' : n?.no_po)}
          // getOptionSelected={(option) => option?.body?.id_po?.id === option?.body?.id_po?.id }
          isOptionEqualToValue={(option, value) => option?.id === value}
          loading={loadingPO === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setid_po(null);
            }
            if (newValue) {
              setBody.setid_po(newValue);
            } else {
              setBody.setid_po(null);
            }
          }}
          renderInput={(params) => (
            <TextField
              value={body.customer}
              {...params}
              label="NO PO*"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
      <div className="mt-5 mb-5">
        <Autocomplete
          // className="mb-10"
          id="type"
          disabled={body?.id_po === null}
          noOptionsText="No Option Available"
          // disabled={
          //   user_info[0].roles !== 'SUPER_ADMIN' ||
          //   user_info[0].roles !== 'ADMIN' ||
          //   user_info[0].roles !== 'SUPERVISOR' ||
          //   user_info[0].roles !== 'OPERATOR_MOVER' ||
          //   user_info[0].roles !== 'OPERATOR_DIP'
          // }
          value={body?.snMesin?.snMesin}
          // style={{ width: 300 }}
          getOptionSelected={(option, value) => option?.snMesin === value.snMesin}
          getOptionLabel={(option) => option?.snMesin}
          getOptionDisabled={(option) => option.id === 'error'}
          options={DataSnMesin}
          // loading={triggerLoadSNMesin}
          onChange={(event, newValue) => {
            if (newValue) {
              setBody.setsnMesin(newValue);
            } else {
              setBody.setsnMesin(null);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="SN Mesin"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
      {/* customer  */}
      {/* <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idCustomer"
          options={DataCustomer}
          value={body?.customer?.id}
          fullWidth
          onFocus={handleFocus}
          getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
          getOptionSelected={(option) => option?.body?.customer?.bank_desc}
          loading={loadingCustomer === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setid_po(null);
            }
            if (newValue) {
              // console.log(newValue?.id);
              setBody.setcustomer(newValue?.id);
            } else {
              setBody.setcustomer(null);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div> */}
      {/* warehouse  */}
      <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idWarehouse"
          options={DataWarehouse}
          value={body?.nama_gudang?.id}
          fullWidth
          onFocus={handleFocus}
          getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionDisabled={(option) => option.id === 'error'}
          loading={loadingBatch === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setnama_gudang(null);
            }
            if (newValue) {
              setBody?.setnama_gudang(newValue?.id);
            } else {
              setBody.setnama_gudang(null);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Warehouse"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
      <div className="mt-5 mb-5">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="tglTerima"
            name="tglTerima"
            label="Arrival Date"
            // disabled={
            //   user_info[0].roles !== 'SUPER_ADMIN' ||
            //   user_info[0].roles !== 'ADMIN' ||
            //   user_info[0].roles !== 'SUPERVISOR' ||
            //   user_info[0].roles !== 'OPERATOR_MOVER' ||
            //   user_info[0].roles !== 'OPERATOR_DIP'
            // }
            dateFormat="dd/MM/yyyy"
            value={moment(body?.tgl_tiba).format('YYYY-MM-DD HH:mm:00')}
            onChange={(date) => {
              setBody?.settgl_tiba(date);
            }}
            renderInput={(params) => <TextField {...params} className="mb-4" />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
