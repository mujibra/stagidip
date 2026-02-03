/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled';
import FuseLoading from '@fuse/core/FuseLoading';

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
  { id: 'no', label: 'NO', minWidth: 10 },
  { id: 'descriptionUmum', label: 'Description Umum', minWidth: 170 },
  // { id: 'pelaksanaDIP-Movers', label: 'Pelaksana DIP-Movers', minWidth: 100 },
  {
    id: 'diluarDidalam',
    label: 'Diluar/Didalam',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'jumlah',
    label: 'Jumlah',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'okNg',
    label: 'OK/NG',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'keterangan',
    label: 'Keterangan',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, general_desc, detail_inspeksi, testing_inspection) {
  return { id, general_desc, detail_inspeksi, testing_inspection };
}

// keterangan,
// no_mesin,
// position,
// quantity,
// sn_mesin,
// status,
export default function HandleAdd(props) {
  const idPo = props?.idPO;
  const getIdMesin = props?.getIdMesin?.snMesin;
  // console.log(getIdMesin, 'getIdMesin')
  const userRoles = props?.userRoles;
  const dataById = props?.dataById;
  // console.log(dataById, 'dataById');

  const classes = useStyles();
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [datas, setDatas] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [id_po, setid_po] = React.useState('');
  const [no_mesin, setno_mesin] = React.useState('');
  const [sn_mesin, setsn_mesin] = React.useState('');
  const [id_inspeksi, setid_inspeksi] = React.useState('');
  const [pelaksana_div_mover, setpelaksana_div_mover] = React.useState('');
  const [position, setposition] = React.useState('');
  const [quantity, setquantity] = React.useState('');
  const [status, setstatus] = React.useState('');
  const [keterangan, setketerangan] = React.useState('');
  const [loadingSubmit, setloadingSubmit] = React.useState(false);

  const [disable, setdisable] = React.useState(false);

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

  // let body = '';

  const body = {
    id_po: idPo,
    sn_mesin: getIdMesin,
    no_mesin: props?.getIdMesin?.idMesin,
    id_inspeksi,
    // pelaksana_div_mover,
    position,
    quantity,
    status,
    keterangan,
  };
  // console.log(arr)
  // for (let i = 0; i < datas.length; i++) {
  //   arr.push(body);
  // }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = data?.map((item, index) =>
    createData(item?.id, item?.general_desc, item?.detail_inspeksi, item?.testing_inspection)
  );
  // console.log(data, 'data')

  const getDataById = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPo}/${props?.getIdMesin?.idMesin}`,
        config
      )
      .then((res) => {
        // console.log(res, 'res')
        setData(res?.data?.data);
        setLoading(false);
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
  // console.log(datas, 'datas');
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      // getData();
      getDataById();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  // console.log(rowMap, 'rowMap');
  const [pageState, setPageState] = React.useState([]);
  const [getDisabled, setgetDisabled] = React.useState(false);
  const handleInOut = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.position = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
    // console.log(pageState, 'state');
  };
  const HandleJumlah = (e, index, row) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.quantity = Number(e.target.value);
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
    // console.log(pageState, 'state');
  };

  const handleOkNG = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.status = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
      const disableOkNg = [];

      for (let i = 0; i < data.length; i++) {
        disableOkNg.push(pageState[i]?.status);
      }
      const getDisableOkNg = disableOkNg.includes('NG');
      setgetDisabled(getDisableOkNg);
      // console.log(pageState, 'state');
    }
  };
  // console.log(disableOkNg, 'arr');
  const HandleKeterangan = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.keterangan = e.target.value;
      // console.log(pageState, 'state');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };

  React.useEffect(() => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      /* mesin ATM */

      if (dataById?.model?.id === 2) {
        arr.push({
          ...body,
          status:
            i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 6 || i === 8 || i === 9
              ? 'OK'
              : null,
          position:
            i === 0
              ? 'OK'
              : i === 8
              ? 'GOOD'
              : i === 1 || i === 2 || i === 3 || i === 5 || i === 7 || i === 9
              ? 'OUT'
              : i === 4 || i === 6
              ? 'IN'
              : null,
          id_inspeksi: data[i]?.id,
          quantity:
            i === 0 || i === 4 || i === 5 || i === 9
              ? 1
              : i === 1 || i === 2 || i === 3
              ? 3
              : i === 6 || i === 7
              ? 4
              : null,
        });
        // mesin CRM, VBK, TCR, TTW
      } else if (
        dataById?.model?.id === 4 ||
        dataById?.model?.id === 6 ||
        dataById?.model?.id === 7 ||
        dataById?.model?.id === 8
      ) {
        arr.push({
          ...body,
          status:
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4 ||
            i === 5 ||
            i === 7 ||
            i === 8 ||
            i === 10 ||
            i === 11
              ? 'OK'
              : null,
          position:
            i === 0
              ? 'OK'
              : i === 10
              ? 'GOOD'
              : i === 1 || i === 2 || i === 3 || i === 4 || i === 6 || i === 9 || i === 11
              ? 'OUT'
              : i === 5 || i === 7 || i === 8
              ? 'IN'
              : null,
          id_inspeksi: data[i]?.id,
          quantity:
            i === 0 || i === 3 || i === 5 || i === 6 || i === 7 || i === 11
              ? 1
              : i === 1 || i === 2 || i === 4
              ? 3
              : i === 8 || i === 9
              ? 4
              : null,
        });
      } else if (dataById?.model?.id === 5) {
        arr.push({
          ...body,
          status:
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4 ||
            i === 5 ||
            i === 7 ||
            i === 8 ||
            i === 10 ||
            i === 11
              ? 'OK'
              : null,
          position:
            i === 0 || i === 3
              ? 'OK'
              : i === 1 ||
                i === 2 ||
                i === 6 ||
                i === 7 ||
                i === 9 ||
                i === 11 ||
                i === 12 ||
                i === 13
              ? 'OUT'
              : i === 4 || i === 5 || i === 8 || i === 10
              ? 'IN'
              : null,
          id_inspeksi: data[i]?.id,
          quantity:
            i === 13
              ? 10
              : i === 4
              ? 5
              : i === 5 || i === 6 || i === 7 || i === 8 || i === 10 || i === 11 || i === 12
              ? 1
              : i === 1 || i === 2
              ? 3
              : i === 9
              ? 2
              : null,
        });
      } else {
        arr.push({
          ...body,
          status: 'OK',
          position: 'OUT',
          id_inspeksi: data[i]?.id,
        });
      }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [data]);
  // console.log(dataById?.model?.name, ' dataById?.model?.name');

  props?.propsFromParrentpageState(pageState, getDisabled, data, getIdMesin);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        {loading === true ? (
          <FuseLoading />
        ) : data.length !== 0 ? (
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, minWidth: column.minWidth }}
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
                      {/* {setRowMap(row)} */}
                      {/* {console.log(row, 'row')} */}
                      <TableCell align="left" className={classes?.tableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {row?.general_desc === null ? '-' : row?.general_desc}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {/* mesin ATM */}
                        {dataById?.model?.id === 2 ? (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {index === 0 ? `OK/NG` : index === 8 ? 'GOOD/BAD' : `IN/OUT`}
                              </InputLabel>
                              {index === 0 ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  // defaultValue={
                                  //   row?.detail_inspeksi?.position === null
                                  //     ? row?.position
                                  //     : row?.detail_inspeksi?.position
                                  // }
                                  defaultValue="OK"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="NG">NG</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              ) : index === 8 ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  // defaultValue={
                                  //   row?.detail_inspeksi?.position === null
                                  //     ? row?.position
                                  //     : row?.detail_inspeksi?.position
                                  // }
                                  defaultValue="GOOD"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="GOOD">GOOD</MenuItem>
                                  <MenuItem value="BAD">BAD</MenuItem>
                                </Select>
                              ) : (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  defaultValue={
                                    index === 0
                                      ? 'OK'
                                      : index === 8
                                      ? 'GOOD'
                                      : index === 1 ||
                                        index === 2 ||
                                        index === 3 ||
                                        index === 5 ||
                                        index === 7 ||
                                        index === 9
                                      ? 'OUT'
                                      : index === 4 || index === 6
                                      ? 'IN'
                                      : null
                                  }
                                  // defaultValue="OUT"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="IN">IN</MenuItem>
                                  <MenuItem value="OUT">OUT</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              )}
                            </FormControl>
                          </Box>
                        ) : // mesin CRM, VBK, TCR, TTW
                        dataById?.model?.id === 4 ||
                          dataById?.model?.id === 6 ||
                          dataById?.model?.id === 7 ||
                          dataById?.model?.id === 8 ? (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {index === 0 ? `OK/NG` : index === 10 ? `GOOD/BAD` : `IN/OUT`}
                              </InputLabel>
                              {index === 0 ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  // defaultValue={
                                  //   row?.detail_inspeksi?.position === null
                                  //     ? row?.position
                                  //     : row?.detail_inspeksi?.position
                                  // }
                                  defaultValue="OK"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="NG">NG</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              ) : index === 10 ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  // defaultValue={
                                  //   row?.detail_inspeksi?.position === null
                                  //     ? row?.position
                                  //     : row?.detail_inspeksi?.position
                                  // }
                                  defaultValue="GOOD"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="GOOD">GOOD</MenuItem>
                                  <MenuItem value="BAD">BAD</MenuItem>
                                </Select>
                              ) : (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  defaultValue={
                                    index === 0
                                      ? 'OK'
                                      : index === 10
                                      ? 'GOOD'
                                      : index === 1 ||
                                        index === 2 ||
                                        index === 3 ||
                                        index === 4 ||
                                        index === 6 ||
                                        index === 9 ||
                                        index === 11
                                      ? 'OUT'
                                      : index === 5 || index === 7 || index === 8
                                      ? 'IN'
                                      : null
                                  }
                                  // defaultValue="OUT"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="IN">IN</MenuItem>
                                  <MenuItem value="OUT">OUT</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              )}
                            </FormControl>
                          </Box>
                        ) : dataById?.model?.id === 5 ? (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {index === 3 || index === 0
                                  ? `OK/NG`
                                  : index === 10
                                  ? `GOOD/BAD`
                                  : `IN/OUT`}
                              </InputLabel>
                              {index === 0 ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  // defaultValue={
                                  //   row?.detail_inspeksi?.position === null
                                  //     ? row?.position
                                  //     : row?.detail_inspeksi?.position
                                  // }
                                  defaultValue="OK"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="NG">NG</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              ) : index === 10 ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  // defaultValue={
                                  //   row?.detail_inspeksi?.position === null
                                  //     ? row?.position
                                  //     : row?.detail_inspeksi?.position
                                  // }
                                  defaultValue="IN"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="IN">IN</MenuItem>
                                  <MenuItem value="GOOD">GOOD</MenuItem>
                                  <MenuItem value="BAD">BAD</MenuItem>
                                </Select>
                              ) : (
                                <Select
                                  labelId="demo-simple-select-label"
                                  size="small"
                                  id="demo-simple-select"
                                  value={row?.position}
                                  defaultValue={
                                    index === 0 || index === 3
                                      ? 'OK'
                                      : index === 1 ||
                                        index === 2 ||
                                        index === 6 ||
                                        index === 7 ||
                                        index === 9 ||
                                        index === 11 ||
                                        index === 12 ||
                                        index === 13
                                      ? 'OUT'
                                      : index === 4 || index === 5 || index === 8 || index === 10
                                      ? 'IN'
                                      : null
                                  }
                                  // defaultValue="OUT"
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  label="Diluar/Didalam"
                                  onChange={(e) => {
                                    handleInOut(e, index, row);
                                  }}
                                  // onChange={(e) => setposition(e.target.value)}
                                >
                                  <MenuItem value="OK">OK</MenuItem>
                                  <MenuItem value="IN">IN</MenuItem>
                                  <MenuItem value="OUT">OUT</MenuItem>
                                  <MenuItem value="NA">N/A</MenuItem>
                                </Select>
                              )}
                            </FormControl>
                          </Box>
                        ) : (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">IN/OUT</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={row?.position}
                                // defaultValue={
                                //   row?.detail_inspeksi?.position === null
                                //     ? row?.position
                                //     : row?.detail_inspeksi?.position
                                // }
                                defaultValue="OUT"
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                label="Diluar/Didalam"
                                onChange={(e) => {
                                  handleInOut(e, index, row);
                                }}
                                // onChange={(e) => setposition(e.target.value)}
                              >
                                <MenuItem value="IN">IN</MenuItem>
                                <MenuItem value="OUT">OUT</MenuItem>
                                <MenuItem value="NA">N/A</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {/* mesin ATM */}
                        {dataById?.model?.id === 2 ? (
                          <TextField
                            id="outlined-basic"
                            size="small"
                            label="Jumlah"
                            type="number"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            value={row?.quantity}
                            defaultValue={
                              index === 0 || index === 4 || index === 5 || index === 9
                                ? 1
                                : index === 1 || index === 2 || index === 3
                                ? 3
                                : index === 6 || index === 7
                                ? 4
                                : null
                            }
                            onChange={(e) => {
                              HandleJumlah(e, index, row);
                            }}
                            // onChange={(e) => setquantity(e.target.value)}
                            variant="outlined"
                          />
                        ) : // mesin CRM, VBK, TCR, TTW
                        dataById?.model?.id === 4 ||
                          dataById?.model?.id === 6 ||
                          dataById?.model?.id === 7 ||
                          dataById?.model?.id === 8 ? (
                          <TextField
                            id="outlined-basic"
                            size="small"
                            label="Jumlah"
                            type="number"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            value={row?.quantity}
                            defaultValue={
                              index === 0 ||
                              index === 3 ||
                              index === 5 ||
                              index === 6 ||
                              index === 7 ||
                              index === 11
                                ? 1
                                : index === 1 || index === 2 || index === 4
                                ? 3
                                : index === 8 || index === 9
                                ? 4
                                : null
                            }
                            onChange={(e) => {
                              HandleJumlah(e, index, row);
                            }}
                            // onChange={(e) => setquantity(e.target.value)}
                            variant="outlined"
                          />
                        ) : dataById?.model?.id === 5 ? (
                          <TextField
                            id="outlined-basic"
                            size="small"
                            label="Jumlah"
                            type="number"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            value={row?.quantity}
                            defaultValue={
                              index === 13
                                ? 10
                                : index === 4
                                ? 5
                                : index === 5 ||
                                  index === 6 ||
                                  index === 7 ||
                                  index === 8 ||
                                  index === 10 ||
                                  index === 11 ||
                                  index === 12
                                ? 1
                                : index === 1 || index === 2
                                ? 3
                                : index === 9
                                ? 2
                                : null
                            }
                            onChange={(e) => {
                              HandleJumlah(e, index, row);
                            }}
                            // onChange={(e) => setquantity(e.target.value)}
                            variant="outlined"
                          />
                        ) : (
                          <TextField
                            id="outlined-basic"
                            size="small"
                            label="Jumlah"
                            type="number"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            value={row?.quantity}
                            onChange={(e) => {
                              HandleJumlah(e, index, row);
                            }}
                            // onChange={(e) => setquantity(e.target.value)}
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {/* mesin ATM */}
                        {dataById?.model?.id === 2 ? (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={row.status}
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                defaultValue={
                                  index === 0 ||
                                  index === 1 ||
                                  index === 2 ||
                                  index === 3 ||
                                  index === 4 ||
                                  index === 6 ||
                                  index === 8 ||
                                  index === 9
                                    ? 'OK'
                                    : null
                                }
                                // defaultValue="OK"
                                error={pageState[index]?.status === 'NG'}
                                label="OK/NG"
                                onChange={(e) => {
                                  handleOkNG(e, index);
                                }}
                                // onChange={(e) => setstatus(e.target.value)}
                              >
                                <MenuItem value="OK">OK</MenuItem>
                                <MenuItem value="NG">NG</MenuItem>
                                <MenuItem value="NA">N/A</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        ) : // mesin CRM, VBK, TCR, TTW
                        dataById?.model?.id === 4 ||
                          dataById?.model?.id === 6 ||
                          dataById?.model?.id === 7 ||
                          dataById?.model?.id === 8 ? (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={row.status}
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                defaultValue={
                                  index === 0 ||
                                  index === 1 ||
                                  index === 2 ||
                                  index === 3 ||
                                  index === 4 ||
                                  index === 5 ||
                                  index === 7 ||
                                  index === 8 ||
                                  index === 10 ||
                                  index === 11
                                    ? 'OK'
                                    : null
                                }
                                // defaultValue="OK"
                                error={pageState[index]?.status === 'NG'}
                                label="OK/NG"
                                onChange={(e) => {
                                  handleOkNG(e, index);
                                }}
                                // onChange={(e) => setstatus(e.target.value)}
                              >
                                <MenuItem value="OK">OK</MenuItem>
                                <MenuItem value="NG">NG</MenuItem>
                                <MenuItem value="NA">N/A</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        ) : (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={row.status}
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                defaultValue="OK"
                                error={pageState[index]?.status === 'NG'}
                                label="OK/NG"
                                onChange={(e) => {
                                  handleOkNG(e, index);
                                }}
                                // onChange={(e) => setstatus(e.target.value)}
                              >
                                <MenuItem value="OK">OK</MenuItem>
                                <MenuItem value="NG">NG</MenuItem>
                                <MenuItem value="NA">N/A</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        )}
                        {/* {console.log(pageState[index]?.status, 'ro')} */}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        <TextField
                          id="outlined-basic"
                          size="small"
                          label="Keterangan"
                          value={row?.keterangan}
                          disabled={
                            userRoles === 'GUEST' ||
                            userRoles === 'OPERATOR_TSS' ||
                            userRoles === 'GUEST_BANK' ||
                            userRoles === 'GUEST_DIP' ||
                            userRoles === 'GUEST_RELATED' ||
                            userRoles === 'OPERATOR_MOVER'
                          }
                          // defaultValue={
                          //   row?.detail_inspeksi?.keterangan === null
                          //     ? row?.keterangan
                          //     : row?.detail_inspeksi?.keterangan
                          // }
                          // type="number"
                          onChange={(e) => {
                            HandleKeterangan(e, index);
                          }}
                          variant="outlined"
                        />
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
