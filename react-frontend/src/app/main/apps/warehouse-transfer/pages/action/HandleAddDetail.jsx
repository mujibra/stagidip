/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Button,
  CircularProgress,
  // FormControl,
  Icon,
  IconButton,
  InputAdornment,
  // InputLabel,
  // MenuItem,
  // Select,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

// const useStyles = makeStyles((theme) => ({
//   link: {
//     color: theme.palette.secondary.contrastText,
//   },
//   cardRoot: {
//     padding: '0px',
//     minWidth: '100%',
//   },
// }));
const useStyles = makeStyles((_theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

const HandleAddDetail = (props) => {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const { getDatasPoById } = props;
  const classes = useStyles();
  const { api } = props;
  const { getAccessToken } = props;
  const { body } = props;
  const { newBody } = props;
  const { setBody } = props;
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('DD MMMM YYYY');
  const [loadingPicStagging, setloadingPicStagging] = useState(true);
  const [loadingWarehouse, setloadingWarehouse] = useState(true);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [loadingPO, setloadingPO] = useState(true);
  const [loadingSnMesin, setloadingSnMesin] = useState(true);

  const [listDataPicMitra, setlistDataPicMitra] = useState([]);
  const [Datapo, setDatapo] = useState([]);
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [getDataPoById, setDataPoById] = useState([]);
  const [getLoadingDataPoById, setLoadingDataPoById] = useState([]);
  const [valueCust, setValueCust] = useState();

  const [getDataSNMesin, setDataSNMesin] = useState([]);

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

  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      // .get(`${api}purchaseOrder/${userRolesId}`, config)
      .get(`${api}purchaseOrder/${getUser[0]?.id}`, config)
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
      .get(`${api}master-customer`, config)
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
  const getDataListPicMitra = async () => {
    setloadingPicStagging(true);
    const response = await axios
      .get(`${api}picmitra`, config)
      .then((res) => {
        setlistDataPicMitra(res?.data?.data);
        setloadingPicStagging(false);
        // console.log(res.data, 'DATA');
      })
      .catch((err) => {
        setloadingPicStagging(false);
        setlistDataPicMitra([]);
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
      .get(`${api}master-gudang`, config)
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
      case 'idWarehouse':
        getDataListWarehouse();
        break;
      case 'idPicMitra':
        getDataListPicMitra();
        break;
      default:
    }
  };
  useEffect(() => {
    // console.log('ceeekIdPoss', body.id_po);
    if (body.id_po !== 0) {
      axios
        .get(`${api}purchaseOrder/${body?.id_po}/datas`, config)
        .then((res) => {
          // console.log(res, 'res');
          setDataPoById(res?.data?.data);
          setLoadingDataPoById(false);
        })
        .catch((err) => {
          setDataPoById([]);
          setLoadingDataPoById(false);
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

          if (errStatus !== 404) {
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
          }
        });

      // add by ardie 2023-04-06
      axios
        .get(`${api}allsnmesin/${body?.id_po}`, config)
        .then((res) => {
          // console.log('ceeeSNMeesin', res);
          setDataSNMesin(res?.data?.data);
        })
        .catch((error) => {
          setDataSNMesin([]);
        });
    }
  }, [body.id_po]);

  const [getErrTgl, setgetErrTgl] = useState(false);
  const [getLengthPN, setgetLengthPN] = useState(0);
  const tglMasuk = moment(body.tgl_masuk).format('L');
  const tglKeluar = moment(body.tgl_staging).format('L');
  useEffect(() => {
    if (tglMasuk < tglKeluar) {
      setgetErrTgl(false);
    } else if (tglMasuk === tglKeluar) {
      setgetErrTgl(false);
    } else {
      setgetErrTgl(true);
    }
  }, [tglMasuk, tglKeluar]);

  const [open, setOpen] = useState(false);
  // console.log(body, 'jumlah');
  // console.log(body?.sn_mesins?.length, 'body');

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 md:w-auto items-left">
        <div>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              {/* {console.log(body?.id_po, 'body?.id_po')} */}
              <div className=" w-full flex gap-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  id="idPO"
                  options={Datapo}
                  value={body?.id}
                  fullWidth
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.no_po === undefined ? '' : n?.no_po)}
                  getOptionSelected={(option) => option?.body?.no_po}
                  loading={loadingPO === true}
                  onChange={(_event, newValue, reason) => {
                    if (reason === 'clear') {
                      setBody.setid_po('');
                      // setBody.settgl_po(null);
                      setBody.setid_customer({
                        id: null,
                        name: '',
                      });
                    }
                    if (newValue) {
                      // setBody.setno_po(newValue?.no_po);
                      setBody.setid_po(newValue?.id);
                    } else {
                      // setBody.setno_po('');
                      setBody.setid_po('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={body.id_customer}
                      {...params}
                      label="No PO*"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
                {body?.id_po === '' ? (
                  <>
                    {/* {console.log('1')} */}
                    <Autocomplete
                      disablePortal
                      id="idCustomer"
                      options={DataCustomer}
                      value={body?.id_customer?.id}
                      fullWidth
                      disabled
                      onFocus={handleFocus}
                      getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                      getOptionSelected={(option) => option?.body?.id_customer?.bank_desc}
                      loading={loadingCustomer === true}
                      onChange={(_event, newValue, reason) => {
                        if (newValue) {
                          setBody.setid_customer(newValue?.id);
                        } else {
                          setBody.setid_customer({
                            id: null,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          value={body.id_customer}
                          {...params}
                          label="Customer"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="idFromWarehouse"
                      options={DataWarehouse}
                      value={body.from_warehouse?.id}
                      fullWidth
                      disabled
                      onFocus={handleFocus}
                      getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                      getOptionSelected={(option, value) => option.name === value.name}
                      getOptionDisabled={(option) => option.id === 'error'}
                      loading={loadingWarehouse === true}
                      onChange={(_event, newValue) => {
                        if (newValue) {
                          // console.log(newValue, 'newValue');
                          setBody.setfrom_warehouse(newValue?.id);
                        } else {
                          setBody.setfrom_warehouse('');
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Initial Warehouse"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                  </>
                ) : getDatasPoById[0]?.customer === null ? (
                  <>
                    {/* {console.log('2')} */}
                    <Autocomplete
                      disablePortal
                      id="idCustomer"
                      options={DataCustomer}
                      value={body?.id_customer.id}
                      fullWidth
                      onFocus={handleFocus}
                      getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                      // getOptionSelected={(option) => option?.id === body.id_customer.id}
                      getOptionSelected={(option) => option?.body.id_customer.bank_desc}
                      loading={loadingCustomer === true}
                      onChange={(_event, newValue) => {
                        // console.log(newValue.id, 'newValue.id');
                        if (newValue) {
                          // setBody.setid_customer({
                          //   id: null,
                          //   name: '',
                          // });
                          setBody.setid_customer(newValue.id);
                        } else {
                          setBody.setid_customer({
                            id: null,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          // value={body.customer}
                          {...params}
                          label="CustomerPObaru*"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {params.InputProps.endAdornment}
                                <Tooltip
                                  className="cursor-pointer"
                                  onClick={() => setOpen(true)}
                                  placement="top-end"
                                  title="Add Customer"
                                >
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      // title="Tambah Batch Baru"
                                    >
                                      <Icon>add_circle</Icon>
                                    </IconButton>
                                  </InputAdornment>
                                </Tooltip>
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      id="idFromWarehouse"
                      options={DataWarehouse}
                      value={body.from_warehouse?.id}
                      fullWidth
                      disabled
                      onFocus={handleFocus}
                      getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                      getOptionSelected={(option, value) => option.name === value.name}
                      getOptionDisabled={(option) => option.id === 'error'}
                      loading={loadingWarehouse === true}
                      onChange={(_event, newValue) => {
                        if (newValue) {
                          // console.log(newValue, 'newValue');
                          setBody.setfrom_warehouse(newValue?.id);
                        } else {
                          setBody.setfrom_warehouse('');
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Initial Warehouse"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                  </>
                ) : (
                  <>
                    {/* {console.log('3')} */}
                    <TextField
                      fullWidth
                      id="outlined-password-input"
                      label="Customer"
                      readOnly
                      disabled
                      value={body?.id_customer?.name}
                      onChange={(e) => {
                        setBody?.setid_customer(e.target.value);
                      }}
                    />
                    <TextField
                      fullWidth
                      id="outlined-password-input"
                      label="Initial Warehouse"
                      readOnly
                      disabled
                      value={body?.from_warehouse?.name}
                      onChange={(e) => {
                        setBody?.setfrom_warehouse(e.target.value);
                      }}
                    />
                  </>
                )}
              </div>
              {/* <Typography className="font-bold md:mt-10 mt-24 text-xs">PIC</Typography> */}
              <div className="w-full flex gap-10 mt-10 flex-col md:flex-row">
                <Autocomplete
                  disablePortal
                  id="idWarehouse"
                  options={DataWarehouse}
                  value={body.to_warehouse?.id}
                  fullWidth
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option, value) => option.name === value.name}
                  getOptionDisabled={(option) => option.id === 'error'}
                  loading={loadingWarehouse === true}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      // console.log(newValue, 'newValue');
                      setBody.setto_warehouse(newValue?.id);
                    } else {
                      setBody.setto_warehouse('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Destination warehouse"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
                <div className="w-full flex justify-center items-center">
                  <Autocomplete
                    disablePortal
                    id="idPicMitra"
                    options={listDataPicMitra}
                    value={body?.pic?.id}
                    fullWidth
                    onFocus={handleFocus}
                    getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                    getOptionSelected={(option) => option?.id === body.pic.name}
                    loading={loadingPicStagging === true}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        setBody.setpic(newValue?.id);
                      } else {
                        setBody.setpic('');
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        disabled={loadingPicStagging === true}
                        {...params}
                        label="PIC Staging"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
                </div>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Amount"
                  type="number"
                  // readOnly
                  // disabled
                  value={body?.jumlah}
                  error={body?.jumlah <= '0'}
                  // color={DateSettingTahun ? 'warning' : 'primary'}
                  helperText={body?.jumlah <= '0' ? '*Jumlah Tidak Boleh kurang dari 1!' : ''}
                  onChange={(e) => {
                    setBody?.setjumlah(e.target.value);
                    // setBody?.setstok(e.target.value);
                  }}
                />
              </div>
              &nbsp;
              {/* // add by ardie 2023-04-06 */}
              <div className="w-full">
                <Autocomplete
                  multiple
                  id="snMesins"
                  options={getDataSNMesin}
                  value={body?.snmesins?.idMesin}
                  fullWidth
                  filterSelectedOptions
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.snMesin === undefined ? '' : n?.snMesin)}
                  // getOptionSelected={(option) => option?.idMesin === body.snmesins.snMesin}
                  // getOptionSelected={(option) => console.log('ttt', option, body?.snmesins)}
                  getOptionSelected={(option) => console.log()}
                  loading={loadingSnMesin === true}
                  // disabled={body?.id === ''}
                  onChange={(_event, newValue) => {
                    // console.log('setChangeee', newValue);
                    if (newValue) {
                      // setBody.setpic(newValue?.id);
                      setBody.setsnmesins(newValue);
                    } else {
                      // setBody.setpic('');
                      setBody.setsnmesins([]);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={body?.jumlah < body?.sn_mesins?.length}
                      helperText={
                        body?.jumlah < body?.sn_mesins?.length
                          ? '*Machine SN Must Not Be More Than Amount!'
                          : ''
                      }
                      label="SN Mesin"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
              </div>
              {/* // end of add by ardie 2023-04-06 */}
              {/* {console.log( moment(body.tgl_staging).format('l'), '-',  moment(body.tgl_masuk).format('l'))} */}
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Departure Date"
                        // maxDate={new Date()}
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        // value={moment(body.tgl_masuk).format('YYYY-DD-MM')}
                        value={body.tgl_keluar}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setBody.settgl_keluar(newValue);
                          } else {
                            setBody.settgl_keluar(null);
                          }
                        }}
                        // disabled={body.tahun_produksi === null}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            FormHelperTextProps={{
                              className: classes.helperText,
                            }}
                            error={getErrTgl}
                            color={getErrTgl === true ? 'error' : 'primary'}
                          />
                        )}
                        // views={['year']}
                        // views={['day','year', 'month']}
                        placeholderText="Please select a date"
                        // maxDate={new Date()}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Entry Date"
                        // maxDate={new Date()}
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        // value={moment(body.tgl_masuk).format('YYYY-DD-MM')}
                        value={body.tgl_masuk}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setBody.settgl_masuk(newValue);
                          } else {
                            setBody.settgl_masuk(null);
                          }
                        }}
                        // disabled={body.tahun_produksi === null}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            FormHelperTextProps={{
                              className: classes.helperText,
                            }}
                            error={getErrTgl}
                            color={getErrTgl === true ? 'error' : 'primary'}
                          />
                        )}
                        // views={['year']}
                        // views={['day','year', 'month']}
                        placeholderText="Please select a date"
                        // maxDate={new Date()}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Staging Plan Date"
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        // value={moment(body.tgl_staging).format('YYYY-MM-YY')}
                        value={body.tgl_staging}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setBody.settgl_staging(newValue);
                          } else {
                            // console.log('null');
                            setBody.settgl_staging(null);
                          }
                        }}
                        // disabled={body.tgl_masuk === null}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            FormHelperTextProps={{
                              className: classes.helperText,
                            }}
                            error={getErrTgl}
                            color={getErrTgl === true ? 'error' : 'primary'}
                            helperText={
                              getErrTgl === true
                                ? '*Staging plan date cannot be later than the entry date*'
                                : ''
                            }
                            // focused
                          />
                        )}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <div>
          <div className="flex justify-end mt-10">
            <Button variant="contained" onClick={props.handleClose} className="mr-5">
              Close
            </Button>
            {props.loading === true ? (
              <Button
                disabled
                onClick={props.HandleSubmit}
                variant="contained"
                startIcon={<CircularProgress size="2rem" />}
              >
                <div className="hidden md:contents">Loading</div>
              </Button>
            ) : (
              <Button
                disabled={
                  body.id_po === '' ||
                  body.from_warehouse === '' ||
                  body.pic === '' ||
                  body?.jumlah < body?.sn_mesins?.length ||
                  // body.tgl_keluar === null ||
                  // body.tgl_masuk === null ||
                  // body.tgl_staging === null ||
                  body.id_customer === '' ||
                  body?.jumlah <= '0'
                }
                onClick={props.HandleSubmit}
                variant="contained"
                // startIcon={<PlaylistAddIcon />}
              >
                <div className="hidden md:contents">Save</div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
};

export default HandleAddDetail;
