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

function createData(id, detail_staging, test_desc, result_detail) {
  return { id, detail_staging, test_desc, result_detail };
}

export default function Open1Edit(props) {
  const classes = useStyles();
  const getUser = JSON.parse(localStorage.getItem("user_profile"));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const getIdMesin = props?.getIdMesin?.idMesin;
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
  const dataById = props?.dataById;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  // console.log(data, 'data')
  const [nameHeader, setnameHeader] = useState('');
  const [idDivisi, setidDivisi] = useState('');
  const [getIdDivisionForParent, setgetIdDivisionForParent] = useState('');
  const [result_details, setresult_details] = useState('');
  const [id_checklist_staging, setid_checklist_staging] = useState('');
  const [id_divisi, setid_divisi] = useState('');
  const [results, setresults] = useState('');
  const [problem, setproblem] = useState(null);
  const [action, setnameaction] = useState(null);
  const [remark, setremark] = useState(null);

  const [DataProblem, setDataProblem] = useState([]);
  const [LoadingProblem, setLoadingProblem] = useState(false);
  const [DataAction, setDataAction] = useState([]);
  const [LoadingAction, setLoadingAction] = useState(false);
  const [DataRemake, setDataRemake] = useState([]);
  const [LoadingRemake, setLoadingRemake] = useState(false);
  const rows = data?.map((item, index) =>
    createData(item?.id, item?.detail_staging, item?.test_desc, item?.result_detail)
  );

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
  const getDataById = async () => {
    setLoading(true);
    setgetIdDivisionForParent(getIdDivision);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPo}/${getIdMesin}/${getIdDivision}`,
        config
      )
      .then((res) => {
        setdata(res?.data?.data[0].checklistStaging);
        setnameHeader(res?.data?.data[0]?.name);
        setidDivisi(res?.data?.data?.id);
        setLoading(false);
        // console.log(res.data, 'dataa');
        props?.getData();
        // props?.handleOpen();
      })
      .catch((err) => {
        setLoading(false);
        setdata([]);
        console.log('err');
        const errStatus = err.response.status;
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
      getDataById();
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
  };

  const [pageState, setPageState] = useState([]);
  const handleInOut = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.results = e.target.value;
      copyObject.id_divisi = idDivisi;
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
      // console.log(pageState, 'pageState');
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
      copyObject.remark = newValue?.id;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  useEffect(() => {
    const arr = [];
    // if (idDivisi !== '') {
    for (let i = 0; i < data.length; i++) {
      arr.push({
        ...body,
        result_details: data[i]?.result_detail,
        id_checklist_staging: data[i]?.id,
        id_divisi: idDivisi,
        // test: data[i]?.detail_staging?.results === null ? '' : data[i]?.detail_staging?.results,
        results: data[i]?.detail_staging?.results,
        problem:
          data[i]?.detail_staging?.problem === null ? null : data[i]?.detail_staging?.problem?.id,
        action:
          data[i]?.detail_staging?.action === null ? null : data[i]?.detail_staging?.action?.id,
        remark:
          data[i]?.detail_staging?.remark === null ? null : data[i]?.detail_staging?.remark?.id,
      });
      // }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [data, idDivisi]);

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
                        <TableCell align="center" className={classes?.tableCell}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                              <Select
                                // size="small"
                                disabled={
                                  userRoles === 'GUEST' ||
                                  userRoles === 'OPERATOR_TSS' ||
                                  userRoles === 'GUEST_BANK' ||
                                  userRoles === 'GUEST_DIP' ||
                                  userRoles === 'GUEST_RELATED' ||
                                  userRoles === 'OPERATOR_MOVER'
                                }
                                labelId="demo-simple-select-label"
                                label="OK/NG"
                                id="demo-simple-select"
                                value={row.results}
                                defaultValue={
                                  row?.detail_staging?.results === null
                                    ? row?.results
                                    : row?.detail_staging?.results
                                }
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
                            options={DataProblem}
                            value={row.problem}
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
                            options={DataAction}
                            value={row.action}
                            defaultValue={
                              row?.detail_staging?.action === null
                                ? row?.action
                                : row?.detail_staging?.action
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
                            options={DataRemake}
                            value={row.remake}
                            defaultValue={
                              row?.detail_staging?.remark === null
                                ? row?.remark
                                : row?.detail_staging?.remark
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
