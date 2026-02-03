/* eslint-disable no-nested-ternary */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
// import { useRef,  } from "react";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { AddCircleOutline } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import HandleAddDetail from './action/HandleAddDetail';

const EnhancedTable = (props) => {
  const userRoles = props?.userRoles;
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const [pageState, setPageState] = useState([]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
    props.setPage(newPage);
  };

  useEffect(() => {
    setPageSize(props.rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rowsPerPage]);

  // const id_mesin = props.idMesin;
  const [valueSNPart, setvalueSNPart] = useState([]);
  const [valuePartModel, setvaluePartModel] = useState([]);
  const [idxErr, setIndxErr] = useState([]);

  function errTextfield(arr, val, idx) {
    let result = false;
    if (arr?.length !== 0) {
      for (let index = 0; index < arr?.length; index++) {
        if (arr[index] === null || arr[index] === '') {
          result = false;
        }
      }
    }
    const indexDuplicate = arr?.indexOf(val);
    if (indexDuplicate !== idx) {
      result = true;
    }
    return result;
  }
  const [errTextField, setTextField] = useState(false);
  const [getDisabled, setgetDisabled] = useState(false);
  const [getDisabledBtn, setgetDisabledBtn] = useState(true);
  // console.log(getDisabledBtn, 'getDisabledBtn');
  const handleChangeSNField = (e, index, newValue, multi = false, idxMulti) => {
    const target = e.target.value;
    let disabledIfSameValue = false;
    for (let i = 0; i < valueSNPart?.length; i++) {
      if (valueSNPart[i] === null || valueSNPart[i] === '') {
        disabledIfSameValue = false;
        setTextField(false);
      }
    }

    if (valueSNPart.indexOf(target) !== -1 && valueSNPart.includes('-') !== true) {
      disabledIfSameValue = true;
      setTextField(true);
    } else {
      disabledIfSameValue = false;
      setTextField(false);
    }
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      if (idxMulti === 0) {
        copyObject.scan_barcode = e.target.value === '' ? null : e.target.value;
      } else if (idxMulti === 2) {
        copyObject.part_model = e.target.value === '' ? null : e.target.value;
      } else {
        copyObject.part_no_from_stag_change =
          newValue?.part_no === undefined ? null : newValue?.part_no;
      }
      const targets = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
      const disableOkNg = [];
      for (let i = 0; i < page.length; i++) {
        if (pageState[i].scan_barcode !== null) {
          disableOkNg.push(pageState[i]?.scan_barcode);
        }
      }
      if (disableOkNg.length !== 0 && disableOkNg.length !== 1) {
        const getDisableOkNg = disableOkNg.includes(targets);
        setgetDisabled(getDisableOkNg);
      }
      const dataDisablePartNumber = [];
      if (pageState.length !== 0) {
        for (let idx = 0; idx < pageState.length; idx++) {
          dataDisablePartNumber.push(pageState[idx]?.scan_barcode);
        }
      }
      const getDisable = dataDisablePartNumber.includes(null);
      setgetDisabledBtn(disabledIfSameValue);
      // console.log(getDisable, 'parrent btn');
      // localStorage.setItem('stagingBtnTrue', JSON.stringify(getDisable));
      props.pull_data(pageState, valueSNPart, disabledIfSameValue, getDisable);
    }
    setvalueSNPart((prev) => {
      prev[index] = e.target.value === '' ? null : e.target.value;
      return prev;
    });
    setvaluePartModel((prev) => {
      prev[index] = e.target.value === '' ? null : e.target.value;
      return prev;
    });
  };

  useEffect(() => {
    const newObject = Array.from(page.map((ele) => ele.original));
    setPageState([...newObject]);
    if (page.length > 0) {
      for (let row = 0; row < page.length; row += 1) {
        for (let cell = 0; cell < page[row].cells.length; cell += 1) {
          if (page[row].cells[cell].column.id === 'scan_barcode') {
            const newArray = valueSNPart;
            // const newPage = pageState;
            // newPage[row].cells[cell].value = (page[row].cells[cell].value);
            newArray[row] = page[row].cells[cell].value;
            page[row].cells[cell].value = newArray[row];
            setvalueSNPart(newArray);
            // setIndxErr(Array(n))
            // setPageState(newPage);
          }
          if (page[row].cells[cell].column.id === 'part_model') {
            const newArray = valuePartModel;
            // const newPage = pageState;
            // newPage[row].cells[cell].value = (page[row].cells[cell].value);
            newArray[row] = page[row].cells[cell].value;
            page[row].cells[cell].value = newArray[row];
            setvaluePartModel(newArray);
            // setIndxErr(Array(n))
            // setPageState(newPage);
          }
        }
      }
      // setPageState(page);
    }
  }, [valueSNPart, valuePartModel, page]);

  const inputRefs = useRef([]);
  const handleKeyPress = (index) => () => {
    const nextIndex = index + 1;
    inputRefs?.current[nextIndex]?.focus();
  };

  // handleAutofield
  // const [part_no, setpart_no] = useState(null);
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dispatch = useDispatch();
  const [dataListAll, setDataListAll] = useState([]);
  const [dataListAllLoading, setDataListAllLoading] = useState(false);
  const [getIdMesin, setgetIdMesin] = useState([]);
  const [idMesin, setidMesin] = useState(0);
  const [partNo, setpartNo] = useState(0);
  const [getPartNumber, setgetPartNumber] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDataPO, setLoadingDataPO] = useState(true);
  const [loadingPartNumber, setLoadingPartNumber] = useState(true);
  const routeParams = useParams();
  const id = routeParams['*'];
  // console.log(id, 'id');
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line camelcase
  const [part_no, setpart_no] = useState(null);
  const [id_mesin, setid_mesin] = useState(props?.id_mesin);
  const [part_desc, setpart_desc] = useState('');
  const [status, setstatus] = useState(0);
  const [types, settypes] = useState('PART_MESIN');
  const [part_no_from_stag, setpart_no_from_stag] = useState('');
  const [part_no_from_stag_change, setpart_no_from_stag_change] = useState(null);
  const [part_model, setpart_model] = useState(null);
  // console.log(dataListAll, 'dataListAll');

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    id_mesin,
    part_no,
    part_desc,
    status,
    types,
  };
  const setBody = {
    setid_mesin,
    setpart_no,
    setpart_desc,
    setstatus,
    settypes,
  };

  const HandleSubmit = async (event) => {
    // console.log('submited');
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(`${api}master-part`, body, config)
      .then((res) => {
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Successfully Added', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        // getData();
        setpart_no('');
        handleClose();
        // <Navigate to="/apps/registration/customer" replace />;
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
        } else if (errStatus === 429) {
          messages = 'Too Many Request!!';
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
        console.log(err, 'err');
      });
  };

  const getDataPO = async () => {
    setLoadingDataPO(true);
    const response = await axios
      .get(`${api}purchaseOrder/${id}/datas`, config)
      .then((res) => {
        setgetIdMesin(res.data.data);
        setidMesin(res?.data?.data?.mesin?.id);
        setLoadingDataPO(false);
      })
      .catch((err) => {
        // console.log(err?.response, 'err response')
        setLoadingDataPO(false);
        setidMesin(0);
        setgetIdMesin([]);
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getDataPO();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  // console.log(idMesin, 'idMesin');

  const getDataPartNumber = async () => {
    setLoadingPartNumber(true);
    const response = await axios
      .get(`${api}master-part`, config)
      .then((res) => {
        setgetPartNumber(res?.data?.data);
        // setpartNo(res?.data?.data?.part_no);
        // console.log(res.data.data, 'data part number');
        // console.log(res.data.data?.part_no, 'part number');
        setLoadingPartNumber(false);
      })
      .catch((err) => {
        setLoadingPartNumber(false);
        setgetPartNumber([]);
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getDataPartNumber();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const partNumber = getPartNumber.map((item) => item?.part_no);

  const checkRow = (idmesin, desc) => {
    // console.log(desc, 'cekrow');
    setpart_desc(desc);
    setid_mesin(idmesin);
  };

  // console.log(id_mesin, 'id_mesin');

  const handleFocus = (row, partDesc) => {
    const getId = row;
    setDataListAll([]);
    let params = '';
    switch (getId) {
      case getId:
        // params = `${partDesc}`;
        params = partDesc.replace(/\//g, '_');
        break;
      default:
        break;
    }
    setDataListAllLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}get-listPartNumber/${idMesin}/${params}
        `,
        config
      )
      .then((res) => {
        const mergedOptions = mergeOptionsWithSameLabel(res?.data?.data);
        setDataListAll(mergedOptions);
        setDataListAllLoading(false);
        // console.log(res?.data?.data, 'dataaaaa');
      })
      .catch((err) => {
        setDataListAllLoading(false);
        setDataListAll([]);
        const errStatus = err.response.status;
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
          messages = 'Bad Request!!';
        } else if (errStatus === 429) {
          messages = 'Too Many Request!!';
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

  const mergeOptionsWithSameLabel = (data) => {
    const mergedOptions = [];
    const labelMap = {};

    data.forEach((option) => {
      if (!labelMap[option.part_no]) {
        // Jika label belum ada dalam map, tambahkan ke map dan masukkan ke array hasil
        labelMap[option.part_no] = true;
        mergedOptions.push(option);
      }
    });

    return mergedOptions;
  };
  return (
    <div className="flex flex-col sm:border-1 sm:rounded-16 overflow-hidden">
      <TableContainer className="flex flex-1">
        <Dialog
          maxWidth="xl"
          // maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add New Part Number</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <HandleAddDetail
                loading={loading}
                body={body}
                setBody={setBody}
                HandleSubmit={HandleSubmit}
                handleClose={handleClose}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                <TableCell className="whitespace-nowrap p-4 md:p-12">No.</TableCell>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className="whitespace-nowrap p-4 md:p-12"
                    {...(!column.sortable
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render('Header')}
                    {column.sortable ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  // onClick={(ev) => props.onRowClick(ev, row)}
                  className="truncate cursor-pointer"
                >
                  <TableCell className={clsx('p-4 md:p-12')}>
                    {index + 1 + props.rowsPerPage * props.pages}
                  </TableCell>
                  {row.cells.map((cell, idx) => {
                    if (cell.column.id === 'scan_barcode') {
                      // console.log(cell, 'cell')
                      return (
                        <TableCell className={clsx('p-4 md:p-12')}>
                          {/* {console.log(errTextfield(), 'errTextField')} */}
                          <TextField
                            autoComplete="off"
                            inputProps={{
                              onKeyPress: handleKeyPress(index),
                              // maxLength: 10,
                              maxLength:
                                cell?.row?.original?.part_desc === 'UPS'
                                  ? 21
                                  : cell?.row?.original?.part_desc === 'IT Transformer'
                                  ? 12
                                  : 10,
                            }}
                            inputRef={(ref) => (inputRefs.current[index] = ref)}
                            variant="outlined"
                            size="medium"
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'OPERATOR_TSS' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'GUEST_RELATED' ||
                              userRoles === 'OPERATOR_MOVER'
                            }
                            // error={errTextfield(valueSNPart, valueSNPart[index], index)}
                            error={errTextField}
                            // inputProps={{
                            //   maxLength: 10,
                            // }}
                            defaultValue={cell?.value ? cell?.value : ''}
                            // id="outlined-password-input"
                            tabIndex={0}
                            // label="SN Parts*"
                            key={`sn-${index}`}
                            // id={`${idx}`}
                            onChange={(e, newValue) => {
                              handleChangeSNField(e, index, newValue, true, 0);
                            }}
                            className="w-200"
                          />
                        </TableCell>
                      );
                    }

                    if (cell.column.id === 'part_no') {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          className={clsx('p-4 md:p-12', cell.column.className)}
                        >
                          <div className="flex">
                            <Autocomplete
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              onFocus={() =>
                                handleFocus(cell?.row?.id, cell?.row?.values?.part_desc)
                              }
                              disabled={
                                userRoles === 'GUEST' ||
                                userRoles === 'OPERATOR_TSS' ||
                                userRoles === 'GUEST_BANK' ||
                                userRoles === 'GUEST_DIP' ||
                                userRoles === 'GUEST_RELATED' ||
                                userRoles === 'OPERATOR_MOVER'
                              }
                              getOptionLabel={(n) => n.part_no}
                              getOptionSelected={(option, value) => option.id === value.id}
                              options={dataListAll}
                              value={part_no_from_stag_change?.id}
                              loading={dataListAllLoading === true}
                              onChange={(e, newValue) => {
                                handleChangeSNField(e, index, newValue, true, 1);
                                // handleChangeSNField(e, index);
                                // setpart_no_from_stag_change(newValue);
                              }}
                              sx={{ width: 200 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Replace Part Number"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                  }}
                                />
                              )}
                            />
                            {(userRoles === 'SUPER_ADMIN' ||
                              userRoles === 'ADMIN' ||
                              userRoles === 'SUPERVISOR' ||
                              userRoles === 'OPERATOR_DIP') && (
                              <div>
                                <Button
                                  onClick={handleClickOpens}
                                  onFocus={() => checkRow(idMesin, cell?.row?.values?.part_desc)}
                                >
                                  {/* {console.log(idMesin, 'idMesinnn')} */}
                                  <AddCircleOutline className="text-gray-800" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      );
                    }

                    if (cell.column.id === 'part_model') {
                      return (
                        <TableCell className={clsx('p-4 md:p-12')}>
                          {cell?.value ? cell?.value : '-'}
                          {/* <TextField
                            autoComplete="off"
                            variant="outlined"
                            size="medium"
                            disabled
                            // disabled={
                            //   userRoles === 'GUEST' ||
                            //   userRoles === 'OPERATOR_TSS' ||
                            //   userRoles === 'GUEST_BANK' ||
                            //   userRoles === 'GUEST_DIP' ||
                            //   userRoles === 'GUEST_RELATED' ||
                            //   userRoles === 'OPERATOR_MOVER'
                            // }
                            defaultValue={cell?.value ? cell?.value : ''}
                            onChange={(e, newValue) => {
                              handleChangeSNField(e, index, newValue, true, 2);
                            }}
                            className="w-200"
                          /> */}
                        </TableCell>
                      );
                    }
                    if (cell.column.id === 'part_name') {
                      return (
                        <TableCell className={clsx('p-4 md:p-12')}>
                          {cell?.value ? cell?.value : '-'}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        className={clsx('p-4 md:p-12', cell.column.className)}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
