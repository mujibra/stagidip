/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
// import PartNumber from '../../mockData/PartNumber';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

export default function HandleEditDetail(props) {
  const dispatch = useDispatch();
  const userRoles = props?.userRoles;
  const dataById = props?.dataById;
  const getJumlahEdit = dataById?.purchaseOrder?.jumlah - dataById?.jumlah;
  const classes = useStyles();
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
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
  const { dataEdit, setDataEdit } = props;
  const [value, setValue] = useState(props.dataEdit);
  const [tglKeluar, settglKeluar] = useState(dataEdit?.tgl_keluar);
  const [tglMasuk, settglMasuk] = useState(dataEdit?.tgl_masuk);
  const [tglStaging, settglStaging] = useState(dataEdit?.tgl_staging);

  // handleGetPo
  const [openPo, setopenPo] = useState(false);
  const [optionPo, setoptionPo] = useState([]);
  const [valuePo, setvaluePo] = useState({
    name: value?.id_po?.no_po || '',
    id: value?.id_po?.id || '',
    json: value || null,
  });

  const loadingPo = openPo && optionPo.length === 0;
  const [triggerPo, settriggerPo] = useState(true);

  // useEffect(() => {
  //   settriggerPo(true);
  //   axios
  //     .get(`${api}purchaseOrder`, config)
  //     .then((response) => {
  //       const jsonResult = response?.data?.data;
  //       // console.log(jsonResult, 'jsonResult');

  //       const dataPo = jsonResult.map((data) => {
  //         return {
  //           id: data.id,
  //           name: data.no_po,
  //           json: data,
  //         };
  //       });

  //       setoptionPo(dataPo);
  //       settriggerPo(false);
  //     })
  //     .catch((err) => {
  //       setoptionPo([]);
  //       settriggerPo(false);
  //       const errStatus = err.response.status;
  //       const errMessage = err.response.data.message;
  //       let messages = '';
  //       if (errStatus === 401) {
  //         messages = 'Unauthorized!!';
  //         window.location.href = '/login';
  //         handleLogout();
  //       } else if (errStatus === 500) {
  //         messages = 'Server Error!!';
  //       } else if (errStatus === 404) {
  //         messages = 'Not Found Error!!!';
  //       } else if (errStatus === 408) {
  //         messages = 'TimeOut Error!!';
  //       } else if (errStatus === 400) {
  //         messages = errMessage;
  //       } else {
  //         messages = 'Something Wrong!!';
  //       }
  //       dispatch(
  //         showMessage({
  //           message: messages,
  //           autoHideDuration: 2000,
  //           anchorOrigin: {
  //             vertical: 'top',
  //             horizontal: 'center',
  //           },
  //           variant: 'error',
  //         })
  //       );
  //       console.log(err);
  //     });
  // }, [loadingPo]);

  // handlegetcustomer
  const [openCustomer, setopenCustomer] = useState(false);
  const [optionCustomer, setoptionCustomer] = useState([]);
  const [valueCustomer, setvalueCustomer] = useState({
    name: value?.customer?.bank_desc || '',
    id: value?.customer?.id || '',
    json: value || null,
  });

  const loadingCustomer = openCustomer && optionCustomer.length === 0;
  const [triggerCustomer, settriggerCustomer] = useState(true);

  useEffect(() => {
    settriggerCustomer(true);
    axios
      .get(`${api}master-customer`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataCustomer = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.bank_desc,
            json: data,
          };
        });

        setoptionCustomer(dataCustomer);
        settriggerCustomer(false);
      })
      .catch((err) => {
        setoptionCustomer([]);
        settriggerCustomer(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
          messages = errMessage;
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
  }, [loadingCustomer]);

  // handleFromWarehouse
  const [openFromWarehouse, setopenFromWarehouse] = useState(false);
  const [optionFromWarehouse, setoptionFromWarehouse] = useState([]);
  const [valueFromWarehouse, setvalueFromWarehouse] = useState({
    name: value?.gudang?.gudang_desc || '',
    id: value?.gudang?.id || '',
    json: value || null,
  });

  const loadingFromWarehouse = openFromWarehouse && optionFromWarehouse.length === 0;
  const [triggerFromWarehouse, settriggerFromWarehouse] = useState(true);

  useEffect(() => {
    settriggerFromWarehouse(true);
    axios
      .get(`${api}master-gudang`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataWarehouse = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.gudang_desc,
            json: data,
          };
        });

        setoptionFromWarehouse(dataWarehouse);
        settriggerFromWarehouse(false);
      })
      .catch((err) => {
        setoptionFromWarehouse([]);
        settriggerFromWarehouse(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
          messages = errMessage;
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
  }, [loadingFromWarehouse]);

  // handleToWarehouse
  const [openToWarehouse, setopenToWarehouse] = useState(false);
  const [optionToWarehouse, setoptionToWarehouse] = useState([]);
  const [valueToWarehouse, setvalueToWarehouse] = useState({
    name: value?.to_warehouse?.gudang_desc || '',
    id: value?.to_warehouse?.id || '',
    json: value || null,
  });

  const loadingToWarehouse = openToWarehouse && optionToWarehouse.length === 0;
  const [triggerToWarehouse, settriggerToWarehouse] = useState(true);

  useEffect(() => {
    settriggerToWarehouse(true);
    axios
      .get(`${api}master-gudang`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataWarehouse = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.gudang_desc,
            json: data,
          };
        });

        setoptionToWarehouse(dataWarehouse);
        settriggerToWarehouse(false);
      })
      .catch((err) => {
        setoptionToWarehouse([]);
        settriggerToWarehouse(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
          messages = errMessage;
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
  }, [loadingToWarehouse]);

  // handlePicSttaging
  const [openPicSttaging, setopenPicSttaging] = useState(false);
  const [optionPicSttaging, setoptionPicSttaging] = useState([]);
  const [valuePicSttaging, setvaluePicSttaging] = useState({
    name: value?.pic?.name || '',
    id: value?.pic?.id || '',
    json: value || null,
  });

  const loadingPicSttaging = openPicSttaging && optionPicSttaging.length === 0;
  const [triggerPicSttaging, settriggerPicSttaging] = useState(true);

  useEffect(() => {
    settriggerPicSttaging(true);
    axios
      .get(`${api}picmitra`, config)
      .then((response) => {
        const jsonResult = response.data.data;

        const dataPicSttaging = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionPicSttaging(dataPicSttaging);
        settriggerPicSttaging(false);
      })
      .catch((err) => {
        setoptionPicSttaging([]);
        settriggerPicSttaging(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
          messages = errMessage;
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
  }, [loadingPicSttaging]);

  // add by ardie 2023-04-06
  // handle SNMesin
  // console.log('CeekVaaal', value);
  const [openSNMesin, setOpenSNMesin] = useState(false);
  const [optionSNMesin, setoptionSNMesin] = useState([]);
  const [valueSNMesin, setValueSNMesin] = useState(value?.sn_mesins);

  const loadingSNMesin = openSNMesin && optionSNMesin.length === 0;
  const [triggerSNMesin, settriggerSNMesin] = useState(true);

  useEffect(() => {
    settriggerSNMesin(true);
    axios
      .get(`${api}allsnmesin/${dataEdit?.purchaseOrder?.id}`, config)
      .then((res) => {
        // console.log('reesss', res);
        const json_result = res.data.data;

        const data_snMesin = json_result.map((data) => {
          return {
            id: data.idMesin,
            name: data.snMesin,
            json: data,
          };
        });
        // console.log('CeekAlMesiiin', data_snMesin);
        setoptionSNMesin(json_result);
        settriggerSNMesin(false);
      })
      .catch((err) => {
        setoptionSNMesin([]);
        settriggerSNMesin(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
          messages = errMessage;
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
  }, [dataEdit?.purchaseOrder]);
  // console.log(valueSNMesin, 'valueSNMesin');

  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-16 sm:p-24 w-xl items-left">
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
              <div className=" w-full flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="No PO"
                  readOnly
                  disabled
                  value={dataEdit?.purchaseOrder?.po_master?.no_po_master}
                  onChange={(e) => setDataEdit({ ...dataEdit, id_po: e.target.value })}
                />
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Customer"
                  readOnly
                  disabled
                  value={dataEdit?.id_customer?.bank_desc}
                  onChange={(e) => setDataEdit({ ...dataEdit, id_customer: e.target.value })}
                />
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Initial Warehouse"
                  readOnly
                  disabled
                  value={dataEdit?.from_warehouse?.gudang_desc}
                  onChange={(e) => setDataEdit({ ...dataEdit, from_warehouse: e.target.value })}
                />
              </div>
              <div className="w-full flex gap-10 mt-10 flex-col md:flex-row">
                <Autocomplete
                  disablePortal
                  id="idToWarehouse"
                  options={optionToWarehouse}
                  readOnly={userRoles === 'GUEST'}
                  noOptionsText="No Option Available"
                  onOpen={() => {
                    setopenToWarehouse(true);
                  }}
                  onClose={() => {
                    setopenToWarehouse(false);
                  }}
                  value={valueToWarehouse}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  getOptionreadOnly={(option) => option.id === 'error'}
                  loading={loadingToWarehouse === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueToWarehouse(newValue);
                      setDataEdit({ ...dataEdit, to_warehouse: newValue });
                    } else if (!newValue) {
                      setvalueToWarehouse(null);
                      setDataEdit({ ...dataEdit, to_warehouse: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Destination warehouse"
                    />
                  )}
                />
                <div className="w-full flex justify-center items-center">
                  <Autocomplete
                    disablePortal
                    id="idPicMitra"
                    options={optionPicSttaging}
                    readOnly={userRoles === 'GUEST'}
                    noOptionsText="No Option Available"
                    onOpen={() => {
                      setopenPicSttaging(true);
                    }}
                    onClose={() => {
                      setopenPicSttaging(false);
                    }}
                    value={valuePicSttaging}
                    fullWidth
                    getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    loading={loadingPicSttaging === true}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setvaluePicSttaging(newValue);
                        setDataEdit({ ...dataEdit, pic: newValue });
                      } else if (!newValue) {
                        setvaluePicSttaging(null);
                        setDataEdit({ ...dataEdit, pic: null });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                        label="PIC Staging"
                      />
                    )}
                  />
                </div>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Amount"
                  type="number"
                  readOnly={userRoles === 'GUEST'}
                  value={dataEdit?.jumlah}
                  onChange={(e) => setDataEdit({ ...dataEdit, jumlah: e.target.value })}
                />
              </div>
              &nbsp;
              <div className="w-full">
                <Autocomplete
                  multiple
                  id="snMesins"
                  options={optionSNMesin}
                  readOnly={userRoles === 'GUEST'}
                  // value={body?.snmesins?.idMesin}
                  value={valueSNMesin}
                  fullWidth
                  filterSelectedOptions
                  onOpen={() => {
                    setOpenSNMesin(true);
                  }}
                  onClose={() => {
                    setOpenSNMesin(false);
                  }}
                  getOptionLabel={(n) => (n?.snMesin === undefined ? '' : n?.snMesin)}
                  getOptionSelected={(option) => option?.id}
                  loading={loadingSNMesin === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setValueSNMesin(newValue);
                      setDataEdit({ ...dataEdit, sn_mesins: newValue });
                    } else {
                      setValueSNMesin(null);
                      setDataEdit({ ...dataEdit, sn_mesins: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      readOnly={loadingSNMesin === true}
                      {...params}
                      error={dataEdit?.jumlah < valueSNMesin.length}
                      helperText={
                        dataEdit?.jumlah < valueSNMesin.length
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
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        id="tgl_keluar"
                        name="tgl_keluar"
                        label="Departure Date"
                        readOnly={userRoles === 'GUEST'}
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        value={tglKeluar}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            settglKeluar(newValue);
                            setDataEdit({ ...dataEdit, tgl_keluar: newValue });
                          } else {
                            settglKeluar(null);
                            setDataEdit({ ...dataEdit, tgl_keluar: null });
                          }
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        id="tgl_masuk"
                        name="tgl_masuk"
                        label="Entry Date"
                        readOnly={userRoles === 'GUEST'}
                        inputFormat="dd MMM yyyy"
                        value={tglMasuk}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            settglMasuk(newValue);
                            setDataEdit({ ...dataEdit, tgl_masuk: newValue });
                          } else {
                            settglMasuk(null);
                            setDataEdit({ ...dataEdit, tgl_masuk: null });
                          }
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        id="tgl_staging"
                        name="tgl_staging"
                        label="Staging Plan Date"
                        readOnly={userRoles === 'GUEST'}
                        inputFormat="dd MMM yyyy"
                        value={tglStaging}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            settglStaging(newValue);
                            // console.log(newValue, 'new');
                            setDataEdit({ ...dataEdit, tgl_staging: newValue });
                          } else {
                            settglStaging(null);
                            setDataEdit({ ...dataEdit, tgl_staging: null });
                          }
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
