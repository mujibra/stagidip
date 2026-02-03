/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
// import * as React from 'react';
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
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseLoading from '@fuse/core/FuseLoading';
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
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { forwardRef, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import HandleUpproveMover from './HandleUpproveMover';
import HandleUpproveMoverDatindo from './HandleUpproveMoverDatindo';
import HandleUpproveTSS from './HandleUpproveTSS';
import { HandlePrint } from './HandlePrint';
import HandleAddTemplate from './HandleAddTemplate';
import HandleEditTemplate from './HandleEditTemplate';

const Transition = forwardRef(function Transition(props, ref) {
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
    id: 'no',
    numeric: true,
    disablePadding: false,
    label: 'Sn Mesin',
    style: 'left',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    style: 'left',
  },
  {
    id: 'approvelMover',
    numeric: true,
    disablePadding: false,
    label: 'Approval Mover',
    style: 'left',
  },
  {
    id: 'approveStaging',
    numeric: true,
    disablePadding: false,
    label: 'Approval Datindo',
    style: 'left',
  },
  {
    id: 'approveTSS',
    numeric: true,
    disablePadding: false,
    label: 'Approval TSS',
    style: 'left',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
    style: 'left',
  },
  {
    id: 'report',
    numeric: true,
    disablePadding: false,
    label: 'Report',
    style: 'left',
  },
];

function createData(
  idMesin,
  snMesin,
  time_preloading,
  testing_inspection,
  data_approval_preloading
) {
  return {
    idMesin,
    snMesin,
    time_preloading,
    testing_inspection,
    data_approval_preloading,
  };
}

export default function HandleTabelShowDetails(props) {
  // console.log(props?.dataById, 'ppp')
  const dataById = props?.dataById;
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  let userRolesName;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
    userRolesName = getUser[0]?.name;
  }
  // const userRoles = props?.userRoles;
  const idPo = props?.dataById.id;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [open, setOpen] = useState(false);
  const [openApprovel, setOpenApprovel] = useState(false);
  const [getIdMesin, setGetIdMesin] = useState('');
  const [IdMesin, setIdMesin] = useState('');
  const [getindexOpen, setGetindexOpen] = useState('');
  const [getmover, setGetmover] = useState('');
  const [snMesin, setSnMesin] = useState('');
  const [getDisable, setGetDisable] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [getPageState, setGetPageState] = useState([]);
  const [getDataForExcel, setGetDataForExcel] = useState([]);
  const [jsonExcel, setJsonExcel] = useState([]);
  const [BodyExcel, setBodyExcel] = useState([]);
  const [getDisabledOkNg, setgetDisabledOkNg] = useState(false);
  const [getDisabledExcel, setgetDisabledExcel] = useState(false);
  const [searched, setSearched] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [triggerTemplate, settriggerTemplate] = useState('template');
  const [filterApprovalBy, setFilterApprovalBy] = useState(null);
  const [filterApproval, setFilterApproval] = useState(null);
  const [openFilterApproval, setOpenFilterApproval] = useState(false);
  const [loadingApproval, setLoadingApproval] = useState(false);
  // console.log(getDisabledExcel, 'getDisabledExcel');
  // console.log(jsonExcel, 'excel');

  const handleClickOpen = (row, indexOpen) => {
    setGetDisable(row.testing_inspection);
    setGetindexOpen(indexOpen);
    setOpen(true);
    setGetIdMesin(row);
    setStart(!start);
  };
  const handleClickOpenApprovel = (row, indexOpen) => {
    setOpenApprovel(true);
    // setGetmover('');
    setGetDisable(row.testing_inspection);
    setGetindexOpen(indexOpen);
    // setOpen(true);
    setGetIdMesin(row);
  };
  // console.log(getIdMesin, 'getIdMesin');
  // console.log(open, 'opemm')

  const handleClose = () => {
    setOpen(false);
    setJsonExcel([]);
    setGetindexOpen('');
    setTimer(0);
    setStart(false);
    clearInterval(tick.current);
    localStorage.removeItem('time_todo');
  };
  const handleCloseApprovel = () => {
    setOpenApprovel(false);
    setGetindexOpen('');
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const idPO = props?.dataById?.id;
  // console.log(idPO, 'ido')
  const [datas, setDatas] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtnMover, setLoadingBtnMover] = useState(false);
  const dispatch = useDispatch();
  const rows = filteredRows?.map((item, index) =>
    createData(
      item?.idMesin,
      item?.snMesin,
      item?.time_preloading,
      item?.testing_inspection,
      item?.data_approval_preloading
    )
  );

  const getData = async () => {
    // setLoading(true);
    if (open === true) {
      setLoading(false);
    } else if (openFilterApproval === true) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}filterDataSNMesinByApprovalPreLoading/${idPO}/${filterApprovalBy}/${filterApproval}`,
        config
      )
      .then((res) => {
        setDatas(res?.data?.data?.dataMesin);
        setGetDisable(res?.data?.data?.dataMesin[0]?.testing_inspection);
        setDataHeader(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDatas([]);
        setLoading(false);
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
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, [filterApproval, filterApprovalBy]);
  const propsFromParrent = (mover, getIdMesin) => {
    setIdMesin(getIdMesin);
    setGetmover(mover);
  };
  let url = '';
  let body = '';
  if (getindexOpen === 1) {
    body = getmover?.id;
    url = 'MOVER';
  } else if (getindexOpen === 0) {
    body = getmover?.id;
    url = 'TSS';
  } else {
    body = getmover?.id;
    url = 'DATINDO';
  }

  useEffect(() => {
    const arryJsonExcel = [];
    if (jsonExcel?.length !== 0) {
      for (let i = 0; i < getPageState?.length; i++) {
        arryJsonExcel.push({
          ...getPageState[i],
          keterangan:
            jsonExcel[i]?.Keterangan?.toString() === undefined
              ? null
              : jsonExcel[i]?.Keterangan?.toString(),
          position:
            jsonExcel[i]?.DiluarDidalam?.toString() === undefined
              ? null
              : jsonExcel[i]?.DiluarDidalam?.toString(),
          quantity:
            jsonExcel[i]?.Jumlah?.toString() === undefined
              ? null
              : jsonExcel[i]?.Jumlah?.toString(),
          status:
            jsonExcel[i]?.OKNG?.toString() === undefined ? null : jsonExcel[i]?.OKNG?.toString(),
        });
        // const element = array[i];
      }
      setBodyExcel(arryJsonExcel);
    }
    //
  }, [jsonExcel]);
  let data = {
    ...getPageState,
  };

  if (jsonExcel?.length !== 0) {
    data = BodyExcel;
  } else {
    data = getPageState;
  }
  // console.log(getIdMesin, 'getIdMesin');

  const handleUpprovel = () => {
    setLoadingBtnMover(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/update-approval/${url}/${idPo}/${IdMesin.idMesin}`,
        { approval_by: body },
        config
      )
      .then((res) => {
        getData();
        setLoadingBtnMover(false);
        setOpenApprovel(false);
        // console.log(res);
        dispatch(
          showMessage({
            message: `Inspeksi Success Approve By ${url}`, // text or html
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
        setOpenApprovel(false);
        setLoadingBtnMover(false);
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
        console.log(err);
      });
  };

  let URL = '';
  if (getindexOpen === 1) {
    URL = `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/`;
  } else {
    URL = `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPo}/${getIdMesin?.idMesin}`;
  }
  // console.log(data, 'data body');
  const handleSubmit = () => {
    const get_timetodo = JSON.parse(localStorage.getItem('time_todo'));

    // if (jsonExcel.length === 0) {
    const data1 = [
      {
        dataArray: data,
        time_todo: get_timetodo,
      },
    ];
    // }
    setloadingSubmit(true);
    if (getindexOpen === 1) {
      axios
        .post(`${URL}`, data1, config)
        .then((res) => {
          setloadingSubmit(false);
          // console.log(res);
          dispatch(
            showMessage({
              message: 'Inspeksi Berhasil Di Tambahkan', // text or html
              autoHideDuration: 6000, // ms
              anchorOrigin: {
                vertical: 'top', // top bottom
                horizontal: 'center', // left center right
              },
              variant: 'success', // success error info warning null
            })
          );
          handleClose();
          setJsonExcel([]);
          getData();
        })
        .catch((err) => {
          setloadingSubmit(false);
          setJsonExcel([]);
          handleClose();
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
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: errStatus === 400 ? 'warning' : 'error',
            })
          );
          console.log(err);
        });
    } else {
      axios
        .put(`${URL}`, getPageState, config)
        .then((res) => {
          setloadingSubmit(false);
          // console.log(res);
          dispatch(
            showMessage({
              message: 'Inspeksi Berhasil Diedit', // text or html
              autoHideDuration: 6000, // ms
              anchorOrigin: {
                vertical: 'top', // top bottom
                horizontal: 'center', // left center right
              },
              variant: 'success', // success error info warning null
            })
          );
          setJsonExcel([]);
          getData();
        })
        .catch((err) => {
          setJsonExcel([]);
          setloadingSubmit(false);
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
              autoHideDuration: 6000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              variant: errStatus === 400 ? 'warning' : 'error',
            })
          );
          console.log(err);
        });
    }
    setloadingSubmit(false);
  };

  const propsFromParrentpageState = (pageState, getDisabled, getData, snMesin, timer1) => {
    setTimer1(timer1);
    setGetPageState(pageState);
    setgetDisabledOkNg(getDisabled);
    setGetDataForExcel(getData);
    setSnMesin(snMesin);
  };
  // console.log(getPageState, 'getPageState');
  // const file_name = `tmp_staging_${details_po?.id}_${file_name}_${id_mesinx}${fileExtension}`
  const file_name = `tmp_preLoading_${snMesin}.xlsx`;

  async function exportToExcel() {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const wb = new Excel.Workbook();
    // const workbook = new Workbook();
    const ws = wb.addWorksheet('Staging_Registrations');
    // const worksheet = wb.getWorksheet('DATA PO');
    // for (let i = 0; i < getDataForExcel?.length; i++) {
    //   ws.getCell(`C${i + 1}`).dataValidation = {
    //     type: 'list',
    //     allowBlank: true,
    //     formulae: ['"OK,NG,N/A"'],
    //   };
    // }

    const headers = [
      { header: 'no', key: 'no', width: 5 },
      { header: 'DescriptionUmum', key: 'DescriptionUmum', width: 50 },
      { header: 'DiluarDidalam', key: 'DiluarDidalam', width: 15 },
      { header: 'Jumlah', key: 'Jumlah', width: 15 },
      { header: 'OKNG', key: 'OKNG', width: 20 },
      { header: 'Keterangan', key: 'Keterangan', width: 15 },
    ];
    ws.columns = headers;
    getDataForExcel?.map((item, index) => {
      ws.addRow([
        ++index,
        item?.general_desc,
        // item?.part_no ? Number(item?.part_no) : null,
        'OUT',
        item?.part_desc,
        'OK',
      ]);
      ws.getCell(`C${index + 1}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${item?.in_out_info?.option}"`],
      };
      ws.getCell(`E${index + 1}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"OK,NG,NA"'],
      };
    });

    const buffer = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buffer], { type: fileType }), file_name);
  }
  let name;

  const handleselectedFile = (e) => {
    const disableOkNg = [];
    if (jsonExcel?.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        disableOkNg.push(jsonExcel[i]?.OKNG?.toString());
      }
      const getDisableOkNg = disableOkNg.includes('NG');
      setgetDisabledExcel(getDisableOkNg);
    }
    // console.log(disableOkNg, 'disableOkNg');

    name = e.target.files[0].name;
    e.preventDefault();
    // console.log(name);

    if (name !== file_name || getDisabledExcel === true || jsonExcel.length !== 0) {
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
          const json = XLSX.utils.sheet_to_json(worksheet);
          setJsonExcel(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
        // handleSubmitBarcode();
      }
    }
  };
  // console.log(jsonExcel, 'json');
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
  // console.log(filteredRows, 'filteredRows');

  const handleSearch = (event) => {
    setSearched(event.target.value);
  };

  const [timer, setTimer] = useState(0); // 25 minutes
  const [timer1, setTimer1] = useState([]);
  // console.log(timer1, 'timerr111')
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

  const handleChange = (event) => {
    settriggerTemplate(event.target.value);
  };

  const handleApprovalAll = (row, approveBy) => {
    setOpenFilterApproval(true);
    setLoadingApproval(true);
    const approveMover = row?.data_approval_preloading?.approval_by_mover;
    const approveStaging = row?.data_approval_preloading?.approval_by_datindo;
    const approveTss = row?.data_approval_preloading?.approval_by_tss;
    // console.log(approveStaging, 'approveStaging');
    // console.log(approveTss, 'approveTss');
    // console.log(approveMover, 'approveMover');
    // console.log(approveBy, 'approveBy');
    const handleApproval = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/update-approval/${approveBy}/${idPo}/${row?.idMesin}`,
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
    } else if (approveMover === null && approveBy === 'MOVER') {
      handleApproval();
    } else if (approveStaging === null && approveBy === 'STAGING' && approveMover !== null) {
      handleApproval();
    } else if (
      approveTss === null &&
      approveBy === 'TSS' &&
      approveMover !== null &&
      approveStaging !== null
    ) {
      handleApproval();
    } else if (approveMover === null && approveStaging === null) {
      dispatch(
        showMessage({
          message: `Movers and Datindo have not been approved`,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'info',
        })
      );
    } else if (approveMover !== null && approveStaging === null) {
      dispatch(
        showMessage({
          message: `Datindo has not been approved`,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'info',
        })
      );
    } else if (approveMover === null && approveStaging !== null) {
      dispatch(
        showMessage({
          message: `Mover has not been approved`,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'info',
        })
      );
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

  // console.log(timer1, 'timer1')
  // console.log(timer, 'timer')
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
                <MenuItem value="DATINDO">Staging</MenuItem>
                <MenuItem value="TSS">TSS</MenuItem>
                <MenuItem value="MOVER">MOVER</MenuItem>
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
      <div className="p-10">
        <TextField
          label="Search"
          value={searched}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          style={{ marginBottom: '10px', marginLeft: '10px' }}
        />
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            {/* kolom */}
            <div className="w-full sm:flex justify-between items-center">
              {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"> */}
              <div className="py-4">
                <div>
                  <div className="md:text-ms text-xs">
                    <div>
                      Customer :{' '}
                      {dataById?.customer?.bank_desc === null ? '-' : dataById?.customer?.bank_desc}
                    </div>
                    <div>
                      Model : {dataHeader?.model?.name === null ? '-' : dataHeader?.model?.name}
                    </div>
                    <div>SN MESIN : {getIdMesin?.snMesin === null ? '-' : getIdMesin?.snMesin}</div>
                    <div>Nama File : {file_name === null ? '-' : file_name}</div>
                    <div>Timer : {timer1 === undefined ? dispSecondsAsMins(timer) : timer1}</div>
                  </div>
                </div>
              </div>
              {/* </Typography> */}
              <div className="flex items-center mt-8 mb-8 md:mb-0 justify-end ">
                <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel className="text-green-A700 z-40" id="demo-select-small-label">
                      Template
                    </InputLabel>
                    <Select
                      className="bg-white"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={triggerTemplate}
                      defaultValue="template"
                      label="Template"
                      onChange={handleChange}
                    >
                      <MenuItem value="default">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="template">Template</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {loadingSubmit === true ? (
                  <Button
                    variant="contained"
                    disabled={getDisable === true || userRoles === 'GUEST'}
                    onClick={handleSubmit}
                    autoFocus
                    startIcon={<CircularProgress size="2rem" />}
                  >
                    Loading...
                  </Button>
                ) : getindexOpen === 1 ? (
                  <div className="flex space-x-2">
                    <Button
                      variant="contained"
                      color="info"
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      onClick={exportToExcel}
                      autoFocus
                    >
                      Download
                    </Button>
                    <Button
                      variant="contained"
                      color={
                        jsonExcel?.length !== 0 && name !== file_name ? 'success' : 'secondary'
                      }
                      type="file"
                      startIcon={<UploadFileIcon />}
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      component="label"
                      autoFocus
                    >
                      {jsonExcel?.length !== 0 && name !== file_name ? 'Uploaded' : 'Upload File'}
                      <input
                        type="file"
                        hidden
                        accept=".xlsx, .xls"
                        onChange={handleselectedFile}
                      />
                      &nbsp;
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={
                        getDisable === true ||
                        getDisabledOkNg === true ||
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      onClick={handleSubmit}
                      autoFocus
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="contained"
                      color="info"
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      onClick={exportToExcel}
                      autoFocus
                    >
                      Download
                    </Button>
                    <Button
                      variant="contained"
                      color={
                        jsonExcel?.length !== 0 && name !== file_name ? 'success' : 'secondary'
                      }
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      component="label"
                      autoFocus
                    >
                      {jsonExcel?.length !== 0 && name !== file_name ? 'Uploaded' : 'Upload File'}
                      <input
                        type="file"
                        hidden
                        accept=".xlsx, .xls"
                        onChange={handleselectedFile}
                      />
                      &nbsp;
                    </Button>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={
                        getDisabledOkNg === true ||
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      onClick={handleSubmit}
                      autoFocus
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {getindexOpen === 1 ? (
          <HandleAddTemplate
            userRoles={userRoles}
            timer={dispSecondsAsMins(timer)}
            propsFromParrentpageState={propsFromParrentpageState}
            getDisable={getDisable}
            handleClickOpen={handleClickOpen}
            getData={getData}
            idPO={idPO}
            dataById={props?.dataById}
            getIdMesin={getIdMesin}
          />
        ) : (
          <HandleEditTemplate
            userRoles={userRoles}
            triggerTemplate={triggerTemplate}
            propsFromParrentpageState={propsFromParrentpageState}
            getDisable={getDisable}
            getData={getData}
            idPO={idPO}
            dataById={props?.dataById}
            getIdMesin={getIdMesin}
          />
        )}
      </Dialog>
      <div>
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
                  label="Approval: By Mover"
                  deleteIcon={<DoneIcon />}
                />
              </div>
            ) : getindexOpen === 0 ? (
              <div>
                <Chip
                  color="primary"
                  variant="outlined"
                  label="Approval: By TSS"
                  deleteIcon={<DoneIcon />}
                />
              </div>
            ) : getindexOpen === 2 ? (
              <div>
                <Chip
                  color="primary"
                  variant="outlined"
                  label="Approval: By Datindo"
                  deleteIcon={<DoneIcon />}
                />
              </div>
            ) : (
              ''
            )}
            <div className={getindexOpen === 3 ? 'w-full' : ''}>
              <Chip
                className={getindexOpen === 3 ? 'w-full' : ''}
                label={`SN-Mesin: ${IdMesin?.snMesin}`}
                deleteIcon={<DoneIcon />}
              />
            </div>
          </DialogTitle>
          <Divider />
          <DialogContent className={getindexOpen === 3 ? 'flex justify-center' : 'mb-72'}>
            <DialogContentText id="alert-dialog-description">
              {getindexOpen === 1 ? (
                <HandleUpproveMover
                  userRoles={userRoles}
                  propsFromParrent={propsFromParrent}
                  getDisable={getDisable}
                  handleClickOpen={handleClickOpen}
                  getData={getData}
                  idPO={idPO}
                  getIdMesin={getIdMesin}
                />
              ) : getindexOpen === 0 ? (
                <HandleUpproveTSS
                  userRoles={userRoles}
                  propsFromParrent={propsFromParrent}
                  getDisable={getDisable}
                  getData={getData}
                  idPO={idPO}
                  getIdMesin={getIdMesin}
                />
              ) : getindexOpen === 2 ? (
                <HandleUpproveMoverDatindo
                  userRoles={userRoles}
                  propsFromParrent={propsFromParrent}
                  getDisable={getDisable}
                  getData={getData}
                  idPO={idPO}
                  getIdMesin={getIdMesin}
                />
              ) : (
                <div>
                  <HandlePrint
                    data={props?.dataById}
                    userRoles={userRoles}
                    propsFromParrent={propsFromParrent}
                    propsFromParrentpageState={propsFromParrentpageState}
                    getDisable={getDisable}
                    getData={getData}
                    idPO={idPO}
                    getIdMesin={getIdMesin}
                  />
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseApprovel}>
              Close
            </Button>
            {getindexOpen !== 3 ? (
              loadingBtnMover === true ? (
                <Button
                  variant="contained"
                  disabled
                  onClick={handleUpprovel}
                  autoFocus
                  startIcon={<CircularProgress size="2rem" />}
                >
                  Loading...
                </Button>
              ) : userRoles === 'ADMIN' || userRoles === 'SUPER_ADMIN' ? (
                <Button
                  variant="contained"
                  // disabled={getmover === '' || userRoles === 'GUEST'}
                  onClick={handleUpprovel}
                  autoFocus
                >
                  {getindexOpen === 1 ? (
                    <div> Approve Mover</div>
                  ) : getindexOpen === 0 ? (
                    <div> Approve TSS</div>
                  ) : getindexOpen === 2 ? (
                    <div> Approve Datindo</div>
                  ) : (
                    ''
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={
                    getmover === '' ||
                    getDisabledOkNg === true ||
                    userRoles === 'GUEST' ||
                    userRoles === 'GUEST_BANK'
                    // userRoles === 'OPERATOR_TSS'
                  }
                  onClick={handleUpprovel}
                  autoFocus
                >
                  {getindexOpen === 1 ? (
                    <div> Approve Mover</div>
                  ) : getindexOpen === 0 ? (
                    <div> Approve TSS</div>
                  ) : getindexOpen === 2 ? (
                    <div> Approve Datindo</div>
                  ) : (
                    ''
                  )}
                </Button>
              )
            ) : (
              ''
            )}
          </DialogActions>
        </Dialog>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        {loading === true ? (
          <FuseLoading />
        ) : filteredRows?.length !== 0 ? (
          <Table
            className={classes.table}
            sx={{ minWidth: 900 }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <div className="text-sm ml-40">
                    <div>
                      <div id="alert-dialog-title">
                        No PO : {dataHeader?.no_po === undefined ? '-' : dataHeader?.no_po}
                      </div>
                      <div id="alert-dialog-title">
                        Customer :
                        {dataById?.customer?.bank_desc === undefined
                          ? '-'
                          : dataById?.customer?.bank_desc}
                      </div>
                      <div id="alert-dialog-title">
                        Model :
                        {dataHeader?.model?.name === undefined ? '-' : dataHeader?.model?.name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell align="center" colSpan={2}>
              Details
            </TableCell> */}
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.idMesin === null ? '-' : row?.idMesin}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.snMesin === null ? '-' : row?.snMesin}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <div>
                            <IconButton
                              onClick={() => handleClickOpen(row, 1)}
                              color="info"
                              disabled={row.testing_inspection === true || row?.snMesin === null}
                              // className="z-9999"
                            >
                              <PlaylistAddIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleClickOpen(row, 2)}
                              color="info"
                              disabled={row.testing_inspection === false}
                              // className="z-9999"
                            >
                              <EditIcon />
                            </IconButton>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        <div className="flex justify-center">
                          <Stack direction="row" className="w-full" spacing={1}>
                            <Tooltip placement="left-start" title="By Mover">
                              <Button
                                variant="contained"
                                className="w-full cursor-pointer"
                                disabled={
                                  row?.testing_inspection === false ||
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_DIP' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_BANK'
                                }
                                onClick={
                                  row.testing_inspection === true
                                    ? userRoles !== 'SUPER_ADMIN' &&
                                      userRoles !== 'ADMIN' &&
                                      userRoles !== 'SUPERVISOR'
                                      ? () => handleApprovalAll(row, 'MOVER')
                                      : () => handleClickOpenApprovel(row, 1)
                                    : () => handleNotif(row)
                                }
                                color={
                                  row?.data_approval_preloading?.approval_by_mover !== null &&
                                  row?.data_approval_preloading?.approval_by_mover !== undefined
                                    ? 'success'
                                    : 'primary'
                                }
                              >
                                {row?.data_approval_preloading?.approval_by_mover !== null &&
                                row?.data_approval_preloading?.approval_by_mover !== undefined
                                  ? row?.data_approval_preloading?.approval_by_mover?.name?.length >
                                    15
                                    ? row?.data_approval_preloading?.approval_by_mover?.name
                                        .slice(0, 15)
                                        .concat(' ', '...')
                                    : row?.data_approval_preloading?.approval_by_mover?.name
                                  : 'not yet approved'}
                              </Button>
                            </Tooltip>
                          </Stack>
                        </div>
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        <div className="flex justify-center">
                          <Stack direction="row" className="w-full" spacing={1}>
                            <Tooltip placement="right-end" title="By Staging">
                              <Button
                                variant="contained"
                                disabled={
                                  row?.testing_inspection === false ||
                                  row?.data_approval_preloading?.approval_by_mover === null ||
                                  userRoles === 'GUEST' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  // userRoles === 'OPERATOR_DIP' ||
                                  userRoles === 'OPERATOR_MOVER' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_BANK'
                                }
                                className="w-full cursor-pointer"
                                onClick={
                                  row.testing_inspection === true
                                    ? userRoles !== 'SUPER_ADMIN' &&
                                      userRoles !== 'ADMIN' &&
                                      userRoles !== 'SUPERVISOR'
                                      ? () => handleApprovalAll(row, 'STAGING')
                                      : () => handleClickOpenApprovel(row, 2)
                                    : () => handleNotif(row)
                                }
                                label={
                                  row?.data_approval_preloading?.approval_by_datindo !== null &&
                                  row?.data_approval_preloading?.approval_by_datindo !== undefined
                                    ? row?.data_approval_preloading?.approval_by_datindo?.name
                                        ?.length > 15
                                      ? row?.data_approval_preloading?.approval_by_datindo?.name
                                          .slice(0, 15)
                                          .concat(' ', '...')
                                      : row?.data_approval_preloading?.approval_by_datindo?.name
                                    : 'not yet approved'
                                }
                                color={
                                  row?.data_approval_preloading?.approval_by_datindo !== null &&
                                  row?.data_approval_preloading?.approval_by_datindo !== undefined
                                    ? 'success'
                                    : 'primary'
                                }
                              >
                                {row?.data_approval_preloading?.approval_by_datindo !== null &&
                                row?.data_approval_preloading?.approval_by_datindo !== undefined
                                  ? row?.data_approval_preloading?.approval_by_datindo?.name
                                      ?.length > 15
                                    ? row?.data_approval_preloading?.approval_by_datindo?.name
                                        .slice(0, 15)
                                        .concat(' ', '...')
                                    : row?.data_approval_preloading?.approval_by_datindo?.name
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
                                  row?.testing_inspection === false ||
                                  row?.data_approval_preloading?.approval_by_mover === null ||
                                  row?.data_approval_preloading?.approval_by_datindo === null ||
                                  userRoles === 'GUEST' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_DIP' ||
                                  userRoles === 'OPERATOR_MOVER' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_BANK'
                                }
                                className="w-full cursor-pointer"
                                onClick={
                                  row.testing_inspection === true
                                    ? userRoles !== 'SUPER_ADMIN' &&
                                      userRoles !== 'ADMIN' &&
                                      userRoles !== 'SUPERVISOR'
                                      ? () => handleApprovalAll(row, 'TSS')
                                      : () => handleClickOpenApprovel(row, 0)
                                    : () => handleNotif(row)
                                }
                                label={
                                  row?.data_approval_preloading?.approval_by_tss !== null &&
                                  row?.data_approval_preloading?.approval_by_tss !== undefined
                                    ? row?.data_approval_preloading?.approval_by_tss?.name?.length >
                                      15
                                      ? row?.data_approval_preloading?.approval_by_tss?.name
                                          .slice(0, 15)
                                          .concat(' ', '...')
                                      : row?.data_approval_preloading?.approval_by_tss?.name
                                    : 'not yet approved'
                                }
                                color={
                                  row?.data_approval_preloading?.approval_by_tss !== null &&
                                  row?.data_approval_preloading?.approval_by_tss !== undefined
                                    ? 'success'
                                    : 'primary'
                                }
                              >
                                {row?.data_approval_preloading?.approval_by_tss !== null &&
                                row?.data_approval_preloading?.approval_by_tss !== undefined
                                  ? row?.data_approval_preloading?.approval_by_tss?.name?.length >
                                    15
                                    ? row?.data_approval_preloading?.approval_by_tss?.name
                                        .slice(0, 15)
                                        .concat(' ', '...')
                                    : row?.data_approval_preloading?.approval_by_tss?.name
                                  : 'not yet approved'}
                              </Button>
                            </Tooltip>
                          </Stack>
                        </div>
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.time_preloading === null ? '-' : row?.time_preloading}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
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
                        </div>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center m-20">
            <div>No Data Available</div>
          </div>
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
