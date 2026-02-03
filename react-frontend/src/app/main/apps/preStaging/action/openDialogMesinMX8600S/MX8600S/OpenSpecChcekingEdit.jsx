/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { Alert, Autocomplete, FormControl, TextField } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import FileUpload from 'react-material-file-upload';
import { Box } from '@mui/system';

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

const columns = [
  { id: 'no', label: 'NO', minWidth: 50 },
  {
    id: 'test',
    label: 'Test',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'expencted',
    label: 'Expected result or result detaild',
    minWidth: 200,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'result',
    label: 'Result',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, detail_staging, result_detail, test_desc) {
  return { id, detail_staging, result_detail, test_desc };
}

export default function OpenSpecChcekingEdit(props) {
  const getIdDivisionMX5600S = props?.getIdDivisionMX5600S;
  const getUser = JSON.parse(localStorage.getItem("user_profile"));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const classes = useStyles();
  const getIdMesinPo = props?.dataById?.mesin?.id;
  const getIdMesin = props?.getIdMesin?.idMesin;
  const getIdDivision = props?.getIdDivision?.id;
  const idPo = props?.dataById?.id;
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dataById = props?.dataById;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  // console.log(data, 'data')
  const [nameHeader, setnameHeader] = useState('');
  const [idDivisi, setidDivisi] = useState('');
  const [result_details, setresult_details] = useState('');
  const [getIdDivisionForParent, setgetIdDivisionForParent] = useState('');
  const [id_checklist_staging, setid_checklist_staging] = useState('');
  const [id_divisi, setid_divisi] = useState('');
  const [results, setresults] = useState(null);
  const [problem, setproblem] = useState(null);
  const [action, setnameaction] = useState(null);
  const [remark, setremark] = useState(null);
  const [fill_columns, setfill_columns] = useState(null);

  const [DataProblem, setDataProblem] = useState([]);
  const [LoadingProblem, setLoadingProblem] = useState(false);
  const [DataBillChecker, setDataBillChecker] = useState([]);
  const [LoadingBillChecker, setLoadingBillChecker] = useState(false);
  const [DataDenomination, setDenomination] = useState([]);
  const [LoadingDenomination, setLoadingDenomination] = useState(false);
  const rows = data?.map((item, index) =>
    createData(item?.id, item?.detail_staging, item?.result_detail, item?.test_desc)
  );

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    setLoading(true);
    setgetIdDivisionForParent(getIdDivision);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPo}/${getIdMesin}/${getIdDivision}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res checking');
        setdata(res?.data?.data[0].checklistStaging);
        setnameHeader(res?.data?.data[0]?.name);
        setidDivisi(res?.data?.data?.id);
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        // props?.handleOpen();
      })
      .catch((err) => {
        setLoading(false);
        console.log('err');
        const errStatus = err.response.status;
        setdata([]);
        // console.log(errStatus, 'errStatus')
        const errMessage = err.response.data.errorMessage;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
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
  const getDataBillChecker = async () => {
    setLoadingBillChecker(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/BILL_CHECKER_UNIT`,
        config
      )
      .then((res) => {
        setDataBillChecker(res?.data?.data);
        setLoadingBillChecker(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingBillChecker(false);
        setDataBillChecker([]);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
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
        console.log(err);
      });
  };
  const getDataDenomination = async () => {
    setLoadingDenomination(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/DENOMINATION`, config)
      .then((res) => {
        setDenomination(res?.data?.data);
        setLoadingDenomination(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingDenomination(false);
        setDenomination([]);
        const errStatus = err.response.status;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
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
        console.log(err);
      });
  };

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      getDataDenomination();
      getDataBillChecker();
      // getDataProblem();
      // getDataAction();
      // getDataDenomination();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const [biosVersion, setBiosVersion] = useState(null);
  const [display, setDisplay] = useState(null);
  const [displayV, setDisplayV] = useState(null);
  const [devSelected, setDevSelected] = useState(null);
  const [devSelected2, setDevSelected2] = useState(null);
  const [devSelected3, setDevSelected3] = useState(null);
  const [devSelected4, setDevSelected4] = useState(null);
  const [devSelected5, setDevSelected5] = useState(null);
  const [devSelected6, setDevSelected6] = useState(null);
  const [devSelected7, setDevSelected7] = useState(null);
  const [dev, setDev] = useState(null);
  const [dev2, setDev2] = useState(null);
  const [dev3, setDev3] = useState(null);
  const [dev4, setDev4] = useState(null);
  const [dev5, setDev5] = useState(null);
  const [dev6, setDev6] = useState(null);
  const [dev7, setDev7] = useState(null);
  const [bcu, setBcu] = useState(data[1]?.detail_staging?.fill_columns);
  const [file, setAttacFile] = useState([]);
  const [encodedData, setencodedData] = useState(null);
  const [getSize, setgetSize] = useState('');
  const [getSizeErr, setgetSizeErr] = useState(0);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} bytes`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    // console.log(bytes, 'bytes');
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  // }
  let fileSize = '';

  useEffect(() => {
    if (file[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (e) => {
        const tes = reader.result;
        setencodedData(tes);
      };
      fileSize = file[0].size;
      setgetSizeErr(fileSize);
      if (fileSize > 2097152) {
        dispatch(
          showMessage({
            message: 'Size Img Minimal 2MB!!',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'warning',
          })
        );
      }
      const formattedSize = formatFileSize(fileSize);
      setgetSize(formattedSize);
    }
  }, [file[0], fileSize]);

  const body = {
    id_po: idPo,
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
  // console.log(dev, 'dev?.id');
  useEffect(() => {
    setDev(devSelected);
    setDev2(devSelected2);
    setDev3(devSelected3);
    setDev4(devSelected4);
    setDev5(devSelected5);
    setDev6(devSelected6);
    setDev7(devSelected7);
  }, [
    devSelected,
    devSelected2,
    devSelected3,
    devSelected4,
    devSelected5,
    devSelected6,
    devSelected7,
  ]);

  const [pageState, setPageState] = useState([]);
  useEffect(() => {
    const arr = [];
    setDevSelected(data[2]?.detail_staging?.fill_columns[0]);
    setDevSelected2(data[2]?.detail_staging?.fill_columns[1]);
    setDevSelected3(data[2]?.detail_staging?.fill_columns[2]);
    setDevSelected4(data[2]?.detail_staging?.fill_columns[3]);
    setDevSelected5(data[2]?.detail_staging?.fill_columns[4]);
    setDevSelected6(data[2]?.detail_staging?.fill_columns[5]);
    setDevSelected7(data[2]?.detail_staging?.fill_columns[6]);
    for (let i = 0; i < data.length; i++) {
      {
        getIdDivisionMX5600S === 18 || getIdDivisionMX5600S === 2 || getIdDivisionMX5600S === 90
          ? // getIdDivisionMX5600S === 51
            i === 0
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns:
                  biosVersion === null ? data[i]?.detail_staging?.fill_columns : biosVersion,
              })
            : i === 1
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns:
                  display === null ? data[i]?.detail_staging?.fill_columns : [displayV, display],
              })
            : i === 2
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns: [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id],
                // fill_columns:
                //   dev === null
                //     ? data[i]?.detail_staging?.fill_columns[0]
                //     : [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id],
              })
            : i === 3
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns:
                  encodedData === null ? data[i]?.detail_staging?.fill_columns : encodedData,
              })
            : null
          : getIdDivisionMX5600S === 76 || getIdDivisionMX5600S === 51
          ? i === 0
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns:
                  biosVersion === null ? data[i]?.detail_staging?.fill_columns : biosVersion,
              })
            : i === 1
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns:
                  display === null ? data[i]?.detail_staging?.fill_columns : [displayV, display],
              })
            : i === 2
            ? getIdDivisionMX5600S === 51
              ? arr.push({
                  ...body,
                  // id_inspeksi: i + 1,
                  result_details: data[i]?.result_detail,
                  id_checklist_staging: data[i]?.id,
                  id_divisi: idDivisi,
                  results: null,
                  problem: null,
                  action: null,
                  remark: null,
                  fill_columns: [
                    dev?.id,
                    dev2?.id,
                    dev3?.id,
                    dev4?.id,
                    dev5?.id,
                    // dev6?.id,
                    // dev7?.id,
                  ],
                  // fill_columns:
                  //   dev === null
                  //     ? data[i]?.detail_staging?.fill_columns
                  //     : [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id, dev6?.id, dev7?.id],
                })
              : arr.push({
                  ...body,
                  // id_inspeksi: i + 1,
                  result_details: data[i]?.result_detail,
                  id_checklist_staging: data[i]?.id,
                  id_divisi: idDivisi,
                  results: null,
                  problem: null,
                  action: null,
                  remark: null,
                  fill_columns: [
                    dev?.id,
                    dev2?.id,
                    dev3?.id,
                    dev4?.id,
                    dev5?.id,
                    dev6?.id,
                    dev7?.id,
                  ],
                  // fill_columns:
                  //   dev === null
                  //     ? data[i]?.detail_staging?.fill_columns
                  //     : [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id, dev6?.id, dev7?.id],
                })
            : i === 3
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns: bcu === null ? data[i]?.detail_staging?.fill_columns : bcu?.id,
              })
            : i === 4
            ? arr.push({
                ...body,
                // id_inspeksi: i + 1,
                result_details: data[i]?.result_detail,
                id_checklist_staging: data[i]?.id,
                id_divisi: idDivisi,
                results: null,
                problem: null,
                action: null,
                remark: null,
                fill_columns:
                  encodedData === null ? data[i]?.detail_staging?.fill_columns : encodedData,
              })
            : null
          : i === 0
          ? arr.push({
              ...body,
              // id_inspeksi: i + 1,
              result_details: data[i]?.result_detail,
              id_checklist_staging: data[i]?.id,
              id_divisi: idDivisi,
              results: null,
              problem: null,
              action: null,
              remark: null,
              fill_columns:
                biosVersion === null ? data[i]?.detail_staging?.fill_columns : biosVersion,
            })
          : i === 1
          ? arr.push({
              ...body,
              // id_inspeksi: i + 1,
              result_details: data[i]?.result_detail,
              id_checklist_staging: data[i]?.id,
              id_divisi: idDivisi,
              results: null,
              problem: null,
              action: null,
              remark: null,
              fill_columns:
                display === null ? data[i]?.detail_staging?.fill_columns : [displayV, display],
            })
          : i === 2
          ? arr.push({
              ...body,
              // id_inspeksi: i + 1,
              result_details: data[i]?.result_detail,
              id_checklist_staging: data[i]?.id,
              id_divisi: idDivisi,
              results: null,
              problem: null,
              action: null,
              remark: null,
              fill_columns: [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id, dev6?.id],
              // fill_columns:
              //   dev === null
              //     ? data[i]?.detail_staging?.fill_columns[0]
              //     : [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id, dev6?.id],
            })
          : i === 3
          ? arr.push({
              ...body,
              // id_inspeksi: i + 1,
              result_details: data[i]?.result_detail,
              id_checklist_staging: data[i]?.id,
              id_divisi: idDivisi,
              results: null,
              problem: null,
              action: null,
              remark: null,
              fill_columns: bcu === null ? data[i]?.detail_staging?.fill_columns : bcu?.id,
            })
          : i === 4
          ? arr.push({
              ...body,
              // id_inspeksi: i + 1,
              result_details: data[i]?.result_detail,
              id_checklist_staging: data[i]?.id,
              id_divisi: idDivisi,
              results: null,
              problem: null,
              action: null,
              remark: null,
              fill_columns:
                encodedData === null ? data[i]?.detail_staging?.fill_columns : encodedData,
            })
          : null;
        // console.log(arr, 'arr');
      }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [
    data,
    idDivisi,
    encodedData,
    biosVersion,
    displayV,
    display,
    dev,
    dev2,
    dev3,
    dev4,
    dev5,
    dev6,
    dev7,
    bcu,
  ]);
  // console.log(pageState, 'pageState');

  props.pullData(pageState, getIdDivisionForParent);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        {loading === true ? (
          <FuseLoading />
        ) : data.length !== 0 ? (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  {nameHeader}
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
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
                    <>
                      <StyledTableRow>
                        <TableCell align="center" className={classes?.tableCell}>
                          {index + 1}.)
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.test_desc === null ? '-' : row?.test_desc}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.result_detail === null ? '-' : row?.result_detail}
                        </TableCell>
                        {index === 0 ? (
                          <TableCell align="center" className={classes?.tableCell}>
                            <TextField
                              fullWidth
                              disabled={
                                userRoles === 'GUEST' ||
                                userRoles === 'OPERATOR_TSS' ||
                                userRoles === 'GUEST_BANK' ||
                                userRoles === 'GUEST_DIP' ||
                                userRoles === 'GUEST_RELATED' ||
                                userRoles === 'OPERATOR_MOVER'
                              }
                              value={biosVersion}
                              defaultValue={
                                data[0]?.detail_staging?.fill_columns === null
                                  ? null
                                  : data[0]?.detail_staging?.fill_columns
                              }
                              onChange={(e) => setBiosVersion(e.target.value)}
                              // onChange={(e) => {
                              //   handleBiosVersion(e, index, row);
                              // }}
                              label="M/S Bios Version"
                            />
                          </TableCell>
                        ) : index === 1 ? (
                          <TableCell align="center" className={classes?.tableCell}>
                            <div className="flex gap-5">
                              <TextField
                                fullWidth
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                value={displayV}
                                defaultValue={
                                  data[1]?.detail_staging?.fill_columns === null
                                    ? null
                                    : data[1]?.detail_staging?.fill_columns[0]
                                }
                                onChange={(e) => setDisplayV(e.target.value)}
                                // onChange={(e) => {
                                //   handleDisplay(e, index, row);
                                // }}
                                label="V"
                              />
                              <TextField
                                fullWidth
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                value={display}
                                defaultValue={
                                  data[1]?.detail_staging?.fill_columns === null
                                    ? null
                                    : data[1]?.detail_staging?.fill_columns[1]
                                }
                                onChange={(e) => setDisplay(e.target.value)}
                                // onChange={(e) => {
                                //   handleDisplay(e, index, row);
                                // }}
                                label="Display"
                              />
                            </div>
                          </TableCell>
                        ) : index === 2 ? (
                          <TableCell align="center" className={classes?.tableCell}>
                            {getIdDivisionMX5600S === 18 ||
                            getIdDivisionMX5600S === 2 ||
                            getIdDivisionMX5600S === 90 ||
                            getIdDivisionMX5600S === 51 ? (
                              <div className="flex gap-10 justify-between">
                                <div>
                                  <Autocomplete
                                    disablePortal
                                    value={dev}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    options={DataDenomination}
                                    fullWidth
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    loading={LoadingDenomination === true}
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[0]
                                    }
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev(newValue);
                                      }
                                    }}
                                    id="combo-box-demo"
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev1"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev2}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev2(newValue);
                                      }
                                    }}
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[1]
                                    }
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev2"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth

                                    value={dev3}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[2]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev3(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev3"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev4}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[3]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev4(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev4"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev5}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[4]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev5(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev5"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            ) : getIdDivisionMX5600S === 76 ? (
                              <div className="flex gap-10 justify-between">
                                <div>
                                  <Autocomplete
                                    disablePortal
                                    value={dev}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    options={DataDenomination}
                                    fullWidth
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    loading={LoadingDenomination === true}
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[0]
                                    }
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev(newValue);
                                      }
                                    }}
                                    id="combo-box-demo"
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev1"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    value={dev2}
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev2(newValue);
                                      }
                                    }}
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[1]
                                    }
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev2"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth

                                    value={dev3}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[2]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev3(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev3"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev4}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[3]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev4(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev4"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev5}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[4]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev5(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev5"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    value={dev6}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[5]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev6(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev6"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    value={dev7}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[6]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev7(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev7"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex gap-10 justify-between">
                                <div>
                                  <Autocomplete
                                    disablePortal
                                    value={dev}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    options={DataDenomination}
                                    fullWidth
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    loading={LoadingDenomination === true}
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[0]
                                    }
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev(newValue);
                                      }
                                    }}
                                    id="combo-box-demo"
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev1"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev2}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev2(newValue);
                                      }
                                    }}
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[1]
                                    }
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev2"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth

                                    value={dev3}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[2]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev3(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev3"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev4}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[3]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev4(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev4"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    // fullWidth
                                    value={dev5}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[4]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev5(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev5"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Autocomplete
                                    value={dev6}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    defaultValue={
                                      data[index]?.detail_staging?.fill_columns === null
                                        ? null
                                        : data[index]?.detail_staging?.fill_columns[5]
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev6(newValue);
                                      }
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DataDenomination}
                                    loading={LoadingDenomination === true}
                                    sx={{ width: 102 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Dev6"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: <>{params.InputProps.endAdornment}</>,
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            )}
                          </TableCell>
                        ) : index === 3 ? (
                          <TableCell align="center" className={classes?.tableCell}>
                            {getIdDivisionMX5600S === 18 ||
                            getIdDivisionMX5600S === 2 ||
                            getIdDivisionMX5600S === 90 ? (
                              <>
                                {getIdDivisionMX5600S === 18 ||
                                getIdDivisionMX5600S === 2 ||
                                getIdDivisionMX5600S === 90 ? (
                                  <img
                                    src={data[3]?.detail_staging?.fill_columns}
                                    alt="Gambar Kosong"
                                  />
                                ) : (
                                  <img
                                    src={data[4]?.detail_staging?.fill_columns}
                                    alt="Gambar Kosong"
                                  />
                                )}
                                <div className="m-10  flex justify-center">
                                  <div>Size Gambar = {getSize === 0 ? '-' : getSize}</div>
                                </div>
                                <div className="mb-10">
                                  {getSizeErr > 2097152 ? (
                                    <Alert severity="warning">
                                      {' '}
                                      Gambar Tidak Boleh Lebih dari 2MB!
                                    </Alert>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                <FileUpload
                                  value={file}
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  // onChange={(e) => setAttacFile(e.target.files[0])}
                                  onChange={setAttacFile}
                                  // onChange={(e) => {
                                  //   handleAttacFile(e, index, row);
                                  // }}
                                  size="small"
                                  label="attach here the vesion"
                                />
                              </>
                            ) : (
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                  <div className="w-full">
                                    <Autocomplete
                                      fullWidth
                                      disabled={
                                        userRoles === 'GUEST' ||
                                        userRoles === 'OPERATOR_TSS' ||
                                        userRoles === 'GUEST_BANK' ||
                                        userRoles === 'GUEST_DIP' ||
                                        userRoles === 'GUEST_RELATED' ||
                                        userRoles === 'OPERATOR_MOVER'
                                      }
                                      value={bcu}
                                      defaultValue={
                                        data[3]?.detail_staging?.fill_columns === null
                                          ? bcu
                                          : data[3]?.detail_staging?.fill_columns
                                      }
                                      getOptionLabel={(n) => n.description}
                                      getOptionSelected={(option) => option?.id}
                                      onChange={(event, newValue) => {
                                        if (newValue) {
                                          setBcu(newValue);
                                        }
                                      }}
                                      disablePortal
                                      id="combo-box-demo"
                                      options={DataBillChecker}
                                      loading={LoadingBillChecker === true}
                                      sx={{ width: 102 }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="BCU"
                                          InputProps={{
                                            ...params.InputProps,
                                            endAdornment: <>{params.InputProps.endAdornment}</>,
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </FormControl>
                              </Box>
                            )}
                          </TableCell>
                        ) : index === 4 ? (
                          <TableCell align="center" className={classes?.tableCell}>
                            <>
                              {getIdDivisionMX5600S === 18 || getIdDivisionMX5600S === 2 ? (
                                <img
                                  src={data[3]?.detail_staging?.fill_columns}
                                  alt="Gambar Kosong"
                                />
                              ) : (
                                <img
                                  src={data[4]?.detail_staging?.fill_columns}
                                  alt="Gambar Kosong"
                                />
                              )}
                              <div className="m-10  flex justify-center">
                                <div>Size Gambar = {getSize === 0 ? '-' : getSize}</div>
                              </div>
                              <div className="mb-10">
                                {getSizeErr > 2097152 ? (
                                  <Alert severity="warning">
                                    {' '}
                                    Gambar Tidak Boleh Lebih dari 2MB!
                                  </Alert>
                                ) : (
                                  ''
                                )}
                              </div>
                              <FileUpload
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                value={file}
                                onChange={setAttacFile}
                                size="small"
                                label="attach here the vesion"
                              />
                            </>
                          </TableCell>
                        ) : (
                          <div>Something Error!!</div>
                        )}
                      </StyledTableRow>
                    </>
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
        rowsPerPageOptions={[15, 25, 100]}
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
