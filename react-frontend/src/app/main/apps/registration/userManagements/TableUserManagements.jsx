/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
  useState,
  useEffect,
  // useCallback
} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@mui/styles';
// import moment from 'moment';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import moment from 'moment';
import HandleEditDetail from './action/HandleEditDetail';

const user_info = JSON.parse(localStorage.getItem('user_profile'));
const useStyles = makeStyles({
  tableCell: {
    minWidth: '150px',
  },
});

function createData(id, name, email, roles, status, customer, gudang, created_at) {
  return {
    id,
    name,
    email,
    roles,
    status,
    customer,
    gudang,
    created_at,
  };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'no',
    numeric: false,
    disablePadding: true,
    label: 'No',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'roles',
    numeric: true,
    disablePadding: true,
    label: 'Roles',
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: true,
    label: 'Customer',
  },
  {
    id: 'gudang',
    numeric: true,
    disablePadding: true,
    label: 'Warehouse',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Created at',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-blue-50">
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.id === 'no' ? 'left' : 'center'}
            align="left"
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={headCell.id === 'no' ? 'ml-10' : 'ml-0'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  const handleDeleteAll = () => {
    // console.log(props.arrDel.id);
    // console.log(numSelected);
  };

  return (
    <Toolbar
      className="rounded-t-lg bg-blue-750"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          className="text-white"
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className="text-white"
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of User Managements
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton color="error" className="z-10">
            <DeleteIcon onClick={handleDeleteAll} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon color="info" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TableUserManagements(props) {
  // console.log(props, "propsss");
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  // console.log(userRoles, 'userRoles');
  const { body } = props;
  const { setBody } = props;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const getAccessToken = localStorage.getItem('access_token');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  // const [dataEdit, setDataEdit] = useState([]);
  const [dataEdit, setDataEdit] = useState({
    name: null,
    email: null,
    status: null,
    password: null,
    roles: null,
    customer: null,
    gudang: null,
  });
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [DataCustomer, setDataCustomer] = useState([]);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [valueCustomer, setvalueCustomer] = useState({
    name: dataEdit?.customer?.bank_desc || '',
    id: dataEdit?.customer?.id || '',
    json: dataEdit || null,
  });
  const [valueGudang, setvalueGudang] = useState({
    name: dataEdit?.gudang?.gudang_desc || '',
    id: dataEdit?.gudang?.id || '',
    json: dataEdit || null,
  });

  const [dataById, setDataById] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const newBody = {
    name: dataEdit?.name,
    email: dataEdit?.email,
    roles: dataEdit?.roles,
    status: dataEdit?.status,
    password: dataEdit?.password,
    id_customer: dataEdit?.roles !== 'GUEST_BANK' ? null : dataEdit?.customer?.id,
    id_gudang: dataEdit?.roles !== 'OPERATOR_MOVER' ? null : dataEdit?.gudang?.id,
  };
  // console.log(newBody, 'newBody');
  const handleEdit = async (id) => {
    setLoading(true);
    const response = await axios
      .put(`${api}users/${dataById?.id}/${userRolesId}`, newBody, config)
      .then((res) => {
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
        props.getData();
        dispatch(closeDialog());
        // setNum(num - 1);
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
    setOpen(false);
  };

  const handleClickOpens = (id, row) => {
    setDataById(row);
    setDataEdit(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandleDelete = async (id, e) => {
    props.setLoading(true);
    const response = await axios
      .delete(`${api}users/${id}/${userRolesId}`, {
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
        props.getData();
        dispatch(closeDialog());
      })
      .catch((err) => {
        props.setLoading(false);
        console.log(err);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Login Failed!';
          dispatch(closeDialog());
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
          dispatch(closeDialog());
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
          dispatch(closeDialog());
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
          dispatch(closeDialog());
        } else if (errStatus === 400) {
          messages = errMessage;
          dispatch(closeDialog());
        } else {
          messages = 'Something Wrong!!';
          dispatch(closeDialog());
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

  const HanldleClickNotifDelete = (id, row) => {
    // console.log(row, 'row');
    setDataEdit(row);
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Sure to delete data : {row?.name}?
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
                // disabled
                onClick={(e) => HandleDelete(id, e)}
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const datas = filteredRows?.map((item, index) =>
    createData(
      // index + 1,
      item?.id,
      item?.name,
      item?.email,
      item?.roles,
      item?.status,
      item?.customer,
      item?.gudang,
      item?.created_at
    )
  );
  // console.log(props.data, 'props.data');

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datas?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    if (searched === '') {
      setFilteredRows(props?.data);
    } else {
      setPage(0);
      const filteredData = props?.data?.filter(
        (row) =>
          // console.log(row, 'rowww')
          row?.name?.toLowerCase()?.includes(searched?.toLowerCase())
        // ||row?.roles?.toLowerCase()?.includes(searched?.toLowerCase())
      );
      setFilteredRows(filteredData);
    }
  }, [props?.data, searched]);

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();

  useEffect(() => {
    getDataListCustomer();
  }, []);
  // console.log(valueGudang, 'valueGudang');

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <div className="p-10 w-1/3">
          <TextField
            fullWidth
            label="Search"
            value={searched}
            onChange={handleSearch}
            variant="outlined"
            // size="small"
            style={{ marginBottom: '10px', marginLeft: '10px' }}
          />
        </div>
        <EnhancedTableToolbar
          HandleDelete={HandleDelete}
          arrDel={arrDel}
          numSelected={selected.length}
        />
        <Dialog
          maxWidth="xl"
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Data</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <HandleEditDetail
                valueGudang={valueGudang}
                setvalueGudang={setvalueGudang}
                valueCustomer={valueCustomer}
                setvalueCustomer={setvalueCustomer}
                DataGudang={props?.DataGudang}
                loadingGudang={props?.loadingGudang}
                DataCustomer={DataCustomer}
                loadingCustomer={loadingCustomer}
                setDataById={setDataById}
                setDataEdit={setDataEdit}
                // row={row}
                loading={loading}
                dataEdit={dataEdit}
                body={props.body}
                setBody={props.setBody}
                handleEdit={handleEdit}
                handleClose={handleClose}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <TableContainer sx={{ maxHeight: 440 }}>
          {props.loading === true ? (
            <FuseLoading />
          ) : datas?.length !== 0 ? (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? 'small' : 'medium'}
              size="medium"
              stickyHeader
              aria-label="sticky table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={datas?.length}
              />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // console.log(row, 'row');
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell align="left" className={classes?.tableCell}>
                          {rowsPerPage * page + index + 1}.)
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.name === '' ? '-' : row?.name}
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.email === '' ? '-' : row?.email}
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.roles === '' ? '-' : row?.roles}
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.customer === null ? '-' : row?.customer?.bank_desc}
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.gudang === null ? '-' : row?.gudang?.gudang_desc}
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.status === 1 ? 'Active' : row?.status === 0 ? 'InActive' : '-'}
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.created_at === ''
                            ? '-'
                            : moment(row?.created_at).format('DD MMM YYYY')}
                        </TableCell>

                        <TableCell align="center">
                          <div className="flex justify-center">
                            <div>
                              <IconButton
                                onClick={() => handleClickOpens(row.id, row)}
                                // disabled={userRoles === 'ADMIN' && row?.roles === 'SUPER_ADMIN'}
                                disabled={
                                  user_info[0]?.roles === 'SUPERVISOR'
                                    ? row?.roles === 'ADMIN' || row?.roles === 'SUPER_ADMIN'
                                    : user_info[0]?.roles === 'ADMIN'
                                    ? row?.roles === 'SUPER_ADMIN'
                                    : false
                                }
                                color="info"
                                className=""
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                            {user_info[0]?.roles === 'SUPER_ADMIN' ||
                            (user_info[0]?.roles === 'ADMIN' &&
                              row?.roles !== 'SUPER_ADMIN' &&
                              row?.roles !== 'ADMIN') ? (
                              <div>
                                <IconButton
                                  onClick={() => HanldleClickNotifDelete(row.id, row)}
                                  color="error"
                                  // disabled={userRoles === 'ADMIN' && row?.roles === 'SUPER_ADMIN'}
                                  className=""
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center m-20">
              <div>No Data Available</div>
            </div>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={datas?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
