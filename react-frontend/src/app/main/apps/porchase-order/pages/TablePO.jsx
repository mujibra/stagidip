/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import HandleTabelShowDetail from './action/HandleTabelShowDetail';
import { HandlePDF } from './action/HandlePDF';
import HandleEditDetail from './action/HandleEditDetail';
import { HandlePrint } from './action/HandlePrint';

// import { getMachie } from '../store/machineSlice';
// const user_info = JSON.parse(localStorage.getItem('user_profile'));
const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}
const useStyles = makeStyles({
  tableCell: {
    minWidth: '150px',
    cursor: 'pointer',
  },
  cursorTable: {
    cursor: 'pointer',
  },
});

function createData(
  id,
  no_po,
  tgl_po,
  status_po,
  part_number,
  sn_batch,
  styles,
  model,
  status_mesin,
  tahun_produksi,
  customer,
  pic_staging,
  tgl_staging,
  jumlah,
  jml_mesin_staging,
  tgl_masuk,
  batch,
  brand,
  mesin,
  gudang,
  stok,
  total_transfer,
  total_keluar,
  po_master,
  sn_mesins,
  copy_from_po,
  status_po_details
) {
  return {
    id,
    no_po,
    tgl_po,
    status_po,
    part_number,
    sn_batch,
    styles,
    model,
    status_mesin,
    tahun_produksi,
    customer,
    pic_staging,
    tgl_staging,
    jumlah,
    jml_mesin_staging,
    tgl_masuk,
    batch,
    brand,
    mesin,
    gudang,
    stok,
    total_transfer,
    total_keluar,
    po_master,
    sn_mesins,
    copy_from_po,
    status_po_details,
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
  const stabilizedThis = array.map((el, index) => [el, index]);
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
    id: 'stagging',
    numeric: true,
    disablePadding: false,
    label: 'Staging',
  },
  {
    id: 'noPO',
    numeric: true,
    disablePadding: false,
    label: 'No PO',
  },
  // {
  //   id: 'noPO Dummy',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'No Po Dummy',
  // },
  {
    id: 'tanggalPo',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order Date',
  },
  {
    id: 'statusPO',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order Status',
  },
  {
    id: 'customer',
    numeric: true,
    disablePadding: false,
    label: 'Customer',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'jumlah',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'jml_mesin_staging',
    numeric: true,
    disablePadding: false,
    label: 'Quantity Staging',
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
    id: 'brand',
    numeric: true,
    disablePadding: false,
    label: 'Brand',
  },
  {
    id: 'bacth',
    numeric: true,
    disablePadding: false,
    label: 'Batch',
  },
  {
    id: 'partNumber',
    numeric: true,
    disablePadding: false,
    label: 'Part Number System',
  },
  {
    id: 'snBatch',
    numeric: true,
    disablePadding: false,
    label: 'SN Batch',
  },
  {
    id: 'style',
    numeric: true,
    disablePadding: false,
    label: 'Style',
  },
  {
    id: 'thnProduksi',
    numeric: true,
    disablePadding: false,
    label: 'Production Year',
  },
  // {
  //   id: 'tglProduksi',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Tanggal Produksi',
  // },
  {
    id: 'whereHouse',
    numeric: true,
    disablePadding: false,
    label: 'Warehouse',
  },
  {
    id: 'tglMasuk',
    numeric: true,
    disablePadding: false,
    label: 'Entry Date',
  },
  {
    id: 'tglStagging',
    numeric: true,
    disablePadding: false,
    label: 'Planned Staging Date',
  },
  {
    id: 'picMitra',
    numeric: true,
    disablePadding: false,
    label: 'PIC Staging',
  },
  // {
  //   id: 'status_po',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Status PO',
  // },
  {
    id: 'status_mesin',
    numeric: true,
    disablePadding: false,
    label: 'Status Machine',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
  {
    id: 'print',
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

  // if (userRoles !== 'SUPER_ADMIN' && userRoles !== 'ADMIN') {
  //   headCells.splice(18);
  // }
  // console.log('CeeekLogign', headCells);

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
        {headCells.map((headCell, index) => (
          <>
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
              align="center"
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
          </>
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
    <></>
    // <Toolbar
    //   className="rounded-t-lg bg-blue-750"
    //   sx={{
    //     pl: { sm: 2 },
    //     pr: { xs: 1, sm: 1 },
    //     ...(numSelected > 0 && {
    //       bgcolor: (theme) =>
    //         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
    //     }),
    //   }}
    // >
    //   {numSelected > 0 ? (
    //     <Typography
    //       className="text-white"
    //       sx={{ flex: '1 1 100%' }}
    //       color="inherit"
    //       variant="subtitle1"
    //       component="div"
    //     >
    //       {numSelected} selected
    //     </Typography>
    //   ) : (
    //     <Typography
    //       className="text-white"
    //       sx={{ flex: '1 1 100%' }}
    //       variant="h6"
    //       id="tableTitle"
    //       component="div"
    //     >
    //       List of Purchase Order
    //     </Typography>
    //   )}

    //   {numSelected > 0 ? (
    //     <Tooltip title="Delete">
    //       <IconButton color="error" className="z-10">
    //         <DeleteIcon onClick={handleDeleteAll} />
    //       </IconButton>
    //     </Tooltip>
    //   ) : (
    //     <Tooltip title="Filter list">
    //       <IconButton>
    //         <FilterListIcon color="info" />
    //       </IconButton>
    //     </Tooltip>
    //   )}
    // </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablePO(props) {
  const { body } = props;
  const { setBody } = props;
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;

  const getAccessToken = localStorage.getItem('access_token');
  // const api = 'http://192.168.10.193:8000/api';
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openShowData, setOpenShowData] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [trigger, setTrigger] = useState('');
  const [searched, setSearched] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const [dataTemplate, setDataTemplate] = useState([]);

  const [dataEdit, setDataEdit] = useState({
    tgl_po: null,
    no_po: null,
    jumlah: null,
    jml_mesin_staging: null,
    // no_po_dummy: null,
    id_type_mesin: null,
    styles: null,
    status_po: null,
    part_number: null,
    sn_batch: null,
    status_mesin: null,
    nama_gudang: null,
    pic_staging: null,
    batch: null,
    brand: null,
    tgl_masuk: null,
    tgl_staging: null,
    customer: null,
    tahun_produksi: null,
    sn_mesins: [],
    copy_from_po: null,
    status_po_details: null,
  });
  const [dataById, setDataById] = useState([]);
  const [arrDel, setArrDel] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const handleClose = () => {
    setOpen(false);
  };

  const bodyEdit = {
    tgl_po: moment(dataEdit.tgl_po).format(),
    // no_po_dummy: dataById.no_po_dummy,
    id_type_mesin: dataEdit?.mesin?.id,
    status_po: dataEdit.status_po,
    style: dataEdit.styles?.id,
    part_number: dataEdit.part_number,
    sn_batch: dataEdit.sn_batch,
    status_mesin: dataEdit.status_mesin,
    nama_gudang: dataEdit?.nama_gudang?.id,
    pic_staging: dataEdit?.pic_staging?.id,
    batch: dataEdit.batch?.id,
    brand: dataEdit.brand,
    tgl_masuk: moment(dataEdit.tgl_masuk).format(),
    tgl_staging: moment(dataEdit.tgl_staging).format(),
    customer: dataEdit?.customer?.id,
    tahun_produksi: dataEdit.tahun_produksi,
    id_status_po: dataEdit?.status_po_details?.id,
  };
  // console.log(bodyEdit);
  const newBody = {
    tgl_po: dataEdit?.tgl_po,
    // jumlah: dataEdit?.jumlah,
    part_number: dataEdit?.part_number,
    sn_batch: dataEdit?.sn_batch,
    id_type_mesin: dataEdit?.mesin?.id,
    // no_po_dummy: dataEdit?.no_po_dummy,
    status_po: dataEdit?.status_po,
    status_mesin: dataEdit?.status_mesin,
    nama_gudang: dataEdit?.gudang?.id,
    pic_staging: dataEdit?.pic_staging?.id,
    batch: dataEdit?.batch?.id,
    brand: dataEdit?.brand,
    tgl_masuk: dataEdit?.tgl_masuk,
    tgl_staging: dataEdit?.tgl_staging,
    customer: dataEdit?.customer?.id,
    tahun_produksi: dataEdit?.tahun_produksi,
    id_status_po: dataEdit?.status_po_details?.id,
  };
  // console.log(bodyEdit, 'bodyEdit');
  const handleEdit = async (id) => {
    setLoading(true);
    const response = await axios
      .put(`${api}purchaseOrder/${id}`, bodyEdit, config)
      .then((res) => {
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Diedit', // text or html
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
          messages = 'Failed!';
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
  const handleClickOpens = (trigger, row) => {
    // console.log(row, 'row');
    setDataById(row);
    setDataEdit(row);
    setOpen(true);
    setTrigger(trigger);
  };
  const handleClickOpensShowData = (id, row) => {
    // console.log(row, 'row');
    setDataEdit(row);
    setDataById(row);
    setOpenShowData(true);
  };
  const handleCloseShowData = () => {
    setOpen(false);
    setOpenShowData(false);
  };

  // console.log(dataById, 'e')
  const HandleDeleteCangcelPO = async (id, e) => {
    // e.preventDefault();

    props.setLoading(true);
    const response = await axios
      .delete(`${api}purchaseOrder/${dataById?.id}/cancel`, config)
      .then((res) => {
        props.setLoading(true);
        dispatch(
          showMessage({
            message: 'PO Berhasil Di Cancel!!', // text or html
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
        setOpen(!open);
      })
      .catch((err) => {
        props.setLoading(false);
        setOpen(!open);
        console.log(err);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Login Failed!';
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
  const HanldleClickNotifCancel = (id, noPo, e) => {
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure cancel the data with No PO {dataById?.no_po}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => dispatch(closeDialog())}>
                Batal
              </Button>
              <Button
                // disabled={props.setBody.partNumber === ''}
                variant="contained"
                color="error"
                onClick={HandleDeleteCangcelPO}
                autoFocus
                startIcon={<DeleteIcon />}
              >
                Close
              </Button>
            </DialogActions>
          </div>
        ),
        maxWidth: 'xl',
      })
    );
  };
  const HandleDelete = async (id, e) => {
    // e.preventDefault();

    props.setLoading(true);
    const response = await axios
      .delete(`${api}purchaseOrder/${id}`, config)
      .then((res) => {
        props.setLoading(true);
        dispatch(
          showMessage({
            message: 'Data Deleted Success!', // text or html
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
        // console.log(err.response, 'errMessage')
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

  const HanldleClickNotifDelete = (id, noPo, e) => {
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure delete data with No PO {noPo}?
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

  const datas = filteredRows?.map((item, index) =>
    createData(
      item?.id,
      item?.no_po,
      item?.tgl_po,
      item?.status_po,
      item?.part_number,
      item?.sn_batch,
      item?.style,
      item?.model,
      item?.status_mesin,
      item?.tahun_produksi,
      item?.customer,
      item?.pic_staging,
      item?.tgl_staging,
      item?.jumlah,
      item?.jml_mesin_staging,
      item?.tgl_masuk,
      item?.batch,
      item?.brand,
      item?.mesin,
      item?.gudang,
      item?.stok,
      item?.total_transfer,
      item?.total_keluar,
      item?.po_master,
      item?.sn_mesins,
      item?.copy_from_po,
      item?.status_po_details
    )
  );
  // console.log(datas, 'ini datas');

  useEffect(() => {
    if (searched === '') {
      setFilteredRows(props?.data);
    } else {
      setPage(0);
      const filteredData = props?.data?.filter((row) =>
        row?.no_po?.toLowerCase()?.includes(searched?.toLowerCase())
      );
      setFilteredRows(filteredData);
    }
  }, [props?.data, searched]);

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datas.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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

  // add by ardie 2023-05-29
  // const getDataTemplate = async () => {

  // };

  // useEffect(() => {
  //   getDataTemplate();
  // }, [dataById?.id]);

  async function exportToExcel(idPo) {
    const response = await axios
      .get(`${api}getTemplateStagingFormat/${idPo}`, config)
      .then((res) => {
        // console.log('dataaTemplate', res.data);
        setDataTemplate(res.data);
      })
      .catch((err) => {
        console.log('GetTemplate Errors');
      });

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Staging_Registrations');

    const headers = [
      { header: 'no', key: 'no', width: 5 },
      { header: 'part_column', key: 'part_column', width: 15 },
      { header: 'part_no', key: 'part_no', width: 15 },
      { header: 'part_desc', key: 'part_desc', width: 20 },
    ];

    if (typeof dataTemplate?.data_columns !== 'undefined') {
      if (dataTemplate?.totalDatas > 0) {
        for (let i = 0; i < dataTemplate?.totalDatas; i++) {
          headers.push({ header: i + 1, key: i + 1, width: 15 });
        }
      }

      ws.columns = headers;

      dataTemplate?.data_columns?.map((item, index) => {
        const data_barcode = [];
        for (let j = 0; j < dataTemplate?.data_barcode.length; j++) {
          data_barcode[j] = dataTemplate?.data_barcode[j][item.part_column];
        }

        ws.addRows([
          ++index,
          item.part_column,
          item.part_no ? Number(item.part_no) : null,
          item.part_desc,
          // data_barcode[0],
          // data_barcode[1],
          // data_barcode[2],
          // data_barcode[3],
          // data_barcode[4]
        ]);
      });

      const buffer = await wb.xlsx.writeBuffer();
      saveAs(new Blob([buffer], { type: fileType }), `tmp_stating_barcode_${fileExtension}`);
    }
  }
  const handleClickOpenApprovel = (row, indexOpen) => {
    setOpenApprovel(true);
    // setGetDisable(row?.testing_inspection);
    setGetindexOpen(indexOpen);
    setGetIdPo(row);
    setgetRow(row);
    setDataDetail([]);
  };

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
        <Dialog open={open} maxWidth="lg">
          <div className="w-full flex justify-between">
            <DialogTitle id="alert-dialog-title">
              {trigger === 0 ? 'Edit Purchase Order' : 'Detail Report'}
            </DialogTitle>
            <DialogTitle id="alert-dialog-title">
              <div>
                {trigger === 0 ? (
                  <Button onClick={HanldleClickNotifCancel} variant="contained" color="error">
                    Cancel PO
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </DialogTitle>
          </div>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {trigger === 0 ? (
                <HandleEditDetail
                  // handleEdit={handleEdit}
                  setDataById={setDataById}
                  // row={row}
                  loading={loading}
                  dataEdit={dataEdit}
                  setDataEdit={setDataEdit}
                  // bodyEdit={bodyEdit}
                  body={props.body}
                  setBody={props.setBody}
                  handleClose={props.handleClose}
                />
              ) : (
                <HandlePrint
                  dataById={dataById}
                  body={props.body}
                  setBody={props.setBody}
                  // dataUpproveById={dataUpproveById}
                  // dataDetail={dataDetail}
                  // userRoles={userRoles}
                  // getRow={getRow}
                  // disabled={getRow?.model?.id === 6}
                />
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(!open)}>
              Close
            </Button>
            {trigger === 0 ? (
              <Button
                variant="contained"
                onClick={() => handleEdit(dataEdit.id)}
                autoFocus
                // startIcon={<PlaylistAddIcon />}
              >
                Edit
              </Button>
            ) : (
              ''
            )}
          </DialogActions>
        </Dialog>
        <Dialog open={openShowData} maxWidth="lg">
          <div className="w-full flex justify-between">
            <DialogTitle id="alert-dialog-title">Detail Purchase Order</DialogTitle>
            {userRoles !== 'GUEST_RELATED' && (
              <DialogTitle id="alert-dialog-title">
                <div>
                  <HandlePDF dataById={dataById} />
                </div>
              </DialogTitle>
            )}
          </div>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <HandleTabelShowDetail
                dataById={dataById}
                setDataById={setDataById}
                loading={loading}
                dataEdit={dataEdit}
                setDataEdit={setDataEdit}
                // bodyEdit={bodyEdit}
                body={props.body}
                setBody={props.setBody}
                handleClose={props.handleClose}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseShowData}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer sx={{ maxHeight: 550 }}>
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
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    // console.log(row, 'row');

                    return (
                      <TableRow
                        hover
                        // onClick={() => handleClickOpensShowData(row.id, row)}
                        // onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        {/* {console.log(row, 'row')} */}
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
                        <TableCell
                          align="center"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.status_mesin === 'Old Machine' ? (
                            <Link
                              to={
                                userRoles === 'GUEST_BANK'
                                  ? '#'
                                  : `/apps/stagging/oldMachine/${row.id}-1`
                              }
                              // to={`/apps/stagging/oldMachine/${row.id}-1`}
                            >
                              <Button
                                onClick={() =>
                                  dispatch(
                                    showMessage({
                                      message: 'Staging On Procces',
                                      autoHideDuration: 2000,
                                      anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                      },
                                      variant: 'warning',
                                    })
                                  )
                                }
                                disabled={userRoles === 'GUEST_BANK'}
                                startIcon={<ExitToAppIcon />}
                                size="small"
                                variant="contained"
                              >
                                Old Stag
                              </Button>
                            </Link>
                          ) : (
                            <Link
                              to={
                                userRoles === 'GUEST_BANK'
                                  ? '#'
                                  : `/apps/stagging/newMachine/${row.id}-1`
                              }
                              // to={`/apps/stagging/newMachine/${row.id}-1`}
                            >
                              <Button
                                onClick={() =>
                                  dispatch(
                                    showMessage({
                                      message: 'Staging On Procces',
                                      autoHideDuration: 2000,
                                      anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                      },
                                      variant: 'warning',
                                    })
                                  )
                                }
                                disabled={userRoles === 'GUEST_BANK'}
                                startIcon={<ExitToAppIcon />}
                                size="small"
                                variant="contained"
                              >
                                New Stag
                              </Button>
                            </Link>
                          )}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.no_po === null ? '-' : row?.no_po}
                          {/* {row?.po_master?.no_po_master === null
                            ? '-'
                            : row?.po_master?.no_po_master} */}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tgl_po === null ? '-' : moment(row?.tgl_po).format('DD MMM YYYY')}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.status_po_details?.status_desc === '' ||
                          row?.status_po_details?.status_desc === undefined ||
                          row?.status_po_details?.status_desc === null
                            ? '-'
                            : row?.status_po_details?.status_desc}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.customer === null ? '-' : row?.customer?.bank_desc}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.jumlah === '' ? '-' : row?.jumlah}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.jumlah - row?.total_transfer - row?.total_keluar}
                        </TableCell>

                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.jml_mesin_staging === '' ? '-' : row?.jml_mesin_staging}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.model?.name === '' ? '-' : row?.model?.name}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          // style={{ minWidth: 100 }}
                          className={classes?.tableCell}
                        >
                          {row?.mesin?.type === '' ? '-' : row?.mesin?.type}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.brand === '' ? '-' : row?.brand}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.batch?.name === null ? '-' : row?.batch?.name}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.part_number === '' ? '-' : row?.part_number}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.sn_batch === null ? '-' : row?.sn_batch}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.styles === null || row?.styles === '' || row?.styles === undefined
                            ? '-'
                            : row?.styles?.name}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tahun_produksi === null
                            ? '-'
                            : moment(row?.tahun_produksi).format('MMMM YYYY')}
                        </TableCell>
                        {/* <TableCell align="center" className={classes?.tableCell}>
                          {row?.tgl_produksi === null
                            ? '-'
                            : moment(row?.tgl_produksi).format('YYYY-DD-MM')}
                        </TableCell> */}
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                          style={{ minWidth: 200 }}
                        >
                          {row?.gudang?.gudang_desc === '' ? '-' : row?.gudang?.gudang_desc}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tgl_masuk === null
                            ? '-'
                            : moment(row?.tgl_masuk).format('DD MMM YYYY')}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.tgl_staging === null
                            ? '-'
                            : moment(row?.tgl_staging).format('DD MMM YYYY')}
                        </TableCell>
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.pic_staging.name === '' ? '-' : row?.pic_staging.name}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row?.status_po === '' ? '-' : row?.status_po}
                        </TableCell> */}
                        <TableCell
                          onClick={() => handleClickOpensShowData(row.id, row)}
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.status_mesin === '' ? '-' : row?.status_mesin}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex justify-center">
                            {userRoles === 'SUPER_ADMIN' ||
                            userRoles === 'ADMIN' ||
                            userRoles === 'SUPERVISOR' ||
                            userRoles === 'OPERATOR_DIP' ? (
                              <div>
                                <IconButton
                                  onClick={() => handleClickOpens(0, row)}
                                  color="info"
                                  // className="z-9999"
                                >
                                  <EditIcon />
                                </IconButton>
                              </div>
                            ) : (
                              <>-</>
                            )}
                            {userRoles === 'SUPER_ADMIN' || userRoles === 'ADMIN' ? (
                              <div className="z-0">
                                <IconButton
                                  onClick={(e) => HanldleClickNotifDelete(row.id, row.no_po, e)}
                                  color="error"
                                  className="z-9999"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </TableCell>
                        {/* <div>
                              <Tooltip
                                title="Download Template Staging"
                                TransitionProps={{ timeout: 1000 }}
                              >
                                <IconButton
                                  color="success"
                                  // size="large"
                                  // onClick={exportToExcel(row.id)}
                                  onClick={() => exportToExcel(row.id)}
                                >
                                  <DocumentScannerIcon />
                                </IconButton>
                              </Tooltip>
                            </div> */}
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
                                onClick={() => handleClickOpens(1, row)}
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
          count={datas?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
