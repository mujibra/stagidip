/* eslint-disable no-fallthrough */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import * as React from 'react';
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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import MockDataMv400 from './MockDataMv400';

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

function createData(id, item_desc, valueDesc) {
  return { id, item_desc, valueDesc };
}

const rows = MockDataMv400?.map((item, index) =>
  createData(item?.id, item?.item_desc, item?.valueDesc)
);

export default function OpenSpecEditMV400(props) {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }
  if (!userRoles) {
    console.log();
  }
  const dataDetail = props?.dataDetail;
  // console.log(dataDetail, 'dataDetail');
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dispatch = useDispatch();
  const [dataListAll, setDataListAll] = useState([]);
  const [dataDetails, setDataDetails] = useState(dataDetail);
  const [dataDetailSelected, setDataDetailSelected] = useState([]);
  const [dataListAllLoading, setDataListAllLoading] = useState(false);
  const [memory1, setMemory1] = useState(null);
  const [memory2, setMemory2] = useState(null);
  const [monitor1, setMonitor1] = useState(null);
  const [monitor2, setMonitor2] = useState(null);
  const [hdd1, setHdd1] = useState(null);
  const [hdd2, setHdd2] = useState(null);
  const [hdd3, setHdd3] = useState(null);
  const [hdd4, setHdd4] = useState(null);
  const [cardbin1, setCardbin1] = useState(null);
  const [cardbin2, setCardbin2] = useState(null);
  const [cassette1, setCassette1] = useState(null);
  const [cassette2, setCassette2] = useState(null);
  const [reject1, setReject1] = useState(null);
  const [reject2, setReject2] = useState(null);
  const [kFasciaAtas1, setKFasciaAtas1] = useState(null);
  const [kFasciaAtas2, setKFasciaAtas2] = useState(null);
  const [kunciCassette1, setKunciCassette1] = useState(null);
  const [kunciCassette2, setKunciCassette2] = useState(null);
  const [kunciCassette3, setKunciCassette3] = useState(null);
  const [lanCard1, setLanCard1] = useState(null);
  const [lanCard2, setLandCard2] = useState(null);
  const [kHdmiToDvi1, setKHdmiToDvi1] = useState(null);
  const [kHdmiToDvi2, setKHdmiToDvi2] = useState(null);
  const [kHdmiToDvi3, setKHdmiToDvi3] = useState(null);

  const [memory1Selected, setMemory1Selected] = useState(null);
  const [memory2Selected, setMemory2Selected] = useState(null);
  const [monitor1Selected, setMonitor1Selected] = useState(null);
  const [monitor2Selected, setMonitor2Selected] = useState(null);
  const [hdd1Selected, setHdd1Selected] = useState(null);
  const [hdd2Selected, setHdd2Selected] = useState(null);
  const [hdd3Selected, setHdd3Selected] = useState(null);
  const [hdd4Selected, setHdd4Selected] = useState(null);
  const [cardbin1Selected, setCardbin1Selected] = useState(null);
  const [cardbin2Selected, setCardbin2Selected] = useState(null);
  const [cassette1Selected, setCassette1Selected] = useState(null);
  const [cassette2Selected, setCassette2Selected] = useState(null);
  const [reject1Selected, setReject1Selected] = useState(null);
  const [reject2Selected, setReject2Selected] = useState(null);
  const [kFasciaAtas1Selected, setKFasciaAtas1Selected] = useState(null);
  const [kFasciaAtas2Selected, setKFasciaAtas2Selected] = useState(null);
  const [kunciCassette1Selected, setKunciCassette1Selected] = useState(null);
  const [kunciCassette2Selected, setKunciCassette2Selected] = useState(null);
  const [kunciCassette3Selected, setKunciCassette3Selected] = useState(null);
  const [lanCard1Selected, setLanCard1Selected] = useState(null);
  const [lanCard2Selected, setLanCard2Selected] = useState(null);
  const [kHdmiToDvi1Selected, setKHdmiToDvi1Selected] = useState(null);
  const [kHdmiToDvi2Selected, setKHdmiToDvi2Selected] = useState(null);
  const [kHdmiToDvi3Selected, setKHdmiToDvi3Selected] = useState(null);
  // const [memory2, setMemory2] = useState(null);
  const getRow = props?.getRow;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(40);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleFocus = (row, idx) => {
    const getId = row.id;
    setDataListAll([]);
    // console.log(idx, 'idx');
    // console.log(getId, 'getId');
    let params = '';
    switch (getId) {
      case 1:
        params = 'OS';
        break;
      case 2:
        params = 'PROCESSOR';
        break;
      case 3:
        params = 'MAINBOARD_CE';
        break;
      case 4:
        params = `MEMORY_${idx}`;
        break;
      case 5:
        params = `MONITOR_${idx}`;
        break;
      case 6:
        params = `HDD_${idx}`;
        break;
      case 7:
        params = 'MCU';
        break;
      case 8:
        params = 'SPR';
        break;
      case 9:
        params = 'EPP_1';
        break;
      case 10:
        params = 'POWER_SUPPLY';
        break;
      case 11:
        params = 'CROPF';
        break;
      case 12:
        params = `BATERE_BACKUP`;
        break;
      case 13:
        params = `CARDBIN_${idx}`;
        break;
      case 14:
        params = `ID_SCANNER`;
        break;
      case 15:
        params = `BILL_ACEPTOR`;
        break;
      case 16:
        params = `PRINTER_A4`;
        break;
      case 17:
        params = `KUNCI_FASCIA`;
        break;
      case 18:
        params = `KUNCI_BILL_ACEPTOR`;
        break;
      case 19:
        params = 'KUNCI_CARDBIN';
        break;
      case 20:
        params = 'SAFEDOOR_KEY';
        break;
      case 21:
        params = 'CONTACTLESS';
        break;
      case 22:
        params = `LAN_CARD_${idx}`;
        break;
      case 23:
        params = 'THERMAL_PAPER';
        break;
      case 24:
        params = 'A4_PAPER';
        break;
      case 25:
        params = 'ROLL_PEREKAT';
        break;
      case 26:
        params = 'RIBBON';
        break;
      case 27:
        params = 'CABINET_SENSOR';
        break;
      case 28:
        params = 'KABEL_LAN	';
        break;
      case 29:
        params = 'KABEL_POWER';
        break;
      case 30:
        params = 'KABEL_SERIAL_UPS';
        break;
      case 31:
        params = 'KVA';
        break;
      case 32:
        params = 'FDI';
        break;
      case 33:
        params = 'PIN_COVER';
        break;
      default:
    }
    // console.log(params, 'para');
    setDataListAllLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-spekmesin/${params}/datas`,
        config
      )
      .then((res) => {
        setDataListAll(res?.data?.data);
        setDataListAllLoading(false);
        // console.log(res?.data?.data);
      })
      .catch((err) => {
        setDataListAllLoading(false);
        setDataListAll([]);
        const errStatus = err.response.status;
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
    // if (getId === 1) {
    //   props?.setStart(!props?.start);
    // }
  };

  const [fill_description, setfill_description] = React.useState(null);
  const [setIndex, setsetIndex] = React.useState(null);
  const body = {
    id_spek_mesin_hdr: null,
    item_desc: null,
    fill_description,
    results: null,
  };
  const [pageState, setPageState] = React.useState([]);
  const handleInOut = (e, index) => {
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      copyObject.results = e.target.value;
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  const [allState, setAllState] = useState('');
  const handleAllState = (e, newValue, index, multi = false, idxMulti = 0) => {
    // console.log(newValue, 'new')
    // setsetIndex(index);
    if (pageState.length > 0) {
      const copyPageState = [...pageState];
      const insertState = copyPageState[index];
      const copyObject = { ...insertState };
      if (multi === true) {
        copyObject.fill_description[idxMulti] = newValue?.id;
      } else {
        copyObject.fill_description = newValue?.id === undefined ? null : newValue?.id;
      }
      // setfill_description((copyObject.fill_description = newValue?.id));
      // console.log(pageState, 'pageState');
      const newState = pageState.splice(index, 1, copyObject);
      setPageState(pageState);
    }
  };
  // console.log(memory1, 'memory1');

  React.useEffect(() => {
    setDataDetails(dataDetail);
  }, [dataDetail]);
  React.useEffect(() => {
    // clearInterval(props?.tick)
    if (dataDetail.length !== 0) {
      setDataDetailSelected(dataDetail);
      setMemory1Selected(dataDetail[3]?.fill_description[0]);
      setMemory2Selected(dataDetail[3]?.fill_description[1]);
      setMonitor1Selected(dataDetail[4]?.fill_description[0]);
      setMonitor2Selected(dataDetail[4]?.fill_description[1]);
      setHdd1Selected(dataDetail[5]?.fill_description[0]);
      setHdd2Selected(dataDetail[5]?.fill_description[1]);
      setHdd3Selected(dataDetail[5]?.fill_description[2]);
      setHdd4Selected(dataDetail[5]?.fill_description[3]);
      setCardbin1Selected(dataDetail[12]?.fill_description[0]);
      setCardbin2Selected(dataDetail[12]?.fill_description[1]);
      setLanCard1Selected(dataDetail[21]?.fill_description[0]);
      setLanCard2Selected(dataDetail[21]?.fill_description[1]);
      setMemory1(memory1Selected);
      setMemory2(memory2Selected);
      setMonitor1(monitor1Selected);
      setMonitor2(monitor2Selected);
      setHdd1(hdd1Selected);
      setHdd2(hdd2Selected);
      setHdd3(hdd3Selected);
      setHdd4(hdd4Selected);
      setCardbin1(cardbin1Selected);
      setCardbin2(cardbin2Selected);
      setCassette1(cassette1Selected);
      setCassette2(cassette2Selected);
      setReject1(reject1Selected);
      setReject2(reject2Selected);
      setKFasciaAtas1(kFasciaAtas1Selected);
      setKFasciaAtas2(kFasciaAtas2Selected);
      setKunciCassette1(kunciCassette1Selected);
      setKunciCassette2(kunciCassette2Selected);
      setKunciCassette3(kunciCassette3Selected);
      setLanCard1(lanCard1Selected);
      setLandCard2(lanCard2Selected);
      setKHdmiToDvi1(kHdmiToDvi1Selected);
      setKHdmiToDvi2(kHdmiToDvi2Selected);
      setKHdmiToDvi3(kHdmiToDvi3Selected);
    }
  }, [
    dataDetail,
    memory1Selected,
    memory2Selected,
    monitor1Selected,
    monitor2Selected,
    hdd1Selected,
    hdd2Selected,
    hdd3Selected,
    hdd4Selected,
    cardbin1Selected,
    cardbin2Selected,
    cassette1Selected,
    cassette2Selected,
    reject1Selected,
    reject2Selected,
    kFasciaAtas1Selected,
    kFasciaAtas2Selected,
    kunciCassette1Selected,
    kunciCassette2Selected,
    kunciCassette3Selected,
    lanCard1Selected,
    lanCard2Selected,
    kHdmiToDvi1Selected,
    kHdmiToDvi2Selected,
    kHdmiToDvi3Selected,
    // dataDetailSelected,
  ]);

  React.useEffect(() => {
    const arr = [];
    // setMemory1(dataDetail[3]?.fill_description?.description);
    for (let i = 0; i < rows.length; i++) {
      if (i === 3) {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_desc: rows[i]?.item_desc,
          fill_description:
            dataDetail[i]?.fill_description === null || dataDetail?.length === 0
              ? [memory1, memory2]
              : [
                  memory1?.id === undefined ? null : memory1?.id,
                  memory2?.id === undefined ? null : memory2?.id,
                ],
          results:
            dataDetail[i]?.results === 'OK' ||
            dataDetail[i]?.result === undefined ||
            dataDetail[i]?.result === null
              ? 'OK'
              : dataDetail[i]?.results,
        });
      } else if (i === 4) {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_desc: rows[i]?.item_desc,
          // fill_description: [monitor1, monitor2],
          fill_description:
            dataDetail[i]?.fill_description === null || dataDetail?.length === 0
              ? [monitor1, monitor2]
              : [
                  monitor1?.id === undefined ? null : monitor1?.id,
                  monitor2?.id === undefined ? null : monitor2?.id,
                ],
          results:
            dataDetail[i]?.results === 'OK' ||
            dataDetail[i]?.results === undefined ||
            dataDetail[i]?.result === null
              ? 'OK'
              : dataDetail[i]?.results,
        });
      } else if (i === 5) {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_desc: rows[i]?.item_desc,
          // fill_description: [hdd1, hdd2, hdd3, hdd4],
          fill_description:
            dataDetail[i]?.fill_description === null || dataDetail?.length === 0
              ? [hdd1, hdd2, hdd3, hdd4]
              : [
                  hdd1?.id === undefined ? null : hdd1?.id,
                  hdd2?.id === undefined ? null : hdd2?.id,
                  hdd3?.id === undefined ? null : hdd3?.id,
                  hdd4?.id === undefined ? null : hdd4?.id,
                ],
          results:
            dataDetail[i]?.results === 'OK' ||
            dataDetail[i]?.results === undefined ||
            dataDetail[i]?.result === null
              ? 'OK'
              : dataDetail[i]?.results,
        });
      } else if (i === 12) {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_desc: rows[i]?.item_desc,
          // fill_description: [cardbin1, cardbin2],
          fill_description:
            dataDetail[i]?.fill_description === null || dataDetail?.length === 0
              ? [cardbin1, cardbin2]
              : [
                  cardbin1?.id === undefined ? null : cardbin1?.id,
                  cardbin2?.id === undefined ? null : cardbin2?.id,
                ],
          results:
            dataDetail[i]?.results === 'OK' ||
            dataDetail[i]?.results === undefined ||
            dataDetail[i]?.result === null
              ? 'OK'
              : dataDetail[i]?.results,
        });
      } else if (i === 21) {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_desc: rows[i]?.item_desc,
          // fill_description: [lanCard1, lanCard2],
          fill_description:
            dataDetail[i]?.fill_description === null || dataDetail?.length === 0
              ? [lanCard1, lanCard2]
              : [
                  lanCard1?.id === undefined ? null : lanCard1?.id,
                  lanCard2?.id === undefined ? null : lanCard2?.id,
                ],
          results:
            dataDetail[i]?.results === 'OK' ||
            dataDetail[i]?.results === undefined ||
            dataDetail[i]?.result === null
              ? 'OK'
              : dataDetail[i]?.results,
        });
      } else {
        arr.push({
          ...body,
          id_spek_mesin_hdr: props?.getRow?.id,
          item_desc: rows[i]?.item_desc,
          results:
            dataDetail[i]?.results === 'OK' ||
            dataDetail[i]?.results === undefined ||
            dataDetail[i]?.result === null
              ? 'OK'
              : dataDetail[i]?.results,
          fill_description:
            dataDetail[i]?.fill_description === null ||
            dataDetail[i]?.fill_description === undefined
              ? null
              : // : dataDetail[i]?.fill_description,
              dataDetail[i]?.fill_description?.id === undefined
              ? null
              : dataDetail[i]?.fill_description?.id,
        });
      }
    }

    const newObject = Array.from(arr);
    setPageState([...newObject]);
  }, [rows, props?.getRow?.id, dataDetail, memory1]);
  // console.log(pageState, 'pageState222');
  // console.log(memory1, 'memory1');

  props?.propsFromParent(pageState);
  // console.log(getRow, 'getRow')

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
                    {row?.id}.)
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.item_desc}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.item_desc === 'MEMORY' ? (
                      <Box sx={{ minWidth: 120 }}>
                        <div className="w-full flex gap-5">
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
                            getOptionSelected={(option, value) => option.id === value.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 1)}
                            value={memory1}
                            // defaultValue={
                            //   dataDetail[3]?.fill_description === null
                            //     ? ''
                            //     : dataDetail[3]?.fill_description
                            // }
                            loading={dataListAllLoading === true}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 0);
                              setMemory1(newValue);
                            }}
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label="Size Memory"
                              />
                            )}
                          />
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
                            value={memory2}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 1);
                              setMemory2(newValue);
                            }}
                            loading={dataListAllLoading === true}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 2)}
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label="Tipe Memory"
                              />
                            )}
                          />
                        </div>
                      </Box>
                    ) : row?.item_desc === 'MONITOR' ? (
                      <Box sx={{ minWidth: 120 }}>
                        <div className="w-full flex gap-5">
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
                            sx={{ width: 200 }}
                            value={monitor1}
                            // onChange={(e) => setMonitor1(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 0);
                              setMonitor1(newValue);
                            }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 1)}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label="Size Monitor"
                              />
                            )}
                          />
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
                            sx={{ width: 200 }}
                            value={monitor2}
                            // onChange={(e) => setMonitor2(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 1);
                              setMonitor2(newValue);
                            }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 2)}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label="Monitor Screens"
                              />
                            )}
                          />
                        </div>
                      </Box>
                    ) : row?.item_desc === 'HDD' ? (
                      <Box sx={{ minWidth: 120 }}>
                        <div className="w-full flex gap-5">
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
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 1)}
                            sx={{ width: 200 }}
                            value={hdd1}
                            // onChange={(e) => setHdd1(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 0);
                              setHdd1(newValue);
                            }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 1`}
                              />
                            )}
                          />
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
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 2)}
                            sx={{ width: 200 }}
                            value={hdd2}
                            // onChange={(e) => setHdd2(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 1);
                              setHdd2(newValue);
                            }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 2`}
                              />
                            )}
                          />
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
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 3)}
                            sx={{ width: 200 }}
                            value={hdd3}
                            // onChange={(e) => setHdd3(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 2);
                              setHdd3(newValue);
                            }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 3`}
                              />
                            )}
                          />
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
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 4)}
                            sx={{ width: 200 }}
                            value={hdd4}
                            // onChange={(e) => setHdd4(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 3);
                              setHdd4(newValue);
                            }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 4`}
                              />
                            )}
                          />
                        </div>
                      </Box>
                    ) : row?.item_desc === 'CARDBIN' ? (
                      <Box sx={{ minWidth: 120 }}>
                        <div className="w-full flex gap-5">
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
                            sx={{ width: 200 }}
                            value={cardbin1}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 0);
                              setCardbin1(newValue);
                            }}
                            // onChange={(e) => setCardbin1(e.target.value)}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            loading={dataListAllLoading === true}
                            onFocus={() => handleFocus(row, 1)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 1`}
                              />
                            )}
                          />
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
                            sx={{ width: 200 }}
                            value={cardbin2}
                            // onChange={(e) => setCardbin2(e.target.value)}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 1);
                              setCardbin2(newValue);
                            }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            loading={dataListAllLoading === true}
                            onFocus={() => handleFocus(row, 2)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 2`}
                              />
                            )}
                          />
                        </div>
                      </Box>
                    ) : row?.item_desc === 'LAN CARD' ? (
                      <Box sx={{ minWidth: 120 }}>
                        <div className="w-full flex gap-5">
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
                            sx={{ width: 200 }}
                            // onChange={(e) => setLanCard1(e.target.value)}
                            value={lanCard1}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 0);
                              setLanCard1(newValue);
                            }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            // value={lanCard1}
                            onFocus={() => handleFocus(row, 1)}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 1`}
                              />
                            )}
                          />
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
                            sx={{ width: 200 }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            onFocus={() => handleFocus(row, 2)}
                            // value={lanCard2}
                            // onChange={(e) => setLandCard2(e.target.value)}
                            value={lanCard2}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index, true, 1);
                              setLandCard2(newValue);
                            }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={`${row?.valueDesc} - 2`}
                              />
                            )}
                          />
                        </div>
                      </Box>
                    ) : (
                      <Box sx={{ minWidth: 120 }}>
                        {dataDetails !== undefined && dataDetails?.length > 0 && (
                          <Autocomplete
                            size="small"
                            disablePortal
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'OPERATOR_TSS'
                            }
                            onFocus={() => handleFocus(row)}
                            id="combo-box-demo"
                            value={row.fill_description}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index);
                            }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            defaultValue={
                              dataDetails[index]?.fill_description === null ||
                              dataDetails[index]?.fill_description === undefined
                                ? null
                                : dataDetails[index]?.fill_description
                            }
                            // options={top100Films}
                            focused
                            sx={{ width: 200 }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={row?.valueDesc}
                              />
                            )}
                          />
                        )}
                        {dataDetail?.length === 0 ? (
                          <Autocomplete
                            size="small"
                            disablePortal
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'OPERATOR_TSS'
                            }
                            onFocus={() => handleFocus(row)}
                            id="combo-box-demo"
                            value={row.fill_description}
                            onChange={(e, newValue) => {
                              handleAllState(e, newValue, index);
                            }}
                            getOptionLabel={(n) => n.description}
                            getOptionSelected={(option) => option?.id}
                            options={dataListAll}
                            defaultValue={
                              dataDetails[index]?.fill_description === null ||
                              dataDetails[index]?.fill_description === undefined
                                ? null
                                : dataDetails[index]?.fill_description
                            }
                            // options={top100Films}
                            focused
                            sx={{ width: 200 }}
                            loading={dataListAllLoading === true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: <>{params.InputProps.endAdornment}</>,
                                }}
                                label={row?.valueDesc}
                              />
                            )}
                          />
                        ) : (
                          ''
                          // console.log('else')
                        )}
                      </Box>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box sx={{ minWidth: 50 }}>
                      {dataDetails !== undefined && dataDetails?.length > 0 && (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">OK/NG</InputLabel>
                          <Select
                            size="small"
                            label="OK/NG"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={row.result}
                            disabled={
                              userRoles === 'GUEST' ||
                              userRoles === 'GUEST_BANK' ||
                              userRoles === 'GUEST_DIP' ||
                              userRoles === 'OPERATOR_TSS'
                            }
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
        rowsPerPageOptions={[40, 50, 100]}
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
