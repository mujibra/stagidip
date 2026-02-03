/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { selectStatusDeliveryDetail } from './store/statusDeliveryDetailSlice';

import StatusDeliveryDetailTable from './StatusDeliveryDetailTable';

function StatusDeliveryDetailList(props) {
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const idHeader = props?.statusDeliveryDialog;
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
  const dispatch = useDispatch();
  const statusDeliveryDetail = useSelector(selectStatusDeliveryDetail);
  const searchText = useSelector(
    ({ statusDeliveryApp }) => statusDeliveryApp.statusDeliveryDetail.searchText
  );
  const totalElements = useSelector(
    ({ statusDeliveryApp }) => statusDeliveryApp.statusDeliveryDetail.totalElements
  );
  const [filteredData, setFilteredData] = useState(statusDeliveryDetail);

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return statusDeliveryDetail;
      }
      return FuseUtils.filterArrayByString(statusDeliveryDetail, _searchText);
    }

    if (statusDeliveryDetail) {
      setFilteredData(getFilteredArray(statusDeliveryDetail, searchText));
    }
  }, [statusDeliveryDetail, searchText]);
  const [open, setOpen] = useState(false);
  const [getDataById, setgetDataById] = useState({});
  const [getIdHeader, setgetIdHeader] = useState('');
  const [getTrigger, setgetTrigger] = useState('');
  const [status, setstatus] = useState('');
  const [keterangan, setketerangan] = useState('');
  const [addSatus, setAddStatus] = useState('');
  const [AddKeterangan, setAddKeterangan] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleClickOpen = (row) => {
    setgetTrigger(row);
    setgetDataById({
      created_at: row.original?.created_at,
      id: row.original?.id,
      id_header: row.original?.id_header,
      keterangan: row.original?.keterangan,
      status: row.original?.status,
      updated_at: row.original?.updated_at,
    });
    setOpen(true);
  };
  const handleClickOpenDelete = (row, trigger) => {
    setgetTrigger(trigger);
    setgetDataById({
      created_at: row.original?.created_at,
      id: row.original?.id,
      id_header: row.original?.id_header,
      keterangan: row.original?.keterangan,
      status: row.original?.status,
      updated_at: row.original?.updated_at,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDelivery/${getDataById?.id}/`,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        props?.getData();
        dispatch(
          showMessage({
            message: 'Status Delivery Berhasil Diedit',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setOpen(false);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setOpen(false);
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
    // setLoadingBtn(false);
  };
  // console.log(getTrigger, 'getTrigger');

  const columns = React.useMemo(
    () => [
      {
        Header: 'Status',
        accessor: 'status',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Date',
        className: 'font-normal',
        sortable: false,
        Cell: ({ row }) => <>{moment(row?.original?.updated_at).format('LLLL')}</>, // .format('yyyy-MM-DD hh:mm:ss')}</>,
      },
      {
        Header: 'Action',
        className: 'font-normal',
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {/* {setgetDataById({
              created_at: row.original?.created_at,
              id: row.original?.id,
              id_header: row.original?.id_header,
              keterangan: row.original?.keterangan,
              status: row.original?.status,
              updated_at: row.original?.updated_at,
            })} */}
            <IconButton
              title="Edit PartNumber"
              onClick={(ev) => {
                handleClickOpen(row);
              }}
              size="large"
            >
              <EditIcon color="primary" />
            </IconButton>
            {/* <IconButton
              title="Delete PartNumber"
              onClick={(ev) => {
                handleClickOpenDelete(row, 2);
              }}
              size="large"
            >
              <DeleteIcon color="error" />
            </IconButton> */}
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const bodyPost = {
    id_header: getIdHeader,
    keterangan,
    status,
  };
  const body = {
    ...bodyPost,
    created_at: getDataById?.created_at,
    id: getDataById?.id,
    id_header: getDataById?.id_header,
    keterangan,
    status,
    updated_at: getDataById?.updated_at,
  };
  const handleSubmit = () => {
    // getData();
    setLoadingBtn(true);
    props?.setgetDataAfterPost(false);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDeliveryDetail`,
        bodyPost,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        setOpen(false);
        props?.getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        props?.setgetDataAfterPost(true);
      })
      .catch((err) => {
        setOpen(false);
        setLoadingBtn(false);
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
    props?.setgetDataAfterPost(false);
  };
  const handleEdit = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDeliveryDetail/${getDataById?.id}/`,
        body,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        props?.getData();
        dispatch(
          showMessage({
            message: 'Status Delivery Berhasil Diedit',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setOpen(false);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setOpen(false);
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
    // setLoadingBtn(false);
  };

  // console.log(getDataById, 'getDataById');
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      setstatus(getDataById?.status);
      setketerangan(getDataById?.keterangan);
      setgetIdHeader(idHeader);
    }
    return () => {
      isUnmout = true;
    };
  }, [getDataById?.status, getDataById?.keterangan, idHeader]);

  props?.pullData(getDataById);

  if (
    user_info[0].roles !== 'SUPER_ADMIN' ||
    user_info[0].roles !== 'ADMIN' ||
    user_info[0].roles !== 'OPERATOR_MOVER' ||
    user_info[0].roles !== 'SUPERVISOR'
  ) {
    columns.splice(3);
  }

  return (
    <>
      <div className="flex flex-row-reverse p-12">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {getTrigger === 1
              ? 'Add Status Delivery'
              : getTrigger === 2
              ? 'Delete Status Delivery'
              : 'Edit Status Delivery'}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {getTrigger === 2 ? (
                <div>
                  Do you want to delete {getDataById?.status} In Information{' '}
                  {getDataById?.keterangan}
                </div>
              ) : (
                <div className=" m-20 mx-2">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="status"
                      name="status"
                      value={status}
                      label="Type"
                      className="mb-10"
                      onChange={(e) => setstatus(e.target.value)}
                    >
                      <MenuItem value="LOADING">Loading</MenuItem>
                      <MenuItem value="PERJALANAN">Perjalanan</MenuItem>
                      <MenuItem value="TIBA">Tiba</MenuItem>
                      {/* <MenuItem value="AKTIVASI">Aktivasi</MenuItem>
                      <MenuItem value="SERAH_TERIMA">Serah Terima</MenuItem> */}
                    </Select>
                  </FormControl>
                  &nbsp;
                  <TextField
                    className="mb-10"
                    label="Keterangan"
                    id="keterangan"
                    name="keterangan"
                    type="text"
                    value={keterangan}
                    onChange={(e) => setketerangan(e.target.value)}
                    variant="outlined"
                    size="medium"
                    fullWidth
                  />
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {getTrigger === 1 ? (
              <>
                {loadingBtn === true ? (
                  <Button
                    variant="contained"
                    disabled
                    onClick={handleSubmit}
                    autoFocus
                    startIcon={<CircularProgress size="2rem" />}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    // disabled={getmover === ''}
                    onClick={handleSubmit}
                    autoFocus
                  >
                    Add
                  </Button>
                )}
              </>
            ) : getTrigger === 2 ? (
              <>
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
                  <Button
                    variant="contained"
                    // disabled={getmover === ''}
                    onClick={handleDelete}
                    autoFocus
                  >
                    Delete
                  </Button>
                )}
              </>
            ) : (
              <>
                {loadingBtn === true ? (
                  <Button
                    variant="contained"
                    disabled
                    onClick={handleEdit}
                    autoFocus
                    startIcon={<CircularProgress size="2rem" />}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    // disabled={getmover === ''}
                    onClick={handleEdit}
                    autoFocus
                  >
                    Add
                  </Button>
                )}
              </>
            )}
          </DialogActions>
        </Dialog>
        {user_info[0].roles === 'SUPER_ADMIN' ||
        user_info[0].roles === 'ADMIN' ||
        user_info[0].roles === 'SUPERVISOR' ||
        user_info[0].roles === 'OPERATOR_MOVER' ? (
          <Button variant="contained" color="primary" onClick={(ev) => handleClickOpen(1)}>
            Add Status Delivery
          </Button>
        ) : (
          ''
        )}
      </div>
      <Typography className="m-10" variant="h5" gutterBottom>
        Actual!
        <Divider />
      </Typography>
      <StatusDeliveryDetailTable
        columns={columns}
        data={props.data}
        totalElements={totalElements}
        pageDetail={props.pageDetail}
        setPageDetail={props.setPageDetail}
        rowsPerPageDetail={props.rowsPerPageDetail}
        setRowsPerPageDetail={props.setRowsPerPageDetail}
      />
    </>
  );
}

export default StatusDeliveryDetailList;
