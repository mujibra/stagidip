/* eslint-disable array-callback-return */
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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
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
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import HandleEditDetail from './action/HandleEditDetail';

// import { getMachie } from '../store/machineSlice';

const useStyles = makeStyles({
  tableCell: {
    minWidth: '150px',
  },
});

function createData(
  id,
  general_desc,
  type_atm,
  in_out_info
  //  status
) {
  return {
    id,
    general_desc,
    type_atm,
    in_out_info,
    // status,
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
    label: 'NO',
  },
  //   {
  //     id: 'stagging',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Stagging',
  //   },
  {
    id: 'generalDesc',
    numeric: true,
    disablePadding: false,
    label: 'General Desc',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
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
            align={headCell.id === 'name' ? 'left' : 'center'}
            // align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
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
  // console.log(props)
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
          Style List
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

export default function TablePreloading(props) {
  const { body } = props;
  const { setBody } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState('');

  const [dataEdit, setDataEdit] = useState({
    id: null,
    type_atm: null,
    general_desc: null,
    label: null,
    option: null,
  });

  const [valueModel, setvalueModel] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getTodos, setgetTodos] = useState([]);
  const getAccessToken = localStorage.getItem('access_token');
  const user_info = JSON.parse(localStorage.getItem('user_profile'));

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const handleSearch = (e) => {
    setSearched(e.target.value);
  };

  const handleClickOpens = async (id, row) => {
    // console.log(row, 'rr');
    setDataEdit({
      id: row?.id,
      type_atm: row?.type_atm,
      general_desc: row?.general_desc,
      label: row?.in_out_info?.label,
      option: row?.in_out_info?.option,
    });
    setvalueModel(row?.type_atm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const payloadModel = [];

  valueModel?.map((item) => {
    payloadModel.push(item?.type_atm);
  });
  const bodyEdit = {
    type_atm: payloadModel.join(','),
    general_desc: dataEdit?.general_desc,
    in_out_info: {
      label: dataEdit?.label,
      option: getTodos,
    },
  };
  // console.log(bodyEdit, 'bodyEdit');
  // console.log(dataEdit, 'dataEdit');

  const HandleDelete = async (id, row) => {
    // e.preventDefault();

    props.setLoading(true);
    const response = await axios
      .delete(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}mstInspeksi/${id}`, {
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
  };

  const HanldleClickNotifDelete = (row) => {
    // console.log(row, "row");
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Sure to delete data ${row?.general_desc}?`}
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
                onClick={(e) => HandleDelete(row.id, row)}
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
  const handleEdit = async (id) => {
    props.setLoading(true);
    const response = await axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}mstInspeksi/${dataEdit?.id}`,
        bodyEdit,
        config
      )
      .then((res) => {
        setDataEdit(res.data?.data);
        props.setLoading(false);
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
        props.setLoading(false);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const filteredData = props?.data
    ? props?.data.filter((el) => {
        if (searched) {
          return el?.general_desc?.toLowerCase().includes(searched.toLowerCase());
        }
        return el;
      })
    : [];

  const datas = filteredData?.map((item, index) =>
    createData(
      // index + 1,
      item?.id,
      item?.general_desc,
      item?.type_atm,
      item?.in_out_info
      // item?.status
    )
  );
  // console.log(props.data, 'props.data');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();
  const propsFromParent = (data) => {
    setgetTodos(data);
  };

  useEffect(() => {
    if (page !== 0) {
      setPage(0);
    }
  }, [searched]);

  return (
    <Box sx={{ width: '100%' }}>
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
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <EnhancedTableToolbar
          HandleDelete={HandleDelete}
          arrDel={arrDel}
          numSelected={selected.length}
        />
        <Dialog
          // maxWidth="xl"
          fullWidth
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
                valueModel={valueModel}
                setvalueModel={setvalueModel}
                // handleChangeUpdate={handleChangeUpdate}
                setDataEdit={setDataEdit}
                // row={row}
                propsFromParent={propsFromParent}
                getData={props?.getData}
                loading={loading}
                dataEdit={dataEdit}
                // bodyEdit={bodyEdit}
                body={props.body}
                setBody={props.setBody}
                handleClose={props.handleClose}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={
                getTodos.length === 0 ||
                dataEdit?.label === '' ||
                dataEdit?.general_desc === '' ||
                dataEdit?.type_atm.length === 0
              }
              variant="contained"
              startIcon={<PlaylistAddIcon />}
            >
              <div className="hidden md:contents" onClick={() => handleEdit(dataEdit.id)}>
                Saves
              </div>
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer sx={{ maxHeight: 440 }}>
          {props.loading === true ? (
            <FuseLoading />
          ) : datas?.length !== 0 ? (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              stickyHeader
              aria-label="sticky table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
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
                    const data = [];
                    row?.type_atm.map((item, idx) => {
                      data.push(item?.type_atm);
                    });
                    // console.log(data, 'ddd');

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
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell> */}
                        <TableCell align="center" className={classes?.tableCell}>
                          {rowsPerPage * page + index + 1}.)
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.general_desc === '' ? '-' : row?.general_desc}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {/* {row?.type_atm === null ? '-' : row?.type_atm} */}
                          {data.join(', ')}
                        </TableCell>

                        <TableCell align="center">
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
                            {user_info[0]?.roles !== 'SUPERVISOR' && (
                              <div>
                                <IconButton
                                  // onClick={(e) => HandleDelete(row.id,row.partNumber, e)}
                                  onClick={(e) => HanldleClickNotifDelete(row)}
                                  color="error"
                                  className=""
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
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
          rowsPerPageOptions={[5, 10, 25]}
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
