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
import { Button } from '@mui/material';

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
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'jumlah',
    label: 'Jumlah',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'okNg',
    label: 'OK/NG',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'keterangan',
    label: 'Keterangan',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, general_desc) {
  return { id, general_desc };
}

export default function HandleEdit(props) {
  const idPo = props?.idPO;
  const getIdMesin = props?.getIdMesin?.snMesin;

  // console.log(props, 'props');
  const classes = useStyles();
  const dispatch = useDispatch();
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datas, setDatas] = React.useState([]);
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
  const [valuepelaksana_div_mover, setvaluepelaksana_div_mover] = React.useState('');
  const [indexs, setindexs] = React.useState('');

  // let body = '';

  const body = {
    id_po: idPo,
    sn_mesin: getIdMesin,
    no_mesin,
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

  const rows = datas?.map((item, index) => createData(item?.id, item?.general_desc));

  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}dataTableInspeksi/`, config)
      .then((res) => {
        setDatas(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setDatas([]);
        setLoading(false);
        const errStatus = err.response.status;
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
  // console.log(datas, 'datas');
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const [pageState, setPageState] = React.useState([]);
  const handleInOut = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.no_mesin = index + 1;
      copyObject.id_inspeksi = index + 1;
      copyObject.position = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
    // console.log(pageState, 'state');
  };
  const HandleJumlah = (e, index) => {
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
    for (let i = 0; i < datas.length; i++) {
      arr.push(body);
    }
    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [datas]);

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/`, pageState, config)
      .then((res) => {
        console.log();
        // setOpen(!open);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Button onClick={handleSubmit}>test</Button>
      <TableContainer sx={{ maxHeight: 650 }}>
        {loading === true ? (
          <FuseLoading />
        ) : datas.length !== 0 ? (
          <Table stickyHeader aria-label="sticky table">
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
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.id === null ? '-' : row?.id}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        {row?.general_desc === null ? '-' : row?.general_desc}
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">IN/OUT</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={row?.position}
                              label="Diluar/Didalam"
                              onChange={(e) => {
                                handleInOut(e, index);
                              }}
                              // onChange={(e) => setposition(e.target.value)}
                            >
                              <MenuItem value="IN">IN</MenuItem>
                              <MenuItem value="OUT">OUT</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        <TextField
                          id="outlined-basic"
                          label="Jumlah"
                          type="number"
                          value={row?.quantity}
                          onChange={(e) => {
                            HandleJumlah(e, index);
                          }}
                          // onChange={(e) => setquantity(e.target.value)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={row.status}
                              label="OK/NG"
                              onChange={(e) => {
                                handleOkNG(e, index);
                              }}
                              // onChange={(e) => setstatus(e.target.value)}
                            >
                              <MenuItem value="OK">OK</MenuItem>
                              <MenuItem value="NG">NG</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell align="center" className={classes?.tableCell}>
                        <TextField
                          id="outlined-basic"
                          label="Keterangan"
                          value={row?.keterangan}
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
        rowsPerPageOptions={[10, 25, 100]}
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
