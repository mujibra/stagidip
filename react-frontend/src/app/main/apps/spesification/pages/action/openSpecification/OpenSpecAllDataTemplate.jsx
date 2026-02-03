/* eslint-disable array-callback-return */
/* eslint-disable no-fallthrough */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

const top100Films = [
  { label: 'Pilihan 1', id: 1 },
  { label: 'Pilihan 2', id: 2 },
  { label: 'Pilihan 3', id: 3 },
  { label: 'Pilihan 4', id: 4 },
  { label: 'Pilihan 6', id: 5 },
  { label: 'Pilihan 7', id: 6 },
  { label: 'Pilihan 8', id: 7 },
];

const columns = [
  { id: 'no', label: 'NO', minWidth: 50 },
  {
    id: 'item',
    label: 'Item',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'dekkripsi',
    label: 'Deksripsi',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'results',
    label: 'Results',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, parent, data_item, results) {
  return { id, parent, data_item, results };
}

// console.log(rows, 'rr');

export default function OpenSpecAllDataTemplate(props) {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }
  if (!userRoles) {
    console.log();
  }
  const getRow = props?.getRow;
  // console.log(getRow, 'getttttttt')
  const dataDetail = props?.dataDetail;
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const dispatch = useDispatch();
  const [dataListAll, setDataListAll] = useState([]);
  const [dataDetails, setDataDetails] = useState(dataDetail);
  const [dataListAllLoading, setDataListAllLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [getIds, seGetId] = useState(getRow?.id);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [getTrigger, setGetTrigger] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  // console.log(data, 'data');

  const rows = data?.map((item, index) =>
    createData(item?.id, item?.parent, item?.data_item, item?.results)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [fill_description, setfill_description] = useState(null);
  const body = {
    id_spek_mesin_hdr: null,
    item_parent: null,
    fill_description: null,
    id_parent: null,
    results: null,
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
  const handleAllState = (e, newValue, index, multi = false, idxMulti = 0) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      if (newValue) {
        copyObject.fill_description[idxMulti] = newValue?.id;
      } else {
        copyObject.fill_description[idxMulti] = null;
      }
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}spekmesin-detail/v2/${getRow?.id}`,
        config
      )
      .then((res) => {
        setData(res?.data?.datas);
        setGetTrigger(res?.data?.specification_dtl_status);
        setLoading(false);
        // console.log(res);
      })
      .catch((err) => {
        setData([]);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDataDetails(dataDetail);
  }, [dataDetail]);

  useEffect(() => {
    const arr = [];
    const arrBody = [];
    for (let i = 0; i < data.length; i++) {
      arrBody.push(
        data[i]?.data_item?.map((items) =>
          items?.item_selected?.id === undefined ? null : items?.item_selected?.id
        )
      );
      if (arrBody.length !== 0) {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_parent: data[i]?.parent,
          id_parent: data[i]?.id,
          results: data[i]?.results === undefined ? 'OK' : data[i]?.results,
          fill_description: arrBody[i],
        });
      }
    }
    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [data, props?.getRow?.id, dataDetail]);

  if (loading === true) {
    return <FuseLoading />;
  }

  props?.propsFromParent(pageState, getTrigger);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 900 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <div className="text-sm ml-40">
                  <div>
                    <div id="alert-dialog-title">
                      No PO :{' '}
                      {getRow?.detail_po?.no_po === undefined ? '-' : getRow?.detail_po?.no_po}
                    </div>
                    <div id="alert-dialog-title">
                      Customer :
                      {getRow?.customer?.bank_desc === undefined
                        ? '-'
                        : getRow?.customer?.bank_desc}
                    </div>
                    <div id="alert-dialog-title">
                      Type :{getRow?.model?.name === undefined ? '-' : getRow?.model?.name}
                    </div>
                    <div id="alert-dialog-title">
                      PartNumber :{getRow?.pn_system === undefined ? '-' : getRow?.pn_system}
                    </div>
                    <div id="alert-dialog-title">
                      Time : {getRow?.time_todo === null || '' ? '-' : getRow?.time_todo}
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 93, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {rowsPerPage * page + index + 1}.)
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.parent}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Box sx={{ minWidth: 120 }}>
                      <div className="w-full flex gap-5">
                        {row?.data_item.map((item, idx) => {
                          return (
                            <Autocomplete
                              size="small"
                              disablePortal
                              disabled={
                                userRoles === 'GUEST' ||
                                userRoles === 'GUEST_BANK' ||
                                userRoles === 'GUEST_DIP' ||
                                userRoles === 'OPERATOR_TSS'
                              }
                              id="combo-box-demo"
                              getOptionLabel={(n) => n.description}
                              // getOptionSelected={(option) => option?.id}
                              isOptionEqualToValue={(option, value) => option?.id === value?.id}
                              options={item?.list_item}
                              // onFocus={() => handleFocus(item?.ParamsOnfocus, item?.id)}
                              defaultValue={item?.item_selected}
                              // value={item?.description}
                              // value={values}
                              loading={dataListAllLoading === true}
                              onChange={(e, newValue) => {
                                handleAllState(e, newValue, index, true, idx);
                                // setMemory1(newValue);
                              }}
                              sx={{ width: 200 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                  label={item?.label}
                                />
                              )}
                              u
                            />
                          );
                        })}
                      </div>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box sx={{ minWidth: 50 }}>
                      {dataDetails !== undefined && dataDetails?.length > 0 && (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                          <Select
                            size="small"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'OPERATOR_TSS'
                            }
                            label="OK/NG"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={row.result}
                            defaultValue={row?.results === undefined ? 'OK' : row?.results}
                            // value={row.result === -1 ? '' : row.result}
                            onChange={(e) => {
                              handleInOut(e, index, row);
                            }}
                          >
                            <MenuItem value="OK">OK</MenuItem>
                            <MenuItem value="NG">NG</MenuItem>
                            <MenuItem value="NA">N/A</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      {dataDetail?.length === 0 ? (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                          <Select
                            size="small"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'OPERATOR_TSS'
                            }
                            label="OK/NG"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={row.result}
                            defaultValue={
                              dataDetail[index]?.results === 'OK' ||
                              dataDetail[index]?.results === undefined ||
                              dataDetail[index]?.results === null
                                ? 'OK'
                                : dataDetail[index]?.results
                            }
                            // value={row.result === -1 ? '' : row.result}
                            onChange={(e) => {
                              handleInOut(e, index, row);
                            }}
                          >
                            <MenuItem value="OK">OK</MenuItem>
                            <MenuItem value="NG">NG</MenuItem>
                            <MenuItem value="NA">N/A</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        ''
                        // console.log('else')
                      )}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 150, 200]}
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
