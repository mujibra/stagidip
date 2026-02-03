/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
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
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  const [dataDefault, setDataDefault] = useState([]);
  const [getTriggerTime, setgetTriggerTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id_po, setid_po] = useState('');
  const [no_mesin, setno_mesin] = useState('');
  const [sn_mesin, setsn_mesin] = useState('');
  const [id_inspeksi, setid_inspeksi] = useState('');
  const [pelaksana_div_mover, setpelaksana_div_mover] = useState('');
  const [position, setposition] = useState('');
  const [quantity, setquantity] = useState('');
  const [status, setstatus] = useState('');
  const [keterangan, setketerangan] = useState('');
  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [disable, setdisable] = useState(false);

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
        setData(res?.data?.data);
        setgetTriggerTime(res?.data?.time_preloading);
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
  };

  const getDataDefault = async () => {
    setLoading(true);

    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/${idPo}/${1}`, config)
      .then((res) => {
        // console.log(res, 'res');
        setDataDefault(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setDataDefault([]);
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
    getDataById();
    if (props?.getIdMesin?.idMesin !== 1) {
      getDataDefault();
    }
  }, [props?.getIdMesin?.idMesin]);
  // console.log(rowMap, 'rowMap');
  const [pageState, setPageState] = useState([]);
  const [getDisabled, setgetDisabled] = useState(false);
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
  // console.log(pageState, 'page');
  // console.log(dataDefault, 'dataDefault');

  // console.log(getTriggerTime, 'getTriggerTime');
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < data?.length; i++) {
      if (data?.length !== 0) {
        arr.push({
          ...body,
          status: 'OK',
          position:
            dataDefault[i]?.detail_inspeksi?.position === undefined
              ? ''
              : dataDefault[i]?.detail_inspeksi?.position,
          quantity:
            dataDefault[i]?.detail_inspeksi?.quantity === undefined
              ? ''
              : dataDefault[i]?.detail_inspeksi?.quantity,
          id_inspeksi: data[i]?.id,
        });
      }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [dataDefault, getTriggerTime, data]);
  // console.log(pageState, ' pageState');

  props?.propsFromParrentpageState(pageState, getDisabled, data, getIdMesin);

  const select2 = ['IN', 'OUT', 'NA'];
  const select = ['OK', 'NG'];
  const select1 = ['GOOD', 'BAD'];
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
                      <TableCell align="left" className={classes?.tableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {row?.general_desc === null ? '-' : row?.general_desc}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {dataDefault.length !== 0 && (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              {dataById?.model?.id === 2 ? (
                                <InputLabel id="demo-simple-select-label">
                                  {index === 0 ? `OK/NG` : index === 8 ? 'GOOD/BAD' : `IN/OUT`}
                                </InputLabel>
                              ) : dataById?.model?.id === 4 ||
                                dataById?.model?.id === 6 ||
                                dataById?.model?.id === 7 ||
                                dataById?.model?.id === 8 ? (
                                <InputLabel id="demo-simple-select-label">
                                  {index === 0 ? `OK/NG` : index === 10 ? `GOOD/BAD` : `IN/OUT`}
                                </InputLabel>
                              ) : dataById?.model?.id === 5 ? (
                                <InputLabel id="demo-simple-select-label">
                                  {index === 3 || index === 0
                                    ? `OK/NG`
                                    : index === 9
                                    ? `GOOD/BAD`
                                    : `IN/OUT`}
                                </InputLabel>
                              ) : (
                                <InputLabel id="demo-simple-select-label">IN/OUT</InputLabel>
                              )}
                              {/* <InputLabel id="demo-simple-select-label">
                            {index === 0 ? `OK/NG` : index === 8 ? 'GOOD/BAD' : `IN/OUT`}
                          </InputLabel> */}
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={row?.position}
                                defaultValue={
                                  dataDefault?.time_preloading !== null
                                    ? dataDefault[index]?.detail_inspeksi?.position
                                    : ''
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
                                // onChange={(e) => setposition(e.target.value)}
                              >
                                {dataById?.model?.id === 2
                                  ? index === 0
                                    ? select.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : index === 8
                                    ? select1.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : select2.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                  : dataById?.model?.id === 4 ||
                                    dataById?.model?.id === 6 ||
                                    dataById?.model?.id === 7 ||
                                    dataById?.model?.id === 8
                                  ? index === 0
                                    ? select.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : index === 10
                                    ? select1.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : select2.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                  : dataById?.model?.id === 5
                                  ? index === 3
                                    ? select.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : index === 9
                                    ? select1.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : select2.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                  : select2.map((i) => {
                                      return <MenuItem value={i}>{i}</MenuItem>;
                                    })}
                              </Select>
                            </FormControl>
                          </Box>
                        )}
                        {dataDefault.length === 0 && (
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              {dataById?.model?.id === 2 ? (
                                <InputLabel id="demo-simple-select-label">
                                  {index === 0 ? `OK/NG` : index === 8 ? 'GOOD/BAD' : `IN/OUT`}
                                </InputLabel>
                              ) : dataById?.model?.id === 4 ||
                                dataById?.model?.id === 6 ||
                                dataById?.model?.id === 7 ||
                                dataById?.model?.id === 8 ? (
                                <InputLabel id="demo-simple-select-label">
                                  {index === 0 ? `OK/NG` : index === 10 ? `GOOD/BAD` : `IN/OUT`}
                                </InputLabel>
                              ) : dataById?.model?.id === 5 ? (
                                <InputLabel id="demo-simple-select-label">
                                  {index === 3 || index === 0
                                    ? `OK/NG`
                                    : index === 9
                                    ? `GOOD/BAD`
                                    : `IN/OUT`}
                                </InputLabel>
                              ) : (
                                <InputLabel id="demo-simple-select-label">IN/OUT</InputLabel>
                              )}
                              {/* <InputLabel id="demo-simple-select-label">
                            {index === 0 ? `OK/NG` : index === 8 ? 'GOOD/BAD' : `IN/OUT`}
                          </InputLabel> */}
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={row?.position}
                                defaultValue={
                                  dataDefault?.time_preloading !== null
                                    ? dataDefault[index]?.detail_inspeksi?.position
                                    : ''
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
                                // onChange={(e) => setposition(e.target.value)}
                              >
                                {dataById?.model?.id === 2
                                  ? index === 0
                                    ? select.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : index === 8
                                    ? select1.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : select2.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                  : dataById?.model?.id === 4 ||
                                    dataById?.model?.id === 6 ||
                                    dataById?.model?.id === 7 ||
                                    dataById?.model?.id === 8
                                  ? index === 0
                                    ? select.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : index === 10
                                    ? select1.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : select2.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                  : dataById?.model?.id === 5
                                  ? index === 3
                                    ? select.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : index === 9
                                    ? select1.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                    : select2.map((i) => {
                                        return <MenuItem value={i}>{i}</MenuItem>;
                                      })
                                  : select2.map((i) => {
                                      return <MenuItem value={i}>{i}</MenuItem>;
                                    })}
                              </Select>
                            </FormControl>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left" className={classes?.tableCell}>
                        {dataDefault.length !== 0 && (
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
                            defaultValue={
                              dataDefault?.time_preloading !== null
                                ? dataDefault[index]?.detail_inspeksi?.quantity
                                : ''
                            }
                            value={row?.quantity}
                            onChange={(e) => {
                              HandleJumlah(e, index, row);
                            }}
                            // onChange={(e) => setquantity(e.target.value)}
                            variant="outlined"
                          />
                        )}
                        {dataDefault.length === 0 && (
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
                            defaultValue={
                              dataDefault?.time_preloading !== null
                                ? dataDefault[index]?.detail_inspeksi?.quantity
                                : ''
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
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex-col justify-center items-center gap-5">
              <Alert severity="warning">
                {props?.dataById?.mesin?.type} Template has not been created yet, Please go to the{' '}
                <Link className="font-medium" to="/apps/registration/preloading">
                  Preloading Details Menu.
                </Link>
              </Alert>
            </div>
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
