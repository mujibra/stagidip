/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-multi-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import DoneIcon from '@mui/icons-material/Done';
import {
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Box } from '@mui/system';
import HandleUpproveStaging from './HandleUpproveStaging';
import HandleUpproveTSS from './HandleUpproveTSS';
import HandlePrint from './HandlePrint';
import OpenTemplateAllPagesMv400OnePage from './NewPage/OpenTemplateAllPagesMv400OnePage';
import OpenTemplate from './template/OpenTemplate';
// import OpenMX5600SNew from './openDialogMesinMX8600S/OpenMX5600SNew';
// import OpenMX5600New from './openDialogMesinMX8600S/OpenMX5600New';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 5,
  },
}));
const useStyles = makeStyles({
  tableCell: {
    minWidth: '100px',
    cursor: 'pointer',
  },
  tableCellDataEmty: {
    minWidth: '150px',
    cursor: 'pointer',
  },
  cursorTable: {
    cursor: 'pointer',
  },
  root: {
    fontSize: '200pt',
  },
  table: {
    fontSize: '100pt',
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const headCells = [
  {
    id: 'no',
    numeric: true,
    disablePadding: false,
    label: 'No Mesin',
    style: 'left',
  },
  {
    id: 'snMesin',
    numeric: true,
    disablePadding: false,
    label: 'SN Mesin',
    style: 'left',
  },
  {
    id: 'timer',
    numeric: true,
    disablePadding: false,
    label: 'Timer',
    style: 'left',
  },
  {
    id: 'appStaging',
    numeric: true,
    disablePadding: false,
    label: 'Approval Staging',
    style: 'left',
  },
  {
    id: 'appTSS',
    numeric: true,
    disablePadding: false,
    label: 'Approval TSS',
    style: 'left',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    style: 'left',
  },
];

function createData(
  idMesin,
  snMesin,
  testing_inspection,
  checklist_staging,
  time_checklist,
  data_approval_checklist_staging
) {
  return {
    idMesin,
    snMesin,
    testing_inspection,
    checklist_staging,
    time_checklist,
    data_approval_checklist_staging,
  };
}

export default function HandleTabelShowDetails(props) {
  const dispatch = useDispatch();
  // console.log(props, 'props');
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  let userRolesName;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
    userRolesName = getUser[0]?.name;
  }
  const dataById = props?.dataById;
  // console.log(dataById, 'dataById');
  const idPo = props?.dataById.id;
  const typeMesin = props?.dataById?.mesin?.type;
  const IdTypeMesin = props?.dataById?.mesin?.id;
  const IdModel = props?.dataById?.model?.id;
  const modelName = props?.dataById?.model;
  const classes = useStyles();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const idPO = props?.dataById?.id;
  // console.log(dataById, 'dataById')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [result_details, setresult_details] = useState('');
  const [id_checklist_staging, setid_checklist_staging] = useState('');
  const [id_divisi, setid_divisi] = useState('');
  const [results, setresults] = useState(null);
  const [problem, setproblem] = useState(null);
  const [action, setaction] = useState(null);
  const [remark, setremark] = useState(null);
  const [id_po, setid_po] = useState(null);
  const [no_mesin, setno_mesin] = useState(null);
  const [sn_mesin, setsn_mesin] = useState(null);
  const [id_classification, setnameid_classification] = useState(null);
  const [sn_part, setsn_part] = useState(null);
  const [inspector_sign, setinspector_sign] = useState(null);
  const [fix_description, setfix_description] = useState(null);
  const [checkpoint_desc, setcheckpoint_desc] = useState(null);
  const [status_checklist, setstatus_checklist] = useState(true);
  const [fill_columns, setfill_columns] = useState(null);
  const [openApprovel, setOpenApprovel] = useState(false);
  const [getindexOpen, setGetindexOpen] = useState('');
  const [IdMesin, setIdMesin] = useState('');
  const [getmover, setGetmover] = useState('');
  const [getDisable, setGetDisable] = useState(false);
  const [loadingBtnMover, setLoadingBtnMover] = useState(false);
  const [open, setOpen] = useState(false);
  const [getIdMesin, setGetIdMesin] = useState('');
  const [datas, setDatas] = useState([]);
  // console.log(datas, 'derrrrrrr')
  const [dataHeader, setDataHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApprove, setLoadingApprove] = useState(true);
  const [URL, setURL] = useState('');
  const [dataUpproveById, setDataUpproveById] = useState([]);
  const [approval_by, setApproval_by] = useState('');
  const [note_description, setNote_description] = useState('');
  const [dataExcel, setdataExcel] = useState([]);
  const [dataListId, setdataListId] = useState([]);
  const [pageStateExcel, setPageStateExcel] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [getDataMesin, setgetDataMesin] = useState({});
  const [getDataForExcel, setgetDataForExcel] = useState([]);
  const [btnDisable, setbtnDisable] = useState(false);
  const [btnDisableMp400, setbtnDisableMp400] = useState(true);
  const [loadingbtnDisableMp400, setloadingbtnDisableMp400] = useState(true);
  const [searched, setSearched] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [gAllCount, setGetAllCount] = useState([]);
  const [jsonExcel, setJsonExcel] = useState([]);
  const [BodyExcel, setBodyExcel] = useState([]);
  const [time2, setTime2] = useState([]);
  // const [filterApprovalBy, setFilterApprovalBy] = useState('STAGING');
  // const [filterApproval, setFilterApproval] = useState('UNAPPROVED');
  const [filterApprovalBy, setFilterApprovalBy] = useState(null);
  const [filterApproval, setFilterApproval] = useState(null);
  const [openFilterApproval, setOpenFilterApproval] = useState(false);
  const [loadingApproval, setLoadingApproval] = useState(false);
  const [timeMv400, setTimeMv400] = useState(null);

  const propsFromParrentNew = (
    data,
    mesin,
    disableBtn,
    loadingBtn,
    datas,
    time_checklist,
    timeMv400
  ) => {
    setTimeMv400(timeMv400);
    setgetDataMesin(mesin);
    setTime2(time_checklist);
    setbtnDisableMp400(disableBtn);
    setloadingbtnDisableMp400(loadingBtn);
    // console.log(disableBtn, 'disableBtn');
    setgetDataForExcel(data);
    setdataExcel(datas);
  };
  const rows = filteredRows?.map((item, index) =>
    createData(
      item?.idMesin,
      item?.snMesin,
      item?.testing_inspection,
      item?.checklist_staging,
      item?.time_checklist,
      item?.data_approval_checklist_staging
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseApprovel = () => {
    setOpenApprovel(false);
    setGetindexOpen('');
    setURL('');
    // setGetDataTable([]);
  };

  const handleClickOpen = (row, indexOpen) => {
    setGetDisable(row?.testing_inspection);
    setGetindexOpen(indexOpen);
    // setStart(false);
    setOpen(true);
    setGetIdMesin(row);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const propsFromParrent = (mover, getIdMesin) => {
    setIdMesin(getIdMesin);
    setGetmover(mover);
  };
  // console.log(getDataMesin, 'getDataMeasasin')

  const body = {
    id_po: idPO,
    no_mesin: props?.getIdMesin?.idMesin,
    sn_mesin: props?.getIdMesin?.snMesin,
    id_divisi,
    id_checklist_staging,
    result_details,
    results,
    problem,
    action,
    remark,
    fill_columns,
  };
  const bodyCSKIOS = {
    id_po,
    sn_mesin,
    no_mesin,
    id_classification,
    id_checklist_staging,
    checkpoint_desc,
    sn_part,
    results,
    inspector_sign,
    fix_description,
  };
  const getData = async () => {
    if (open === true) {
      setLoading(false);
    } else if (openFilterApproval === true) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}filterDataSNMesinByApprovalChecklist/${idPO}/${filterApprovalBy}/${filterApproval}`,
        config
      )
      // .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPO}`, config)
      .then((res) => {
        setDatas(res?.data?.data?.dataMesin);
        setDataHeader(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDatas([]);
        setLoading(false);
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
      });
  };
  const getNote = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}get-notes/${idPo}/${getIdMesin?.idMesin}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setNote_description(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
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
      });
  };
  const getAllCount = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getIdMesin?.idMesin}/countDataResult/status`,
        config
      )
      .then((res) => {
        // console.log(res, 'resss');
        setGetAllCount(res?.data?.data_status);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setGetAllCount([]);
        setLoading(false);
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
      });
  };
  const handleUpprovel = () => {
    setLoadingBtnMover(true);
    setOpenFilterApproval(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklist-approval/${URL}/${idPo}/${IdMesin.idMesin}`,
        { approval_by },
        config
      )
      .then((res) => {
        getData();
        setLoadingBtnMover(false);
        setOpenApprovel(false);
        // console.log(res);
        dispatch(
          showMessage({
            message: `Inspeksi Success Approve By ${URL}`, // text or html
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
  const hanldeSubmitNote = () => {
    setLoadingBtnMover(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}update-notes/${idPo}/${getIdMesin?.idMesin}`,
        { note_description },
        config
      )
      .then((res) => {
        setLoadingBtnMover(false);
        setOpenApprovel(false);
        // console.log(res);
        getAllCount();
        dispatch(
          showMessage({
            message: `Note Success Added`, // text or html
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
        // console.log(err);
      });
  };
  const handleClose = () => {
    setNote_description('');
    setOpen(false);
    getData();
    setbtnDisable([]);
    setJsonExcel([]);
    setTimer(0);
    setStart(false);
    clearInterval(tick.current);
    localStorage.removeItem('time_todo');
  };
  const handleClickOpenEdit = (row) => {
    setOpen(true);
    setGetIdMesin(row);
    getAllCount();
    setStart(!start);
  };
  const handleEditMV400 = () => {
    // getData();

    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/${idPo}/${getIdMesin?.idMesin}`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        getDataForExcel,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        getAllCount();
        getData();
        dispatch(
          showMessage({
            message: 'Data Has Been Successfully Changed',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleEditExcelMV400 = () => {
    // getData();

    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/${idPo}/${getIdMesin?.idMesin}`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        pageStateExcel,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        getAllCount();
        getData();
        dispatch(
          showMessage({
            message: 'Data Has Been Successfully Changed',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleSumbitMV400 = () => {
    // getData();
    const get_timetodo = JSON.parse(localStorage.getItem('time_todo'));

    const data1 = [
      {
        dataArray: getDataForExcel,
        time_todo: get_timetodo,
      },
    ];

    setLoadingBtn(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        data1,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        setOpen(!open);
        getAllCount();
        getData();
        dispatch(
          showMessage({
            message: 'Data Has Been Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleSumbitExcelMV400 = () => {
    // getData();
    const get_timetodo = JSON.parse(localStorage.getItem('time_todo'));

    const data1 = [
      {
        dataArray: pageStateExcel,
        time_todo: get_timetodo,
      },
    ];

    setLoadingBtn(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        data1,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        setOpen(!open);
        getAllCount();
        getData();
        dispatch(
          showMessage({
            message: 'Data Has Been Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleEditAllMesinOnePage = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPo}/${getIdMesin?.idMesin}`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        getDataForExcel,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        setOpen(!open);
        getAllCount();
        getData();
        dispatch(
          showMessage({
            message: 'Data Has Been Successfully Edited',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleSumbitAllMesinOnePage = () => {
    // getData();
    const get_timetodo = JSON.parse(localStorage.getItem('time_todo'));

    // if (jsonExcel.length === 0) {
    const data1 = [
      {
        dataArray: getDataForExcel,
        time_todo: get_timetodo,
      },
    ];

    setLoadingBtn(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        data1,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        setOpen(!open);
        getAllCount();
        getData();
        dispatch(
          showMessage({
            message: 'Data Has Been Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleClickOpenApprovel = (row, indexOpen) => {
    setOpenApprovel(true);
    setGetDisable(row?.testing_inspection);
    setGetindexOpen(indexOpen);
    setGetIdMesin(row);
  };
  const handleSumbitExcel = () => {
    const get_timetodo = JSON.parse(localStorage.getItem('time_todo'));

    // if (jsonExcel.length === 0) {
    const data1 = [
      {
        dataArray: pageStateExcel,
        time_todo: get_timetodo,
      },
    ];
    // getData();

    setLoadingBtn(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        data1,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        setOpen(!open);
        // props?.getOK();
        // props?.getNG();
        // props?.getNA();
        getData();
        dispatch(
          showMessage({
            message: 'Data Excel Success Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const handleEditExcel = async () => {
    // console.log(IdMesin, 'IdMesin?.idMesin');
    // getData();

    setLoadingBtn(true);
    const response = await axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${
          getIdMesin?.idMesin
        }/${null}`,
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getDataMesin?.idMesin}/${getIdDivisi}`,
        pageStateExcel,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        setOpen(!open);
        // props?.getOK();
        // props?.getNG();
        // props?.getNA();
        getData();
        dispatch(
          showMessage({
            message: 'Edit Excel Success',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        setJsonExcel([]);
      })
      .catch((err) => {
        setLoadingBtn(false);
        setJsonExcel([]);
        // console.log(err, 'err');
        const errStatus = err.response.status;
        // console.log(errStatus, 'errStatus');
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
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
  const getDisableForBtnExcel = [];
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
      if (URL !== '' && IdMesin.idMesin !== undefined) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklist-approval/${URL}/${idPo}/${IdMesin.idMesin}`,
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
      getData();
      if (open === true) {
        getNote();
        // getDatas();
        // getAllCount();
      }
    }

    return () => {
      isUnmout = true;
    };
  }, [
    getIdMesin,
    getmover?.id,
    getindexOpen,
    IdMesin?.idMesin,
    URL,
    getDataForExcel,
    filterApproval,
    filterApprovalBy,
  ]);
  const getDataAllExcel = [];
  const resultGetDataAllExcel = [];
  const AllresultGetDataAllExcel = [];
  const getAllList = async () => {
    const dataList = {};
    try {
      const PROBLEM = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/PROBLEM`,
        config
      );
      const ACTION = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/ACTION`,
        config
      );
      const DENOMINATION = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/DENOMINATION`,
        config
      );
      const REMARK = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/REMARK`,
        config
      );
      const BILL_CHECKER_UNIT = await axios.get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/BILL_CHECKER_UNIT`,
        config
      );
      dataList.getProblem = PROBLEM?.data?.data;
      dataList.getAction = ACTION?.data?.data;
      dataList.getDiv = DENOMINATION?.data?.data;
      dataList.getRemake = REMARK?.data?.data;
      dataList.getBCU = BILL_CHECKER_UNIT?.data?.data;
      setdataListId(dataList);
      return dataList;
    } catch (error) {
      return null;
    }
  };

  const file_name = `tmp_preStaging_Model-${
    dataHeader?.mesin?.type === null ? '-' : dataHeader?.mesin?.type
  }_SN-${getIdMesin?.snMesin}.xlsx`;
  let headers;

  async function exportToExcel() {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Staging_Registrations');
    const dataList = await getAllList();
    const arrgetProblem = [];
    const arrgetAction = [];
    const arrgetDiv = [];
    const arrgetRemake = [];
    const arrgetBCU = [];
    dataList?.getProblem?.map((i) => {
      arrgetProblem.push(i?.description);
    });
    dataList?.getAction?.map((i) => {
      arrgetAction.push(i?.description);
    });
    dataList?.getDiv?.map((i) => {
      arrgetDiv.push(i?.description);
    });
    dataList?.getRemake?.map((i) => {
      arrgetRemake.push(i?.description);
    });
    dataList?.getBCU?.map((i) => {
      arrgetBCU.push(i?.description);
    });
    if (IdModel === 5) {
      headers = [
        { header: 'no', key: 'no', width: 5 },
        { header: 'unit', key: 'unit', width: 15 },
        { header: 'checkpoint_desc', key: 'checkpoint_desc', width: 100 },
        { header: 'part_number', key: 'part_number', width: 15 },
        { header: 'rev_final', key: 'rev_final', width: 15 },
        { header: 'rev_now', key: 'rev_now', width: 15 },
        { header: 'sn_part', key: 'sn_part', width: 15 },
        { header: 'results', key: 'results', width: 10 },
        { header: 'inspector_sign', key: 'inspector_sign', width: 20 },
        { header: 'fix_description', key: 'fix_description', width: 20 },
        { header: 'id_classification', key: 'id_classification', width: 0 },
        { header: 'id_po', key: 'id_po', width: 0 },
        { header: 'no_mesin', key: 'no_mesin', width: 0 },
        { header: 'sn_mesin', key: 'sn_mesin', width: 0 },
        { header: 'id_checklist_staging', key: 'id_checklist_staging', width: 0 },
      ];
    } else {
      headers = [
        { header: 'no', key: 'no', width: 5 },
        { header: 'Test', key: 'Test', width: 50 },
        { header: 'result_detail', key: 'result_detail', width: 100 },
        { header: 'fillCollom1', key: 'fillCollom1', width: 15 },
        { header: 'fillCollom2', key: 'fillCollom2', width: 15 },
        { header: 'fillCollom3', key: 'fillCollom3', width: 15 },
        { header: 'fillCollom4', key: 'fillCollom4', width: 15 },
        { header: 'fillCollom5', key: 'fillCollom5', width: 15 },
        { header: 'fillCollom6', key: 'fillCollom6', width: 15 },
        { header: 'fillCollom7', key: 'fillCollom7', width: 15 },
        { header: 'problem', key: 'problem', width: 10 },
        { header: 'action', key: 'action', width: 10 },
        { header: 'remake', key: 'remake', width: 10 },
        { header: 'result', key: 'result', width: 15 },
        { header: 'id_div', key: 'id_div', width: 0 },
        { header: 'id_po', key: 'id_po', width: 0 },
        { header: 'no_mesin', key: 'no_mesin', width: 0 },
        { header: 'id_checklist_staging', key: 'id_checklist_staging', width: 0 },
      ];
    }

    const dataNumber = Array.from({ length: 14 }, (_, i) => i + 1);
    const dataAlfabet = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

    ws.columns = headers;

    dataExcel?.map((item, index) => {
      // console.log(item, 'item');
      const row = ws.getRow(index);
      // CRM
      if (IdModel === 4) {
        if (index === 16) {
          row.height = row.height = 100;
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
        } else if (index === 19 || index === 20) {
          row.height = row.height = 70;
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
        } else {
          ('');
        }
      } else if (IdModel === 2) {
        if (index === 9) {
          row.height = row.height = 100;
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
        } else if (index === 12 || index === 13) {
          row.height = row.height = 70;
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
        } else {
          ('');
        }
      } else if (typeMesin === 'MX5600S') {
        if (index === 9) {
          row.height = row.height = 100;
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
        } else if (index === 12 || index === 13) {
          row.height = row.height = 70;
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.alignment = { vertical: 'middle', wrapText: true };
          });
        } else {
          ('');
        }
      } else {
        ('');
      }
      dataAlfabet.map((i, idx) => {
        // CRM
        if (IdModel === 4) {
          if (
            (i === 'D' && index === 12) ||
            (i === 'D' && index === 13) ||
            (i === 'E' && index === 13) ||
            (i === 'D' && index === 14) ||
            (i === 'E' && index === 14) ||
            (i === 'F' && index === 14) ||
            (i === 'G' && index === 14) ||
            (i === 'H' && index === 14) ||
            (i === 'I' && index === 14) ||
            (i === 'D' && index === 15) ||
            (i === 'D' && index === 16) ||
            (i === 'D' && index === 19) ||
            (i === 'E' && index === 19) ||
            (i === 'F' && index === 19) ||
            (i === 'D' && index === 20) ||
            (i === 'E' && index === 20) ||
            (i === 'F' && index === 20)
          ) {
            ws.getCell(`${i}${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          if (index !== 12 && index !== 13 && index !== 14 && index !== 15) {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          } else {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
          }
          if (index !== 12 && index !== 13 && index !== 14 && index !== 15) {
            ws.getCell(`K${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetProblem}"`],
            };
            ws.getCell(`L${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetAction}"`],
            };
            ws.getCell(`M${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetRemake}"`],
            };
            ws.getCell(`N${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: ['"OK,NG,NA"'],
              // formulae: ['=Levels!$E$2:$A$9999'],
            };
          }
        } else if (IdModel === 2) {
          // ATM
          if (
            (i === 'D' && index === 6) ||
            (i === 'D' && index === 7) ||
            (i === 'E' && index === 7) ||
            (i === 'D' && index === 8) ||
            (i === 'E' && index === 8) ||
            (i === 'F' && index === 8) ||
            (i === 'G' && index === 8) ||
            (i === 'H' && index === 8) ||
            // (i === 'I' && index === 14) ||
            // (i === 'D' && index === 15) ||
            (i === 'D' && index === 9) ||
            (i === 'D' && index === 12) ||
            (i === 'E' && index === 12) ||
            (i === 'F' && index === 12) ||
            (i === 'D' && index === 13) ||
            (i === 'E' && index === 13) ||
            (i === 'F' && index === 13)
          ) {
            ws.getCell(`${i}${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          if (index !== 5 && index !== 6 && index !== 7 && index !== 8) {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          } else {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
          }
          if (index !== 5 && index !== 6 && index !== 7 && index !== 8) {
            ws.getCell(`K${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetProblem}"`],
            };
            ws.getCell(`L${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetAction}"`],
            };
            ws.getCell(`M${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetRemake}"`],
            };
            ws.getCell(`N${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: ['"OK,NG,NA"'],
              // formulae: ['=Levels!$E$2:$A$9999'],
            };
          }
        } else if (typeMesin === 'MX5600S') {
          if (
            (i === 'D' && index === 6) ||
            (i === 'D' && index === 7) ||
            (i === 'E' && index === 7) ||
            (i === 'D' && index === 8) ||
            (i === 'E' && index === 8) ||
            (i === 'F' && index === 8) ||
            (i === 'G' && index === 8) ||
            (i === 'H' && index === 8) ||
            // (i === 'I' && index === 14) ||
            // (i === 'D' && index === 15) ||
            (i === 'D' && index === 9) ||
            (i === 'D' && index === 12) ||
            (i === 'E' && index === 12) ||
            (i === 'F' && index === 12) ||
            (i === 'D' && index === 13) ||
            (i === 'E' && index === 13) ||
            (i === 'F' && index === 13)
          ) {
            ws.getCell(`${i}${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          if (index !== 5 && index !== 6 && index !== 7 && index !== 8) {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          } else {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
          }
          if (index !== 5 && index !== 6 && index !== 7 && index !== 8) {
            ws.getCell(`K${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetProblem}"`],
            };
            ws.getCell(`L${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetAction}"`],
            };
            ws.getCell(`M${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetRemake}"`],
            };
            ws.getCell(`N${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: ['"OK,NG,NA"'],
              // formulae: ['=Levels!$E$2:$A$9999'],
            };
          }
        } else if (IdModel === 6) {
          if (
            (i === 'D' && index === 5) ||
            (i === 'D' && index === 6) ||
            (i === 'E' && index === 6) ||
            (i === 'D' && index === 7) ||
            (i === 'E' && index === 7) ||
            (i === 'F' && index === 7) ||
            (i === 'G' && index === 7) ||
            (i === 'H' && index === 7) ||
            // (i === 'I' && index === 14) ||
            // (i === 'D' && index === 15) ||
            (i === 'D' && index === 8) ||
            (i === 'D' && index === 11) ||
            (i === 'E' && index === 11) ||
            (i === 'F' && index === 11) ||
            (i === 'D' && index === 12) ||
            (i === 'E' && index === 12) ||
            (i === 'F' && index === 12)
          ) {
            ws.getCell(`${i}${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          if (index !== 4 && index !== 5 && index !== 6 && index !== 7) {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          } else {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
          }
          if (index !== 4 && index !== 5 && index !== 6 && index !== 7) {
            ws.getCell(`K${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetProblem}"`],
            };
            ws.getCell(`L${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetAction}"`],
            };
            ws.getCell(`M${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetRemake}"`],
            };
            ws.getCell(`N${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: ['"OK,NG,NA"'],
              // formulae: ['=Levels!$E$2:$A$9999'],
            };
          }
        } else if (IdModel === 8) {
          if (
            (i === 'D' && index === 5) ||
            (i === 'D' && index === 6) ||
            (i === 'E' && index === 6) ||
            (i === 'D' && index === 7) ||
            (i === 'E' && index === 7) ||
            (i === 'F' && index === 7) ||
            (i === 'G' && index === 7) ||
            (i === 'H' && index === 7) ||
            (i === 'I' && index === 7) ||
            (i === 'J' && index === 7) ||
            // (i === 'I' && index === 14) ||
            // (i === 'D' && index === 15) ||
            (i === 'D' && index === 8) ||
            (i === 'D' && index === 12) ||
            (i === 'E' && index === 12) ||
            (i === 'F' && index === 12) ||
            (i === 'D' && index === 13) ||
            (i === 'E' && index === 13) ||
            (i === 'F' && index === 13)
          ) {
            ws.getCell(`${i}${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          if (index !== 4 && index !== 5 && index !== 6 && index !== 7) {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          } else {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
          }
          if (index !== 4 && index !== 5 && index !== 6 && index !== 7) {
            ws.getCell(`K${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetProblem}"`],
            };
            ws.getCell(`L${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetAction}"`],
            };
            ws.getCell(`M${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetRemake}"`],
            };
            ws.getCell(`N${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: ['"OK,NG,NA"'],
              // formulae: ['=Levels!$E$2:$A$9999'],
            };
          }
        } else if (IdModel === 5) {
          ws.getCell(`H${index + 1}`).border = {
            top: { style: 'medium', color: { argb: '000000' } },
            left: { style: 'medium', color: { argb: '000000' } },
            bottom: { style: 'medium', color: { argb: '000000' } },
            right: { style: 'medium', color: { argb: '000000' } },
          };
          ws.getCell(`I${index + 1}`).border = {
            top: { style: 'medium', color: { argb: '000000' } },
            left: { style: 'medium', color: { argb: '000000' } },
            bottom: { style: 'medium', color: { argb: '000000' } },
            right: { style: 'medium', color: { argb: '000000' } },
          };
          ws.getCell(`J${index + 1}`).border = {
            top: { style: 'medium', color: { argb: '000000' } },
            left: { style: 'medium', color: { argb: '000000' } },
            bottom: { style: 'medium', color: { argb: '000000' } },
            right: { style: 'medium', color: { argb: '000000' } },
          };

          if (
            (i === 'F' && index === 11) ||
            (i === 'F' && index === 12) ||
            (i === 'E' && index === 13) ||
            (i === 'F' && index === 14) ||
            (i === 'F' && index === 15) ||
            (i === 'F' && index === 16) ||
            (i === 'F' && index === 17) ||
            (i === 'F' && index === 18) ||
            (i === 'F' && index === 19) ||
            (i === 'F' && index === 20)
          ) {
            ws.getCell(`G${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          ws.getCell(`H${index + 1}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: ['"OK,NG,NA"'],
            // formulae: ['=Levels!$E$2:$A$9999'],
          };
        } else {
          if (
            (i === 'D' && index === 12) ||
            (i === 'D' && index === 13) ||
            (i === 'E' && index === 13) ||
            (i === 'D' && index === 14) ||
            (i === 'E' && index === 14) ||
            (i === 'F' && index === 14) ||
            (i === 'G' && index === 14) ||
            (i === 'H' && index === 14) ||
            (i === 'I' && index === 14) ||
            (i === 'D' && index === 15) ||
            (i === 'D' && index === 16) ||
            (i === 'D' && index === 19) ||
            (i === 'E' && index === 19) ||
            (i === 'F' && index === 19) ||
            (i === 'D' && index === 20) ||
            (i === 'E' && index === 20) ||
            (i === 'F' && index === 20)
          ) {
            ws.getCell(`${i}${index}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          }
          if (index !== 12 && index !== 13 && index !== 14 && index !== 15) {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'medium', color: { argb: '000000' } },
              left: { style: 'medium', color: { argb: '000000' } },
              bottom: { style: 'medium', color: { argb: '000000' } },
              right: { style: 'medium', color: { argb: '000000' } },
            };
          } else {
            ws.getCell(`K${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`L${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`M${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
            ws.getCell(`N${index + 1}`).border = {
              top: { style: 'hair', color: { argb: '000000' } },
              left: { style: 'hair', color: { argb: '000000' } },
              bottom: { style: 'hair', color: { argb: '000000' } },
              right: { style: 'hair', color: { argb: '000000' } },
            };
          }
          if (index !== 12 && index !== 13 && index !== 14 && index !== 15) {
            ws.getCell(`K${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetProblem}"`],
            };
            ws.getCell(`L${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetAction}"`],
            };
            ws.getCell(`M${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${arrgetRemake}"`],
            };
            ws.getCell(`N${index + 1}`).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: ['"OK,NG,NA"'],
              // formulae: ['=Levels!$E$2:$A$9999'],
            };
          }
        }
      });
      if (IdModel === 5) {
        ws.addRow([
          ++index,
          item?.unit,
          item?.checkpoint_desc,
          item?.part_number,
          item?.rev_final,
          item?.rev_now,
          item?.sn_part,
          'OK',
          item?.inspector_sign,
          item?.fix_description,
          item?.id_classification,
          idPO,
          getIdMesin?.idMesin,
          getIdMesin?.snMesin,
          item?.id,
          // console.log(item, 'item'),
        ]);
      } else {
        ws.addRow([
          ++index,
          item?.test_desc,
          item?.result_detail,
          item?.result,
          item?.test1,
          item?.test2,
          item?.test2,
          item?.test2,
          item?.test2,
          item?.test2,
          item?.test2,
          item?.test2,
          item?.test2,
          // CRM
          IdModel === 4
            ? index !== 12 && index !== 13 && index !== 14 && index !== 15
              ? 'OK'
              : ''
            : IdModel === 2
            ? // ATM
              index !== 5 && index !== 6 && index !== 7 && index !== 8
              ? 'OK'
              : ''
            : IdModel === 6 || IdModel === 8
            ? index !== 4 && index !== 5 && index !== 6 && index !== 7
              ? 'OK'
              : ''
            : typeMesin === 'MX5600S'
            ? index !== 5 && index !== 6 && index !== 7 && index !== 8
              ? 'OK'
              : ''
            : index !== 12 && index !== 13 && index !== 14 && index !== 15
            ? 'OK'
            : '',
          item?.id_divisi,
          idPO,
          getDataMesin?.idMesin,
          item?.id,
          // console.log(item, 'item'),
        ]);
      }

      // BATAS
    });
    if (IdModel === 4) {
      ws.getCell(`D14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`E14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`F14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`G14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`H14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`I14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`J14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`D15`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetBCU}"`],
      };
    } else if (IdModel === 2) {
      ws.getCell(`D8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`E8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`F8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`G8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`H8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`I8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`J8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
    } else if (typeMesin === 'MX5600S') {
      ws.getCell(`D8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`E8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`F8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`G8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`H8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`I8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`J8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
    } else if (IdModel === 6) {
      ws.getCell(`D7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`E7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`F7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`G7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`H7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`I7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`J7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
    } else if (IdModel === 8) {
      ws.getCell(`D7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`E7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`F7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`G7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`H7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`I7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`J7`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`D8`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetBCU}"`],
      };
    } else {
      ws.getCell(`D14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`E14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`F14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`G14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`H14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`I14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`J14`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetDiv}"`],
      };
      ws.getCell(`D15`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${arrgetBCU}"`],
      };
    }

    const buffer = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buffer], { type: fileType }), file_name);
  }
  let name;

  const handleselectedFile = (e) => {
    getAllList();
    name = e.target.files[0].name;
    e.preventDefault();
    // console.log(name);

    if (name !== file_name) {
      dispatch(
        showMessage({
          message: 'Cek Again Name File',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'warning',
        })
      );
      // setJsonExcel([]);
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
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: null });
          setJsonExcel(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
        // handleSubmitBarcode();
      }
    }
  };
  useEffect(() => {
    const arr = [];
    const getDivId = {};
    if (jsonExcel?.length !== 0) {
      for (let index = 0; index < jsonExcel.length; index++) {
        if (dataListId.length !== 0) {
          getDivId.div1 = dataListId?.getDiv.find(
            (obj) => obj.description === jsonExcel[index]?.fillCollom1
          );
          getDivId.div2 = dataListId?.getDiv.find(
            (obj) => obj.description === jsonExcel[index]?.fillCollom2
          );
          getDivId.div3 = dataListId?.getDiv.find(
            (obj) => obj.description === jsonExcel[index]?.fillCollom3
          );
          getDivId.div4 = dataListId?.getDiv.find(
            (obj) => obj.description === jsonExcel[index]?.fillCollom4
          );
          getDivId.div5 = dataListId?.getDiv.find(
            (obj) => obj.description === jsonExcel[index]?.fillCollom5
          );
          getDivId.bcu = dataListId?.getBCU.find(
            (obj) => obj.description === jsonExcel[index]?.fillCollom1
          );
          // batas
          getDivId.problem = dataListId?.getProblem.find(
            (obj) => obj.description === jsonExcel[index]?.problem
          );
          getDivId.action = dataListId?.getAction.find(
            (obj) => obj.description === jsonExcel[index]?.action
          );
          getDivId.remake = dataListId?.getRemake.find(
            (obj) => obj.description === jsonExcel[index]?.remake
          );
        }
        if (IdModel === 4) {
          // CRM
          arr.push({
            ...body,
            no_mesin: getDataMesin?.idMesin,
            sn_mesin: getDataMesin?.snMesin,
            id_divisi: jsonExcel[index]?.id_div,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            result_details: jsonExcel[index]?.result_detail,
            results: jsonExcel[index]?.result,
            problem: getDivId.problem?.id === undefined ? null : getDivId.problem?.id,
            action: getDivId.action?.id === undefined ? null : getDivId.action?.id,
            remark: getDivId.remake?.id === undefined ? null : getDivId.remake?.id,
            fill_columns:
              index === 10
                ? jsonExcel[index]?.fillCollom1
                : index === 11
                ? [jsonExcel[index]?.fillCollom1, jsonExcel[index]?.fillCollom2]
                : index === 12
                ? [
                    getDivId.div1?.id === undefined ? null : getDivId.div1?.id,
                    getDivId.div2?.id === undefined ? null : getDivId.div2?.id,
                    getDivId.div3?.id === undefined ? null : getDivId.div3?.id,
                    getDivId.div4?.id === undefined ? null : getDivId.div4?.id,
                    getDivId.div5?.id === undefined ? null : getDivId.div5?.id,
                  ]
                : index === 13
                ? getDivId.bcu?.id === undefined
                  ? null
                  : getDivId.bcu?.id
                : index === 14
                ? ''
                : index === 17
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : index === 18
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : null,
          });
        } else if (IdModel === 2) {
          // ATM
          arr.push({
            ...body,
            no_mesin: getDataMesin?.idMesin,
            sn_mesin: getDataMesin?.snMesin,
            id_divisi: jsonExcel[index]?.id_div,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            result_details: jsonExcel[index]?.result_detail,
            results: jsonExcel[index]?.result,
            problem: getDivId.problem?.id === undefined ? null : getDivId.problem?.id,
            action: getDivId.action?.id === undefined ? null : getDivId.action?.id,
            remark: getDivId.remake?.id === undefined ? null : getDivId.remake?.id,
            fill_columns:
              index === 4
                ? jsonExcel[index]?.fillCollom1
                : index === 5
                ? [jsonExcel[index]?.fillCollom1, jsonExcel[index]?.fillCollom2]
                : index === 6
                ? [
                    getDivId.div1?.id === undefined ? null : getDivId.div1?.id,
                    getDivId.div2?.id === undefined ? null : getDivId.div2?.id,
                    getDivId.div3?.id === undefined ? null : getDivId.div3?.id,
                    getDivId.div4?.id === undefined ? null : getDivId.div4?.id,
                    getDivId.div5?.id === undefined ? null : getDivId.div5?.id,
                  ]
                : index === 7
                ? ''
                : index === 10
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : index === 11
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : null,
          });
        } else if (typeMesin === 'MX5600') {
          arr.push({
            ...body,
            no_mesin: getDataMesin?.idMesin,
            sn_mesin: getDataMesin?.snMesin,
            id_divisi: jsonExcel[index]?.id_div,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            result_details: jsonExcel[index]?.result_detail,
            results: jsonExcel[index]?.result,
            problem: getDivId.problem?.id === undefined ? null : getDivId.problem?.id,
            action: getDivId.action?.id === undefined ? null : getDivId.action?.id,
            remark: getDivId.remake?.id === undefined ? null : getDivId.remake?.id,
            fill_columns:
              index === 3
                ? jsonExcel[index]?.fillCollom1
                : index === 4
                ? [jsonExcel[index]?.fillCollom1, jsonExcel[index]?.fillCollom2]
                : index === 5
                ? [
                    getDivId.div1?.id === undefined ? null : getDivId.div1?.id,
                    getDivId.div2?.id === undefined ? null : getDivId.div2?.id,
                    getDivId.div3?.id === undefined ? null : getDivId.div3?.id,
                    getDivId.div4?.id === undefined ? null : getDivId.div4?.id,
                    getDivId.div5?.id === undefined ? null : getDivId.div5?.id,
                  ]
                : index === 6
                ? ''
                : index === 9
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : index === 10
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : null,
          });
        } else if (IdModel === 6) {
          arr.push({
            ...body,
            no_mesin: getDataMesin?.idMesin,
            sn_mesin: getDataMesin?.snMesin,
            id_divisi: jsonExcel[index]?.id_div,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            result_details: jsonExcel[index]?.result_detail,
            results: jsonExcel[index]?.result,
            problem: getDivId.problem?.id === undefined ? null : getDivId.problem?.id,
            action: getDivId.action?.id === undefined ? null : getDivId.action?.id,
            remark: getDivId.remake?.id === undefined ? null : getDivId.remake?.id,
            fill_columns:
              index === 3
                ? jsonExcel[index]?.fillCollom1
                : index === 4
                ? [jsonExcel[index]?.fillCollom1, jsonExcel[index]?.fillCollom2]
                : index === 5
                ? [
                    getDivId.div1?.id === undefined ? null : getDivId.div1?.id,
                    getDivId.div2?.id === undefined ? null : getDivId.div2?.id,
                    getDivId.div3?.id === undefined ? null : getDivId.div3?.id,
                    getDivId.div4?.id === undefined ? null : getDivId.div4?.id,
                    getDivId.div5?.id === undefined ? null : getDivId.div5?.id,
                  ]
                : index === 6
                ? ''
                : index === 9
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : index === 10
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : null,
          });
        } else if (IdModel === 8) {
          arr.push({
            ...body,
            no_mesin: getDataMesin?.idMesin,
            sn_mesin: getDataMesin?.snMesin,
            id_divisi: jsonExcel[index]?.id_div,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            result_details: jsonExcel[index]?.result_detail,
            results: jsonExcel[index]?.result,
            problem: getDivId.problem?.id === undefined ? null : getDivId.problem?.id,
            action: getDivId.action?.id === undefined ? null : getDivId.action?.id,
            remark: getDivId.remake?.id === undefined ? null : getDivId.remake?.id,
            fill_columns:
              index === 3
                ? jsonExcel[index]?.fillCollom1
                : index === 4
                ? [jsonExcel[index]?.fillCollom1, jsonExcel[index]?.fillCollom2]
                : index === 5
                ? [
                    getDivId.div1?.id === undefined ? null : getDivId.div1?.id,
                    getDivId.div2?.id === undefined ? null : getDivId.div2?.id,
                    getDivId.div3?.id === undefined ? null : getDivId.div3?.id,
                    getDivId.div4?.id === undefined ? null : getDivId.div4?.id,
                    getDivId.div5?.id === undefined ? null : getDivId.div5?.id,
                  ]
                : index === 6
                ? getDivId.bcu?.id === undefined
                  ? null
                  : getDivId.bcu?.id
                : index === 10
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : index === 11
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : null,
          });
        } else if (IdModel === 5) {
          arr.push({
            ...bodyCSKIOS,
            results: jsonExcel[index]?.results,
            id_po: jsonExcel[index]?.id_po,
            sn_mesin: jsonExcel[index]?.sn_mesin,
            no_mesin: jsonExcel[index]?.no_mesin,
            id_classification: jsonExcel[index]?.id_classification,
            checkpoint_desc: jsonExcel[index]?.checkpoint_desc,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            sn_part: jsonExcel[index]?.sn_part,
            inspector_sign: jsonExcel[index]?.inspector_sign,
            fix_description: jsonExcel[index]?.fix_description,
          });
        } else {
          arr.push({
            ...body,
            no_mesin: getDataMesin?.idMesin,
            sn_mesin: getDataMesin?.snMesin,
            id_divisi: jsonExcel[index]?.id_div,
            id_checklist_staging: jsonExcel[index]?.id_checklist_staging,
            result_details: jsonExcel[index]?.result_detail,
            results: jsonExcel[index]?.result,
            problem: getDivId.problem?.id === undefined ? null : getDivId.problem?.id,
            action: getDivId.action?.id === undefined ? null : getDivId.action?.id,
            remark: getDivId.remake?.id === undefined ? null : getDivId.remake?.id,
            fill_columns:
              index === 10
                ? jsonExcel[index]?.fillCollom1
                : index === 11
                ? [jsonExcel[index]?.fillCollom1, jsonExcel[index]?.fillCollom2]
                : index === 12
                ? [
                    getDivId.div1?.id === undefined ? null : getDivId.div1?.id,
                    getDivId.div2?.id === undefined ? null : getDivId.div2?.id,
                    getDivId.div3?.id === undefined ? null : getDivId.div3?.id,
                    getDivId.div4?.id === undefined ? null : getDivId.div4?.id,
                    getDivId.div5?.id === undefined ? null : getDivId.div5?.id,
                  ]
                : index === 13
                ? getDivId.bcu?.id === undefined
                  ? null
                  : getDivId.bcu?.id
                : index === 14
                ? ''
                : index === 17
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : index === 18
                ? [
                    jsonExcel[index]?.fillCollom1,
                    jsonExcel[index]?.fillCollom2,
                    jsonExcel[index]?.fillCollom3,
                  ]
                : null,
          });
        }
      }
    }
    const newObject = Array.from(arr);
    setPageStateExcel([...newObject]);
  }, [jsonExcel, dataListId, getDataMesin]);
  const [getDateTable, setGetDataTable] = useState([]);

  useEffect(() => {
    if (searched === '') {
      setFilteredRows(datas);
    } else {
      const filteredData = datas?.filter((row) =>
        row?.snMesin?.toLowerCase()?.includes(searched?.toLowerCase())
      );
      setFilteredRows(filteredData);
    }
  }, [datas, searched]);

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  const [timer, setTimer] = useState(0); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

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
    }

    return () => clearInterval(tick.current);
  }, [start]);
  // console.log(start, 'start')

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
  const handleApprovalAll = (row, approveBy) => {
    setOpenFilterApproval(true);
    setLoadingApproval(true);
    const approveStaging = row?.data_approval_checklist_staging?.approval_by_staging;
    const approveTss = row?.data_approval_checklist_staging?.approval_by_tss;
    // console.log(approveStaging, 'approveStaging');
    // console.log(approveTss, 'approveTss');
    const handleApproval = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklist-approval/${approveBy}/${idPo}/${row?.idMesin}`,
          { approval_by: userRolesId },
          config
        )
        .then((res) => {
          getData();
          setLoadingApproval(false);
          dispatch(
            showMessage({
              message: `PreStaging Success Approve By ${userRolesName} as ${approveBy} `, // text or html
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
          setLoadingApproval(true);
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
    if (userRoles === 'SUPER_ADMIN' || userRoles === 'ADMIN' || userRoles === 'SUPERVISOR') {
      handleApproval();
    } else if (approveStaging === null && approveBy === 'STAGING') {
      handleApproval();
    } else if (approveTss === null && approveBy === 'TSS') {
      handleApproval();
    } else {
      dispatch(
        showMessage({
          message: `SN "${row?.snMesin}" has been approved! contact admin/supervisor if you want to change.`,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'info',
        })
      );
    }
  };
  const handleNotif = () => {
    dispatch(
      showMessage({
        message: 'Prestaging has not been submitted yet',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        variant: 'warning',
      })
    );
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <div className="p-10">
        <div className="flex gap-5">
          <TextField
            className="w-full"
            label="Search"
            value={searched}
            onChange={handleSearch}
            variant="outlined"
            size="small"
            style={{ marginBottom: '10px', marginLeft: '10px' }}
          />
          <Box className="w-full">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={filterApprovalBy}
                label="Filter By"
                onChange={(e) => setFilterApprovalBy(e.target.value)}
              >
                <MenuItem value="STAGING">Staging</MenuItem>
                <MenuItem value="TSS">TSS</MenuItem>
                <MenuItem value={null}>All Data</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="w-full">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter Approve/UnApprove</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={filterApproval}
                label="Filter Approve/UnApprove"
                onChange={(e) => setFilterApproval(e.target.value)}
              >
                <MenuItem value="APPROVED">Approved</MenuItem>
                <MenuItem value="UNAPPROVED">UnApproved</MenuItem>
                <MenuItem value={null}>All Data</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="w-full flex justify-end">
          <Typography variant="subtitle2" component="h2">
            Note : Select <b>"Filter by"</b> and <b>"Filter approve"</b> to get the filter data.
          </Typography>
        </div>
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
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {getindexOpen === 1 ? (
              <HandleUpproveStaging
                userRoles={userRoles}
                dataUpproveById={dataUpproveById}
                propsFromParrent={propsFromParrent}
                // handleClickOpen={handleClickOpen}
                // getData={getData}
                idPO={idPO}
                getIdMesin={getIdMesin}
              />
            ) : getindexOpen === 2 ? (
              <HandleUpproveTSS
                userRoles={userRoles}
                dataUpproveById={dataUpproveById}
                propsFromParrent={propsFromParrent}
                // handleClickOpen={handleClickOpen}
                // getData={getData}
                idPO={idPO}
                getIdMesin={getIdMesin}
              />
            ) : getindexOpen === 3 ? (
              <HandlePrint
                gAllCount={gAllCount}
                data={datas}
                getDateTable={getDateTable}
                dataHeader={dataHeader}
                dataUpproveById={dataUpproveById}
                propsFromParrent={propsFromParrent}
                handleClickOpen={handleClickOpen}
                getData={getData}
                resultGetDataAllExcel={resultGetDataAllExcel}
                idPO={idPO}
                getIdMesin={getIdMesin}
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
      <Dialog
        // fullScreen={
        //   typeMesin === 'MX8600S' ||
        //   typeMesin === 'MX8600' ||
        //   typeMesin === 'MX5600S' ||
        //   typeMesin === 'MX5600' ||
        //   typeMesin === 'MS500' ||
        //   typeMesin === 'MX8000A' ||
        //   typeMesin === 'MV400'
        // }
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className="w-auto" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            {/* kolom */}
            <div className="w-full md:flex grid justify-between gap-5 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-xs md:text-md py-8">
                <div className="">
                  <div
                    className="flex"
                    // sx={{ ml: 2, flex: 1 }}
                    // variant="subtitle1"
                    // component="div"
                  >
                    <div className="md:flex grid grid-cols-3 gap-20">
                      <div className="col-span-2">
                        <div>
                          SN MESIN : {getIdMesin?.snMesin === null ? '-' : getIdMesin?.snMesin}{' '}
                        </div>
                        <div>
                          Model : {dataHeader?.mesin?.type === null ? '-' : dataHeader?.mesin?.type}
                        </div>
                        <div>
                          PN System :{' '}
                          {dataHeader?.part_number === null ? '-' : dataHeader?.part_number}{' '}
                        </div>
                        <div>
                          PIC Datindo:{' '}
                          {dataById?.pic_staging?.name === null ? '-' : dataById?.pic_staging?.name}{' '}
                        </div>
                        <div>
                          Timer : {btnDisableMp400 === false ? dispSecondsAsMins(timer) : time2}
                        </div>
                      </div>
                      <div className="md:hidden">
                        <div>OK : {gAllCount?.data_ok === 0 ? '-' : gAllCount?.data_ok}</div>
                        <div>NG : {gAllCount?.data_ng === 0 ? '-' : gAllCount?.data_ng}</div>
                        <div>N/A : {gAllCount?.data_na === 0 ? '-' : gAllCount?.data_na}</div>
                        <div>Result : {gAllCount?.data_ng === 0 ? 'OK' : 'NG'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                // sx={{ ml: 2, flex: 1 }}
                // variant="subtitle2" component="div"
                >
                  <div className="w-auto">
                    <div className="hidden md:flex">
                      OK : {gAllCount?.data_ok === 0 ? '-' : gAllCount?.data_ok}
                    </div>
                    <div className="hidden md:flex">
                      NG : {gAllCount?.data_ng === 0 ? '-' : gAllCount?.data_ng}
                    </div>
                    <div className="hidden md:flex">
                      N/A : {gAllCount?.data_na === 0 ? '-' : gAllCount?.data_na}
                    </div>
                    <div className="hidden md:flex">
                      Result : {gAllCount?.data_ng === 0 ? 'OK' : 'NG'}
                    </div>
                    <div>Result : {file_name === undefined ? 'O-' : file_name}</div>
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="w-auto md:flex flex md:p-10 p-8 justify-end gap-5 ">
                <div className="justify-end">
                  <div className="justify-end">
                    {jsonExcel?.length !== 0 ? (
                      btnDisable === false ? (
                        <Button
                          color={
                            jsonExcel?.length !== 0 && name !== file_name ? 'success' : 'secondary'
                          }
                          autoFocus
                          variant="contained"
                          onClick={IdModel === 5 ? handleSumbitExcelMV400 : handleSumbitExcel}
                        >
                          Save Excel
                        </Button>
                      ) : (
                        <Button
                          color={
                            jsonExcel?.length !== 0 && name !== file_name ? 'success' : 'secondary'
                          }
                          autoFocus
                          variant="contained"
                          onClick={IdModel === 5 ? handleEditExcelMV400 : handleEditExcel}
                        >
                          Edit Excel
                        </Button>
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <div className="flex m-10 gap-5">
          <TextField
            size="small"
            disabled={
              userRoles === 'GUEST' ||
              userRoles === 'OPERATOR_TSS' ||
              userRoles === 'GUEST_BANK' ||
              userRoles === 'GUEST_DIP' ||
              userRoles === 'GUEST_RELATED' ||
              userRoles === 'OPERATOR_MOVER'
            }
            value={note_description}
            onChange={(e) => setNote_description(e.target.value)}
            fullWidth
            focused
            name="data"
            label="Note"
          />
          {loadingBtnMover === true ? (
            <Button
              variant="contained"
              disabled
              onClick={hanldeSubmitNote}
              autoFocus
              startIcon={<CircularProgress size="2rem" />}
            >
              Loading...
            </Button>
          ) : (
            <Button
              disabled={
                userRoles === 'GUEST' ||
                userRoles === 'OPERATOR_TSS' ||
                userRoles === 'GUEST_BANK' ||
                userRoles === 'GUEST_DIP' ||
                userRoles === 'GUEST_RELATED' ||
                userRoles === 'OPERATOR_MOVER'
              }
              variant="contained"
              onClick={hanldeSubmitNote}
            >
              Submit
            </Button>
          )}
          {IdModel === 5 ? (
            btnDisableMp400 === true ? (
              <Button
                autoFocus
                disabled={
                  userRoles === 'GUEST' ||
                  userRoles === 'OPERATOR_TSS' ||
                  userRoles === 'GUEST_BANK' ||
                  userRoles === 'GUEST_DIP' ||
                  userRoles === 'GUEST_RELATED' ||
                  userRoles === 'OPERATOR_MOVER' ||
                  loadingbtnDisableMp400 === true
                }
                variant="contained"
                onClick={handleEditMV400}
              >
                {loadingbtnDisableMp400 === true ? 'Loading...' : 'Edit'}
              </Button>
            ) : (
              <Button
                autoFocus
                disabled={
                  userRoles === 'GUEST' ||
                  userRoles === 'OPERATOR_TSS' ||
                  userRoles === 'GUEST_BANK' ||
                  userRoles === 'GUEST_DIP' ||
                  userRoles === 'GUEST_RELATED' ||
                  userRoles === 'OPERATOR_MOVER' ||
                  btnDisableMp400 === true ||
                  loadingbtnDisableMp400 === true
                }
                variant="contained"
                onClick={handleSumbitMV400}
              >
                {loadingbtnDisableMp400 === true ? 'Loading...' : 'Save'}
              </Button>
            )
          ) : btnDisableMp400 === true ? (
            <Button
              autoFocus
              disabled={
                userRoles === 'GUEST' ||
                userRoles === 'OPERATOR_TSS' ||
                userRoles === 'GUEST_BANK' ||
                userRoles === 'GUEST_DIP' ||
                userRoles === 'GUEST_RELATED' ||
                userRoles === 'OPERATOR_MOVER' ||
                loadingbtnDisableMp400 === true ||
                loadingBtn === true
              }
              variant="contained"
              onClick={handleEditAllMesinOnePage}
            >
              {loadingBtn === true ? 'Loading...' : 'Edit'}
            </Button>
          ) : (
            <Button
              disabled={
                userRoles === 'GUEST' ||
                userRoles === 'OPERATOR_TSS' ||
                userRoles === 'GUEST_BANK' ||
                userRoles === 'GUEST_DIP' ||
                userRoles === 'GUEST_RELATED' ||
                userRoles === 'OPERATOR_MOVER' ||
                loadingbtnDisableMp400 === true ||
                loadingBtn === true
              }
              autoFocus
              variant="contained"
              onClick={handleSumbitAllMesinOnePage}
            >
              {loadingBtn === true ? 'Loading...' : 'Save'}
            </Button>
          )}
        </div>
        {/* {console.log(modelName?.name, 'MODEL')} */}
        {IdModel === 5 ? (
          <OpenTemplateAllPagesMv400OnePage
            propsFromParrentNew={propsFromParrentNew}
            userRoles={userRoles}
            dataById={dataById}
            getIdMesin={getIdMesin}
            getAllCount={getAllCount}
          />
        ) : (
          <OpenTemplate
            propsFromParrentNew={propsFromParrentNew}
            userRoles={userRoles}
            dataById={dataById}
            getIdMesin={getIdMesin}
            getAllCount={getAllCount}
          />
        )}
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        {loading === true ? (
          <FuseLoading />
        ) : filteredRows.length !== 0 ? (
          <Table
            className={classes.table}
            sx={{ minWidth: 900 }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <div className="text-sm ml-40">
                    <div>
                      <div id="alert-dialog-title">
                        No PO : {dataHeader?.no_po === undefined ? '-' : dataHeader?.no_po}
                      </div>
                      <div id="alert-dialog-title">
                        Customer :{' '}
                        {dataById?.customer?.bank_desc === undefined
                          ? '-'
                          : dataById?.customer?.bank_desc}
                      </div>
                      <div id="alert-dialog-title">
                        Type :
                        {dataHeader?.model?.name === undefined ? '-' : dataHeader?.model?.name}
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                {headCells.map((column) => (
                  <TableCell
                    key={column.id}
                    // align={column.align}
                    align="center"
                    style={{ top: 93, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <StyledTableRow key={row.id}>
                    <TableCell align="center" className={classes?.tableCell}>
                      {row?.idMesin === null ? '-' : row?.idMesin}
                    </TableCell>
                    <TableCell align="center" className={classes?.tableCell}>
                      {row?.snMesin === null ? '-' : row?.snMesin}
                    </TableCell>
                    <TableCell align="center" className={classes?.tableCell}>
                      {row?.time_checklist === null ? '-' : row?.time_checklist}
                    </TableCell>
                    <TableCell align="center" className={classes?.tableCell}>
                      <div className="flex justify-center">
                        <Stack direction="row" className="w-full" spacing={1}>
                          <Tooltip placement="left-start" title="By Staging">
                            <Button
                              variant="contained"
                              className="w-full cursor-pointer"
                              disabled={
                                row?.checklist_staging === false ||
                                userRoles === 'GUEST' ||
                                userRoles === 'GUEST' ||
                                userRoles === 'OPERATOR_TSS' ||
                                userRoles === 'GUEST_RELATED' ||
                                userRoles === 'OPERATOR_MOVER' ||
                                userRoles === 'GUEST_DIP' ||
                                userRoles === 'GUEST_BANK'
                              }
                              onClick={
                                row.checklist_staging === true
                                  ? userRoles !== 'SUPER_ADMIN' &&
                                    userRoles !== 'ADMIN' &&
                                    userRoles !== 'SUPERVISOR'
                                    ? () => handleApprovalAll(row, 'STAGING')
                                    : () => handleClickOpenApprovel(row, 1)
                                  : () => handleNotif(row)
                              }
                              color={
                                row?.data_approval_checklist_staging?.approval_by_staging !==
                                  null &&
                                row?.data_approval_checklist_staging?.approval_by_staging !==
                                  undefined
                                  ? 'success'
                                  : 'primary'
                              }
                            >
                              {row?.data_approval_checklist_staging?.approval_by_staging !== null &&
                              row?.data_approval_checklist_staging?.approval_by_staging !==
                                undefined
                                ? row?.data_approval_checklist_staging?.approval_by_staging?.name
                                    ?.length > 15
                                  ? row?.data_approval_checklist_staging?.approval_by_staging?.name
                                      .slice(0, 15)
                                      .concat(' ', '...')
                                  : row?.data_approval_checklist_staging?.approval_by_staging?.name
                                : 'not yet approved'}
                            </Button>
                          </Tooltip>
                        </Stack>
                      </div>
                    </TableCell>
                    <TableCell align="center" className={classes?.tableCell}>
                      <div className="flex justify-center">
                        <Stack direction="row" className="w-full" spacing={1}>
                          <Tooltip placement="right-end" title="By TSS">
                            <Button
                              variant="contained"
                              disabled={
                                row?.checklist_staging === false ||
                                row?.data_approval_checklist_staging?.approval_by_staging ===
                                  null ||
                                userRoles === 'GUEST' ||
                                userRoles === 'GUEST_RELATED' ||
                                userRoles === 'OPERATOR_DIP' ||
                                userRoles === 'OPERATOR_MOVER' ||
                                userRoles === 'GUEST_DIP' ||
                                userRoles === 'GUEST_BANK'
                              }
                              className="w-full cursor-pointer"
                              onClick={
                                row.checklist_staging === true
                                  ? userRoles !== 'SUPER_ADMIN' &&
                                    userRoles !== 'ADMIN' &&
                                    userRoles !== 'SUPERVISOR'
                                    ? () => handleApprovalAll(row, 'TSS')
                                    : () => handleClickOpenApprovel(row, 2)
                                  : () => handleNotif(row)
                              }
                              label={
                                row?.data_approval_checklist_staging?.approval_by_tss !== null &&
                                row?.data_approval_checklist_staging?.approval_by_tss !== undefined
                                  ? row?.data_approval_checklist_staging?.approval_by_tss?.name
                                      ?.length > 15
                                    ? row?.data_approval_checklist_staging?.approval_by_tss?.name
                                        .slice(0, 15)
                                        .concat(' ', '...')
                                    : row?.data_approval_checklist_staging?.approval_by_tss?.name
                                  : 'not yet approved'
                              }
                              color={
                                row?.data_approval_checklist_staging?.approval_by_tss !== null &&
                                row?.data_approval_checklist_staging?.approval_by_tss !== undefined
                                  ? 'success'
                                  : 'primary'
                              }
                            >
                              {row?.data_approval_checklist_staging?.approval_by_tss !== null &&
                              row?.data_approval_checklist_staging?.approval_by_tss !== undefined
                                ? row?.data_approval_checklist_staging?.approval_by_tss?.name
                                    ?.length > 15
                                  ? row?.data_approval_checklist_staging?.approval_by_tss?.name
                                      .slice(0, 15)
                                      .concat(' ', '...')
                                  : row?.data_approval_checklist_staging?.approval_by_tss?.name
                                : 'not yet approved'}
                            </Button>
                          </Tooltip>
                        </Stack>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <div className="flex justify-center">
                          <div>
                            <IconButton
                              onClick={() => handleClickOpenEdit(row)}
                              color="success"
                              disabled={row?.snMesin === null || IdMesin === 7 || IdMesin === 6}
                              // className="z-9999"
                            >
                              <PlaylistAddIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div>
                            <IconButton
                              onClick={() => handleClickOpenApprovel(row, 3)}
                              color="primary"
                              disabled={
                                row?.checklist_staging === false || userRoles === 'GUEST_RELATED'
                              }
                            >
                              <Tooltip placement="right-end" title="Print">
                                <LocalPrintshopIcon />
                              </Tooltip>
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <div className="text-sm ml-40">
                    <div>
                      <div id="alert-dialog-title">
                        No PO : {dataHeader?.no_po === undefined ? '-' : dataHeader?.no_po}
                      </div>
                      <div id="alert-dialog-title">
                        Customer :
                        {dataHeader?.customer?.bank_desc === undefined
                          ? '-'
                          : dataHeader?.customer?.bank_desc}
                      </div>
                      <div id="alert-dialog-title">
                        Type :
                        {dataHeader?.model?.name === undefined ? '-' : dataHeader?.model?.name}
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                {headCells.map((column) => (
                  <TableCell
                    key={column.id}
                    // align={column.align}
                    align="center"
                    style={{ top: 93, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <StyledTableRow className="w-full">
              <TableCell align="center" className={classes?.tableCellDataEmty}>
                -
              </TableCell>
              <TableCell align="center" className={classes?.tableCellDataEmty}>
                -
              </TableCell>
              <TableCell align="center" className={classes?.tableCellDataEmty}>
                -
              </TableCell>
              <TableCell align="center" className={classes?.tableCellDataEmty}>
                -
              </TableCell>
              <TableCell align="center" className={classes?.tableCellDataEmty}>
                -
              </TableCell>
              <TableCell align="center" className={classes?.tableCellDataEmty}>
                -
              </TableCell>
            </StyledTableRow>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
