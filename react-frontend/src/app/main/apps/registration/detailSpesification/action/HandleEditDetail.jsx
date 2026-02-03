/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import {
  Autocomplete,
  Button,
  Divider,
  TablePagination,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
} from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const HeaderParent = [
  { id: 'no', label: 'No', minWidth: 170 },
  { id: 'label', label: 'Label', minWidth: 100 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];
const HeaderChild = [
  { id: 'no', label: 'No', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(no, id, label, type_atm, val) {
  return { no, id, label, type_atm, val };
}

export default function HandleEditDetail(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const getAccessToken = localStorage.getItem('access_token');
  const { dataEdit, setDataEdit } = props;
  const { setBody } = props;
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dataById = props?.dataById;
  // console.log(dataById, 'data');

  const [triggerModel, settriggerModel] = useState(true);
  const [openModel, setopenModel] = useState(false);
  const [optionModel, setoptionModel] = useState([]);
  const loadingModel = openModel && optionModel.length === 0;
  const [value, setValue] = useState(props.dataById?.data_type);
  // console.log(value, 'val');
  const [valueModel, setvalueModel] = useState(value);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataDetailChild, setDataDetailChild] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const [openChildEdit, setOpenChildEdit] = useState(false);
  const [openChildList, setOpenChildList] = useState(false);
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({});
  const [getBody, setGetBody] = useState([]);
  const [getDataById, setGetDataById] = useState({});
  const [getDataByIdList, setGetDataByIdList] = useState({});
  // const [itemChild, setItemChild] = useState(getDataById);
  const [description, setDescription] = useState('');
  const [dataListChild, setDataListChild] = useState([]);
  // console.log(rowsPerPage, 'rowsPerPage')
  // console.log(optionModel, 'option');
  // console.log(valueModel, 'value');
  const array1 = optionModel.filter((val) => !valueModel.includes(val.name));
  // console.log(array1);

  const handleClickOpen = () => {
    setOpen(true);
  };
  props?.propsFromParent(getBody);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenChild = (id, row) => {
    setOpenChild(true);
    setGetDataById(row);
  };
  const handleClickOpenEditChild = (id, row) => {
    setOpenChildEdit(true);
    setGetDataById(row);
    setLabel(row?.label);
  };
  const handleClickOpenList = (id, row) => {
    // console.log(row, 'row')
    setOpenChildList(true);
    setGetDataByIdList(row);
    setDescription(row?.description);
  };

  const handleCloseChild = () => {
    setOpenChild(false);
    setDataDetailChild([]);
    setDescription('');
    setGetDataById({});
    setRowsPerPage(5);
    setPage(0);
  };
  const handleCloseEditChild = () => {
    setOpenChildEdit(false);
    setDataDetailChild([]);
    setLabel('');
    setRowsPerPage(5);
    setPage(0);
  };
  const handleCloseChildList = () => {
    setOpenChildList(false);
    setGetDataByIdList({});
    setDescription('');
    setRowsPerPage(5);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = data?.map((item, index) =>
    createData(index + 1, item?.id, item?.label, item?.type_atm, item?.val)
  );

  useEffect(() => {
    settriggerModel(true);
    axios
      .get(`${api}master-model`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataModel = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionModel(dataModel);
        settriggerModel(false);
      })
      .catch((error) => {
        setoptionModel([]);
        settriggerModel(false);
      });
  }, [loadingModel]);

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}getTypeSpekBasedOnIdParent/${dataById?.id}`, config)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setData([]);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const body = {
    label,
    val: `${dataById?.parent?.replace(' ', '_').toUpperCase()}_${rows?.length}`,
    // val: `${label.replace(' ', '_').toUpperCase()}_${rows?.length}`,
  };
  const bodyChild = {
    item_id: getDataById?.id,
    item_code: getDataById?.val,
    description,
  };
  const HandleSubmit = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}addChildType/${dataById?.id}`,
        body,
        config
      )
      .then((res) => {
        // console.log('respnse', res);
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Added', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        getData();
        setLabel('');
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
        console.log(err, 'err');
      });
  };
  const HandleSubmitChild = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-spekmesin/v2`,
        bodyChild,
        config
      )
      .then((res) => {
        // console.log('respnse', res);
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Added', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        getData();
        setLabel('');
        handleCloseChild();
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
        console.log(err, 'err');
      });
  };
  const getDataListChild = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getTypeSpekBasedOnIdParent/${dataById?.id}`,
        config
      )
      .then((res) => {
        // console.log(res);
        setDataListChild(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setDataListChild([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
  };
  const getDataDetaillChild = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getDetailListItems/${getDataById?.id}`,
        config
      )
      .then((res) => {
        // console.log(res);
        setDataDetailChild(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setDataDetailChild([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
  };
  const HandleEditChildList = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}updateListItem/${getDataByIdList?.id}`,
        { description },
        config
      )
      .then((res) => {
        console.log('respnse', res);
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Edit', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        getDataDetaillChild();
        setLabel('');
        handleCloseChildList();
      })
      .catch((err) => {
        setLoading(false);
        handleCloseChildList();
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
        console.log(err, 'err');
      });
  };
  const HandleEditChild = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}updateChildType/${getDataById?.id}`,
        { label },
        config
      )
      .then((res) => {
        console.log('respnse', res);
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Edit', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        getData();
        setLabel('');
        handleCloseChildList();
      })
      .catch((err) => {
        setLoading(false);
        handleCloseChildList();
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
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
        console.log(err, 'err');
      });
  };
  const HandleDelete = async (id, name) => {
    console.log(name);
    let url = '';
    if (name === 'parent') {
      url = 'removeItemChild';
    } else {
      url = 'removeListItem';
    }
    // e.preventDefault();

    setLoading(true);
    const response = await axios
      .delete(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}${url}/${id}`, config)
      .then((res) => {
        // console.log(res, 'res')
        setLoading(false);
        dispatch(
          showMessage({
            message: res?.data?.message, // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        dispatch(closeDialog());
        if (name === 'parent') {
          getData();
        } else {
          getDataDetaillChild();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';

          window.location.href = '/login';
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
        dispatch(closeDialog());
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

  const HanldleClickNotifDelete = (row, name) => {
    // console.log(row, 'row')
    let names = '-';
    if (name === 'parent') {
      names = row?.label;
    } else {
      names = row?.description;
    }
    // console.log(row.model);
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Sure to delete "${names}" ?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => dispatch(closeDialog())}>
                Close
              </Button>
              <Button
                // disabled={props.setBody.partNumber === ''}
                variant="contained"
                color="error"
                onClick={(e) => HandleDelete(row?.id, name)}
                autoFocus
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </DialogActions>
          </div>
        ),
        maxWidth: 'xl',
      })
    );
  };

  useEffect(() => {
    getDataListChild();
    if (getDataById !== {}) {
      getDataDetaillChild();
    }
  }, [getDataById]);

  useEffect(() => {
    // console.log(form.description, 'form.description');
    if (!description.match(/[`!@#$%^&*()\\[\]{};':"\\|<>/?~]/)) {
      setError('');
    } else {
      setError('Forbidden character: !@#$%^&*()[]{};"\\|<>/?~');
      // console.log('Forbidden character: %<>$\'"');
    }
    const arr = [];
    if (valueModel?.length !== 0) {
      for (let index = 0; index < valueModel?.length; index++) {
        arr.push({
          id_type: valueModel[index].id_type,
          type: valueModel[index].name,
        });
      }
    }
    // console.log(arr, 'arr')
    setGetBody(arr);
  }, [form.description, valueModel]);
  // console.log(dataDetailChild, 'dataDetailChild');

  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-16 sm:p-24 w-full items-left">
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
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  multiple
                  filterSelectedOptions
                  id="combo-box-customer"
                  noOptionsText="No Option Available"
                  options={optionModel}
                  onOpen={() => {
                    setopenModel(true);
                  }}
                  onClose={() => {
                    setopenModel(false);
                  }}
                  value={valueModel}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  // isOptionEqualToValue={(option, value) => option.value === value.value}
                  getOptionSelected={(option) => option?.name}
                  loading={triggerModel === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueModel(newValue);
                      setDataEdit({ ...dataEdit, model: newValue });
                    } else if (!newValue) {
                      setvalueModel(null);
                      setDataEdit({ ...dataEdit, model: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Type"
                    />
                  )}
                />
              </div>
              {/* <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  disabled
                  id="outlined-password-input"
                  label="Item"
                  name="type"
                  value={dataEdit?.parent}
                  onChange={(e) => setDataEdit({ ...dataEdit, parent: e.target.value })}
                />
              </div> */}
            </Box>
          </div>
        </div>
        <div className="w-full flex justify-end my-20">
          <Button variant="contained" startIcon={<PlaylistAddIcon />} onClick={handleClickOpen}>
            <div className="hidden md:contents">Add</div>
          </Button>
        </div>
        <div id="add item label">
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Add Item</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="w-full my-10">
                  <TextField
                    id="filled-error-helper-text"
                    label="Label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button
                disabled={loading || label === ''}
                variant="contained"
                startIcon={<PlaylistAddIcon />}
                onClick={HandleSubmit}
              >
                <div className="hidden md:contents">{loading ? '...Loading' : 'Save'}</div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div id="edit description">
          <Dialog
            open={openChildList}
            onClose={handleCloseChildList}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Description</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="w-full my-10">
                  <TextField
                    id="filled-error-helper-text"
                    label="Label"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseChildList}>Close</Button>
              <Button
                disabled={loading || description === ''}
                variant="contained"
                startIcon={<PlaylistAddIcon />}
                onClick={HandleEditChildList}
              >
                <div className="hidden md:contents">{loading ? '...Loading' : 'Save'}</div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div id="edit item label">
          <Dialog
            open={openChildEdit}
            onClose={handleCloseEditChild}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Item</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="w-full my-10">
                  <TextField
                    id="filled-error-helper-text"
                    label="Label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditChild}>Close</Button>
              <Button
                disabled={loading || label === ''}
                variant="contained"
                startIcon={<PlaylistAddIcon />}
                onClick={HandleEditChild}
              >
                <div className="hidden md:contents">{loading ? '...Loading' : 'Save'}</div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div id="add description">
          <Dialog
            open={openChild}
            maxWidth="lg"
            onClose={handleCloseChild}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Detail List "${getDataById?.label}" `}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="w-full my-10">
                  <div>
                    <div className="flex">
                      <TextField
                        className="mb-10 mt-4"
                        label="Add Description"
                        id="description"
                        name="description"
                        value={openChildList === true ? '' : description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!error}
                        helperText={error}
                        variant="outlined"
                        size="medium"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="mt-10">
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {HeaderChild.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dataDetailChild
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                return (
                                  <StyledTableRow key={row.index}>
                                    <StyledTableCell align="left">
                                      {rowsPerPage * page + index + 1}.)
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {row?.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      <div className="flex justify-end">
                                        <div>
                                          <IconButton
                                            onClick={() =>
                                              handleClickOpenList(row.id, row, 'children')
                                            }
                                            color="info"
                                            className=""
                                          >
                                            <EditIcon />
                                          </IconButton>
                                        </div>
                                        {user_info[0]?.roles !== 'SUPERVISOR' && (
                                          <div>
                                            <IconButton
                                              onClick={(e) =>
                                                HanldleClickNotifDelete(row, 'children')
                                              }
                                              color="error"
                                              className=""
                                            >
                                              <DeleteIcon />
                                            </IconButton>
                                          </div>
                                        )}
                                      </div>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={dataDetailChild.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseChild}>Close</Button>
              <Button
                disabled={loading || description === ''}
                variant="contained"
                startIcon={<PlaylistAddIcon />}
                onClick={HandleSubmitChild}
              >
                <div className="hidden md:contents">{loading ? '...Loading' : 'Save'}</div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="mt-10">
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {HeaderParent.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <StyledTableRow key={row.index}>
                          <StyledTableCell align="left">
                            {rowsPerPage * page + index + 1}.)
                          </StyledTableCell>
                          <StyledTableCell align="left">{row?.label}</StyledTableCell>
                          <StyledTableCell align="left">{row?.val}</StyledTableCell>
                          <StyledTableCell align="right">
                            <div className="flex justify-end">
                              <div>
                                <IconButton
                                  onClick={() => handleClickOpenChild(row.id, row, 'parent')}
                                  color="success"
                                  className=""
                                >
                                  <PlaylistAddIcon />
                                </IconButton>
                              </div>
                              <div>
                                <IconButton
                                  onClick={() => handleClickOpenEditChild(row.id, row, 'edit')}
                                  color="info"
                                  className=""
                                >
                                  <EditIcon />
                                </IconButton>
                              </div>
                              {user_info[0]?.roles !== 'SUPERVISOR' && (
                                <div>
                                  <IconButton
                                    // onClick={(e) => HandleDelete(row.id,row.partNumber, e)}
                                    onClick={(e) => HanldleClickNotifDelete(row, 'parent')}
                                    color="error"
                                    className=""
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              )}
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </FuseAnimate>
  );
}
