/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Dialog,
  DialogActions,
  Button,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  DialogContent,
  TextField,
  DialogTitle,
  DialogContentText,
  CircularProgress,
  // FormControl,
  // InputLabel,
  // MenuItem,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import moment from 'moment';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
  addStatusDelivery,
  updateStatusDelivery,
  closeNewStatusDeliveryDialog,
  closeEditStatusDeliveryDialog,
} from './store/statusDeliverySlice';
import { getStatusDeliveryDetail } from './store/statusDeliveryDetailSlice';
import StatusDeliveryDetailList from './StatusDeliveryDetailList';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
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

const defaultFormState = {
  id_po: '',
  id_mesin: '',
  sn_mesin: '',
  tgl_perkiraan_keluar: '',
  notes: '',
  tgl_perkiraan_tiba: '',
};

function StatusDeliveryDialog(props) {
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const statusDeliveryDialog = useSelector(
    ({ statusDeliveryApp }) => statusDeliveryApp.statusDelivery.statusDeliveryDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);
  // console.log(form, 'form')

  const [dataDetail, setDataDetail] = useState([]);
  const [pageDetail, setPageDetail] = useState(0);
  const [rowsPerPageDetail, setRowsPerPageDetail] = useState(10);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [getDataAfterPost, setgetDataAfterPost] = useState(false);

  // const [tgl_keluar, setTgl_keluar] = useState(statusDeliveryDialog?.data?.tgl_keluar || null);

  // function for handle PO Transaction List
  const [openPO, setOpenPO] = useState(false);
  const [optionsPO, setOptionsPO] = useState([]);
  const [triggerLoadPO, setTriggerLoadPO] = useState(true);
  const loadingPO = openPO && optionsPO.length === 0;

  const [valuePO, setValuePO] = useState({
    name: statusDeliveryDialog?.data?.no_po || '',
    id: statusDeliveryDialog?.data?.id || '',
    json: statusDeliveryDialog?.data || {},
  });

  useEffect(() => {
    if (!loadingPO) {
      return undefined;
    }
    (async () => {
      setTriggerLoadPO(true);
      await axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${user_info[0]?.id}`,
          config
        )
        .then((res) => {
          setOptionsPO(
            res.data.data.map((val) => ({
              id: val.id,
              name: val.no_po,
              json: val,
            }))
          );
        });
    })();
  }, [loadingPO]);

  // function for handle List SN Mesin
  const [openSNMesin, setOpenSNMesin] = useState(false);
  const [optionsSNMesin, setOptionsSNMesin] = useState([]);
  const [triggerLoadSNMesin, settriggerLoadSNMesin] = useState(true);
  const loadingSNMesin = openSNMesin && optionsSNMesin.length === 0;
  const [valueSNMesin, setValueSNMesin] = useState({
    name: statusDeliveryDialog?.data?.snMesin || '',
    id: statusDeliveryDialog?.data?.idMesin || '',
    json: statusDeliveryDialog?.data || {},
  });
  // console.log(optionsSNMesin, 'optionsSNMesin')

  useEffect(() => {
    if (!loadingSNMesin) {
      return undefined;
    }
    (async () => {
      settriggerLoadSNMesin(true);
      await axios
        .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}allsnmesin/${valuePO?.id}`, config)
        .then((res) => {
          setOptionsSNMesin(
            res.data.data.map((val) => ({
              id: val.idMesin,
              name: val.snMesin,
              json: val,
            }))
          );
        })
        .catch((err) => {
          setOptionsSNMesin([]);
          settriggerLoadSNMesin(false);
        });
    })();
  }, [loadingSNMesin, valuePO?.id]);

  const initDialog = useCallback(() => {
    if (statusDeliveryDialog.type === 'edit' && statusDeliveryDialog.data) {
      setForm({
        ...statusDeliveryDialog.data,
        id_po: statusDeliveryDialog.data?.detailPo?.id,
      });
    }

    if (statusDeliveryDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...statusDeliveryDialog.data,
        id_po: statusDeliveryDialog.data?.valuePO?.id,
      });
    }
  }, [statusDeliveryDialog.data, statusDeliveryDialog.type, setForm]);

  function closeComposeDialog() {
    return statusDeliveryDialog.type === 'edit'
      ? dispatch(closeEditStatusDeliveryDialog())
      : dispatch(closeNewStatusDeliveryDialog());
  }

  function canBeSubmitted() {
    return form.tgl_perkiraan_keluar;
  }
  // console.log(valuePO, 'valuePO')

  function handleSubmit(event) {
    // console.log('first');
    setgetDataAfterPost(false);
    event.preventDefault();

    // console.log('CeekEventt', statusDeliveryDialog.type, form);
    if (statusDeliveryDialog.type === 'new') {
      dispatch(
        addStatusDelivery({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
      // props?.pullData();
      setgetDataAfterPost(true);
      setValuePO({ id: '', name: '', json: {} });
      setValueSNMesin({ id: '', name: '', json: {} });
    } else {
      dispatch(
        updateStatusDelivery({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
      setgetDataAfterPost(true);
      // window.location.reload();
    }
    closeComposeDialog();
    setgetDataAfterPost(false);
  }

  useEffect(() => {
    setValuePO({
      name: statusDeliveryDialog?.data?.detailPo?.no_po || '',
      id: statusDeliveryDialog?.data?.detailPo?.id || '',
      json: statusDeliveryDialog?.data?.detailPo || null,
    });
    setValueSNMesin({
      name: statusDeliveryDialog?.data?.sn_mesin || '',
      id: statusDeliveryDialog?.data?.id_mesin || '',
      json: statusDeliveryDialog?.data || null,
    });
  }, [statusDeliveryDialog?.data]);

  useEffect(() => {
    if (statusDeliveryDialog.props.open) {
      initDialog();
    }
    if (statusDeliveryDialog?.props?.open === true) {
      setgetDataAfterPost(false);
    } else {
      setgetDataAfterPost(true);
    }
  }, [statusDeliveryDialog.props.open, initDialog]);

  useDeepCompareEffect(() => {
    dispatch(
      getStatusDeliveryDetail({
        id_header: statusDeliveryDialog.data?.id,
        page: 0,
        max: 10,
      })
    ).then((res) => {
      setDataDetail(res.payload.data);
    });
  }, [dispatch, statusDeliveryDialog.data, setDataDetail, dataDetail]);

  useEffect(() => {
    if (typeof statusDeliveryDialog.data?.id !== 'undefined') {
      dispatch(
        getStatusDeliveryDetail({
          id_header: statusDeliveryDialog.data?.id,
          page: 0,
          max: 10,
        })
      ).then((res) => {
        setDataDetail(res.payload.data);
      });
    } else {
    }
  }, [dispatch, statusDeliveryDialog?.data?.id]); //

  const [getId, setId] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pullData = (getDataById) => {
    setId(getDataById);
  };

  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDeliveryDetail/${statusDeliveryDialog.data?.id}/`,
        config
      )
      .then((res) => {
        // console.log(res, 'RES');
        if (statusDeliveryDialog.data?.id !== undefined) {
          setDataDetail(res?.data?.data);
        }
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.errorMessage;
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
      });
  };
  const handleDelete = () => {
    // getData();
    setgetDataAfterPost(false);
    setLoadingBtn(true);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDelivery/${statusDeliveryDialog.data?.id}/`,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        getData();
        dispatch(
          showMessage({
            message: 'Status Delivery Berhasil Di Hapus',
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        handleClose();
        closeComposeDialog();
        setgetDataAfterPost(true);
        // window.location.reload();
      })
      .catch((err) => {
        // setgetDataAfterPost(true);
        setLoadingBtn(false);
        handleClose();
        closeComposeDialog();
        console.log(err, 'err');
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
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
      });
    setgetDataAfterPost(false);
    // setLoadingBtn(false);
  };

  // if (getDataAfterPost === true) {
  props?.pullData(getDataAfterPost);
  // }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Status Delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete Status Delivery In SN-Mesin "
            {statusDeliveryDialog.data?.sn_mesin === null
              ? '-'
              : statusDeliveryDialog.data?.sn_mesin}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          {loadingBtn === true ? (
            <Button
              variant="contained"                                                                                                                                                                                                                                                                                                
              disabled
              onClick={handleDelete}
              autoFocus
              startIcon={<CircularProgress size="2rem" />}
            >
              Loading...
            </Button>
          ) : (
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{
          paper: 'm-24 rounded-4',
        }}
        {...statusDeliveryDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="md"
      >
        <AppBar position="static" className="shadow-md">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {statusDeliveryDialog.type === 'new' ? 'Add Status Delivery' : 'Edit Status Delivery'}
            </Typography>
          </Toolbar>
        </AppBar>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
          <DialogContent classes={{ root: 'p-24' }}>
            <div>
              <div className="flex -mx-2">
                <Autocomplete
                  id="purchaseOrder"
                  className="mb-10"
                  size="medium"
                  noOptionsText="No Option Available"
                  open={openPO}
                  // disabled={
                  //   user_info[0].roles !== 'SUPER_ADMIN' ||
                  //   user_info[0].roles !== 'ADMIN' ||
                  //   user_info[0].roles !== 'SUPERVISOR' ||
                  //   user_info[0].roles !== 'OPERATOR_MOVER' ||
                  //   user_info[0].roles !== 'OPERATOR_DIP'
                  // }
                  onOpen={() => {
                    setOpenPO(true);
                  }}
                  onClose={() => {
                    setOpenPO(false);
                  }}
                  style={{ width: 300 }}
                  value={valuePO}
                  getOptionSelected={(option, value) => option.name === value.name}
                  // getOptionSelected={(option) => console.log('tesss', option)}
                  getOptionLabel={(option) => option.name}
                  getOptionDisabled={(option) => option.id === 'error'}
                  options={optionsPO}
                  loading={triggerLoadPO}
                  onChange={(event, value) => {
                    if (value) {
                      setValuePO(value);
                      setForm({
                        ...form,
                        id_po: value?.id,
                      });
                    } else {
                      setValuePO({
                        id: '',
                        name: '',
                        json: {},
                      });
                    }
                    setValueSNMesin({
                      id: '',
                      name: '',
                      json: {},
                    });
                    setOptionsSNMesin([]);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="No PO"
                      variant="outlined"
                      className="mb-10"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
                &nbsp;
                <Autocomplete
                  className="mb-10"
                  id="type"
                  noOptionsText="No Option Available"
                  open={openSNMesin}
                  // disabled={
                  //   user_info[0].roles !== 'SUPER_ADMIN' ||
                  //   user_info[0].roles !== 'ADMIN' ||
                  //   user_info[0].roles !== 'SUPERVISOR' ||
                  //   user_info[0].roles !== 'OPERATOR_MOVER' ||
                  //   user_info[0].roles !== 'OPERATOR_DIP'
                  // }
                  onOpen={() => {
                    setOpenSNMesin(true);
                  }}
                  onClose={() => {
                    setOpenSNMesin(false);
                  }}
                  style={{ width: 300 }}
                  value={valueSNMesin}
                  getOptionSelected={(option, value) => option.name === value.name}
                  getOptionLabel={(option) => option.name}
                  getOptionDisabled={(option) => option.id === 'error'}
                  options={optionsSNMesin}
                  loading={triggerLoadSNMesin}
                  onChange={(event, value) => {
                    if (value) {
                      setValueSNMesin(value);
                      setForm({
                        ...form,
                        id_mesin: value?.id,
                        sn_mesin: value?.name,
                      });
                    } else {
                      setValueSNMesin({
                        id: '',
                        name: '',
                        json: {},
                      });
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
              <div className="flex -mx-2">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="mb-10"
                    // style={{ width: 400 }}
                    size="medium"
                    id="tgl_perkiraan_keluar"
                    label="Estimated Release Date"
                    dateFormat="dd/MM/yyyy"
                    // disabled={
                    //   user_info[0].roles !== 'SUPER_ADMIN' ||
                    //   user_info[0].roles !== 'ADMIN' ||
                    //   user_info[0].roles !== 'SUPERVISOR' ||
                    //   user_info[0].roles !== 'OPERATOR_MOVER' ||
                    //   user_info[0].roles !== 'OPERATOR_DIP'
                    // }
                    // value={form.tgl_keluar === null ? form.tgl_perkiraan_keluar : form.tgl_keluar}
                    value={form.tgl_perkiraan_keluar}
                    onChange={(date) => {
                      setForm({
                        ...form,
                        tgl_perkiraan_keluar: moment(date).format('YYYY-MM-DD HH:mm:00'),
                      });
                    }}
                    // value={tgl_keluar}
                    // inputFormat="dd MMM yyyy"
                    // onChange={(date) => setTgl_keluar(moment(date).format('yyyy-MM-DD'))}
                    // KeyboardButtonProps={{
                    //   'aria-label': 'change date',
                    // }}
                    renderInput={(params) => (
                      <TextField
                        style={{ width: 300 }}
                        {...params}
                        variant="outlined"
                        className="mb-10"
                      />
                    )}
                  />
                </LocalizationProvider>
                &nbsp;
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="tglTerima"
                    name="tglTerima"
                    label="Expected Arrival Date"
                    // disabled={
                    //   user_info[0].roles !== 'SUPER_ADMIN' ||
                    //   user_info[0].roles !== 'ADMIN' ||
                    //   user_info[0].roles !== 'SUPERVISOR' ||
                    //   user_info[0].roles !== 'OPERATOR_MOVER' ||
                    //   user_info[0].roles !== 'OPERATOR_DIP'
                    // }
                    dateFormat="dd/MM/yyyy"
                    // value={
                    //   form.tgl_received === null ? form?.tgl_perkiraan_tiba : form.tgl_received
                    // }
                    value={form?.tgl_perkiraan_tiba}
                    // inputFormat="dd MMM yyyy"
                    onChange={(date) => {
                      setForm({
                        ...form,
                        tgl_perkiraan_tiba: moment(date).format('YYYY-MM-DD HH:mm:ss'),
                      });
                    }}
                    // KeyboardButtonProps={{
                    //   'aria-label': 'change date',
                    // }}
                    renderInput={(params) => (
                      <TextField style={{ width: 300 }} {...params} className="mb-4" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </DialogContent>
          {statusDeliveryDialog.type === 'new' ? (
            <DialogActions className="justify-between p-8">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={!canBeSubmitted()}
                >
                  Add
                </Button>{' '}
                &nbsp;
                <Button variant="contained" color="secondary" onClick={closeComposeDialog}>
                  Close
                </Button>
              </div>
            </DialogActions>
          ) : (
            <>
              <div className="p-6">
                <StatusDeliveryDetailList
                  setgetDataAfterPost={setgetDataAfterPost}
                  statusDeliveryDialog={statusDeliveryDialog?.data?.id}
                  getData={getData}
                  pullData={pullData}
                  data={dataDetail}
                  pageDetail={pageDetail}
                  setPageDetail={setPageDetail}
                  rowsPerPageDetail={rowsPerPageDetail}
                  setRowsPerPageDetail={setRowsPerPageDetail}
                  loadingDetail={loadingDetail}
                  setLoadingDetail={setLoadingDetail}
                />
              </div>
              <DialogActions className="justify-between p-8">
                <div className="px-16">
                  {user_info[0].roles === 'SUPER_ADMIN' ||
                  user_info[0].roles === 'ADMIN' ||
                  user_info[0].roles === 'SUPERVISOR' ||
                  user_info[0].roles === 'OPERATOR_MOVER' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!canBeSubmitted()}
                      className="mr-4"
                    >
                      Save
                    </Button>
                  ) : (
                    ''
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={closeComposeDialog}
                    className="mr-4"
                  >
                    Close
                  </Button>
                </div>
                {user_info[0].roles === 'SUPER_ADMIN' || user_info[0].roles === 'ADMIN' || user_info[0].roles === 'SUPERVISOR' ? (
                  <IconButton onClick={handleClickOpen}>
                    <Icon>delete</Icon>
                  </IconButton>
                ) : (
                  ''
                )}
              </DialogActions>
            </>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default StatusDeliveryDialog;
