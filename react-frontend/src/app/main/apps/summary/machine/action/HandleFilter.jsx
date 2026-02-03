/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/prefer-default-export */
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, TextField } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const HandleFilter = props => {
  const body = props?.body;
  const setBody = props?.setBody;
  const getUser = props?.getUser[0];
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
  // console.log(Datapo, 'datapooo');
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [DataModel, setDataModel] = useState([]);
  const [DataBatch, setDataBatch] = useState([]);

  const [DataType, setDataType] = useState([]);
  const [loadingPO, setloadingPO] = useState(true);
  const [loadingWarehouse, setloadingWarehouse] = useState(true);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [loadingModel, setloadingModel] = useState(true);
  const [loadingPicStagging, setloadingPicStagging] = useState(true);
  const [loadingType, setloadingType] = useState(true);
  const [loadingBrand, setloadingBrand] = useState(true);
  const [loadingBatch, setloadingBatch] = useState(true);
  // console.log(DataModel, 'DataModel');

  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-po`,
        config
      )
      .then(res => {
        setDatapo(res?.data?.data);
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
  const getDataListWarehouse = async () => {
    setloadingWarehouse(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-gudang`,
        config
      )
      .then(res => {
        setDataWarehouse(
          res?.data?.data.map(value => ({
            id: value.id,
            name: value.gudang_desc,
            object: value,
          }))
        );
        // setDataWarehouse(res?.data?.data);
        setloadingWarehouse(false);
        // console.log(res.data);
      })
      .catch(err => {
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
  const getDataListBatch = async () => {
    setloadingModel(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}bacth`, config)
      .then(res => {
        // console.log(res)
        setDataBatch(res?.data?.data);
        setloadingBatch(false);
        // console.log(res.data);
      })
      .catch(err => {
        setDataBatch([]);
        setloadingBatch(false);
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
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getBatchOnPoMaster/${body?.id_po}`
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
  // console.log(body.id_po, 'body.id_po ');
  useEffect(() => {
    if (body?.id_po !== '') {
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getBatchOnPoMaster/${body?.id_po?.id}`,
          config
        )
        .then(res => {
          // console.log(res, 'res');
          setDataType(res?.data?.data);
          setloadingType(false);
        })
        .catch(err => {
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
  }, [body?.id_po?.id]);
  const handleFocus = e => {
    const getId = e.target.id;
    switch (getId) {
      case 'idPO':
        getDataListPO();
        // props.getDataPoById();
        break;
      case 'idCustomer':
        getDataListCustomer();
        break;
      case 'idBatch':
        getDataListBatch();
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
  // console.log(body);
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
          getOptionLabel={n =>
            n?.no_po_master === undefined ? '' : n?.no_po_master
          }
          getOptionSelected={option => option?.body?.no_po}
          loading={loadingPO === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setid_po('');
              setBody.setbatch('');
            }
            if (newValue) {
              setBody.setid_po(newValue);
              setBody.setbatch('');
            } else {
              setBody.setid_po('');
              setBody.setbatch('');
            }
          }}
          renderInput={params => (
            <TextField
              value={body.customer}
              {...params}
              label="No PO"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>

      {/* batch  */}
      <div className="mt-5 mb-5">
        <Autocomplete
          disablePortal
          id="idBatch"
          onFocus={handleFocus}
          options={DataType}
          value={body?.batch?.id}
          fullWidth
          getOptionLabel={n => (n?.name === undefined ? '' : n?.name)}
          getOptionSelected={option => option?.label === body.batch.name}
          loading={loadingBatch === true}
          onChange={(_event, newValue, reason) => {
            if (reason === 'clear') {
              setBody.setbatch('');
            }
            if (newValue) {
              setBody?.setbatch(newValue.id);
            } else {
              setBody.setbatch('');
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Batch"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};
