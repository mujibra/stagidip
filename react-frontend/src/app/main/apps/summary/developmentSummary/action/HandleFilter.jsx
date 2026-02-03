/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/prefer-default-export */
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const HandleFilter = (props) => {
  const body = props?.body;
  const setBody = props?.setBody;
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
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [DataModel, setDataModel] = useState([]);
  const [DataStyle, setDataStyle] = useState([]);
  const [DataType, setDataType] = useState([]);
  const [loadingPO, setloadingPO] = useState(true);
  const [loadingWarehouse, setloadingWarehouse] = useState(true);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [loadingModel, setloadingModel] = useState(true);
  const [loadingStyle, setloadingStyle] = useState(true);
  const [loadingPicStagging, setloadingPicStagging] = useState(true);
  const [loadingType, setloadingType] = useState(true);
  const [loadingBrand, setloadingBrand] = useState(true);
  const [loadingBatch, setloadingBatch] = useState(true);
  // console.log(DataModel, 'DataModel');

  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-po`, config)
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
          messages = 'Unauthorized!!';
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
          messages = 'Unauthorized!!';
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
          messages = 'Unauthorized!!';
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
          messages = 'Unauthorized!!';
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
  const getDataListStyle = async () => {
    setloadingStyle(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-style`, config)
      .then((res) => {
        // console.log(res)
        setDataStyle(res?.data?.data);
        setloadingStyle(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataStyle([]);
        setloadingStyle(false);
        console.log(err);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
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
    if (body?.model !== '') {
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-mesin/${body?.model}`,
          config
        )
        .then((res) => {
          // console.log(res, 'res');
          setDataType(res?.data?.data);
          setloadingType(false);
        })
        .catch((err) => {
          setDataType([]);
          setloadingType(false);
          console.log(err);
          const errStatus = err.response.status;
          let messages = '';
          if (errStatus === 401) {
            messages = 'Unauthorized!!';
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
    }
  }, [body?.model]);
  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      // case 'idPO':
      //   getDataListPO();
      //   // props.getDataPoById();
      //   break;
      case 'idCustomer':
        getDataListCustomer();
        break;
      case 'idModel':
        getDataListModel();
        break;
      case 'idWarehouse':
        getDataListWarehouse();
        break;
      case 'idStyle':
        getDataListStyle();
        break;
      default:
    }
  };
  // console.log(body);
  return (
    <div className="m-10">
      {/* po */}
      {/* <div>
        <Autocomplete
          disablePortal
          id="idPO"
          options={Datapo}
          value={body?.id_po}
          fullWidth
          onFocus={handleFocus}
          getOptionLabel={(n) => (n?.no_po_master === undefined ? '' : n?.no_po_master)}
          getOptionSelected={(option) => option?.body?.no_po_master}
          loading={loadingPO === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setid_po('');
            }
            if (newValue) {
              setBody.setid_po(newValue);
            } else {
              setBody.setid_po('');
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
      </div> */}

       {/* warehouse  */}
       <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idWarehouse"
          options={DataWarehouse}
          value={body?.nama_gudang?.id}
          fullWidth
          // disabled={body?.customer === ''}
          onFocus={handleFocus}
          getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionDisabled={(option) => option.id === 'error'}
          loading={loadingBatch === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setnama_gudang('');
              // setBody.setmodel('');
              // setBody.setid_type_mesin('');
              // setBody.setid_po('');
            }
            if (newValue) {
              setBody?.setnama_gudang(newValue?.id);
            } else {
              setBody.setnama_gudang('');
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
      {/* customer  */}
      <div className="mt-5 mb-5">
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
              setBody.setid_po('');
            }
            if (newValue) {
              // console.log(newValue?.id);
              setBody.setcustomer(newValue?.id);
            } else {
              setBody.setcustomer('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer"
              // helperText={body?.customer === '' ? 'Pilih Customer Terlebih Dahulu' : ''}
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
      {/* model  */}
      <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idModel"
          onFocus={handleFocus}
          options={DataModel}
          value={body?.models?.id}
          fullWidth
          getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
          getOptionSelected={(option) => option?.label === body.models.name}
          loading={loadingModel === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setmodels('');
              // setBody.setid_type_mesin('');
              // setBody.setid_po('');
            }
            if (newValue) {
              setBody?.setmodels(newValue.id);
            } else {
              setBody.setmodels('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
      {/* type  */}
      {/* <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idType"
          options={DataType}
          value={body?.id_type_mesin?.id}
          fullWidth
          disabled={body?.model === ''}
          onFocus={handleFocus}
          getOptionLabel={(n) => (body.model === '' ? '' : n?.type)}
          getOptionSelected={(option) => option?.type === body.id_type_mesin}
          focused
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody?.setid_type_mesin('');
              // setBody?.setid_po('');
            }
            if (newValue) {
              setBody?.setid_type_mesin(newValue.id);
            } else {
              setBody?.setid_type_mesin('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Model"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div> */}

      {/* style */}
      <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idStyle"
          onFocus={handleFocus}
          options={DataStyle}
          value={body?.styles?.id}
          fullWidth
          getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
          getOptionSelected={(option) => option?.label === body.styles.name}
          loading={loadingStyle === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setstyles('');
              // setBody.setid_type_mesin('');
              // setBody.setid_po('');
            }
            if (newValue) {
              setBody?.setstyles(newValue.id);
            } else {
              setBody.setstyles('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Style"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>

      {/* status machine */}
      <div className="mt-5 mb-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status Machine</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={body.status_mesin}
            label="Status Machine"
            onChange={(e) => setBody?.setstatus_mesin(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Old Machine">Old Machine</MenuItem>
            <MenuItem value="New Machine">New Machine</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* process */}
      <div className="mt-5 mb-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Process</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={body.process_wr}
            label="Process"
            onChange={(e) => setBody?.setprocess_wr(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Staging">Staging</MenuItem>
            <MenuItem value="Warehouse Transfer">Warehouse Transfer</MenuItem>
          </Select>
        </FormControl>
      </div>
       {/* tgl */}
       <div className="mt-10 mb-5">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="from_date"
            name="from_date"
            label="From Date"
            dateFormat="dd/MM/yyyy"
            value={moment(body?.from_date).format('YYYY-MM-DD HH:mm:00')}
            onChange={(date) => {
              setBody?.setfrom_date(date);
            }}
            renderInput={(params) => <TextField {...params} className="mb-4" />}
          />
        </LocalizationProvider>
      </div>
      {/* tgl */}
      <div className="mt-5 mb-5">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="to_date"
            name="to_date"
            label="To Date"
            dateFormat="dd/MM/yyyy"
            value={moment(body?.to_date).format('YYYY-MM-DD HH:mm:00')}
            onChange={(date) => {
              setBody?.setto_date(date);
            }}
            renderInput={(params) => <TextField {...params} className="mb-4" />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
