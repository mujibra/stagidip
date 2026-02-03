/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-multi-assign */
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
import * as React from 'react';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';
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
  Chip,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@mui/styles';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import moment from 'moment';
import HandleEditDetail from './action/HandleEditDetail';
import HandleUpproveTSS from './action/HandleUpproveTSS';
import HandleUpproveStaging from './action/HandleUpproveStaging';
import { HandlePrint } from './action/HandlePrint';
import MockData from './action/openSpecification/MockData';
import OpenSpecAllDataTemplate from './action/openSpecification/OpenSpecAllDataTemplate';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  tableCell: {
    minWidth: '150px',
    cursor: 'pointer',
  },
});

function createData(
  id,
  created_at,
  approval_staging,
  approval_tss,
  customer,
  detail_po,
  mesin,
  model,
  notes,
  pn_system,
  sn_mesins,
  time_todo
) {
  return {
    id,
    created_at,
    approval_staging,
    approval_tss,
    customer,
    detail_po,
    mesin,
    model,
    notes,
    pn_system,
    sn_mesins,
    time_todo,
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
  {
    id: 'no_po',
    numeric: true,
    disablePadding: false,
    label: 'No PO',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'model',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'partnumber',
    numeric: true,
    disablePadding: false,
    label: 'Partnumber System',
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'Customer',
  },
  // {
  //   id: 'picStaging',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'PIC Staging',
  // },
  {
    id: 'timeTodo',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'approval',
    numeric: true,
    disablePadding: false,
    label: 'Approval',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
  {
    id: 'report',
    numeric: true,
    disablePadding: false,
    label: 'Detail Report',
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
            align={headCell.id === 'no' ? 'left' : 'center'}
            // align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className={headCell.id === 'no' ? 'ml-10' : 'ml-0'}
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
          List of Specification
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

export default function TableSpesification(props) {
  // console.log(props, 'propssdasdasdu');

  const userRoles = props?.userRoles;
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  // const dataDetail = props?.dataDetail;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSpec, setopenSpec] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // const [dataEdit, setDataEdit] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [dataLocalStorage, setDataLocalStrorage] = useState([]);

  const [dataById, setDataById] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  // console.log(dataDetail, 'dataDetail');
  const [newBody, setNewBody] = useState([]);
  const [getNewBodys, setGetNewBody] = useState([]);
  const [getindexOpen, setGetindexOpen] = useState('');
  const [newBodyExcel, setNewBodyExcel] = useState([]);
  const [getRow, setgetRow] = useState([]);
  const [jsonExcel, setJsonExcel] = useState([]);
  const [listData, setlistData] = useState([]);
  const [dataAllList, setDataAllList] = useState([]);
  const [getTrigger, setGetTrigger] = useState('');
  const [timer, setTimer] = useState(0); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = React.useRef(true);
  const tick = React.useRef();
  const [searched, setSearched] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [dataEdit, setDataEdit] = useState({
    id_po: null,
    sn_mesins: null,
    id_type_mesin: null,
    model: null,
    pn_system: '',
    customer: null,
    notes: '',
    approval_staging: null,
    approval_tss: null,
  });

  const propsFromParent = (data, trigger) => {
    // setNewBody([]);
    setNewBody(data);
    setGetTrigger(trigger);
  };

  useEffect(() => {
    const arrBodyFinal = [];
    if (newBody.length !== 0) {
      for (let index = 0; index < newBody.length; index++) {
        arrBodyFinal.push({
          ...newBody[index],
          fill_description: newBody[index].fill_description,
          // results: newBody[index].results,
        });
      }
    }
    setGetNewBody(arrBodyFinal);
  }, [newBody]);
  // console.log(getNewBodys, 'getNewBodys')
  // console.log(newBody, 'newBody')

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const formatDatePo = 'YYYY-MM-DD HH:mm:ss';
  const handleEdit = async (id) => {
    const newBody = {
      id_po: dataEdit?.detail_po?.id,
      sn_mesins: dataEdit?.sn_mesins,
      id_type_mesins: dataEdit?.id_type_mesins?.id,
      model: dataEdit?.model?.id,
      pn_system: dataEdit?.pn_system,
      customer: dataEdit?.customer?.id,
      notes: dataEdit?.notes,
      approval_staging: dataEdit?.approval_staging?.id,
      approval_tss: dataEdit?.approval_tss?.id,
    };
    setLoading(true);
    const response = await axios
      .put(`${api}spekmesin-header/${id}`, newBody, config)
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
    setOpen(false);
  };

  const handleClickOpens = (id, row) => {
    // console.log(row, 'rowxxx');
    setDataById(row);
    setDataEdit(row);
    setOpen(true);
  };

  const handleClose = () => {
    setJsonExcel([]);
    setOpen(false);
  };

  const HandleDelete = async (id, e) => {
    // e.preventDefault();

    props.setLoading(true);
    const response = await axios
      .delete(`${api}spekmesin-header/${id}`, {
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
          messages = 'Bad Request!!';
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

  const HanldleClickNotifDelete = (id, partNumber, e) => {
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete this data?
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const filteredData = props?.data
    ? props?.data.filter((el) => {
        if (searched) {
          return (
            el?.detail_po?.no_po?.toLowerCase().includes(searched.toLowerCase()) ||
            el?.pn_system.toLowerCase().includes(searched.toLowerCase()) ||
            el?.customer?.bank_desc?.toLowerCase().includes(searched.toLowerCase())
          );
        }
        return el;
      })
    : [];

  const datas = filteredData?.map((item, index) =>
    createData(
      // index + 1,
      item?.id,
      item?.created_at,
      item?.approval_staging,
      item?.approval_tss,
      item?.customer,
      item?.detail_po,
      item?.mesin,
      item?.model,
      item?.notes,
      item?.pn_system,
      item?.sn_mesins,
      item?.time_todo
    )
  );
  // console.log(datas, 'datassss');
  // useEffect(() => {
  //   if (searched === '') {
  //     setFilteredRows(props?.data);
  //   } else {
  //     setPage(0);
  //     const filteredData = props?.data?.filter((row) =>
  //       row?.detail_po?.no_po?.toLowerCase()?.includes(searched?.toLowerCase())
  //     );
  //     setFilteredRows(filteredData);
  //   }
  // }, [props?.data, searched]);

  const handleSearch = (e) => {
    setSearched(e.target.value);
  };

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;
  const classes = useStyles();

  // id 1 ATM id 2 ATMS id 3 CRM id 4 CRMS
  const handleClickOpen = (row, trigger) => {
    if (row) {
      setJsonExcel([]);
      setopenSpec(true);
      setgetRow(row);
      setStart(!start);
    } else {
      dispatch(
        showMessage({
          message: `Mesin ${row?.model?.name} The format doesn't exist yet from Datindo!`,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'warning',
        })
      );
    }
  };
  // console.log(start)
  // console.log(timer)

  const handleCloseSpec = () => {
    setopenSpec(false);
    setJsonExcel([]);
    setDataDetail([]);
    setTimer(0);
    setStart(false);
    clearInterval(tick.current);
    localStorage.removeItem('time_todo');
    props?.getData();
  };
  const getDataDetail = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}spekmesin-detail/v2/${getRow?.id}}`, config)
      .then((res) => {
        setDataDetail(res?.data?.datas);
        setLoading(false);
        // console.log(res?.data?.data, 'res data spec detail');
      })
      .catch((err) => {
        setDataDetail([]);
        const errStatus = err?.response?.status;
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
          messages = 'Bad Request!!';
        } else if (errStatus === 429) {
          messages = 'To Many Request!!';
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
  const getDataAllList = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}master-spekmesin`, config)
      .then((res) => {
        setDataAllList(res?.data?.data);
        setLoading(false);
        // console.log(res?.data?.data, 'res data spec detail');
      })
      .catch((err) => {
        setDataAllList([]);
        const errStatus = err?.response?.status;
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
          messages = 'Bad Request!!';
        } else if (errStatus === 429) {
          messages = 'To Many Request!!';
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
  const HandleSubmit = () => {
    const get_timetodo = JSON.parse(localStorage.getItem('time_todo'));

    let data1 = [];
    if (jsonExcel.length === 0) {
      data1 = [
        {
          dataArray: newBody,
          time_todo: get_timetodo,
        },
      ];
    }

    setLoading(true);
    axios
      .post(`${api}spekmesin-detail/v2`, jsonExcel.length !== 0 ? newBodyExcel : data1, config)
      .then((res) => {
        getDataDetail();
        handleCloseSpec();
        // console.log(res, 'res');
        setLoading(false);
        setNewBody([]);
        localStorage.removeItem('dataList');
        localStorage.removeItem('time_todo');
        dispatch(
          showMessage({
            message: 'Data Successfully Added',
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
        // setDataPoById([]);
        setLoading(false);
        getDataDetail();
        handleCloseSpec();
        // setLoadingDataPoById(false);
        localStorage.removeItem('dataList');
        console.log(err);
        const errStatus = err?.response?.status;
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
          messages = 'Bad Request!!';
        } else if (errStatus === 429) {
          messages = 'To Many Request!!';
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
  const HandleEditt = () => {
    setLoading(true);
    axios
      .put(
        `${api}spekmesin-detail/v2/${getRow?.id}`,
        jsonExcel.length !== 0 ? newBodyExcel : newBody,
        config
      )
      .then((res) => {
        getDataDetail();
        handleCloseSpec();
        // console.log(res, 'res');
        setLoading(false);
        setNewBody([]);
        localStorage.removeItem('dataList');
        dispatch(
          showMessage({
            message: 'Data Successfully Updated',
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
        // setDataPoById([]);
        setLoading(false);
        getDataDetail();
        handleCloseSpec();
        localStorage.removeItem('dataList');
        // setLoadingDataPoById(false);
        console.log(err);
        const errStatus = err?.response?.status;
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
          messages = 'Bad Request!!';
        } else if (errStatus === 429) {
          messages = 'To Many Request!!';
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
    let isUnmout = false;
    if (!isUnmout) {
      getDataAllList();
      if (getRow?.length !== 0) {
        getDataDetail();
      } else if (getRow?.length !== 0 && getindexOpen === 3) {
        getDataDetail();
      } else {
        null;
      }
    }
    return () => {
      isUnmout = true;
    };
  }, [getRow, getindexOpen]);
  const arrOS = [];
  const arrPROCCESOR = [];
  const arrDataMAINBOARD_CE = [];
  const arrMEMORY_1 = [];
  const arrMEMORY_2 = [];
  const arrMONITOR_1 = [];
  const arrMONITOR_2 = [];
  const arrHDD_1 = [];
  const arrHDD_2 = [];
  const arrHDD_3 = [];
  const arrHDD_4 = [];
  const arrMCU = [];
  const arrSPR = [];
  const arrEPP = [];
  const arrPOWER_SUPPLY = [];
  const arrCROPF = [];
  const arrCARDBIN_1 = [];
  const arrCARDBIN_2 = [];
  const arrCASSETTE_1 = [];
  const arrCASSETTE_2 = [];
  const arrREJECT_1 = [];
  const arrREJECT_2 = [];
  const arrKUNCI_FASCIA_ATAS_1 = [];
  const arrKUNCI_FASCIA_ATAS_2 = [];
  const arrKUNCI_FASCIABAWAH = [];
  const arrKUNCI_TOMBAK = [];
  const arrKUNCI_CASSETTE_REJECT_1 = [];
  const arrKUNCI_CASSETTE_REJECT_2 = [];
  const arrKUNCI_CASSETTE_REJECT_3 = [];
  const arrCENCON = [];
  const arrAS_CENCON = [];
  const arrCAMERA = [];
  const arrKUNCI_CARDBIN = [];
  const arrCARDLESS_READER = [];
  const arrLAN_CARD_1 = [];
  const arrLAN_CARD_2 = [];
  const arrTHERMAL_PAPER = [];
  const arrCABINET_SENSOR = [];
  const arrSENSOR_GETAR = [];
  const arrKABEL_LAN = [];
  const arrKABEL_POWER = [];
  const arrKABEL_SERIAL_UPS = [];
  const arrKABEL_HDMI_TO_DVI_1 = [];
  const arrKABEL_HDMI_TO_DVI_2 = [];
  const arrKABEL_HDMI_TO_DVI_3 = [];
  const arrFDI = [];
  const arrLUBANG_3_WAY_LOCK = [];
  const arrPIN_COVER = [];

  const getAllList = async () => {
    setLoading(true);
    try {
      const dataList = {};
      const resAllData = await axios.get(`${api}master-spekmesin/`, config);
      dataList.allData = resAllData?.data?.data;
      setLoading(false);
      return dataList;
    } catch (error) {
      setLoading(false);
      console.log(error, error?.message);
      if (error.message.indexOf('429')) {
        return '429';
      }
      return null;
    }
  };
  const file_namesStr = `tmp_Spesification_NO_PO_${getRow?.detail_po?.no_po}.xlsx`;

  const file_name = file_namesStr.replace(/[/]/g, '_');
  // console.log(file_name, 'file_name')

  async function exportToExcel() {
    // const localDataList = localStorage.getItem('dataList');
    let dataList = '';
    dataList = await getAllList();
    if (dataList === '429') {
      dispatch(
        showMessage({
          message: ' Terlalu Banyak Request!!,Tunggu 10 Detik',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'warning',
        })
      );
    }

    if (dataList?.allData.length !== 0) {
      setlistData(dataList?.allData);
      dataList?.allData?.map((i, idx) => {
        switch (idx) {
          case 0:
            i.items_data?.map((item) => {
              arrOS.push(item?.description);
            });
            break;
          case 1:
            i.items_data?.map((item) => {
              arrPROCCESOR.push(item?.description);
            });
            break;
          case 2:
            i.items_data?.map((item) => {
              arrDataMAINBOARD_CE.push(item?.description);
            });
            break;
          case 3:
            i.items_data?.map((item) => {
              arrMEMORY_1.push(item?.description);
            });
            break;
          case 4:
            i.items_data?.map((item) => {
              arrMONITOR_1.push(item?.description);
            });
            break;
          case 5:
            i.items_data?.map((item) => {
              arrHDD_1.push(item?.description);
            });
            break;
          case 6:
            i.items_data?.map((item) => {
              arrMCU.push(item?.description);
            });
            break;
          case 7:
            i.items_data?.map((item) => {
              arrSPR.push(item?.description);
            });
            break;
          case 8:
            i.items_data?.map((item) => {
              arrEPP.push(item?.description);
            });
            break;
          case 9:
            i.items_data?.map((item) => {
              arrPOWER_SUPPLY.push(item?.description);
            });
            break;
          case 10:
            i.items_data?.map((item) => {
              arrCROPF.push(item?.description);
            });
            break;
          // case 11:
          //   arrOS.push(i?.description);
          //   break;
          case 12:
            i.items_data?.map((item) => {
              arrCASSETTE_1.push(item?.description);
            });
            break;
          case 13:
            i.items_data?.map((item) => {
              arrREJECT_1.push(item?.description);
            });
            break;
          case 14:
            i.items_data?.map((item) => {
              arrKUNCI_FASCIA_ATAS_1.push(item?.description);
            });
            break;
          case 15:
            i.items_data?.map((item) => {
              arrKUNCI_FASCIABAWAH.push(item?.description);
            });
            break;
          case 16:
            i.items_data?.map((item) => {
              arrKUNCI_TOMBAK.push(item?.description);
            });
            break;
          case 17:
            i.items_data?.map((item) => {
              arrKUNCI_CASSETTE_REJECT_1.push(item?.description);
            });
            break;
          case 18:
            i.items_data?.map((item) => {
              arrCENCON.push(item?.description);
            });
            break;
          case 19:
            i.items_data?.map((item) => {
              arrAS_CENCON.push(item?.description);
            });
            break;
          case 20:
            i.items_data?.map((item) => {
              arrCAMERA.push(item?.description);
            });
            break;
          case 21:
            i.items_data?.map((item) => {
              arrKUNCI_CARDBIN.push(item?.description);
            });
            break;
          case 22:
            i.items_data?.map((item) => {
              arrCARDLESS_READER.push(item?.description);
            });
            break;
          // case 23:
          //   arrOS.push(i?.description);
          //   break;
          case 24:
            i.items_data?.map((item) => {
              arrTHERMAL_PAPER.push(item?.description);
            });
            break;
          case 25:
            i.items_data?.map((item) => {
              arrCABINET_SENSOR.push(item?.description);
            });
            break;
          case 26:
            i.items_data?.map((item) => {
              arrSENSOR_GETAR.push(item?.description);
            });
            break;
          case 27:
            i.items_data?.map((item) => {
              arrKABEL_LAN.push(item?.description);
            });
            break;
          case 28:
            i.items_data?.map((item) => {
              arrKABEL_POWER.push(item?.description);
            });
            break;
          case 29:
            i.items_data?.map((item) => {
              arrKABEL_SERIAL_UPS.push(item?.description);
            });
            break;
          case 30:
            i.items_data?.map((item) => {
              arrKABEL_HDMI_TO_DVI_1.push(item?.description);
            });
            break;
          case 31:
            i.items_data?.map((item) => {
              arrFDI.push(item?.description);
            });
            break;
          case 32:
            i.items_data?.map((item) => {
              arrLUBANG_3_WAY_LOCK.push(item?.description);
            });
            break;
          case 33:
            i.items_data?.map((item) => {
              arrPIN_COVER.push(item?.description);
            });
            break;
          case 34:
            i.items_data?.map((item) => {
              arrMEMORY_2.push(item?.description);
            });
            break;
          case 35:
            i.items_data?.map((item) => {
              arrMONITOR_2.push(item?.description);
            });
            break;
          case 36:
            i.items_data?.map((item) => {
              arrHDD_2.push(item?.description);
            });
            break;
          case 37:
            i.items_data?.map((item) => {
              arrHDD_3.push(item?.description);
            });
            break;
          case 38:
            i.items_data?.map((item) => {
              arrCASSETTE_2.push(item?.description);
            });
            break;
          case 39:
            i.items_data?.map((item) => {
              arrKUNCI_FASCIA_ATAS_2.push(item?.description);
            });
            break;
          // case 40:
          //   arrOS.push(i?.description);
          //   break;
          case 41:
            i.items_data?.map((item) => {
              arrKUNCI_CASSETTE_REJECT_2.push(item?.description);
            });
            break;
          case 42:
            i.items_data?.map((item) => {
              arrKUNCI_CASSETTE_REJECT_3.push(item?.description);
            });
            break;
          case 43:
            i.items_data?.map((item) => {
              arrREJECT_2.push(item?.description);
            });
            break;
          case 44:
            i.items_data?.map((item) => {
              arrKABEL_HDMI_TO_DVI_2.push(item?.description);
            });
            break;
          case 45:
            i.items_data?.map((item) => {
              arrKABEL_HDMI_TO_DVI_3.push(item?.description);
            });
            break;
          case 46:
            i.items_data?.map((item) => {
              arrHDD_4.push(item?.description);
            });
            break;
          case 47:
            i.items_data?.map((item) => {
              arrCARDBIN_1.push(item?.description);
            });
            break;
          case 48:
            i.items_data?.map((item) => {
              arrCARDBIN_2.push(item?.description);
            });
            break;
          case 49:
            i.items_data?.map((item) => {
              arrLAN_CARD_1.push(item?.description);
            });
            break;
          case 50:
            i.items_data?.map((item) => {
              arrLAN_CARD_2.push(item?.description);
            });
            break;
          default:
            '';
            break;
        }
      });
    }
    // console.log(arrOS, 'arrOS');

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const wb = new Excel.Workbook();
    // const workbook = new Workbook();
    const ws = wb.addWorksheet('Staging_Registrations');

    const headers = [
      { header: 'no', key: 'no', width: 5 },
      { header: 'item_desc', key: 'item_desc', width: 30 },
      { header: 'fillcollom1', key: 'fillcollom1', width: 30 },
      { header: 'fillcollom2', key: 'fillcollom2', width: 30 },
      { header: 'fillcollom3', key: 'fillcollom3', width: 30 },
      { header: 'fillcollom4', key: 'fillcollom4', width: 30 },
      { header: 'results', key: 'results', width: 15 },
      // { header: 'OKNG', key: 'OKNG', width: 20 },
      // { header: 'Keterangan', key: 'Keterangan', width: 15 },
    ];
    ws.columns = headers;
    const dataAlfabet = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

    MockData?.map((item, index) => {
      const row = ws.getRow(index);
      ws.addRow([
        ++index,
        item?.item_desc,
        // item?.result_detail,
        item?.fillcollom1,
        item?.fillcollom2,
        item?.fillcollom3,
        item?.fillcollom4,
        'OK',
      ]);
      ws.getCell(`G${index + 1}`).border = {
        top: { style: 'medium', color: { argb: '000000' } },
        left: { style: 'medium', color: { argb: '000000' } },
        bottom: { style: 'medium', color: { argb: '000000' } },
        right: { style: 'medium', color: { argb: '000000' } },
      };
      ws.getCell(`C${index + 1}`).border = {
        top: { style: 'medium', color: { argb: '000000' } },
        left: { style: 'medium', color: { argb: '000000' } },
        bottom: { style: 'medium', color: { argb: '000000' } },
        right: { style: 'medium', color: { argb: '000000' } },
      };
      ws.getCell(`G${index + 1}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"OK,NG,NA"'],
        // formulae: ['=Levels!$E$2:$A$9999'],
      };
    });
    // border
    ws.getCell(`D5`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D6`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D7`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`E7`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`F7`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D13`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D14`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D15`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D16`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D19`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`E19`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D25`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`D32`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`E32`).border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    ws.getCell(`C2`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrOS}"`],
    };
    // console.log(arrOS);
    ws.getCell(`C3`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrPROCCESOR}"`],
    };
    ws.getCell(`C4`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrDataMAINBOARD_CE}"`],
    };
    ws.getCell(`C5`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrMEMORY_1}"`],
    };
    ws.getCell(`D5`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrMEMORY_2}"`],
    };
    ws.getCell(`C6`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrMONITOR_1}"`],
    };
    ws.getCell(`D6`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrMONITOR_2}"`],
    };
    ws.getCell(`C7`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrHDD_1}"`],
    };
    ws.getCell(`D7`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrHDD_2}"`],
    };
    ws.getCell(`E7`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrHDD_3}"`],
    };
    ws.getCell(`F7`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrHDD_4}"`],
    };
    ws.getCell(`C8`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrMCU}"`],
    };
    ws.getCell(`C9`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrSPR}"`],
    };
    ws.getCell(`C10`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrEPP}"`],
    };
    ws.getCell(`C11`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrPOWER_SUPPLY}"`],
    };
    ws.getCell(`C12`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCROPF}"`],
    };
    ws.getCell(`C13`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCARDBIN_1}"`],
    };
    ws.getCell(`D13`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCARDBIN_2}"`],
    };
    ws.getCell(`C14`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCASSETTE_1}"`],
    };
    ws.getCell(`D14`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCASSETTE_2}"`],
    };
    ws.getCell(`C15`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrREJECT_1}"`],
    };
    ws.getCell(`D15`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrREJECT_2}"`],
    };
    ws.getCell(`C16`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_FASCIA_ATAS_1}"`],
    };
    ws.getCell(`D16`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_FASCIA_ATAS_2}"`],
    };
    ws.getCell(`C17`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_FASCIABAWAH}"`],
    };
    ws.getCell(`C18`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_TOMBAK}"`],
    };
    ws.getCell(`C19`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_CASSETTE_REJECT_1}"`],
    };
    ws.getCell(`D19`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_CASSETTE_REJECT_2}"`],
    };
    ws.getCell(`E19`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_CASSETTE_REJECT_3}"`],
    };
    ws.getCell(`C20`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCENCON}"`],
    };
    ws.getCell(`C21`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrAS_CENCON}"`],
    };
    ws.getCell(`C22`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCAMERA}"`],
    };
    ws.getCell(`C23`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKUNCI_CARDBIN}"`],
    };
    ws.getCell(`C24`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCARDLESS_READER}"`],
    };
    ws.getCell(`C25`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrLAN_CARD_1}"`],
    };
    ws.getCell(`D25`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrLAN_CARD_2}"`],
    };
    ws.getCell(`C26`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrTHERMAL_PAPER}"`],
    };
    ws.getCell(`C27`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrCABINET_SENSOR}"`],
    };
    ws.getCell(`C28`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrSENSOR_GETAR}"`],
    };
    ws.getCell(`C29`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKABEL_LAN}"`],
    };
    ws.getCell(`C30`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKABEL_POWER}"`],
    };
    ws.getCell(`C31`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKABEL_SERIAL_UPS}"`],
    };
    ws.getCell(`C32`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKABEL_HDMI_TO_DVI_1}"`],
    };
    ws.getCell(`D32`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKABEL_HDMI_TO_DVI_2}"`],
    };
    ws.getCell(`E32`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrKABEL_HDMI_TO_DVI_3}"`],
    };
    ws.getCell(`C33`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrFDI}"`],
    };
    ws.getCell(`C34`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrLUBANG_3_WAY_LOCK}"`],
    };
    ws.getCell(`C35`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${arrPIN_COVER}"`],
    };

    const buffer = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buffer], { type: fileType }), file_name);
  }
  let name;

  const handleselectedFile = (e) => {
    // dataListVariable = await getAllList();
    setNewBody([]);
    // dataListVariable = JSON.parse(localStorage.getItem('dataList'));
    name = e.target.files[0].name;
    e.preventDefault();
    // console.log(name);

    if (name !== file_name) {
      dispatch(
        showMessage({
          message: 'Cek Again Nama File ',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'warning',
        })
      );
      // setJsonExcel([]);
    } else if (dataLocalStorage[0] === null) {
      dispatch(
        showMessage({
          message: 'Download Template First!',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'warning',
        })
      );
    } else {
      dispatch(
        showMessage({
          message: 'Upload File Success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
      );
      if (e.target.files) {
        const reader = new FileReader();
        // setlistData(dataListVariable);
        // console.log('masuk ')
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: null });
          // const newBodyWithId = dataExeltoBody({
          //   data: json,
          //   datalist: dataListVariable,
          //   id_spek_mesin_hdr: getRow?.id,
          // });
          // console.log(newBodyWithId, 'newBodyWithId');
          // console.log(dataListVariable, 'dataListVariablea');
          setJsonExcel(json);
          // setNewBody(json);
          // }
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    }
  };

  // console.log(dataAllList, 'dataAllList');
  const body = {
    id_spek_mesin_hdr: null,
    item_desc: null,
    fill_description: null,
    results: null,
  };

  useEffect(() => {
    // const LocalStorage = localStorage.getItem('dataList');
    // setDataLocalStrorage([LocalStorage]);
    const arr = [];
    const getIdSpec = {};
    if (jsonExcel.length !== 0) {
      for (let index = 0; index < jsonExcel.length; index++) {
        if (dataAllList?.length !== 0) {
          getIdSpec.OS = dataAllList[0]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.PROCCESOR = dataAllList[1]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.MAINBOARD_CE = dataAllList[2]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.MEMORY_1 = dataAllList[3]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.MEMORY_2 = dataAllList[34]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.MONITOR_1 = dataAllList[4]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.MONITOR_2 = dataAllList[35]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.HDD_1 = dataAllList[5]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.HDD_2 = dataAllList[36]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.HDD_3 = dataAllList[37]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom3?.toString()
          );
          getIdSpec.HDD_4 = dataAllList[46]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom4?.toString()
          );
          getIdSpec.MCU = dataAllList[6]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.SPR = dataAllList[7]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.EPP = dataAllList[8]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.POWER_SUPPLY = dataAllList[9]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CROPF = dataAllList[10]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CARDBIN_2 = dataAllList[48]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.CASSETTE_1 = dataAllList[12]?.items_data.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CASSETTE_2 = dataAllList[38]?.items_data.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.REJECT_1 = dataAllList[13]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.REJECT_2 = dataAllList[43]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.KUNCI_FASCIA_ATAS_1 = dataAllList[14]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KUNCI_FASCIA_ATAS_2 = dataAllList[39]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.KUNCI_FASCIABAWAH = dataAllList[15]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KUNCI_TOMBAK = dataAllList[16]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KUNCI_CASSETTE_REJECT_1 = dataAllList[17]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KUNCI_CASSETTE_REJECT_2 = dataAllList[41]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.KUNCI_CASSETTE_REJECT_3 = dataAllList[42]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom3?.toString()
          );
          getIdSpec.CENCON = dataAllList[18]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.AS_CENCON = dataAllList[19]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CAMERA = dataAllList[20]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KUNCI_CARDBIN = dataAllList[21]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CARDLESS_READER = dataAllList[22]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.LAN_CARD_1 = dataAllList[49]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.LAN_CARD_2 = dataAllList[50]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.THERMAL_PAPER = dataAllList[24]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CABINET_SENSOR = dataAllList[25]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.SENSOR_GETAR = dataAllList[26]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KABEL_LAN = dataAllList[27]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KABEL_POWER = dataAllList[28]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KABEL_SERIAL_UPS = dataAllList[29]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KABEL_HDMI_TO_DVI_1 = dataAllList[30]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.KABEL_HDMI_TO_DVI_2 = dataAllList[44]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom2?.toString()
          );
          getIdSpec.KABEL_HDMI_TO_DVI_3 = dataAllList[45]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom3?.toString()
          );
          getIdSpec.FDI = dataAllList[31]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.LUBANG_3_WAY_LOCK = dataAllList[32]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.PIN_COVER = dataAllList[33]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.HDD_4 = dataAllList[46]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CARDBIN_1 = dataAllList[47]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
          getIdSpec.CARDBIN_2 = dataAllList[48]?.items_data?.find(
            (obj) => obj?.description === jsonExcel[index]?.fillcollom1?.toString()
          );
        }
        if (jsonExcel.length !== 0) {
          setNewBody([]);
          arr.push({
            ...body,
            id_spek_mesin_hdr: getRow?.id,
            item_desc: jsonExcel[index]?.item_desc,
            results: jsonExcel[index]?.results,
            fill_description:
              index === 0
                ? getIdSpec?.OS?.id === undefined
                  ? null
                  : getIdSpec?.OS?.id
                : index === 1
                ? getIdSpec?.PROCCESOR?.id === undefined
                  ? null
                  : getIdSpec?.PROCCESOR?.id
                : index === 2
                ? getIdSpec?.MAINBOARD_CE?.id === undefined
                  ? null
                  : getIdSpec?.MAINBOARD_CE?.id
                : index === 3
                ? [
                    getIdSpec?.MEMORY_1?.id === undefined ? null : getIdSpec?.MEMORY_1?.id,
                    getIdSpec?.MEMORY_2?.id === undefined ? null : getIdSpec?.MEMORY_2?.id,
                  ]
                : index === 4
                ? [
                    getIdSpec?.MONITOR_1?.id === undefined ? null : getIdSpec?.MONITOR_1?.id,
                    getIdSpec?.MONITOR_2?.id === undefined ? null : getIdSpec?.MONITOR_2?.id,
                  ]
                : index === 5
                ? [
                    getIdSpec?.HDD_1?.id === undefined ? null : getIdSpec?.HDD_1?.id,
                    getIdSpec?.HDD_2?.id === undefined ? null : getIdSpec?.HDD_2?.id,
                    getIdSpec?.HDD_3?.id === undefined ? null : getIdSpec?.HDD_3?.id,
                    getIdSpec?.HDD_4?.id === undefined ? null : getIdSpec?.HDD_4?.id,
                  ]
                : index === 6
                ? getIdSpec?.MCU?.id === undefined
                  ? null
                  : getIdSpec?.MCU?.id
                : index === 7
                ? getIdSpec?.SPR?.id === undefined
                  ? null
                  : getIdSpec?.SPR?.id
                : index === 8
                ? getIdSpec?.EPP?.id === undefined
                  ? null
                  : getIdSpec?.EPP?.id
                : index === 9
                ? getIdSpec?.POWER_SUPPLY?.id === undefined
                  ? null
                  : getIdSpec?.POWER_SUPPLY?.id
                : index === 10
                ? getIdSpec?.CROPF?.id === undefined
                  ? null
                  : getIdSpec?.CROPF?.id
                : index === 11
                ? [
                    getIdSpec?.CARDBIN_1?.id === undefined ? null : getIdSpec?.CARDBIN_1?.id,
                    getIdSpec?.CARDBIN_2?.id === undefined ? null : getIdSpec?.CARDBIN_2?.id,
                  ]
                : index === 12
                ? [
                    getIdSpec?.CASSETTE_1?.id === undefined ? null : getIdSpec?.CASSETTE_1?.id,
                    getIdSpec?.CASSETTE_2?.id === undefined ? null : getIdSpec?.CASSETTE_2?.id,
                  ]
                : index === 13
                ? [
                    getIdSpec?.REJECT_1?.id === undefined ? null : getIdSpec?.REJECT_1?.id,
                    getIdSpec?.REJECT_2?.id === undefined ? null : getIdSpec?.REJECT_2?.id,
                  ]
                : index === 14
                ? [
                    getIdSpec?.KUNCI_FASCIA_ATAS_1?.id === undefined
                      ? null
                      : getIdSpec?.KUNCI_FASCIA_ATAS_1?.id,
                    getIdSpec?.KUNCI_FASCIA_ATAS_2?.id === undefined
                      ? null
                      : getIdSpec?.KUNCI_FASCIA_ATAS_2?.id,
                  ]
                : index === 15
                ? getIdSpec?.KUNCI_FASCIABAWAH?.id === undefined
                  ? null
                  : getIdSpec?.KUNCI_FASCIABAWAH?.id
                : index === 16
                ? getIdSpec?.KUNCI_TOMBAK?.id === undefined
                  ? null
                  : getIdSpec?.KUNCI_TOMBAK?.id
                : index === 17
                ? [
                    getIdSpec?.KUNCI_CASSETTE_REJECT_1?.id === undefined
                      ? null
                      : getIdSpec?.KUNCI_CASSETTE_REJECT_1?.id,
                    getIdSpec?.KUNCI_CASSETTE_REJECT_2?.id === undefined
                      ? null
                      : getIdSpec?.KUNCI_CASSETTE_REJECT_2?.id,
                    getIdSpec?.KUNCI_CASSETTE_REJECT_3?.id === undefined
                      ? null
                      : getIdSpec?.KUNCI_CASSETTE_REJECT_3?.id,
                  ]
                : index === 18
                ? getIdSpec?.CENCON?.id === undefined
                  ? null
                  : getIdSpec?.CENCON?.id
                : index === 19
                ? getIdSpec?.AS_CENCON?.id === undefined
                  ? null
                  : getIdSpec?.AS_CENCON?.id
                : index === 20
                ? getIdSpec?.CAMERA?.id === undefined
                  ? null
                  : getIdSpec?.CAMERA?.id
                : index === 21
                ? getIdSpec?.KUNCI_CARDBIN?.id === undefined
                  ? null
                  : getIdSpec?.KUNCI_CARDBIN?.id
                : index === 22
                ? getIdSpec?.CARDLESS_READER?.id === undefined
                  ? null
                  : getIdSpec?.CARDLESS_READER?.id
                : index === 23
                ? [
                    getIdSpec?.LAN_CARD_1?.id === undefined ? null : getIdSpec?.LAN_CARD_1?.id,
                    getIdSpec?.LAN_CARD_2?.id === undefined ? null : getIdSpec?.LAN_CARD_2?.id,
                  ]
                : index === 24
                ? getIdSpec?.THERMAL_PAPER?.id === undefined
                  ? null
                  : getIdSpec?.THERMAL_PAPER?.id
                : index === 25
                ? getIdSpec?.CABINET_SENSOR?.id === undefined
                  ? null
                  : getIdSpec?.CABINET_SENSOR?.id
                : index === 26
                ? getIdSpec?.SENSOR_GETAR?.id === undefined
                  ? null
                  : getIdSpec?.SENSOR_GETAR?.id
                : index === 27
                ? getIdSpec?.KABEL_LAN?.id === undefined
                  ? null
                  : getIdSpec?.KABEL_LAN?.id
                : index === 28
                ? getIdSpec?.KABEL_POWER?.id === undefined
                  ? null
                  : getIdSpec?.KABEL_POWER?.id
                : index === 29
                ? getIdSpec?.KABEL_SERIAL_UPS?.id === undefined
                  ? null
                  : getIdSpec?.KABEL_SERIAL_UPS?.id
                : index === 30
                ? [
                    getIdSpec?.KABEL_HDMI_TO_DVI_1?.id === undefined
                      ? null
                      : getIdSpec?.KABEL_HDMI_TO_DVI_1?.id,
                    getIdSpec?.KABEL_HDMI_TO_DVI_2?.id === undefined
                      ? null
                      : getIdSpec?.KABEL_HDMI_TO_DVI_2?.id,
                    getIdSpec?.KABEL_HDMI_TO_DVI_3?.id === undefined
                      ? null
                      : getIdSpec?.KABEL_HDMI_TO_DVI_3?.id,
                  ]
                : index === 31
                ? getIdSpec?.FDI?.id === undefined
                  ? null
                  : getIdSpec?.FDI?.id
                : index === 32
                ? getIdSpec?.LUBANG_3_WAY_LOCK?.id === undefined
                  ? null
                  : getIdSpec?.LUBANG_3_WAY_LOCK?.id
                : index === 33
                ? getIdSpec?.PIN_COVER?.id === undefined
                  ? null
                  : getIdSpec?.PIN_COVER?.id
                : null,
          });
        }
      }
    }
    const newObject = Array.from(arr);
    setNewBodyExcel([...newObject]);
  }, [jsonExcel, dataAllList, getRow]);
  const [getIdPo, setGetIdPo] = useState('');
  const [openApprovel, setOpenApprovel] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const [getmover, setGetmover] = useState('');
  const [URL, setURL] = useState('');
  const [approval_by, setApproval_by] = useState('');
  const [loadingApprove, setLoadingApprove] = useState(true);
  const [loadingBtnMover, setLoadingBtnMover] = useState(false);
  const [dataUpproveById, setDataUpproveById] = useState([]);
  const handleClickOpenApprovel = (row, indexOpen) => {
    setOpenApprovel(true);
    // setGetDisable(row?.testing_inspection);
    setGetindexOpen(indexOpen);
    setGetIdPo(row);
    setgetRow(row);
    setDataDetail([]);
  };
  const handleCloseApprovel = () => {
    setOpenApprovel(false);
    setGetindexOpen('');
    setDataUpproveById([]);
    setDataDetail([]);
    // setURL('');
    // setDataWaktu({ isRunning: false });
  };

  const propsFromParrent = (mover, getIdPo, getDisable) => {
    // console.log(getDisable, 'defaultMover')
    // setIdMesin(getIdPo);
    setGetmover(mover);
  };
  // console.log(getmover, 'getmover')
  const handleUpprovel = () => {
    setLoadingBtnMover(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}spekmesin-approval/${URL}/${getIdPo?.id}/`,
        { approval_by },
        config
      )
      .then((res) => {
        setLoadingBtnMover(false);
        setOpenApprovel(false);
        // console.log(res);
        // console.log('tesss');
        // props?.getData();
        props?.getData();
        dispatch(
          showMessage({
            message: `Spesifikasi Berhasil Di Approve By ${URL} ${getmover?.name}`, // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        // setOpen(!open);
      })
      .catch((err) => {
        setLoadingBtnMover(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
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
        } else if (errStatus === 429) {
          messages = 'Too Many Request!!';
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

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      switch (getindexOpen) {
        case 1:
          setApproval_by(getmover?.id);
          setURL('STAGING');
          break;
        case 2:
          setApproval_by(getmover?.id);
          setURL('TSS');
          break;
      }
      if (URL !== '' && getIdPo?.id !== undefined) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}spekmesin-approval/${URL}/${getIdPo?.id}`,
            config
          )
          .then((res) => {
            // console.log(res, 'res');
            setDataUpproveById(res?.data?.data[0]);
            setLoadingApprove(false);
            // console.log(res.data);
          })
          .catch((err) => {
            setLoadingApprove(false);
            setDataUpproveById([]);
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
            } else if (errStatus === 429) {
              messages = 'Too Many Request!!';
            } else if (errStatus === 400) {
              messages = errMessage;
            } else {
              messages = 'Something Wrong!!';
            }
            dispatch(
              showMessage({
                message: messages,
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                variant: 'error',
              })
            );
          });
      }
      // getData();
    }
    // console.log(dataUpproveById, 'dataUpproveById');

    return () => {
      isUnmout = true;
    };
  }, [getmover?.id, getindexOpen, URL, getIdPo?.id]);
  // console.log(dataDetail, 'dataDetail')

  // Handle timer

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setTimer((timers) => timers + 1);
      }, 1000);
    } else {
      setStart(false);
      // clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);
  // console.log(start, 'start')

  const toggleStart = () => {
    setStart(!start);
  };

  const pad = (n) => (n < 10 ? `0${n}` : n);

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    const hour = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const mins_ = hour % 60;
    const seconds_ = seconds % 60;
    const countData = `${hour === 0 ? `00` : hour}:${pad(
      mins > 60 ? mins_.toString() : mins.toString()
    )}:${seconds_ === 0 ? '00' : seconds_ < 10 ? `0${seconds_.toString()}` : seconds_.toString()}`;
    localStorage.setItem('time_todo', JSON.stringify(countData));
    return countData;
  };
  // console.log(dispSecondsAsMins(), 'timer');

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
        <Dialog
          maxWidth="lg"
          open={openApprovel}
          onClose={handleCloseApprovel}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="flex justify-between" id="alert-dialog-title">
            {getindexOpen === 1 ? (
              <div>
                <Chip
                  color="info"
                  variant="outlined"
                  label="Approval: By Staging"
                  deleteIcon={<DoneIcon />}
                />
              </div>
            ) : getindexOpen === 2 ? (
              <div>
                <Chip
                  color="primary"
                  variant="outlined"
                  label="Approval: By TSS"
                  deleteIcon={<DoneIcon />}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-center text-md font-medium">Export Document</p>
              </div>
            )}
            <div>
              {/* <Chip label={`SN-Mesin: ${IdMesin?.snMesin}`} deleteIcon={<DoneIcon />} /> */}
            </div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {getindexOpen === 1 ? (
                <HandleUpproveStaging
                  getRow={getRow}
                  userRoles={userRoles}
                  dataUpproveById={dataUpproveById}
                  propsFromParrent={propsFromParrent}
                  // handleClickOpen={handleClickOpen}
                  // getData={getData}
                  // idPO={idPO}
                  getIdPo={getIdPo}
                />
              ) : getindexOpen === 2 ? (
                <HandleUpproveTSS
                  getRow={getRow}
                  userRoles={userRoles}
                  dataUpproveById={dataUpproveById}
                  propsFromParrent={propsFromParrent}
                  // handleClickOpen={handleClickOpen}
                  // getData={getData}
                  // idPO={idPO}
                  getIdPo={getIdPo}
                />
              ) : getindexOpen === 3 ? (
                <HandlePrint
                  getRow={getRow}
                  dataUpproveById={dataUpproveById}
                  dataDetail={dataDetail}
                  userRoles={userRoles}
                  disabled={getRow?.model?.id === 6}
                />
              ) : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseApprovel}>
              Close
            </Button>
            {getindexOpen !== 3 && loadingBtnMover === true ? (
              <Button
                variant="contained"
                disabled
                onClick={handleUpprovel}
                autoFocus
                hidden={getindexOpen === 3}
                startIcon={<CircularProgress size="2rem" />}
              >
                Loading...
              </Button>
            ) : getindexOpen !== 3 && (userRoles === 'ADMIN' || userRoles === 'SUPER_ADMIN') ? (
              <Button
                variant="contained"
                disabled={getmover === '' || userRoles === 'GUEST' || userRoles === 'GUEST_DIP'}
                onClick={handleUpprovel}
                autoFocus
                hidden={getindexOpen === 3}
              >
                {getindexOpen === 1 ? (
                  <div> Approve Staging</div>
                ) : (
                  getindexOpen === 2 && <div> Approve TSS</div>
                )}
              </Button>
            ) : getindexOpen !== 3 ? (
              <Button
                variant="contained"
                disabled={
                  getmover === '' ||
                  userRoles === 'GUEST' ||
                  userRoles === 'GUEST_DIP' ||
                  userRoles === 'GUEST_BANK'
                }
                onClick={handleUpprovel}
                autoFocus
                hidden={getindexOpen === 3}
              >
                {getindexOpen === 1 ? (
                  <div> Approve Staging</div>
                ) : (
                  getindexOpen === 2 && <div> Approve TSS</div>
                )}
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
        <EnhancedTableToolbar
          HandleDelete={HandleDelete}
          arrDel={arrDel}
          numSelected={selected.length}
        />
        <Dialog
          fullScreen
          open={openSpec}
          onClose={handleCloseSpec}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleCloseSpec} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Close &nbsp;
                {getTrigger === false ? (
                  <div className="pomView">
                    <h5>{dispSecondsAsMins(timer)}</h5>
                  </div>
                ) : (
                  ''
                )}
              </Typography>
              {userRoles !== 'GUEST' ||
              userRoles !== 'GUEST_BANK' ||
              userRoles !== 'GUEST_DIP' ||
              userRoles !== 'OPERATOR_TSS' ? (
                <>
                  {/* <Button
                    className="ml-5"
                    variant="contained"
                    color={jsonExcel?.length !== 0 && name !== file_name ? 'success' : 'secondary'}
                    disabled={
                      userRoles === 'GUEST' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'OPERATOR_TSS'
                      // dataLocalStorage[0] === null
                    }
                    component="label"
                    // onClick={handleselectedFile}
                    autoFocus
                  >
                    {jsonExcel?.length !== 0 && name !== file_name ? 'Uploaded' : 'Upload File'}
                    <input type="file" hidden accept=".xlsx, .xls" onChange={handleselectedFile} />
                    &nbsp;
                  </Button>
                  <Button
                    disabled={
                      loading === true ||
                      userRoles === 'GUEST' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'OPERATOR_TSS'
                    }
                    autoFocus
                    color="inherit"
                    onClick={exportToExcel}
                  >
                    {loading === true ? 'Loading...' : 'Download'}
                  </Button> */}
                  {getTrigger === true ? (
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={HandleEditt}
                      disabled={
                        loading === true ||
                        userRoles === 'GUEST' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'OPERATOR_TSS'
                      }
                      // disabled={dataDetail?.length !== 0}
                    >
                      {loading === true ? 'Loading...' : 'Edit'}
                    </Button>
                  ) : getTrigger === false ? (
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={HandleSubmit}
                      disabled={
                        // dataDetail?.length !== 0 ||
                        loading === true ||
                        userRoles === 'GUEST' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'OPERATOR_TSS'
                      }
                    >
                      {loading === true ? 'Loading...' : 'Save'}
                    </Button>
                  ) : (
                    <Button
                      autoFocus
                      color="inherit"
                      // onClick={HandleSubmit}
                      disabled={
                        getTrigger !== '' ||
                        loading === true ||
                        userRoles === 'GUEST' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'OPERATOR_TSS'
                      }
                    >
                      Loading...
                    </Button>
                  )}
                </>
              ) : (
                <></>
              )}
            </Toolbar>
            {/* <div className="m-10">
              <div> Nama File : {file_name}</div>
            </div> */}
          </AppBar>
          <OpenSpecAllDataTemplate
            start={start}
            setStart={setStart}
            loading={loading}
            propsFromParent={propsFromParent}
            getRow={getRow}
            dataDetail={dataDetail}
          />
        </Dialog>
        <Dialog
          maxWidth="xl"
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Data - Specification</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <HandleEditDetail
                userRoles={userRoles}
                setDataById={setDataById}
                setDataEdit={setDataEdit}
                loading={loading}
                dataEdit={dataEdit}
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
            {userRoles !== 'GUEST' ||
            userRoles !== 'OPERATOR_TSS' ||
            userRoles !== 'GUEST_RELATED' ||
            userRoles !== 'GUEST_BANK' ? (
              <Button variant="contained">
                <div className="hidden md:contents" onClick={() => handleEdit(dataEdit.id)}>
                  Save
                </div>
              </Button>
            ) : (
              <></>
            )}
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
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={datas?.length}
              />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // console.log(row, 'CeeekRowwww');
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const data = [];
                    // row?.sn_mesins?.map((item, idx) => {
                    //   data?.push(item?.snMesin);
                    // });

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
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="left"
                          className={classes?.tableCell}
                        >
                          {rowsPerPage * page + index + 1}.)
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.detail_po?.no_po === '' ? '-' : row?.detail_po?.no_po}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.created_at === '' ? '-' : moment(row?.created_at).format('LL')}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.model?.name === '' ? '-' : row?.model?.name}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.mesin?.type === '' ? '-' : row?.mesin?.type}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.pn_system === '' ? '-' : row?.pn_system}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.customer?.bank_desc === '' ? '-' : row?.customer?.bank_desc}
                        </TableCell>
                        {/* <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.approval_staging?.name === '' ? '-' : row?.approval_staging?.name}
                        </TableCell>
                        // <TableCell
                        //   onClick={() => handleClickOpen(row, 1)}
                        //   align="center"
                        //   className={classes?.tableCell}
                        // >
                        //   {row?.approval_tss?.name === '' ? '-' : row?.approval_tss?.name}
                        </TableCell> */}
                        <TableCell
                          onClick={() => handleClickOpen(row, 1)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.time_todo === null ? '-' : row?.time_todo}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex justify-center">
                            <div>
                              <IconButton
                                onClick={() => handleClickOpenApprovel(row, 1)}
                                color="info"
                                // disabled={row.testing_inspection === false}
                                // disabled={row?.checklist_staging === false}
                                disabled={
                                  row?.checklist_staging === false ||
                                  // userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'OPERATOR_MOVER' ||
                                  // userRoles === 'GUEST' ||
                                  // userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_BANK'
                                }
                                // className="z-9999"
                              >
                                <Tooltip placement="left-start" title="By Staging">
                                  <AddTaskIcon />
                                </Tooltip>
                              </IconButton>
                              <IconButton
                                onClick={() => handleClickOpenApprovel(row, 2)}
                                color="success"
                                // disabled={row?.checklist_staging === false}
                                disabled={
                                  row?.checklist_staging === false ||
                                  // userRoles === 'OPERATOR_DIP' ||
                                  userRoles === 'OPERATOR_MOVER' ||
                                  // userRoles === 'GUEST' ||
                                  // userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_BANK'
                                }
                              >
                                <Tooltip placement="right-end" title="By TSS">
                                  <CheckCircleOutlineIcon />
                                </Tooltip>
                              </IconButton>
                            </div>
                          </div>
                        </TableCell>
                        {userRoles === 'SUPER_ADMIN' ||
                        userRoles === 'ADMIN' ||
                        userRoles === 'SUPERVISOR' ||
                        userRoles === 'OPERATOR_DIP' ? (
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
                              {userRoles === 'SUPER_ADMIN' || userRoles === 'ADMIN' ? (
                                <div>
                                  <IconButton
                                    // onClick={(e) => HandleDelete(row.id,row.partNumber, e)}
                                    onClick={(e) => HanldleClickNotifDelete(row.id)}
                                    color="error"
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
                        ) : (
                          '-'
                        )}
                        <TableCell align="center">
                          {userRoles === 'SUPER_ADMIN' ||
                          userRoles === 'ADMIN' ||
                          userRoles === 'SUPERVISOR' ||
                          userRoles === 'OPERATOR_DIP' ||
                          userRoles === 'GUEST' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'OPERATOR_TSS' ? (
                            <div>
                              <IconButton
                                onClick={() => handleClickOpenApprovel(row, 3)}
                                color="info"
                                disabled={
                                  row.testing_inspection === false ||
                                  row?.snMesin === null ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'GUEST_BANK'
                                }
                                // className="z-9999"
                              >
                                <LocalPrintshopIcon />
                              </IconButton>
                            </div>
                          ) : (
                            <>-</>
                          )}
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
