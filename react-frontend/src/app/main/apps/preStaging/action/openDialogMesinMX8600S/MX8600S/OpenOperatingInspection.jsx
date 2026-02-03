/* eslint-disable no-const-assign */
/* eslint-disable no-sequences */
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
import { Box } from '@mui/system';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

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

const resultDetail = [
  {
    id: 1,
    name: 'Hour',
  },
  {
    id: 2,
    name: 'Minute',
  },
  {
    id: 3,
    name: 'Second',
  },
];

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
  {
    id: 'problem',
    label: 'Problem',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'remake',
    label: 'Remake',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, result_detail, test_desc) {
  return { id, result_detail, test_desc };
}

export default function OpenOperatingInspection(props) {
  const getUser = JSON.parse(localStorage.getItem("user_profile"));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  // console.log(props.getDisable, 'pr')
  // console.log(props, 'props')
  const classes = useStyles();
  const getIdMesinPo = props?.dataById?.mesin?.id;
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
  const [id_checklist_staging, setid_checklist_staging] = useState('');
  const [id_divisi, setid_divisi] = useState('');
  const [results, setresults] = useState('');
  const [problem, setproblem] = useState(null);
  const [action, setaction] = useState(null);
  const [remark, setremark] = useState(null);
  const [fill_columns, setfill_columns] = useState(null);

  const [DataProblem, setDataProblem] = useState([]);
  const [LoadingProblem, setLoadingProblem] = useState(false);
  const [DataAction, setDataAction] = useState([]);
  const [LoadingAction, setLoadingAction] = useState(false);
  const [DataRemake, setDataRemake] = useState([]);
  const [LoadingRemake, setLoadingRemake] = useState(false);

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [hour2, setHour2] = useState('');
  const [minute2, setMinute2] = useState('');
  const [second2, setSecond2] = useState('');
  const rows = data?.map((item, index) =>
    createData(item?.id, item?.result_detail, item?.test_desc)
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
  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}dataTableChecklist/${getIdMesinPo}/${getIdDivision}`,
        config
      )
      .then((res) => {
        setdata(res?.data?.data.checklistStaging);
        setnameHeader(res?.data?.data?.name);
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

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      getDataProblem();
      getDataAction();
      getDataRemake();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
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
  const [pageState, setPageState] = useState([]);
  const handleInOut = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      setresults((copyObject.results = e.target.value));
      copyObject.results = e.target.value;
      copyObject.id_divisi = idDivisi;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleProblem = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      setproblem((copyObject.problem = newValue?.id));

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
      setaction((copyObject.action = newValue?.id));
      copyObject.action = newValue?.id;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const handleRemake = (e, newValue, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      setremark((copyObject.remark = newValue?.id));
      copyObject.remark = newValue?.id;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push({
        ...body,
        // id_inspeksi: i + 1,
        result_details: data[i]?.result_detail,
        id_checklist_staging: data[i]?.id,
        id_divisi: idDivisi,
        results: 'OK',
        problem,
        action,
        remark,
        fill_columns: i === 2 ? [hour, minute, second] : i === 3 ? [hour2, minute2, second2] : null,
      });
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [data, idDivisi, hour, minute, second, hour2, minute2, second2]);

  props.pullData(pageState);
  // console.log(pageState, 'pageState');

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
                          {index === 2 ? (
                            <TableCell align="center" className={classes?.tableCell}>
                              <div className="flex flex-col gap-5">
                                {row?.result_detail === null ? '-' : row?.result_detail}
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
                                  onChange={(e) => setHour(e.target.value)}
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
                                  onChange={(e) => setMinute(e.target.value)}
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
                                  onChange={(e) => setSecond(e.target.value)}
                                  id="standard-basic"
                                  label="Second"
                                  variant="outlined"
                                />
                              </div>
                            </TableCell>
                          ) : index === 3 ? (
                            <TableCell align="center" className={classes?.tableCell}>
                              <div className="flex flex-col gap-5">
                                {row?.result_detail === null ? '-' : row?.result_detail}
                                <TextField
                                  disabled={
                                    userRoles === 'GUEST' ||
                                    userRoles === 'OPERATOR_TSS' ||
                                    userRoles === 'GUEST_BANK' ||
                                    userRoles === 'GUEST_DIP' ||
                                    userRoles === 'GUEST_RELATED' ||
                                    userRoles === 'OPERATOR_MOVER'
                                  }
                                  value={hour2}
                                  onChange={(e) => setHour2(e.target.value)}
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
                                  onChange={(e) => setMinute2(e.target.value)}
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
                                  onChange={(e) => setSecond2(e.target.value)}
                                  id="standard-basic"
                                  label="Second"
                                  variant="outlined"
                                />
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell align="center" className={classes?.tableCell}>
                              {row?.result_detail === null ? '-' : row?.result_detail}
                            </TableCell>
                          )}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                              <Select
                                // size="small"
                                label="OK/NG"
                                defaultValue="OK"
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
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
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          <Autocomplete
                            disablePortal
                            id="idProblem"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            options={DataProblem}
                            value={row.problem}
                            fullWidth
                            // onFocus={handleFocus}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            loading={LoadingProblem === true}
                            focused
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
                            disablePortal
                            id="idAction"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            options={DataAction}
                            value={row.action}
                            fullWidth
                            // onFocus={handleFocus}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            loading={LoadingAction === true}
                            focused
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
                            disablePortal
                            id="idRemake"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            options={DataRemake}
                            value={row.remake}
                            fullWidth
                            // onFocus={handleFocus}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            loading={LoadingRemake === true}
                            focused
                            onChange={(e, newValue) => {
                              handleRemake(e, newValue, index);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Remake"
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                              />
                            )}
                          />
                        </TableCell>
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
