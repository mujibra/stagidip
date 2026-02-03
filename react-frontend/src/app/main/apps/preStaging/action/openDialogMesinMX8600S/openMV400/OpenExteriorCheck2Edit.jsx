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
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
    id: 'unit',
    label: 'Unit',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'partNumber',
    label: 'Part Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'revFinal',
    label: '(Rev) Final',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'revNow',
    label: '(Rev) Now',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'serialNumber',
    label: 'Serial Number',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'result',
    label: 'Result',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'inspectorSign',
    label: 'Inspector Sign',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'fixDescription',
    label: 'Fix Description',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, unit, part_number, rev_final, detail_staging) {
  return { id, unit, part_number, rev_final, detail_staging };
}

export default function OpenExteriorCheck2Edit(props) {
  const getUser = JSON.parse(localStorage.getItem("user_profile"));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const classes = useStyles();
  const getIdMesinPo = props?.dataById?.mesin?.id;
  const getIdDivision = props?.getIdDivision?.id;
  const getIdMesin = props?.getIdMesin;
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
  const [units, setunits] = useState('');
  const [id_divisi, setid_divisi] = useState('');
  const [id_po, setid_po] = useState(null);
  const [no_mesin, setno_mesin] = useState(null);
  const [results, setresults] = useState('OK');
  const [sn_mesin, setsn_mesin] = useState(null);
  const [id_classification, setnameid_classification] = useState(null);
  const [id_checklist_staging, setid_checklist_staging] = useState(null);
  const [sn_part, setsn_part] = useState(null);
  const [inspector_sign, setinspector_sign] = useState(null);
  const [fix_description, setfix_description] = useState(null);
  const [checkpoint_desc, setcheckpoint_desc] = useState(null);
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

  // console.log(data, 'data');
  const rows = data?.map((item, index) =>
    createData(item?.id, item?.unit, item?.part_number, item?.rev_final, item?.detail_staging)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStagingMv400/${idPo}/${getIdMesin?.idMesin}/${getIdDivision}`,
        config
      )
      .then((res) => {
        // console.log(res.data.data[0]?.checklistStaging, 'res');
        setdata(res.data.data[0]?.checklistStaging);
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
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  const body = {
    id_po,
    no_mesin,
    sn_mesin,
    id_classification,
    id_checklist_staging,
    checkpoint_desc,
    sn_part,
    results,
    inspector_sign,
    fix_description,
  };

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
        results: data[i]?.results,
        id_po: idPo,
        sn_mesin: getIdMesin?.snMesin,
        no_mesin: getIdMesin?.idMesin,
        inspector_sign: data[i]?.inspector_sign,
        sn_part: data[i]?.sn_part,
        fix_description: data[i]?.fix_description,
        id_classification: data[i]?.id_classification,
        checkpoint_desc: data[i]?.checkpoint_desc,
        id_checklist_staging: data[i]?.id,
      });
      // }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [data]);

  props.pullData(pageState, getIdDivision);

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
                    style={{ top: 33, minWidth: column.minWidth }}
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
                          {row?.unit === null ? '-' : row?.unit}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.part_number === null ? '-' : row?.part_number}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          {row?.rev_final === null ? '-' : row?.rev_final}
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          -
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Serial Number"
                            value={row.sn_part}
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            defaultValue={
                              row?.detail_staging?.sn_part === null
                                ? row?.sn_part
                                : row?.detail_staging?.sn_part
                            }
                            onChange={(e, newValue) => {
                              handlePartNumber(e, newValue, index);
                            }}
                            // defaultValue="Hello World"
                          />
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
                                label="OK/NG"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={row.result}
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
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Inspector Sign"
                            value={row.inspector_sign}
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            defaultValue={
                              row?.detail_staging?.inspector_sign === null
                                ? row?.inspector_sign
                                : row?.detail_staging?.inspector_sign
                            }
                            onChange={(e, newValue) => {
                              handleInspectorSign(e, newValue, index);
                            }}
                            // defaultValue="Hello World"
                          />
                        </TableCell>
                        <TableCell align="center" className={classes?.tableCell}>
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Fix Description"
                            value={row.fix_description}
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            defaultValue={
                              row?.detail_staging?.fix_description === null
                                ? row?.fix_description
                                : row?.detail_staging?.fix_description
                            }
                            onChange={(e, newValue) => {
                              handleFixDescription(e, newValue, index);
                            }}
                            // defaultValue="Hello World"
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
