/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, CircularProgress, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
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
  const { api } = props;
  const { getAccessToken } = props;
  const { body } = props;
  const { setBody } = props;
  const dispatch = useDispatch();
  const [loadingPicStagging, setloadingPicStagging] = useState(true);
  const [loadingWarehouse, setloadingWarehouse] = useState(true);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [loadingPO, setloadingPO] = useState(true);
  const [loadingSnMesin, setloadingSnMesin] = useState(true);
  const [loading, setloading] = useState(false);

  const [listDataPicMitra, setlistDataPicMitra] = useState([]);
  const [Datapo, setDatapo] = useState([]);
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [getDataPoById, setDataPoById] = useState([]);
  const [sn_mesins, setsn_mesins] = useState([]);
  const [approval_tss, setapproval_tss] = useState('');
  const [notes, setnotes] = useState('');
  const [approval_staging, setapproval_staging] = useState('');
  const [values, setValues] = useState({
    id_po: null,
    id_po_name: '',
    sn_mesins: null,
    sn_mesins_name: null,
    id_type_mesin: null,
    id_type_mesin_name: '',
    model: null,
    model_Name: '',
    pn_system: '',
    customer: null,
    customerName: '',
  });
  const [getLoadingDataPoById, setLoadingDataPoById] = useState([]);
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

  const newBody = {
    id_po: values?.id_po,
    sn_mesins: JSON.stringify(sn_mesins),
    id_type_mesin: values?.id_type_mesin,
    model: values?.model,
    pn_system: values?.pn_system,
    customer: values?.customer,
    notes,
    approval_staging,
    approval_tss,
  };
  // console.log(newBody, 'newBody');
  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      .get(`${api}purchaseOrder/${userRolesId}`, config)
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
    if (body.id_po !== '') {
      // console.log(getDataPoById, 'getDataPoById');

      axios
        .get(`${api}purchaseOrder/${body?.id_po}/datas`, config)
        .then((res) => {
          // console.log(res, 'res');
          const data = res?.data?.data;
          setDataPoById(res?.data?.data);
          setValues({
            id_po: data?.id,
            id_po_name: data?.no_po,
            sn_mesins: null,
            sn_mesins_name: null,
            id_type_mesin: data?.mesin?.id,
            id_type_mesin_name: data?.mesin?.type,
            model: data?.model?.id,
            model_Name: data?.model?.name,
            pn_system: data?.part_number,
            customer: data?.customer?.id,
            customerName: data?.customer?.bank_desc,
          });
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

      // add by ardie 2023-04-06
      // axios
      //   .get(`${api}allsnmesin/${body?.id_po}`, config)
      //   .then(res => {
      //     // console.log('ceeeSNMeesin', res);
      //     setDataSNMesin(res?.data?.data);
      //   })
      //   .catch(error => {
      //     setDataSNMesin([]);
      //   });
    }
  }, [body.id_po]);
  const HandleSubmit = () => {
    setloading(true);
    axios
      .post(`${api}spekmesin-header/`, newBody, config)
      .then((res) => {
        props.getData();
        props.handleClose();
        // console.log(res, 'res');
        setloading(false);
        dispatch(
          showMessage({
            message: 'Specification Success Added',
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        setDataPoById([]);
        setloading(false);
        props.getData();
        props.handleClose();
        // setLoadingDataPoById(false);
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
  props?.porpsFromParent(values, setValues);

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 md:w-xl w-auto items-left">
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
                      setBody.setsnmesins('');
                      // setBody.settgl_po(null);
                      // setValues({
                      //   id_type_mesin_name: null
                      // })
                      setValues({
                        id_po: null,
                        id_po_name: '',
                        sn_mesins: null,
                        sn_mesins_name: null,
                        id_type_mesin: null,
                        id_type_mesin_name: '',
                        model: null,
                        model_Name: '',
                        pn_system: '',
                        customer: null,
                        customerName: '',
                      });
                    }
                    if (newValue) {
                      // setBody.setno_po(newValue?.no_po);
                      setValues({
                        id_po: newValue?.id,
                      });
                      setBody.setid_po(newValue?.id);
                    } else {
                      // setBody.setno_po('');
                      setBody.setid_po('');
                      setBody.setsnmesins('');
                      setValues({
                        id_po: null,
                        id_po_name: '',
                        sn_mesins: null,
                        sn_mesins_name: null,
                        id_type_mesin: null,
                        id_type_mesin_name: '',
                        model: null,
                        model_Name: '',
                        pn_system: '',
                        customer: null,
                        customerName: '',
                      });
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
                <>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Type"
                    disabled
                    focused
                    defaultValue="Pilih PO Terlebih dahulu"
                    value={values?.id_type_mesin_name}
                  />
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Model"
                    disabled
                    focused
                    // defaultValue="Pilih PO Terlebih dahulu"
                    value={values?.model_Name}
                  />
                </>
              </div>
              {/* <Typography className="font-bold md:mt-10 mt-24 text-xs">PIC</Typography> */}
              <div className="w-full flex gap-10 mt-10 flex-col md:flex-row">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Partnumber System"
                  disabled
                  focused
                  // defaultValue="Pilih PO Terlebih dahulu"
                  value={values?.pn_system}
                />
                <div className="w-full flex justify-center items-center">
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Customer"
                    disabled
                    focused
                    // defaultValue="Pilih PO Terlebih dahulu"
                    value={values?.customerName}
                  />
                </div>
              </div>
              {/* <div className="w-full flex gap-10 mt-10 flex-col md:flex-row">
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
                        setapproval_staging(newValue?.id);
                      } else {
                        setapproval_staging('');
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
                        setapproval_tss(newValue?.id);
                      } else {
                        setapproval_tss('');
                        setBody.setpic('');
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        disabled={loadingPicStagging === true}
                        {...params}
                        label="PIC TSS"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
                </div>
              </div> */}
              &nbsp;
              {/* <div className="w-full">
                <Autocomplete
                  // multiple
                  id="snMesins"
                  disabled={body?.id_po === ''}
                  options={getDataSNMesin}
                  value={body?.snmesins?.idMesin}
                  fullWidth
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.snMesin === undefined ? '' : n?.snMesin)}
                  // getOptionSelected={(option) => option?.idMesin === body.snmesins.snMesin}
                  getOptionSelected={(option) => console.log('ttt', option, body?.snmesins)}
                  loading={loadingSnMesin === true}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      setBody.setsnmesins(newValue);
                      setsn_mesins(newValue);
                    } else {
                      setBody.setsnmesins('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled={loadingSnMesin === true}
                      {...params}
                      label="SN Mesin"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
              </div>  */}
              <div className="w-full mt-10">
                <TextField
                  id="outlined-textarea"
                  label="Notes"
                  value={notes}
                  onChange={(e) => setnotes(e.target.value)}
                  multiline
                  rows={4}
                  // defaultValue="Default Value"
                  variant="outlined"
                />
              </div>
              {/* <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row "></div> */}
            </Box>
          </div>
        </div>
        <div>
          <div className="flex justify-end mt-10">
            <Button variant="contained" onClick={props.handleClose} className="mr-5">
              Close
            </Button>
            {loading === true ? (
              <Button
                disabled
                onClick={HandleSubmit}
                variant="contained"
                startIcon={<CircularProgress size="2rem" />}
              >
                <div className="hidden md:contents">Loading</div>
              </Button>
            ) : (
              <Button
                onClick={HandleSubmit}
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
