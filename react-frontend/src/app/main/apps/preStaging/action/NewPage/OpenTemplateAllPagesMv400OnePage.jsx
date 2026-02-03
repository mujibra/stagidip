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
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

function createData(id, name, part_number, checkpoint_desc, rev_final, unit, detail_checklist) {
  return { id, name, part_number, checkpoint_desc, rev_final, unit, detail_checklist };
}

export default function OpenTemplateAllPagesMv400OnePage(props) {
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
  const [id_classification, setnameid_classification] = useState(null);
  const [id_checklist_staging, setid_checklist_staging] = useState(null);
  const [sn_part, setsn_part] = useState(null);
  const [inspector_sign, setinspector_sign] = useState(null);
  const [fix_description, setfix_description] = useState(null);
  const [checkpoint_desc, setcheckpoint_desc] = useState(null);
  const [status_checklist, setstatus_checklist] = useState(true);
  const [timeMv400, setTimeMv400] = useState(null);
  // console.log(timeMv400, 'zzzzz')

  const getData = async () => {
    // if (open === false) {
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    // }
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/v2/${idPO}/${getIdMesin?.idMesin}/spek`,
        config
      )
      .then((res) => {
        // console.log(res, 'res11111');
        setTimeMv400(res?.data?.time_checklist);
        setstatus_checklist(res?.data?.status_checklist);
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
    createData(
      item?.id,
      item?.name,
      item?.part_number,
      item?.checkpoint_desc,
      item?.rev_final,
      item?.unit,
      item?.detail_checklist
    )
  );

  const [pageState, setPageState] = useState([]);
  const handlePartNumber = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      // console.log(pageState, 'pageState');
      copyObject.sn_part = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
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
  const handleInspectorSign = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      // console.log(pageState, 'pageState');
      copyObject.inspector_sign = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleFixDescription = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.fix_description = e.target.value;
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const body = {
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
  useEffect(() => {
    const arr = [];
    // if (idDivisi !== '') {
    for (let i = 0; i < datas.length; i++) {
      arr.push({
        ...body,
        results: 'OK',
        id_po: idPO,
        sn_mesin: getIdMesin?.snMesin,
        no_mesin: getIdMesin?.idMesin,
        id_classification: datas[i]?.id_classification,
        checkpoint_desc: datas[i]?.checkpoint_desc,
        id_checklist_staging: datas[i]?.id,
        sn_part: datas[i]?.detail_checklist?.sn_part,
        inspector_sign: datas[i]?.detail_checklist?.inspector_sign,
        fix_description: datas[i]?.detail_checklist?.fix_description,
      });
      // }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [datas, getIdMesin?.idMesin]);

  props?.propsFromParrentNew(pageState, '', status_checklist, loading, datas, timeMv400);

  if (loading === true) {
    return <FuseLoading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="sticky top-0 z-10">
          <TableRow>
            <StyledTableCell>NO</StyledTableCell>
            <StyledTableCell align="left">Unit</StyledTableCell>
            <StyledTableCell align="left">Check Point</StyledTableCell>
            <StyledTableCell align="left">Part Number</StyledTableCell>
            <StyledTableCell align="left">(Rev) Final</StyledTableCell>
            <StyledTableCell align="left">(Rev) Now</StyledTableCell>
            <StyledTableCell align="left">Serial Number</StyledTableCell>
            <StyledTableCell align="left">Result</StyledTableCell>
            <StyledTableCell align="left">Inspector Sign</StyledTableCell>
            <StyledTableCell align="left">Fix Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={row?.id}>
              <StyledTableCell component="th" scope="row">
                {row?.id}).
              </StyledTableCell>
              <StyledTableCell align="left">{row?.unit === null ? '-' : row?.unit}</StyledTableCell>
              <StyledTableCell align="left">
                {row?.checkpoint_desc === null ? '-' : row?.checkpoint_desc}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row?.part_number === null ? '-' : row?.part_number}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row?.rev_final === null ? '-' : row?.rev_final}
              </StyledTableCell>
              <StyledTableCell align="left">-</StyledTableCell>
              <StyledTableCell align="center">
                {index >= 9 && index <= 18 ? (
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="outlined-required"
                    label="Serial Number"
                    defaultValue={
                      row.detail_checklist?.sn_part === null ? null : row.detail_checklist?.sn_part
                    }
                    sx={{ width: 130 }}
                    value={row.sn_part}
                    disabled={
                      userRoles === 'GUEST' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'GUEST_RELATED' ||
                      userRoles === 'OPERATOR_MOVER'
                    }
                    onChange={(e, newValue) => {
                      handlePartNumber(e, newValue, index);
                    }}
                    // defaultValue="Hello World"
                  />
                ) : (
                  '-'
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Box sx={{ minWidth: 70 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                    <Select
                      size="small"
                      disabled={
                        userRoles === 'GUEST' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      // defaultValue="OK"
                      label="OK/NG"
                      defaultValue={
                        row.detail_checklist?.results === null
                          ? 'OK'
                          : row.detail_checklist?.results
                      }
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
              </StyledTableCell>
              <StyledTableCell align="left">
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Inspector Sign"
                  sx={{ width: 130 }}
                  defaultValue={
                    row.detail_checklist?.inspector_sign === null
                      ? null
                      : row.detail_checklist?.inspector_sign
                  }
                  value={row.inspector_sign}
                  disabled={
                    userRoles === 'GUEST' ||
                    userRoles === 'OPERATOR_TSS' ||
                    userRoles === 'GUEST_BANK' ||
                    userRoles === 'GUEST_DIP' ||
                    userRoles === 'GUEST_RELATED' ||
                    userRoles === 'OPERATOR_MOVER'
                  }
                  onChange={(e, newValue) => {
                    handleInspectorSign(e, newValue, index);
                  }}
                  // defaultValue="Hello World"
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="outlined-required"
                  label="Fix Description"
                  sx={{ width: 130 }}
                  defaultValue={
                    row.detail_checklist?.fix_description === null
                      ? null
                      : row.detail_checklist?.fix_description
                  }
                  value={row.fix_description}
                  disabled={
                    userRoles === 'GUEST' ||
                    userRoles === 'OPERATOR_TSS' ||
                    userRoles === 'GUEST_BANK' ||
                    userRoles === 'GUEST_DIP' ||
                    userRoles === 'GUEST_RELATED' ||
                    userRoles === 'OPERATOR_MOVER'
                  }
                  onChange={(e, newValue) => {
                    handleFixDescription(e, newValue, index);
                  }}
                  // defaultValue="Hello World"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
