/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { makeStyles } from '@mui/styles';
import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import FileUpload from 'react-material-file-upload';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken}`,
  },
};
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

function Row(props) {
  const classes = useStyles();
  const { indexs } = props?.index;
  const { row } = props;
  const { rows } = props;
  const { idMesin } = props?.getIdMesin;
  const getDataEdit = props?.rows;
  // const disableBtn = rows[0]?.checklistStaging[0]?.detail_staging
  const getIdDivisi = row?.id;
  const idPO = props?.idPO;
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [DataProblem, setDataProblem] = useState([]);
  const [LoadingProblem, setLoadingProblem] = useState(false);
  const [DataAction, setDataAction] = useState([]);
  const [LoadingAction, setLoadingAction] = useState(false);
  const [DataRemake, setDataRemake] = useState([]);
  const [LoadingRemake, setLoadingRemake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

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

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [hour2, setHour2] = useState('');
  const [minute2, setMinute2] = useState('');
  const [second2, setSecond2] = useState('');
  const [selectedHour, setselectedHour] = useState('');
  const [selectedMinute, setselectedMinute] = useState('');
  const [selectedSecond, setselectedSecond] = useState('');
  const [selectedHour2, setselectedHour2] = useState('');
  const [selectedMinute2, setselectedMinute2] = useState('');
  const [selectedSecond2, setselectedSecond2] = useState('');

  const [DataDenomination, setDenomination] = useState([]);
  const [LoadingDenomination, setLoadingDenomination] = useState(false);
  const [DataBillChecker, setDataBillChecker] = useState([]);
  const [LoadingBillChecker, setLoadingBillChecker] = useState(false);
  const [nameHeader, setnameHeader] = useState('');
  const [idDivisi, setidDivisi] = useState('');
  const [result_details, setresult_details] = useState('');
  const [id_checklist_staging, setid_checklist_staging] = useState('');
  const [id_divisi, setid_divisi] = useState('');
  const [results, setresults] = useState(null);
  const [problem, setproblem] = useState(null);
  const [action, setaction] = useState(null);
  const [remark, setremark] = useState(null);
  const [fill_columns, setfill_columns] = useState(null);

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

  const [pageState, setPageState] = useState([]);
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
  const handleInOut = (e, index, multi = false, idxMulti = 0) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      // setresults((copyObject.results = e.target.value));
      if (multi === true) {
        copyObject.fill_columns[idxMulti] = e.target.value;
      } else {
        copyObject.results = e.target.value;
      }

      // console.log(pageState, 'pageState');
      // copyObject.id_divisi = idDivisi;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleProblem = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      // console.log(pageState, 'pageState');
      // setproblem((copyObject.problem = newValue?.id));
      copyObject.problem = newValue?.id;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleAction = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      // setaction((copyObject.action = newValue?.id));
      copyObject.action = newValue?.id;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  // console.log(rows, 'rows');
  const handleRemake = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      // setremark((copyObject.remark = newValue?.id));
      copyObject.remark = newValue?.id;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  useEffect(() => {
    if (row?.checklistStaging[2]?.detail_staging?.fill_columns !== null) {
      // console.log('first');
      setselectedHour(row?.checklistStaging[2]?.detail_staging?.fill_columns[0]);
      setselectedMinute(row?.checklistStaging[2]?.detail_staging?.fill_columns[1]);
      setselectedSecond(row?.checklistStaging[2]?.detail_staging?.fill_columns[2]);
    }
    if (row?.checklistStaging[3]?.detail_staging?.fill_columns !== null) {
      setselectedHour2(row?.checklistStaging[3]?.detail_staging?.fill_columns[0]);
      setselectedMinute2(row?.checklistStaging[3]?.detail_staging?.fill_columns[1]);
      setselectedSecond2(row?.checklistStaging[3]?.detail_staging?.fill_columns[2]);
    }
    if (row?.checklistStaging[2]?.detail_staging?.fill_columns !== null) {
      setDevSelected(row?.checklistStaging[2]?.detail_staging?.fill_columns[0]);
      setDevSelected2(row?.checklistStaging[2]?.detail_staging?.fill_columns[1]);
      setDevSelected3(row?.checklistStaging[2]?.detail_staging?.fill_columns[2]);
      setDevSelected4(row?.checklistStaging[2]?.detail_staging?.fill_columns[3]);
      setDevSelected5(row?.checklistStaging[2]?.detail_staging?.fill_columns[4]);
    }
    if (row?.checklistStaging[3]?.detail_staging?.fill_columns !== undefined) {
      setBcuSelected(row?.checklistStaging[3]?.detail_staging?.fill_columns);
    }
    if (row?.checklistStaging[1]?.detail_staging?.fill_columns !== null) {
      setDisplaySelected(row?.checklistStaging[1]?.detail_staging?.fill_columns[0]);
      setDisplayVSelected(row?.checklistStaging[1]?.detail_staging?.fill_columns[1]);
    }
    const arr = [];
    if (getIdDivisi === 17) {
      setPageState([]);
      for (let i = 0; i < row?.checklistStaging?.length; i++) {
        arr.push({
          ...body,
          result_details: row?.checklistStaging[i]?.result_detail,
          id_checklist_staging: row?.checklistStaging?.[i]?.id,
          results:
            row?.checklistStaging[i]?.detail_staging?.results === undefined
              ? 'OK'
              : row?.checklistStaging[i]?.detail_staging?.results,
          problem:
            row?.checklistStaging[i]?.detail_staging?.problem === undefined ||
            row?.checklistStaging[i]?.detail_staging?.problem === null
              ? null
              : row?.checklistStaging[i]?.detail_staging?.problem?.id,
          action:
            row?.checklistStaging[i]?.detail_staging?.action === undefined ||
            row?.checklistStaging[i]?.detail_staging?.action === null
              ? null
              : row?.checklistStaging[i]?.detail_staging?.action?.id,
          remark:
            row?.checklistStaging[i]?.detail_staging?.remark === undefined ||
            row?.checklistStaging[i]?.detail_staging?.remark === null
              ? null
              : row?.checklistStaging[i]?.detail_staging?.remark?.id,
          id_divisi: getIdDivisi,
        });
      }
    } else if (getIdDivisi === 18) {
      // console.log(displayV, 'displayV');
      // console.log(display, 'display');
      setPageState([]);
      for (let i = 0; i < row?.checklistStaging?.length; i++) {
        // console.log(row?.checklistStaging[i]?.detail_staging?.fill_columns);
        arr.push({
          ...body,
          result_details: row?.checklistStaging[i]?.result_detail,
          id_checklist_staging: row?.checklistStaging?.[i]?.id,
          id_divisi: getIdDivisi,
          fill_columns:
            i === 0
              ? biosVersion === null
                ? row?.checklistStaging[i]?.detail_staging?.fill_columns
                : biosVersion
              : i === 1
              ? [displayV, display]
              : i === 2
              ? [dev?.id, dev2?.id, dev3?.id, dev4?.id, dev5?.id]
              : i === 3
              ? encodedData === null
                ? row?.checklistStaging[i]?.detail_staging?.fill_columns
                : encodedData
              : null,
        });
      }
    } else if (getIdDivisi === 19) {
      setPageState([]);
      for (let i = 0; i < row?.checklistStaging?.length; i++) {
        // console.log(row?.checklistStaging[i]?.detail_staging, 'row');
        if (i === 2) {
          arr.push({
            ...body,
            result_details: row?.checklistStaging[i]?.result_detail,
            id_checklist_staging: row?.checklistStaging?.[i]?.id,
            results:
              row?.checklistStaging[i]?.detail_staging?.results === null ||
              row?.checklistStaging[i]?.detail_staging?.results === undefined
                ? 'OK'
                : row?.checklistStaging[i]?.detail_staging?.results,
            problem:
              row?.checklistStaging[i]?.detail_staging?.problem === undefined ||
              row?.checklistStaging[i]?.detail_staging?.problem === null
                ? problem
                : row?.checklistStaging[i]?.detail_staging?.problem?.id,
            action:
              row?.checklistStaging[i]?.detail_staging?.action === undefined ||
              row?.checklistStaging[i]?.detail_staging?.action === null
                ? action
                : row?.checklistStaging[i]?.detail_staging?.action?.id,
            remark:
              row?.checklistStaging[i]?.detail_staging?.remark === undefined ||
              row?.checklistStaging[i]?.detail_staging?.remark === null
                ? remark
                : row?.checklistStaging[i]?.detail_staging?.remark?.id,
            id_divisi: getIdDivisi,
            fill_columns: [hour, minute, second],
          });
        } else if (i === 3) {
          arr.push({
            ...body,
            result_details: row?.checklistStaging[i]?.result_detail,
            id_checklist_staging: row?.checklistStaging?.[i]?.id,
            results:
              row?.checklistStaging[i]?.detail_staging?.results === null ||
              row?.checklistStaging[i]?.detail_staging?.results === undefined
                ? 'OK'
                : row?.checklistStaging[i]?.detail_staging?.results,
            problem:
              row?.checklistStaging[i]?.detail_staging?.problem === undefined ||
              row?.checklistStaging[i]?.detail_staging?.problem === null
                ? problem
                : row?.checklistStaging[i]?.detail_staging?.problem?.id,
            action:
              row?.checklistStaging[i]?.detail_staging?.action === undefined ||
              row?.checklistStaging[i]?.detail_staging?.action === null
                ? action
                : row?.checklistStaging[i]?.detail_staging?.action?.id,
            remark:
              row?.checklistStaging[i]?.detail_staging?.remark === undefined ||
              row?.checklistStaging[i]?.detail_staging?.remark === null
                ? remark
                : row?.checklistStaging[i]?.detail_staging?.remark?.id,
            id_divisi: getIdDivisi,
            fill_columns: [hour2, minute2, second2],
          });
        } else {
          arr.push({
            ...body,
            result_details: row?.checklistStaging[i]?.result_detail,
            id_checklist_staging: row?.checklistStaging?.[i]?.id,
            results:
              row?.checklistStaging[i]?.detail_staging?.results === null ||
              row?.checklistStaging[i]?.detail_staging?.results === undefined
                ? 'OK'
                : row?.checklistStaging[i]?.detail_staging?.results,
            problem:
              row?.checklistStaging[i]?.detail_staging?.problem === undefined ||
              row?.checklistStaging[i]?.detail_staging?.problem === null
                ? problem
                : row?.checklistStaging[i]?.detail_staging?.problem?.id,
            action:
              row?.checklistStaging[i]?.detail_staging?.action === undefined ||
              row?.checklistStaging[i]?.detail_staging?.action === null
                ? action
                : row?.checklistStaging[i]?.detail_staging?.action?.id,
            remark:
              row?.checklistStaging[i]?.detail_staging?.remark === undefined ||
              row?.checklistStaging[i]?.detail_staging?.remark === null
                ? remark
                : row?.checklistStaging[i]?.detail_staging?.remark?.id,
            id_divisi: getIdDivisi,
            fill_columns: null,
          });
        }
      }
    } else {
      setPageState([]);
      for (let i = 0; i < row?.checklistStaging?.length; i++) {
        arr.push({
          ...body,
          result_details: row?.checklistStaging[i]?.result_detail,
          id_checklist_staging: row?.checklistStaging?.[i]?.id,
          results:
            row?.checklistStaging[i]?.detail_staging?.results === undefined
              ? 'OK'
              : row?.checklistStaging[i]?.detail_staging?.results,
          problem:
            row?.checklistStaging[i]?.detail_staging?.problem === undefined ||
            row?.checklistStaging[i]?.detail_staging?.problem === null
              ? null
              : row?.checklistStaging[i]?.detail_staging?.problem?.id,
          action:
            row?.checklistStaging[i]?.detail_staging?.action === undefined ||
            row?.checklistStaging[i]?.detail_staging?.action === null
              ? null
              : row?.checklistStaging[i]?.detail_staging?.action?.id,
          remark:
            row?.checklistStaging[i]?.detail_staging?.remark === undefined ||
            row?.checklistStaging[i]?.detail_staging?.remark === null
              ? null
              : row?.checklistStaging[i]?.detail_staging?.remark?.id,
          id_divisi: getIdDivisi,
        });
      }
    }
    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [
    getIdDivisi,
    bcu,
    // hour,
    // minute,
    // second,
    // hour2,
    // minute2,
    // second2,
    biosVersion,
    // displayV,
    // display,
    dev,
    dev2,
    dev3,
    dev4,
    dev5,
    encodedData,
    row,
  ]);
  // console.log(pageState, 'pagestate');
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      setDisplay(displaySelected);
      setDisplayV(displayVSelected);
      setHour(selectedHour);
      setMinute(selectedMinute);
      setSecond(selectedSecond);
      setHour2(selectedHour2);
      setMinute2(selectedMinute2);
      setSecond2(selectedSecond2);
      setDev(devSelected);
      setBcu(bcuSelected);
      setDev2(devSelected2);
      setDev3(devSelected3);
      setDev4(devSelected4);
      setDev5(devSelected5);
      setDev6(devSelected6);
      setDev7(devSelected7);
      // setBcu()
    }
    return () => {
      isUnmout = true;
    };
  }, [
    displaySelected,
    displayVSelected,
    selectedHour,
    selectedMinute,
    selectedSecond,
    selectedHour2,
    selectedMinute2,
    selectedSecond2,
    devSelected,
    devSelected2,
    devSelected3,
    devSelected4,
    devSelected5,
    devSelected6,
    devSelected7,
    bcuSelected,
  ]);
  // console.log(body, 'body');
  const handleSubmit = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging`, pageState, config)
      .then((res) => {
        // props?.getOK();
        // props?.getNG();
        // props?.getNA();
        setLoadingBtn(false);
        // setOpen(!open);
        props?.getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        setLoadingBtn(false);
        console.log(err, 'err');
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = 'S';
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
        } else if (errStatus === 413) {
          messages = errMessage;
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
    // setLoadingBtn(false);
  };
  const handleEdit = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${idMesin}/${getIdDivisi}`,
        pageState,
        config
      )
      .then((res) => {
        setLoadingBtn(false);
        // setOpen(!open);
        // props?.getOK();
        // props?.getNG();
        // props?.getNA();
        props?.getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Updated',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        setLoadingBtn(false);
        console.log(err, 'err');
        const errStatus = err.response.status;
        console.log(errStatus, 'errStatus');
        const errMessage = err.response.data.errorMessage;
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

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell
          onClick={() => setOpen(!open)}
          className="w-full cursor-pointer hover:bg-grey-100 bg-blue-50 sticky top-70 z-10"
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              <IconButton aria-label="expand row" size="small">
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <Typography variant="body1" gutterBottom component="div">
                <div>{row?.name}</div>
              </Typography>
            </div>
            <div>
              {props?.row?.disable === true ? (
                <Button
                  // disabled={props?.row?.disable === true}
                  color="success"
                  variant="contained"
                  onClick={handleEdit}
                  disabled={
                    userRoles === 'GUEST' ||
                    userRoles === 'OPERATOR_TSS' ||
                    userRoles === 'GUEST_BANK' ||
                    userRoles === 'GUEST_DIP' ||
                    userRoles === 'GUEST_RELATED' ||
                    userRoles === 'OPERATOR_MOVER'
                  }
                >
                  {loadingBtn === true ? 'Loading...' : 'Edit'}
                </Button>
              ) : (
                <Button
                  disabled={
                    props?.row?.disable === true ||
                    loadingBtn === true ||
                    userRoles === 'GUEST' ||
                    userRoles === 'OPERATOR_TSS' ||
                    userRoles === 'GUEST_BANK' ||
                    userRoles === 'GUEST_DIP' ||
                    userRoles === 'GUEST_RELATED' ||
                    userRoles === 'OPERATOR_MOVER'
                  }
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {loadingBtn === true ? 'Loading...' : 'Submit'}
                </Button>
              )}
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {getIdDivisi === 17 ? (
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>Expected result or result details</TableCell>
                      <TableCell align="right">Result </TableCell>
                      <TableCell align="right">Problem </TableCell>
                      <TableCell align="right">Action</TableCell>
                      <TableCell align="right">Remake</TableCell>
                    </TableRow>
                  ) : getIdDivisi === 18 ? (
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>Expected result or result details</TableCell>
                      <TableCell align="right">Result </TableCell>
                    </TableRow>
                  ) : getIdDivisi === 19 ? (
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>Expected result or result details</TableCell>
                      <TableCell align="right">Result </TableCell>
                      <TableCell align="right">Problem </TableCell>
                      <TableCell align="right">Action</TableCell>
                      <TableCell align="right">Remake</TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>Expected result or result details</TableCell>
                      <TableCell align="right">Result </TableCell>
                      <TableCell align="right">Problem </TableCell>
                      <TableCell align="right">Action</TableCell>
                      <TableCell align="right">Remake</TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {getIdDivisi === 17 ? (
                    <>
                      {row?.checklistStaging?.map((item, index) => (
                        <TableRow key={item?.id}>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {index + 1}.)
                          </TableCell>
                          <TableCell className={classes?.tableCell}>{item?.test_desc}</TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {item?.result_detail}
                          </TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                                <Select
                                  // size="small"
                                  // defaultValue='OK'
                                  size="small"
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
                                    item.detail_staging?.results === 'OK' ||
                                    item.detail_staging?.results === undefined
                                      ? 'OK'
                                      : item.detail_staging?.results
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
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
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
                                item.detail_staging?.problem === null
                                  ? item?.problem
                                  : item.detail_staging?.problem
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
                              value={row.problem}
                              onChange={(e, newValue) => {
                                handleProblem(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Problem"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '18px' },
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
                                item.detail_staging?.action === null
                                  ? item?.action
                                  : item.detail_staging?.action
                              }
                              // onFocus={handleFocus}
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingAction === true}
                              focused
                              value={row.action}
                              onChange={(e, newValue) => {
                                handleAction(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Action"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
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
                                item.detail_staging?.remark === null
                                  ? item?.remark
                                  : item?.detail_staging?.remark
                              }
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingRemake === true}
                              focused
                              value={row.remake}
                              onChange={(e, newValue) => {
                                handleRemake(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Remark"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : getIdDivisi === 18 ? (
                    <>
                      {row?.checklistStaging?.map((item, index) => (
                        <TableRow key={item?.id}>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {index + 1}.)
                          </TableCell>
                          <TableCell className={classes?.tableCell}>{item?.test_desc}</TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {item?.result_detail}
                          </TableCell>
                          {index === 0 ? (
                            <TableCell align="center" className={classes?.tableCell}>
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
                                onChange={(e) => setBiosVersion(e.target.value)}
                                // onChange={(e) => {
                                //   handleBiosVersion(e, index, row);
                                // }}
                                defaultValue={
                                  item.detail_staging?.fill_columns === null
                                    ? biosVersion
                                    : item?.detail_staging?.fill_columns
                                }
                                label="M/S Bios Version"
                              />
                            </TableCell>
                          ) : index === 1 ? (
                            <TableCell align="center" className={classes?.tableCell}>
                              <div className="flex gap-5">
                                <TextField
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
                                    item.detail_staging?.fill_columns === null
                                      ? displayV
                                      : item?.detail_staging?.fill_columns[0]
                                  }
                                  onChange={(e) => {
                                    handleInOut(e, index, true, 0);
                                    setDisplayV(e.target.value);
                                  }}
                                  // onChange={(e) => setDisplayV(e.target.value)}
                                  // onChange={(e) => {
                                  //   handleDisplay(e, index, row);
                                  // }}
                                  label="V"
                                />
                                <TextField
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
                                  onChange={(e) => {
                                    handleInOut(e, index, true, 1);
                                    setDisplay(e.target.value);
                                  }}
                                  defaultValue={
                                    item.detail_staging?.fill_columns === null
                                      ? display
                                      : item?.detail_staging?.fill_columns[1]
                                  }
                                  // onChange={(e) => setDisplay(e.target.value)}
                                  // onChange={(e) => {
                                  //   handleDisplay(e, index, row);
                                  // }}
                                  label="Display"
                                />
                              </div>
                            </TableCell>
                          ) : index === 2 ? (
                            <TableCell align="center" className={classes?.tableCell}>
                              <div className="flex gap-10 justify-between">
                                {/* {console.log(dev, 'devs')} */}
                                <div>
                                  <Autocomplete
                                    disablePortal
                                    value={dev}
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
                                    getOptionSelected={(option) => option?.id}
                                    loading={LoadingDenomination === true}
                                    // defaultValue={
                                    //   data[index]?.detail_staging?.fill_columns === null
                                    //     ? null
                                    //     : data[index]?.detail_staging?.fill_columns[0]
                                    // }
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev(newValue);
                                      }
                                    }}
                                    // id="combo-box-demo"
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
                                    id="idDenomination"
                                    value={dev2}
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
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev2(newValue);
                                      }
                                    }}
                                    // defaultValue={
                                    //   data[index]?.detail_staging?.fill_columns === null
                                    //     ? null
                                    //     : data[index]?.detail_staging?.fill_columns[1]
                                    // }
                                    disablePortal
                                    // id="combo-box-demo"
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
                                    id="idDenomination"
                                    value={dev3}
                                    onFocus={handleFocus}
                                    disabled={
                                      userRoles === 'GUEST' ||
                                      userRoles === 'OPERATOR_TSS' ||
                                      userRoles === 'GUEST_BANK' ||
                                      userRoles === 'GUEST_DIP' ||
                                      userRoles === 'GUEST_RELATED' ||
                                      userRoles === 'OPERATOR_MOVER'
                                    }
                                    // defaultValue={
                                    //   data[index]?.detail_staging?.fill_columns === null
                                    //     ? null
                                    //     : data[index]?.detail_staging?.fill_columns[2]
                                    // }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev3(newValue);
                                      }
                                    }}
                                    disablePortal
                                    // id="combo-box-demo"
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
                                    // defaultValue={
                                    //   data[index]?.detail_staging?.fill_columns === null
                                    //     ? null
                                    //     : data[index]?.detail_staging?.fill_columns[3]
                                    // }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev4(newValue);
                                      }
                                    }}
                                    disablePortal
                                    // id="combo-box-demo"
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
                                    defaultValue={
                                      item.detail_staging?.fill_columns === null
                                        ? dev5
                                        : item?.detail_staging?.fill_columns
                                    }
                                    getOptionLabel={(n) => n.description}
                                    getOptionSelected={(option) => option?.id}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        setDev5(newValue);
                                      }
                                    }}
                                    disablePortal
                                    // id="combo-box-demo"
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
                            </TableCell>
                          ) : index === 3 ? (
                            <TableCell align="center" className={classes?.tableCell}>
                              <>
                                <div className="m-10  flex justify-center">
                                  <div>Size Gambar = {getSize === 0 ? '-' : getSize}</div>
                                </div>

                                <img
                                  src={row?.checklistStaging[3]?.detail_staging?.fill_columns}
                                  alt="Gambar Kosong"
                                />
                                <div className="mb-10">
                                  {getSizeErr > 2097152 ? (
                                    <Alert severity="warning">
                                      {' '}
                                      Gambar Tidak Boleh Lebih dari 2 MB!
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
                                  size="small"
                                  label={`attach here the vesion, Ukuran => ${
                                    getSize === 0 ? '-' : getSize
                                  }`}
                                />
                              </>
                            </TableCell>
                          ) : (
                            ''
                          )}
                        </TableRow>
                      ))}
                    </>
                  ) : getIdDivisi === 19 ? (
                    <>
                      {row?.checklistStaging?.map((item, index) => (
                        <TableRow key={item?.id}>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {index + 1}.)
                          </TableCell>
                          <TableCell className={classes?.tableCell}>{item?.test_desc}</TableCell>
                          {index === 2 ? (
                            <TableCell align="center" className={classes?.tableCell}>
                              {item?.result_detail}
                              <div className="flex flex-col gap-5">
                                <TextField
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
                                    handleInOut(e, index, true, 0);
                                    setHour(e.target.value);
                                  }}
                                  id="outlined-basic"
                                  label="Hour"
                                  variant="outlined"
                                />
                                <TextField
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
                                    handleInOut(e, index, true, 1);
                                    setMinute(e.target.value);
                                  }}
                                  // onChange={(e) => setMinute(e.target.value)}
                                  id="filled-basic"
                                  label="Minute"
                                  variant="outlined"
                                />
                                <TextField
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
                                    handleInOut(e, index, true, 2);
                                    setSecond(e.target.value);
                                  }}
                                  id="standard-basic"
                                  label="Second"
                                  variant="outlined"
                                />
                              </div>
                            </TableCell>
                          ) : index === 3 ? (
                            <TableCell component="th" scope="row" className={classes?.tableCell}>
                              {item?.result_detail}
                              <div className="flex flex-col gap-5">
                                <TextField
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  // defaultValue={
                                  //   item.detail_staging?.fill_columns === null
                                  //     ? item?.fill_columns
                                  //     : item?.detail_staging?.fill_columns[0]
                                  // }
                                  // onChange={(e) => setHour2(e.target.value)}
                                  value={hour2}
                                  onChange={(e) => {
                                    handleInOut(e, index, true, 0);
                                    setHour2(e.target.value);
                                  }}
                                  id="outlined-basic"
                                  label="Hour"
                                  variant="outlined"
                                />
                                <TextField
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  value={minute2}
                                  // onChange={(e) => setMinute2(e.target.value)}
                                  onChange={(e) => {
                                    handleInOut(e, index, true, 1);
                                    setMinute2(e.target.value);
                                  }}
                                  id="filled-basic"
                                  label="Minute"
                                  variant="outlined"
                                />
                                <TextField
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  value={second2}
                                  // onChange={(e) => setSecond2(e.target.value)}
                                  onChange={(e) => {
                                    handleInOut(e, index, true, 2);
                                    setSecond2(e.target.value);
                                  }}
                                  id="standard-basic"
                                  label="Second"
                                  variant="outlined"
                                />
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell component="th" scope="row" className={classes?.tableCell}>
                              {item?.result_detail}
                            </TableCell>
                          )}
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                                <Select
                                  // size="small"
                                  size="small"
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
                                  // defaultValue="OK"
                                  defaultValue={
                                    item.detail_staging?.results === 'OK' ||
                                    item.detail_staging?.results === undefined
                                      ? 'OK'
                                      : item.detail_staging?.results
                                  }
                                  label="OK/NG"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={item.results}
                                  onChange={(e) => {
                                    handleInOut(e, index, item);
                                  }}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="NG">NG</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '20px' },
                              }}
                              disablePortal
                              id="idProblem"
                              options={DataProblem}
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
                                item.detail_staging?.problem === null
                                  ? item?.problem
                                  : item?.detail_staging?.problem
                              }
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingProblem === true}
                              focused
                              value={item.problem}
                              onChange={(e, newValue) => {
                                handleProblem(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Problem"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '18px' },
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
                                item.detail_staging?.action === null
                                  ? item?.action
                                  : item?.detail_staging?.action
                              }
                              // onFocus={handleFocus}
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingAction === true}
                              focused
                              value={item.action}
                              onChange={(e, newValue) => {
                                handleAction(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Action"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
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
                              defaultValue={
                                item.detail_staging?.remark === null
                                  ? item?.remark
                                  : item?.detail_staging?.remark
                              }
                              // onFocus={handleFocus}
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingRemake === true}
                              focused
                              value={item.remake}
                              onChange={(e, newValue) => {
                                handleRemake(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Remark"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : getIdDivisi === 20 ? (
                    <>
                      {row?.checklistStaging?.map((item, index) => (
                        <TableRow key={item?.id}>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {index + 1}.)
                          </TableCell>
                          <TableCell className={classes?.tableCell}>{item?.test_desc}</TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {item?.result_detail}
                          </TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {/* {console.log(item, 'item')}  */}
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                                <Select
                                  // size="small"
                                  size="small"
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
                                    item.detail_staging?.results === 'OK' ||
                                    item.detail_staging?.results === undefined
                                      ? 'OK'
                                      : item.detail_staging?.results
                                  }
                                  label="OK/NG"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={row.result}
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="NG">NG</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </TableCell>
                          <TableCell
                            size="small"
                            InputLabelProps={{
                              style: { fontSize: '20px' },
                            }}
                            align="center"
                            className={classes?.tableCell}
                          >
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '20px' },
                              }}
                              disablePortal
                              id="idProblem"
                              options={DataProblem}
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
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingProblem === true}
                              focused
                              // value={row.problem}
                              // onChange={(e, newValue) => {
                              //   handleProblem(e, newValue, index);
                              // }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Problem"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '18px' },
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
                              // onFocus={handleFocus}
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingAction === true}
                              focused
                              // value={row.action}
                              // onChange={(e, newValue) => {
                              //   handleAction(e, newValue, index);
                              // }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Action"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
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
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingRemake === true}
                              focused
                              // value={row.remake}
                              // onChange={(e, newValue) => {
                              //   handleRemake(e, newValue, index);
                              // }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Remark"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      {row?.checklistStaging?.map((item, index) => (
                        <TableRow key={item?.id}>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {index + 1}.)
                          </TableCell>
                          <TableCell className={classes?.tableCell}>{item?.test_desc}</TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {item?.result_detail}
                          </TableCell>
                          <TableCell component="th" scope="row" className={classes?.tableCell}>
                            {/* {console.log(item, 'item')}  */}
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                                <Select
                                  // size="small"
                                  size="small"
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
                                    item.detail_staging?.results === 'OK' ||
                                    item.detail_staging?.results === undefined
                                      ? 'OK'
                                      : item.detail_staging?.results
                                  }
                                  label="OK/NG"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={row.result}
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="NG">NG</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '20px' },
                              }}
                              disablePortal
                              id="idProblem"
                              options={DataProblem}
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
                                item.detail_staging?.problem === null
                                  ? item?.problem
                                  : item.detail_staging?.problem
                              }
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingProblem === true}
                              focused
                              value={row.problem}
                              onChange={(e, newValue) => {
                                handleProblem(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Problem"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
                            <Autocomplete
                              size="small"
                              InputLabelProps={{
                                style: { fontSize: '18px' },
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
                                item.detail_staging?.action === null
                                  ? item?.action
                                  : item.detail_staging?.action
                              }
                              // onFocus={handleFocus}
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingAction === true}
                              focused
                              value={row.action}
                              onChange={(e, newValue) => {
                                handleAction(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Action"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell align="center" className={classes?.tableCell}>
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
                              defaultValue={
                                item.detail_staging?.remark === null
                                  ? item?.remark
                                  : item.detail_staging?.remark
                              }
                              // onFocus={handleFocus}
                              getOptionLabel={(n) => n.description}
                              getOptionSelected={(option) => option?.id}
                              loading={LoadingRemake === true}
                              focused
                              value={row.remark}
                              onChange={(e, newValue) => {
                                handleRemake(e, newValue, index);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Remark"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function OpenMX5600SNew(props) {
  // console.log(props, 'props');
  const dispatch = useDispatch();
  const getIdMesinPo = props?.dataById?.mesin?.id;
  const idPO = props?.dataById?.id;
  const dataHeader = props?.dataById?.mesin?.type;
  const userRoles = props?.userRoles;
  const getIdMesin = props?.getIdMesin;
  const [datas, setDatas] = useState([]);
  const [datasDetailPO, setDetailPO] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getDisable, setGetDisable] = useState(false);
  const [getIdx, setGetgetIdx] = useState('');

  function createData(id, name, checklistStaging, disable) {
    return { id, name, checklistStaging, disable };
  }

  const rows = datas?.map((item, index) =>
    createData(item?.id, item?.name, item.checklistStaging, item?.checklist_staging)
  );
  // console.log(open, 'opp');

  const getData = async () => {
    if (open === false) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    const response = await axios
      .get(
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}dataTableChecklist/${getIdMesinPo}`,
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingReport/${idPO}/${getIdMesin?.idMesin},`,
        config
      )
      .then((res) => {
        // console.log(res, 'res');
        setDatas(res?.data?.data?.data_checklist);
        setDetailPO(res?.data?.data?.detail_po);
        setLoading(false);
        // setGetDisable(res?.data?.data[getIdx]?.data_checklist);
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        setDatas([]);
        setDetailPO([]);
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
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  if (loading === true) {
    return <FuseLoading />;
  }
  if (datas?.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center">No Data Available</div>
      </>
    );
  }
  props?.propsFromParrentNew(datas, getIdMesin);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="sticky top-0 bg-blue-700 z-9999">
          <TableRow>
            <TableCell colSpan={12} align="center">
              <Typography color="white" variant="h6" gutterBottom>
                {dataHeader} Pre-Staging Checklist
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <Row
              key={row?.name}
              row={row}
              rows={rows}
              index={index}
              idPO={idPO}
              getData={getData}
              getIdMesin={getIdMesin}
              userRoles={userRoles}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
