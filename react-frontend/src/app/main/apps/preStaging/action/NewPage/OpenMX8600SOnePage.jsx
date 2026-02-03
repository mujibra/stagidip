/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import FileUpload from 'react-material-file-upload';
import { Box } from '@mui/system';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken}`,
  },
};
const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
let userRolesId;
if (getUser) {
  userRoles = getUser[0]?.roles;
  userRolesId = getUser[0]?.id;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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

function createData(id, name, test_desc, result_detail, detail_staging) {
  return { id, name, test_desc, result_detail, detail_staging };
}

export default function OpenMX8600SOnePage(props) {
  //   console.log(props, 'props');
  const idPO = props?.dataById?.id;
  const getIdMesin = props?.getIdMesin;
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datasDetailPO, setDetailPO] = useState([]);
  const [id_po, setid_po] = useState(null);
  const [no_mesin, setno_mesin] = useState(null);
  const [results, setresults] = useState('');
  const [sn_mesin, setsn_mesin] = useState(null);
  const [result_details, setresult_detail] = useState('');
  const [id_classification, setnameid_classification] = useState(null);
  const [id_checklist_staging, setid_checklist_staging] = useState(null);
  const [status_checklist, setstatus_checklist] = useState(true);

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [DataProblem, setDataProblem] = useState([]);
  const [LoadingProblem, setLoadingProblem] = useState(false);
  const [DataAction, setDataAction] = useState([]);
  const [LoadingAction, setLoadingAction] = useState(false);
  const [DataRemake, setDataRemake] = useState([]);
  const [LoadingRemake, setLoadingRemake] = useState(false);

  const [dev, setDev] = useState(null);
  const [dev2, setDev2] = useState(null);
  const [dev3, setDev3] = useState(null);
  const [dev4, setDev4] = useState(null);
  const [dev5, setDev5] = useState(null);
  const [dev6, setDev6] = useState(null);
  const [dev7, setDev7] = useState(null);
  const [biosVersion, setBiosVersion] = useState(null);
  const [display, setDisplay] = useState(null);
  const [displayV, setDisplayV] = useState(null);
  const [displaySelected, setDisplaySelected] = useState(null);
  const [displayVSelected, setDisplayVSelected] = useState(null);
  const [devSelected, setDevSelected] = useState(null);
  const [devSelected2, setDevSelected2] = useState(null);
  const [devSelected3, setDevSelected3] = useState(null);
  const [devSelected4, setDevSelected4] = useState(null);
  const [devSelected5, setDevSelected5] = useState(null);
  const [devSelected6, setDevSelected6] = useState(null);
  const [devSelected7, setDevSelected7] = useState(null);
  const [bcu, setBcu] = useState(null);
  const [bcuSelected, setBcuSelected] = useState(null);
  // console.log(dev, 'dev')
  const [file, setAttacFile] = useState([]);
  const [encodedData, setencodedData] = useState(null);
  const [getSize, setgetSize] = useState('');
  const [getSizeErr, setgetSizeErr] = useState(0);

  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);
  const [hour2, setHour2] = useState(null);
  const [minute2, setMinute2] = useState(null);
  const [second2, setSecond2] = useState(null);
  const [selectedHour, setselectedHour] = useState(null);
  const [selectedMinute, setselectedMinute] = useState(null);
  const [selectedSecond, setselectedSecond] = useState(null);
  const [selectedHour2, setselectedHour2] = useState(null);
  const [selectedMinute2, setselectedMinute2] = useState(null);
  const [selectedSecond2, setselectedSecond2] = useState(null);

  const [DataDenomination, setDenomination] = useState([]);
  const [LoadingDenomination, setLoadingDenomination] = useState(false);
  const [DataBillChecker, setDataBillChecker] = useState([]);
  const [LoadingBillChecker, setLoadingBillChecker] = useState(false);
  const [id_divisi, setid_divisi] = useState('');
  const [problem, setproblem] = useState(null);
  const [action, setaction] = useState(null);
  const [remark, setremark] = useState(null);
  const [fill_columns, setfill_columns] = useState(null);
  const getIdMesinPo = props?.dataById?.mesin?.id;
  const dataHeader = props?.dataById?.mesin?.type;

  const getDataProblem = async () => {
    setLoadingProblem(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/PROBLEM`, config)
      .then((res) => {
        // console.log(res, 'res');
        setDataProblem(res?.data?.data);
        setLoadingProblem(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingProblem(false);
        setDataProblem([]);
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
        console.log(err);
      });
  };
  const getDataAction = async () => {
    setLoadingAction(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/ACTION`, config)
      .then((res) => {
        setDataAction(res?.data?.data);
        setLoadingAction(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingAction(false);
        setDataAction([]);
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
        console.log(err);
      });
  };
  const getDataRemake = async () => {
    setLoadingRemake(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListOptions/REMARK`, config)
      .then((res) => {
        setDataRemake(res?.data?.data);
        setLoadingRemake(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingRemake(false);
        setDataRemake([]);
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
        console.log(err);
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
        console.log(err);
      });
  };
  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'idProblem':
        getDataProblem();
        // props.getDataPoById();
        break;
      case 'idAction':
        getDataAction();
        break;
      case 'idRemake':
        getDataRemake();
        break;
      case 'idBillChecker':
        getDataBillChecker();
        break;
      case 'idDenomination':
        getDataDenomination();
        break;
      default:
    }
  };
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

  const getData = async () => {
    // if (open === false) {
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    // }
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingReport/v2/${idPO}/${getIdMesin?.idMesin}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setstatus_checklist(res?.data.status_checklist_staging);
        setDatas(res?.data?.data);
        setDetailPO(res?.data?.data?.detail_po);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        setDatas([]);
        setDetailPO([]);
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
    getData();
  }, []);

  const rows = datas?.map((item, index) =>
    createData(item?.id, item?.name, item?.test_desc, item?.result_detail, item?.detail_staging)
  );

  const [pageState, setPageState] = useState([]);
  const handleInOut = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.results = e.target.value;
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleFillColomns = (e, index, multi = false, idxMulti = 0, name) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      if (multi === true && name === 'biosVersion') {
        copyObject.fill_columns = e.target.value;
      } else if (multi === true && name === 'V') {
        copyObject.fill_columns[idxMulti] = e.target.value;
      } else if (multi === true && name === 'Display') {
        copyObject.fill_columns[idxMulti] = e.target.value;
      } else if (multi === true && name === 'hour') {
        copyObject.fill_columns[idxMulti] = e.target.value;
      } else if (multi === true && name === 'bcu') {
        copyObject.fill_columns = e;
      } else {
        copyObject.fill_columns[idxMulti] = e;
      }
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleProblem = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.problem = newValue?.id;
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleAction = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.action = newValue?.id;
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleRemake = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.remark = newValue?.id;
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const body = {
    id_po,
    sn_mesin,
    no_mesin,
    id_divisi,
    result_details,
    id_checklist_staging,
    results,
    problem,
    action,
    remark,
    fill_columns,
  };
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < datas.length; i++) {
      arr.push({
        ...body,
        results:
          datas[i]?.detail_staging?.results === null ? 'OK' : datas[i]?.detail_staging?.results,
        id_po: idPO,
        sn_mesin: getIdMesin?.snMesin,
        no_mesin: getIdMesin?.idMesin,
        id_divisi: datas[i]?.id_divisi,
        id_checklist_staging: datas[i]?.id,
        result_details: datas[i]?.result_detail,
        problem:
          datas[i]?.detail_staging?.problem?.id === undefined
            ? null
            : datas[i]?.detail_staging?.problem?.id,
        action:
          datas[i]?.detail_staging?.action?.id === undefined
            ? null
            : datas[i]?.detail_staging?.action?.id,
        remark:
          datas[i]?.detail_staging?.remark?.id === undefined
            ? null
            : datas[i]?.detail_staging?.remark?.id,
        fill_columns:
          i === 10
            ? biosVersion === null
              ? datas[i]?.detail_staging?.fill_columns
              : biosVersion
            : i === 11
            ? [
                datas[i]?.detail_staging?.fill_columns === null
                  ? displayV
                  : datas[i]?.detail_staging?.fill_columns[0],
                datas[i]?.detail_staging?.fill_columns === null
                  ? display
                  : datas[i]?.detail_staging?.fill_columns[1],
              ]
            : i === 12
            ? [
                datas[i]?.detail_staging?.fill_columns === null
                  ? dev
                  : datas[i]?.detail_staging?.fill_columns[0]?.id === undefined
                  ? null
                  : datas[i]?.detail_staging?.fill_columns[0]?.id,
                datas[i]?.detail_staging?.fill_columns === null
                  ? dev2
                  : datas[i]?.detail_staging?.fill_columns[1]?.id === undefined
                  ? null
                  : datas[i]?.detail_staging?.fill_columns[1]?.id,
                datas[i]?.detail_staging?.fill_columns === null
                  ? dev3
                  : datas[i]?.detail_staging?.fill_columns[2]?.id === undefined
                  ? null
                  : datas[i]?.detail_staging?.fill_columns[2]?.id,
                datas[i]?.detail_staging?.fill_columns === null
                  ? dev4
                  : datas[i]?.detail_staging?.fill_columns[3]?.id === undefined
                  ? null
                  : datas[i]?.detail_staging?.fill_columns[3]?.id,
                datas[i]?.detail_staging?.fill_columns === null
                  ? dev5
                  : datas[i]?.detail_staging?.fill_columns[4]?.id === undefined
                  ? null
                  : datas[i]?.detail_staging?.fill_columns[4]?.id,
              ]
            : i === 13
            ? bcu === null
              ? datas[i]?.detail_staging?.fill_columns?.id === undefined
                ? null
                : datas[i]?.detail_staging?.fill_columns?.id
              : bcu
            : i === 14
            ? encodedData === null
              ? datas[i]?.detail_staging?.fill_columns
              : encodedData
            : i === 17
            ? [
                datas[i]?.detail_staging?.fill_columns === null
                  ? hour
                  : datas[i]?.detail_staging?.fill_columns[0],
                datas[i]?.detail_staging?.fill_columns === null
                  ? minute
                  : datas[i]?.detail_staging?.fill_columns[1],
                datas[i]?.detail_staging?.fill_columns === null
                  ? second
                  : datas[i]?.detail_staging?.fill_columns[2],
              ]
            : i === 18
            ? [
                datas[i]?.detail_staging?.fill_columns === null
                  ? hour2
                  : datas[i]?.detail_staging?.fill_columns[0],
                datas[i]?.detail_staging?.fill_columns === null
                  ? minute2
                  : datas[i]?.detail_staging?.fill_columns[1],
                datas[i]?.detail_staging?.fill_columns === null
                  ? second2
                  : datas[i]?.detail_staging?.fill_columns[2],
              ]
            : null,
      });
    }
    // console.log(datas, 'data');

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [datas, getIdMesin?.idMesin]);
  useEffect(() => {
    if (pageState.length !== 0) {
      const objIndex = pageState.findIndex(
        (obj) =>
          obj.id_checklist_staging === 139 ||
          obj.id_checklist_staging === 233 ||
          obj.id_checklist_staging === 289
      );
      pageState[objIndex].fill_columns =
        encodedData === null ? datas[14]?.detail_staging?.fill_columns : encodedData;
    }
  }, [encodedData, pageState, datas]);

  props?.propsFromParrentNew(pageState, getIdMesin, status_checklist, loading, datas);

  if (loading === true) {
    return <FuseLoading />;
  }
  // console.log(DataDenomination, 'DataDenomination');

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="sticky top-0 z-10">
          <TableRow>
            <StyledTableCell>NO</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Test</StyledTableCell>
            <StyledTableCell>Expected result or result details</StyledTableCell>
            <StyledTableCell align="center">Result </StyledTableCell>
            <StyledTableCell align="right">Problem </StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
            <StyledTableCell align="right">Remake</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow
              className={row?.name !== null ? 'bg-green-50' : row?.name}
              key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}.)
              </StyledTableCell>
              <StyledTableCell className="w-3" component="th" scope="row">
                {row?.name === null ? '-' : row?.name}
              </StyledTableCell>
              <StyledTableCell className="w-5">{row?.test_desc}</StyledTableCell>
              <StyledTableCell className="w-5" component="th" scope="row">
                {row?.result_detail}
              </StyledTableCell>
              {index === 10 ? (
                <>
                  <StyledTableCell className="w-10" align="center">
                    {/* {console.log(biosVersion)} */}
                    <TextField
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      value={biosVersion}
                      // onChange={(e) => setBiosVersion(e.target.value)}
                      onChange={(e) => {
                        handleFillColomns(e, index, true, 0, 'biosVersion');
                      }}
                      defaultValue={
                        row.detail_staging?.fill_columns === null
                          ? biosVersion
                          : row?.detail_staging?.fill_columns
                      }
                      label="M/S Bios Version"
                    />
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : index === 11 ? (
                <>
                  <StyledTableCell align="center">
                    <div className="flex gap-5 justify-between">
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        fullWidth
                        value={displayV}
                        defaultValue={
                          row?.detail_staging?.fill_columns === null
                            ? displayV
                            : row?.detail_staging?.fill_columns[0]
                        }
                        // onChange={(e) => {
                        //   handleInOut(e, index, true, 0);
                        //   setDisplayV(e.target.value);
                        // }}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 0, 'V');
                        }}
                        label="V"
                      />
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        fullWidth
                        value={display}
                        // onChange={(e) => {
                        //   handleInOut(e, index, true, 1);
                        //   setDisplay(e.target.value);
                        // }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? display
                            : row?.detail_staging?.fill_columns[1]
                        }
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 1, 'Display');
                        }}
                        label="Display"
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : index === 12 ? (
                <>
                  <StyledTableCell align="center">
                    <div className="flex gap-10 justify-between">
                      {/* {console.log(dev, 'devs')} */}
                      <div>
                        <Autocomplete
                          disablePortal
                          value={row.fill_columns}
                          id="idDenomination"
                          onFocus={handleFocus}
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
                          // isOptionEqualToValue={(option, value) => option.id === value}
                          // getOptionSelected={(option, value) => option.id === value.id }
                          // getOptionSelected={(option) => option?.description}
                          getOptionSelected={(option) => option?.id}
                          loading={LoadingDenomination === true}
                          defaultValue={
                            row.detail_staging?.fill_columns === null
                              ? dev
                              : row?.detail_staging?.fill_columns[0]
                          }
                          onChange={(e, newValue) => {
                            if (newValue) {
                              handleFillColomns(newValue?.id, index, true, 0, 'dev');
                            }
                          }}
                          // id="combo-box-demo"
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: 80 }}
                              size="small"
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
                          id="idDenomination"
                          // value={dev2}
                          value={row.fill_columns}
                          onFocus={handleFocus}
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
                          onChange={(e, newValue) => {
                            handleFillColomns(newValue?.id, index, true, 1, 'dev');
                          }}
                          defaultValue={
                            row.detail_staging?.fill_columns === null
                              ? dev2
                              : row?.detail_staging?.fill_columns[1]
                          }
                          disablePortal
                          // id="combo-box-demo"
                          options={DataDenomination}
                          loading={LoadingDenomination === true}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: 80 }}
                              size="small"
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
                          id="idDenomination"
                          // value={dev3}
                          value={row.fill_columns}
                          onFocus={handleFocus}
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
                          defaultValue={
                            row.detail_staging?.fill_columns === null
                              ? dev3
                              : row?.detail_staging?.fill_columns[2]
                          }
                          onChange={(e, newValue) => {
                            handleFillColomns(newValue?.id, index, true, 2, 'dev');
                          }}
                          disablePortal
                          // id="combo-box-demo"
                          options={DataDenomination}
                          loading={LoadingDenomination === true}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: 80 }}
                              size="small"
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
                          // value={dev4}
                          value={row.fill_columns}
                          id="idDenomination"
                          onFocus={handleFocus}
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
                          defaultValue={
                            row.detail_staging?.fill_columns === null
                              ? dev4
                              : row?.detail_staging?.fill_columns[3]
                          }
                          onChange={(e, newValue) => {
                            handleFillColomns(newValue?.id, index, true, 3, 'dev');
                          }}
                          disablePortal
                          // id="combo-box-demo"
                          options={DataDenomination}
                          loading={LoadingDenomination === true}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: 80 }}
                              size="small"
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
                          // value={dev5}
                          value={row.fill_columns}
                          id="idDenomination"
                          onFocus={handleFocus}
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
                          defaultValue={
                            row.detail_staging?.fill_columns === null
                              ? dev5
                              : row?.detail_staging?.fill_columns[4]
                          }
                          onChange={(e, newValue) => {
                            handleFillColomns(newValue?.id, index, true, 4, 'dev');
                          }}
                          disablePortal
                          // id="combo-box-demo"
                          options={DataDenomination}
                          loading={LoadingDenomination === true}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: 80 }}
                              size="small"
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
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : index === 13 ? (
                <>
                  <StyledTableCell component="th" scope="row">
                    {row?.result_detail}
                    <div className="flex flex-col gap-5">
                      <Autocomplete
                        fullWidth
                        id="idBillChecker"
                        onFocus={handleFocus}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={row?.fill_columns}
                        // defaultValue='ss'
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? bcu
                            : row?.detail_staging?.fill_columns
                        }
                        getOptionLabel={(n) => n.description}
                        getOptionSelected={(option) => option?.id}
                        onChange={(e, newValue) => {
                          handleFillColomns(newValue?.id, index, true, 0, 'bcu');
                        }}
                        disablePortal
                        // id="combo-box-demo"
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
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : index === 14 ? (
                <>
                  <StyledTableCell align="center">
                    <div>
                      <div className="m-10  flex justify-center">
                        <div>Size Gambar = {getSize === 0 ? '-' : getSize}</div>
                      </div>

                      <img src={row.detail_staging?.fill_columns} alt="Gambar Kosong" />
                      <div className="mb-10">
                        {getSizeErr > 2097152 ? (
                          <Alert severity="warning"> Gambar Tidak Boleh Lebih dari 2 MB!</Alert>
                        ) : (
                          ''
                        )}
                      </div>
                      <FileUpload
                        // sx={{ width: 400 }}
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
                        size="small"
                        label={`attach here the vesion, Ukuran => ${getSize === 0 ? '-' : getSize}`}
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : index === 17 ? (
                <>
                  <StyledTableCell align="center">
                    {row?.result_detail}
                    <div className="flex flex-col gap-5">
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={hour}
                        // onChange={(e) => setHour(e.target.value)}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 0, 'hour');
                        }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? hour
                            : row?.detail_staging?.fill_columns[0]
                        }
                        id="outlined-basic"
                        label="Hour"
                        variant="outlined"
                      />
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={minute}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 1, 'hour');
                        }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? minute
                            : row?.detail_staging?.fill_columns[1]
                        }
                        id="filled-basic"
                        label="Minute"
                        variant="outlined"
                      />
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={second}
                        // onChange={(e) => setSecond(e.target.value)}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 2, 'hour');
                        }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? second
                            : row?.detail_staging?.fill_columns[2]
                        }
                        id="standard-basic"
                        label="Second"
                        variant="outlined"
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : index === 18 ? (
                <>
                  <StyledTableCell component="th" scope="row">
                    {row?.result_detail}
                    <div className="flex flex-col gap-5">
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={hour2}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 0, 'hour');
                        }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? hour2
                            : row?.detail_staging?.fill_columns[0]
                        }
                        id="outlined-basic"
                        label="Hour"
                        variant="outlined"
                      />
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={minute2}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 1, 'hour');
                        }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? minute2
                            : row?.detail_staging?.fill_columns[1]
                        }
                        id="filled-basic"
                        label="Minute"
                        variant="outlined"
                      />
                      <TextField
                        sx={{ width: 200 }}
                        disabled={
                          userRoles === 'GUEST' ||
                          userRoles === 'OPERATOR_TSS' ||
                          userRoles === 'GUEST_BANK' ||
                          userRoles === 'GUEST_DIP' ||
                          userRoles === 'GUEST_RELATED' ||
                          userRoles === 'OPERATOR_MOVER'
                        }
                        value={second2}
                        onChange={(e) => {
                          handleFillColomns(e, index, true, 2, 'hour');
                        }}
                        defaultValue={
                          row.detail_staging?.fill_columns === null
                            ? second2
                            : row?.detail_staging?.fill_columns[2]
                        }
                        id="standard-basic"
                        label="Second"
                        variant="outlined"
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    -
                  </StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell id="OK/NG" component="th" scope="row">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                        <Select
                          // size="small"
                          // defaultValue='OK'
                          size="small"
                          sx={{ width: 100 }}
                          InputLabelProps={{
                            style: { fontSize: '12px' },
                          }}
                          disabled={
                            userRoles === 'GUEST' ||
                            userRoles === 'OPERATOR_TSS' ||
                            userRoles === 'GUEST_BANK' ||
                            userRoles === 'GUEST_DIP' ||
                            userRoles === 'GUEST_RELATED' ||
                            userRoles === 'OPERATOR_MOVER'
                          }
                          defaultValue={
                            row?.detail_staging?.results === null
                              ? 'OK'
                              : row?.detail_staging?.results
                          }
                          label="OK/NG"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // error={pageState[index]?.results === 'NG'}
                          value={row.result}
                          onChange={(e) => {
                            // console.log(pageState[index]?.results);
                            handleInOut(e, index, row);
                          }}
                        >
                          <MenuItem value="OK">OK</MenuItem>
                          <MenuItem value="NG">NG</MenuItem>
                          <MenuItem value="NA">N/A</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell id="Problem" align="center">
                    <Autocomplete
                      size="small"
                      InputLabelProps={{
                        style: { fontSize: '20px' },
                      }}
                      disablePortal
                      id="idProblem"
                      options={DataProblem}
                      onFocus={handleFocus}
                      defaultValue={
                        row?.detail_staging?.problem === null
                          ? row?.problem
                          : row?.detail_staging?.problem
                      }
                      fullWidth
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      // onFocus={handleFocus}
                      getOptionLabel={(n) => n.description}
                      getOptionSelected={(option) => option?.id}
                      loading={LoadingProblem === true}
                      focused
                      value={row?.problem}
                      onChange={(e, newValue) => {
                        handleProblem(e, newValue, index);
                      }}
                      renderInput={(params) => (
                        <TextField
                          // sx={{ width: 80 }}
                          {...params}
                          label="Problem"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell id="action" align="center">
                    <Autocomplete
                      size="small"
                      InputLabelProps={{
                        style: { fontSize: '20px' },
                      }}
                      disablePortal
                      id="idAction"
                      options={DataAction}
                      onFocus={handleFocus}
                      fullWidth
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      defaultValue={
                        row?.detail_staging?.action === null
                          ? row?.action
                          : row?.detail_staging?.action
                      }
                      // onFocus={handleFocus}
                      getOptionLabel={(n) => n.description}
                      getOptionSelected={(option) => option?.id}
                      loading={LoadingAction === true}
                      focused
                      value={row?.action}
                      onChange={(e, newValue) => {
                        handleAction(e, newValue, index);
                      }}
                      renderInput={(params) => (
                        <TextField
                          // sx={{ width: 80 }}
                          {...params}
                          label="Action"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell id="remakre" align="center">
                    <Autocomplete
                      size="small"
                      InputLabelProps={{
                        style: { fontSize: '12px' },
                      }}
                      disablePortal
                      id="idRemake"
                      options={DataRemake}
                      onFocus={handleFocus}
                      fullWidth
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      // onFocus={handleFocus}
                      defaultValue={
                        row?.detail_staging?.remark === null
                          ? row?.remark
                          : row?.detail_staging?.remark
                      }
                      getOptionLabel={(n) => n.description}
                      getOptionSelected={(option) => option?.id}
                      loading={LoadingRemake === true}
                      focused
                      value={row?.remake}
                      onChange={(e, newValue) => {
                        handleRemake(e, newValue, index);
                      }}
                      renderInput={(params) => (
                        <TextField
                          // sx={{ width: 80 }}
                          {...params}
                          label="Remark"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                        />
                      )}
                    />
                  </StyledTableCell>
                </>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
