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
const top100Films = [
  { label: 'Datindo', year: 1994 },
  { label: 'Datindo -Wahana', year: 1972 },
  { label: 'Datindo -Toyo', year: 1974 },
  { label: 'Datindo -Cepi', year: 2008 },
];

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

function createData(id, general_desc, detail_inspeksi, in_out_info) {
  return { id, general_desc, detail_inspeksi, in_out_info };
}

// keterangan,
// no_mesin,
// position,
// quantity,
// sn_mesin,
// status,
export default function HandleEditTemplate(props) {
  const idPo = props?.idPO;
  const getIdMesin = props?.getIdMesin?.snMesin;
  const userRoles = props?.userRoles;
  const dataById = props?.dataById;
  const triggerTemplate = props?.triggerTemplate;
  // console.log(dataById, 'dataById');

  // console.log(props, 'props');
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
  const [dataTemplate, setDataTemplate] = React.useState([]);
  // console.log(data, 'data');
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
  const [timer1, setTimer1] = React.useState(null);
  // console.log(timer1, 'timerrr')
  const [valuepelaksana_div_mover, setvaluepelaksana_div_mover] = React.useState('');
  const [indexs, setindexs] = React.useState('');

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

  const rows = datas?.map((item, index) =>
    createData(item?.id, item?.general_desc, item?.detail_inspeksi, item?.in_out_info)
  );

  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPo}/${props?.getIdMesin?.idMesin}`,
        config
      )
      .then((res) => {
        setDatas(res?.data?.data);

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
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPo}/${
            triggerTemplate === 'template' ? 1 : props?.getIdMesin?.idMesin
          }`,
          config
        )
        .then((res) => {
          // console.log(res, 'ressss')
          setTimer1(res?.data?.time_preloading);
          setData(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setData([]);
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
    }
    return () => {
      isUnmout = true;
    };
  }, [triggerTemplate]);

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
    }
    // console.log(pageState, 'state');
  };
  const HandleKeterangan = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.keterangan = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
    // console.log(pageState, 'state');
  };
  // console.log(pageState, 'state');

  React.useEffect(() => {
    const arr = [];
    const dataArr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push({
        ...body,
        id_inspeksi: data[i]?.id,
        position: data[i]?.detail_inspeksi?.position,
        quantity: data[i]?.detail_inspeksi?.quantity,
        status: data[i]?.detail_inspeksi?.status,
        keterangan: data[i]?.detail_inspeksi?.keterangan,
      });

      // console.log(data[i].detail_inspeksi, 'm');
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [data]);
  props?.propsFromParrentpageState(pageState, getDisabled, data, getIdMesin, timer1);
  // console.log(data, 'data')

  return (
    <Paper sx={{ width: '100%' }}>
      <div className="w-full flex justify-end m-5 mr-10">
        {/* <Button className="mr-32" variant="contained" onClick={HandleEditTemplate}>
          Edit
        </Button> */}
      </div>
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
                      <TableCell align="left" className={classes?.tableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {row?.general_desc === null ? '-' : row?.general_desc}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            {row?.in_out_info?.label}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            size="small"
                            id="demo-simple-select"
                            value={row?.position}
                            defaultValue={
                              row?.detail_inspeksi?.position === null
                                ? row?.position
                                : row?.detail_inspeksi?.position
                            }
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
                          >
                            {row?.in_out_info?.option?.map((i) => {
                              // console.log(i);
                              return <MenuItem value={i}>{i}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
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
                            row?.detail_inspeksi?.quantity === null
                              ? row?.quantity
                              : row?.detail_inspeksi?.quantity
                          }
                          onChange={(e) => {
                            HandleJumlah(e, index, row);
                          }}
                          // onChange={(e) => setquantity(e.target.value)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
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
                                row?.detail_inspeksi?.status === null
                                  ? row?.status
                                  : row?.detail_inspeksi?.status
                              }
                              label="OK/NG"
                              error={pageState[index]?.status === 'NG'}
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
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        <TextField
                          id="outlined-basic"
                          size="small"
                          label="Keterangan"
                          disabled={
                            userRoles === 'GUEST' ||
                            userRoles === 'OPERATOR_TSS' ||
                            userRoles === 'GUEST_BANK' ||
                            userRoles === 'GUEST_DIP' ||
                            userRoles === 'GUEST_RELATED' ||
                            userRoles === 'OPERATOR_MOVER'
                          }
                          value={row?.keterangan}
                          defaultValue={
                            row?.detail_inspeksi?.keterangan === null
                              ? row?.keterangan
                              : row?.detail_inspeksi?.keterangan
                          }
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
