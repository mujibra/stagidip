/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  TableCell,
  TableRow,
  // Autocomplete,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
} from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseLoading from '@fuse/core/FuseLoading';

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

const columns = [
  { id: 'no', label: 'no', minWidth: 170 },
  { id: 'test_desc', label: 'test_desc', minWidth: 170 },
  { id: 'result_detail', label: 'result_detail', minWidth: 170 },
  { id: 'Result', label: 'Result', minWidth: 170 },
  { id: 'aksi', label: 'Aksi', minWidth: 170 },
];

function createData(no, id, test_desc, result_detail, item_type_values) {
  return { no, id, test_desc, result_detail, item_type_values };
}

export default function HandleEditDetail(props) {
  const ref0 = useRef();
  const classes = useStyles();
  const userInfo = JSON.parse(localStorage.getItem('user_profile'));
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const { data, dataEdit, setDataEdit, valueModel, setvalueModel, dispatch } = props;
  console.log(dataEdit, 'dataEdit');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [optionResult, setoptionResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [stateBody, setStateBody] = useState({
    test_desc: null,
    result_detail: null,
    id_divisi: dataEdit?.id,
    id_mesin: dataEdit?.id_mesin,
    id_type_values: null,
  });
  const [stateBodyEdit, setStateBodyEdit] = useState({
    id: null,
    test_desc: null,
    result_detail: null,
    id_divisi: dataEdit?.id,
    id_mesin: dataEdit?.id_mesin,
    id_type_values: null,
  });
  props.propsFromParent(stateBody);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickOpens = async (id, row) => {
    console.log(row, 'row');
    setStateBodyEdit({
      id: row?.id,
      test_desc: row?.test_desc,
      result_detail: row?.result_detail,
      id_divisi: dataEdit?.id,
      id_mesin: dataEdit?.id_mesin,
      id_type_values: row?.item_type_values,
    });
    // setvalueModel(row?.name);
    setOpen(true);
  };
  const bodyEdit = {
    test_desc: stateBodyEdit?.test_desc,
    result_detail: stateBodyEdit?.result_detail,
    id_divisi: dataEdit?.id,
    id_mesin: dataEdit?.id_mesin,
    id_type_values: stateBodyEdit?.id_type_values?.id,
  };
  // console.log(bodyEdit, 'bodyEdit');
  const handleSearch = (e) => {
    setSearched(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = data?.checklistStaging?.map((item, index) =>
    createData(index + 1, item?.id, item?.test_desc, item?.result_detail, item?.item_type_values)
  );

  const getDataOptionResult = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}get-list-typeValues`, config)
      .then((res) => {
        const data = res?.data?.data;
        const arr = [];
        for (let index = 0; index < data.length; index++) {
          arr.push({
            ...data[index],
            count_data: data[index]?.count_data,
            data_from: data[index]?.data_from,
            id: data[index]?.id,
            labels: data[index]?.labels,
            types: `${data[index]?.types}  ${
              data[index]?.count_data === null ? '' : data[index]?.count_data
            }`,
          });
        }
        // console.log(arr, 'arr');
        setoptionResult(arr);
        setLoading(false);
      })
      .catch((err) => {
        setoptionResult([]);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
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
  const handleEdit = async (id) => {
    setLoading(true);
    const response = await axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}mst-checkliststaging/${stateBodyEdit?.id}`,
        bodyEdit,
        config
      )
      .then((res) => {
        // setDataEdit(res.data?.data);
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Updated', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        props?.getData();
        // dispatch(closeDialog());
        // setNum(num - 1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
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
      });
    setOpen(false);
  };

  const HandleDelete = async (id, row) => {
    // e.preventDefault();

    setLoading(true);
    const response = await axios
      .delete(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}mst-checkliststaging/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Deleted!', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        props?.getData();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
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

  useEffect(() => {
    getDataOptionResult();
    // getData();
  }, [dataEdit]);

  // console.log(stateBodyEdit, 'stateBodyEdit');
  // console.log(rows, 'rows');

  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-16 sm:p-24 w-full items-left">
        <Dialog
          // maxWidth="xl"
          fullWidth
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Detail {dataEdit?.name}</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Test Desc"
                    // name="type"
                    value={stateBodyEdit?.test_desc}
                    onChange={(e) =>
                      setStateBodyEdit({ ...stateBodyEdit, test_desc: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="w-full my-10">
                    <TextField
                      id="filled-error-helper-text"
                      label="Result Detail"
                      value={stateBodyEdit?.result_detail}
                      // onChange={(e) => setLabel(e.target.value)}
                      onChange={(e) =>
                        setStateBodyEdit({ ...stateBodyEdit, result_detail: e.target.value })
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                  <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                    <Autocomplete
                      disablePortal
                      id="idModel"
                      options={optionResult}
                      value={stateBodyEdit?.id_type_values}
                      fullWidth
                      getOptionLabel={(n) => (n?.types === undefined ? '' : n?.types)}
                      getOptionSelected={(option) => option?.label === body.model.name}
                      // loading={loadingModel === true}
                      onChange={(_event, newValue) => {
                        // console.log(newValue, 'nn');
                        if (newValue) {
                          setStateBodyEdit({ ...stateBodyEdit, id_type_values: newValue });
                        } else {
                          setStateBodyEdit({ ...stateBodyEdit, id_type_values: null });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Result"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleEdit} variant="contained" startIcon={<EditIcon />}>
              <div className="hidden md:contents">Edit</div>
            </Button>
          </DialogActions>
        </Dialog>
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
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Test Desc"
                  // name="type"
                  value={stateBody?.test_desc}
                  onChange={(e) => setStateBody({ ...stateBody, test_desc: e.target.value })}
                />
              </div>
              <div>
                <div className="w-full my-10">
                  <TextField
                    id="filled-error-helper-text"
                    label="Result Detail"
                    value={stateBody?.result_detail}
                    // onChange={(e) => setLabel(e.target.value)}
                    onChange={(e) => setStateBody({ ...stateBody, result_detail: e.target.value })}
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                  <Autocomplete
                    disablePortal
                    id="idModel"
                    options={optionResult}
                    fullWidth
                    getOptionLabel={(n) => (n?.types === undefined ? '' : n?.types)}
                    getOptionSelected={(option) => option?.label === body.model.name}
                    // loading={loadingModel === true}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        setStateBody({ ...stateBody, id_type_values: newValue?.id });
                      } else {
                        setStateBody({ ...stateBody, id_type_values: null });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Result"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
                </div>
                {props?.loading === true ? (
                  <FuseLoading />
                ) : (
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                // align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, index) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                  <TableCell align="left" className={classes?.tableCell}>
                                    {rowsPerPage * page + index + 1}.)
                                  </TableCell>
                                  <TableCell align="left" className={classes?.tableCell}>
                                    {row?.test_desc === null ? '-' : row?.test_desc}
                                  </TableCell>
                                  <TableCell align="center" className={classes?.tableCell}>
                                    {row?.result_detail === null ? '-' : row?.result_detail}
                                  </TableCell>
                                  <TableCell align="center" className={classes?.tableCell}>
                                    {row?.item_type_values?.types === null ||
                                    row?.item_type_values?.types === undefined
                                      ? '-'
                                      : `${row?.item_type_values?.types}  ${
                                          row?.item_type_values?.count_data === null
                                            ? ''
                                            : row?.item_type_values?.count_data
                                        }`}
                                  </TableCell>
                                  <TableCell align="right">
                                    <div className="flex justify-center">
                                      <div>
                                        <IconButton
                                          onClick={() => handleClickOpens(row.id, row)}
                                          color="info"
                                          className=""
                                        >
                                          <EditIcon />
                                        </IconButton>
                                      </div>
                                      <div>
                                        <IconButton
                                          // onClick={(e) => HandleDelete(row.id,row.partNumber, e)}
                                          onClick={(e) => HandleDelete(row?.id, row)}
                                          color="error"
                                          className=""
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={rows?.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                )}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
