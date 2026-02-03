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
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
  useEffect,
  useState,
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
import HandleEditDetail from './action/HandleEditDetail';
import HandleAddTemplate from './action/HandleAddTemplate';

const useStyles = makeStyles({
  tableCell: {
    minWidth: '150px',
  },
});

function createData(id, merek, model, type, status_template_prestaging) {
  return {
    id,
    merek,
    model,
    type,
    status_template_prestaging,
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
    id: 'merek',
    numeric: true,
    disablePadding: false,
    label: 'Brand',
  },
  {
    id: 'model',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'copyTemplate',
    numeric: true,
    disablePadding: false,
    label: 'Copy Template',
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
            align={headCell.id === 'merek' ? 'left' : 'center'}
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
          List of Machine
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

export default function TableRegistMachine(props) {
  const { body } = props;
  const { setBody } = props;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState('');

  const filteredData = props?.data
    ? props?.data.filter((el) => {
        if (searched) {
          return (
            el?.merek?.toLowerCase().includes(searched.toLowerCase()) ||
            el?.model?.name?.toLowerCase().includes(searched.toLowerCase()) ||
            el?.type?.toLowerCase().includes(searched.toLowerCase())
          );
        }
        return el;
      })
    : [];

  useEffect(() => {
    if (page !== 0) {
      setPage(0);
    }
  }, [searched]);

  // const [dataEdit, setDataEdit] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModel, setNewModel] = useState('');
  const getAccessToken = localStorage.getItem('access_token');
  const user_info = JSON.parse(localStorage.getItem('user_profile'));

  const [dataEdit, setDataEdit] = useState({
    merek: null,
    model: null,
    type: null,
  });
  // console.log(newModel, 'newModel');
  const [dataById, setDataById] = useState([]);
  const [getTrigger, setGetTrigger] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const formatDatePo = 'YYYY-MM-DD HH:mm:ss';

  const handleEdit = async (id) => {
    const newBody = {
      merek: dataEdit?.merek,
      model: dataEdit?.model?.id,
      type: dataEdit?.type,
    };
    setLoading(true);
    const response = await axios
      .put(`${api}master-mesin/${dataEdit.id}/update`, newBody, config)
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
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.errorMessage;
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

  const handleEditNewTTemplate = async (id) => {
    setLoading(true);
    const response = await axios
      .put(
        `${api}copyTemplatePreStaging/${dataEdit?.id}`,
        { copy_from_model: newModel?.id },
        config
      )
      .then((res) => {
        setLoading(false);
        props.getData();
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
  const handleClickOpens = (id, row, trigger) => {
    setDataById(row);
    setDataEdit(row);
    setGetTrigger(trigger);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandleDelete = async (id, e) => {
    // e.preventDefault();

    props.setLoading(true);
    const response = await axios
      .delete(`${api}master-mesin/${id}`, {
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
          dispatch(closeDialog());
          window.location.href = '/login';
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

  const HanldleClickNotifDelete = (row, partNumber, e) => {
    // console.log(row.model);
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Sure to delete data ${row?.model.name}?`}
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
                onClick={(e) => HandleDelete(row?.id)}
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

  const datas = filteredData?.map((item, index) =>
    createData(
      // index + 1,
      item?.id,
      item?.merek,
      item?.model,
      item?.type,
      item?.status_template_prestaging
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();
  useEffect(() => {}, [getTrigger]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <div className="p-10 w-1/3">
          <TextField
            fullWidth
            label="Search"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
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
          <DialogTitle id="alert-dialog-title">
            {getTrigger === 0
              ? `Type ${dataEdit?.model?.name}`
              : `Edit Type ${dataEdit?.model?.name}`}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText className="mb-80" id="alert-dialog-description">
              {getTrigger === 0 ? (
                <HandleAddTemplate
                  // setDataById={setDataById}
                  // setDataEdit={setDataEdit}
                  // propsFromParent={propsFromParent}
                  // row={row}
                  setNewModel={setNewModel}
                  newModel={newModel}
                  loading={loading}
                  dataEdit={dataEdit}
                  body={props.body}
                  setBody={props.setBody}
                  handleClose={props.handleClose}
                />
              ) : (
                <HandleEditDetail
                  setDataById={setDataById}
                  setDataEdit={setDataEdit}
                  // row={row}
                  loading={loading}
                  dataEdit={dataEdit}
                  body={props.body}
                  setBody={props.setBody}
                  handleClose={props.handleClose}
                />
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" startIcon={<PlaylistAddIcon />}>
              <div
                className="hidden md:contents"
                onClick={getTrigger === 0 ? () => handleEditNewTTemplate() : () => handleEdit()}
              >
                Save
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
              <EnhancedTableHead rowCount={datas?.length} />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center" className={classes?.tableCell}>
                          {rowsPerPage * page + index + 1}.)
                        </TableCell>
                        <TableCell align="left" className={classes?.tableCell}>
                          {row?.merek === '' ? '-' : row?.merek}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.model?.name === '' ? '-' : row?.model?.name}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.type === '' ? '-' : row?.type}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.status_template_prestaging === null ? (
                            <div>
                              <IconButton
                                onClick={() => handleClickOpens(row.id, row, 0)}
                                color="info"
                                className=""
                              >
                                <FormatListNumberedIcon />
                              </IconButton>
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>

                        <TableCell align="center">
                          <div className="flex justify-center">
                            <div>
                              <IconButton
                                onClick={() => handleClickOpens(row.id, row, 1)}
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
                                  onClick={(e) => HanldleClickNotifDelete(row, row.partNumber, e)}
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
