/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/prefer-default-export */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import moment from 'moment';
import { Autocomplete, TextField } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const HandleFilter = props => {
  const body = props?.body;
  // console.log(body, 'bodyyyyyy');
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
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`,
        {},
        config
      )
      .then(res => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };
  const dispatch = useDispatch();
  const [Datapo, setDatapo] = useState([]);
  // console.log(Datapo, 'datapo');
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataDateFrom, setdataDatefrom] = useState([]);
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
  const getUser = props?.getUser[0];
  // console.log(getUser, 'getUser');
  // console.log(DataModel, 'DataModel');

  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      .get(
        `${
          process.env.REACT_APP_API_URL_API_DATINDO_LOCAL
        }getPoBySpekDateFromTo/${moment(body?.datefrom).format(
          'YYYY-MM-DD HH:mm:00'
        )}/${moment(body?.dateTo).format('YYYY-MM-DD HH:mm:00')}`,
        config
      )
      .then(res => {
        setDatapo(res?.data?.datas);
        setloadingPO(false);
        // console.log(res.data);
      })
      .catch(err => {
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
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-customer`,
        config
      )
      .then(res => {
        setDataCustomer(res?.data?.data);
        setloadingCustomer(false);
        // console.log(res.data);
      })
      .catch(err => {
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
  const getDataListDateFrom = async () => {
    setloadingWarehouse(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-gudang`,
        config
      )
      .then(res => {
        setdataDatefrom(
          res?.data?.data.map(value => ({
            id: value.id,
            name: value.gudang_desc,
            object: value,
          }))
        );
        // setdataDatefrom(res?.data?.data);
        setloadingWarehouse(false);
        // console.log(res.data);
      })
      .catch(err => {
        setdataDatefrom([]);
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
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-model`,
        config
      )
      .then(res => {
        // console.log(res)
        setDataModel(res?.data?.data);
        setloadingModel(false);
        // console.log(res.data);
      })
      .catch(err => {
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
  // console.log(moment(body?.datefrom).format('YYYY/MM/DD'), 'body?.datefrom');
  useEffect(() => {
    if (body?.datefrom !== null && body?.dateTo !== null) {
      axios
        .get(
          `${
            process.env.REACT_APP_API_URL_API_DATINDO_LOCAL
          }getPoBySpekDateFromTo/${
            body?.datefrom === null
              ? null
              : moment(body?.datefrom).format('YYYY-MM-DD')
          }/${
            body?.dateTo === null
              ? null
              : moment(body?.dateTo).format('YYYY-MM-DD')
          }`,
          config
        )
        .then(res => {
          // console.log(res, 'res date');
          setDatapo(res?.data?.datas);
          setDataType(res?.data?.data);
          setloadingType(false);
        })
        .catch(err => {
          setDataType([]);
          setDatapo([]);
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
  }, [body?.datefrom, body?.dateTo]);
  const handleFocus = e => {
    const getId = e.target.id;
    switch (getId) {
      case 'idPO':
        // getDataListPO();
        // props.getDataPoById();
        break;
      case 'idCustomer':
        getDataListCustomer();
        break;
      case 'idModel':
        getDataListModel();
        break;
      case 'idDateFrom':
        getDataListDateFrom();
        break;
      default:
    }
  };
  // console.log(body);
  return (
    <div className="m-10">
      {/* tgl */}
      <div className="mt-10 mb-5">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="datefrom"
            name="datefrom"
            label="From Date"
            dateFormat="dd/MM/yyyy"
            value={moment(body?.datefrom).format('YYYY-MM-DD HH:mm:00')}
            onChange={date => {
              setBody?.setDatefrom(date);
            }}
            renderInput={params => <TextField {...params} className="mb-4" />}
          />
        </LocalizationProvider>
      </div>
      {/* tgl */}
      <div className="mt-5 mb-5">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="dateTo"
            name="dateTo"
            label="To Date"
            dateFormat="dd/MM/yyyy"
            value={moment(body?.dateTo).format('YYYY-MM-DD HH:mm:00')}
            onChange={date => {
              setBody?.setDateTo(date);
            }}
            renderInput={params => <TextField {...params} className="mb-4" />}
          />
        </LocalizationProvider>
      </div>
      {/* po */}
      <div>
        <Autocomplete
          disablePortal
          id="idPO"
          options={Datapo}
          value={body?.id_po}
          disabled={body?.datefrom === null && body?.dateTo === null}
          fullWidth
          onFocus={handleFocus}
          getOptionLabel={n => (n?.no_po === undefined ? '' : n?.no_po)}
          getOptionSelected={option => option?.body?.no_po}
          loading={loadingPO === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setid_po('');
              setBody?.setDateTo('');
            }
            if (newValue) {
              setBody.setid_po(newValue);
            } else {
              setBody.setid_po('');
            }
          }}
          renderInput={params => (
            <TextField
              // value={body.customer}
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

      {/* model  */}
      {/* <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idModel"
          onFocus={handleFocus}
          options={DataModel}
          value={body?.model?.id}
          fullWidth
          getOptionLabel={n => (n?.name === undefined ? '' : n?.name)}
          getOptionSelected={option => option?.label === body.model.name}
          loading={loadingModel === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setmodel('');
              setBody.setid_type_mesin('');
              // setBody.setid_po('');
            }
            if (newValue) {
              setBody?.setmodel(newValue.id);
            } else {
              setBody.setmodel('');
            }
          }}
          renderInput={params => (
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
      </div> */}
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
          getOptionLabel={n => (body.model === '' ? '' : n?.type)}
          getOptionSelected={option => option?.type === body.id_type_mesin}
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
          renderInput={params => (
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
    </div>
  );
};
