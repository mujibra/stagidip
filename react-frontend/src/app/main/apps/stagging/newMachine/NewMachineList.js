/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import Tooltip from '@mui/material/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Excel, { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import NewMachineTable from './NewMachineTable';
import { selectOldMachine } from './store/oldmachineSlice';

export default function NewMachineList(props) {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  if (getUser) {
    userRoles = getUser[0]?.roles;
  }
  const get_timetodo = JSON.parse(localStorage.getItem('stagingBtnTrue'));
  const getAccessToken = localStorage.getItem('access_token');
  const configLocal = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dispatch = useDispatch();
  const oldMachine = useSelector(selectOldMachine);
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const routeParams = useParams();
  const id = routeParams['*'];
  const totalElements = useSelector(({ oldMachineApp }) => oldMachineApp?.oldMachine);
  const navigate = useNavigate();
  let idPo = '';
  let idMesin = '';
  let idMesinPrev = '';
  const [loadingTable, setLoadingTable] = useState(true);
  const [getIdMesin, setgetIdMesin] = useState([]);
  const [getReadOnly, setGetReadOnly] = useState(null);
  const [getReadOnlyRow, setGetReadOnlyRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [datas, setData] = useState([]);
  const [pagin, setPagin] = useState([]);
  const [valuePagin, setValuePagin] = useState(null);
  const [getLocalStorageBtn, setgetLocalStorageBtn] = useState(true);
  const [getValueLengthSN, setgetValueLengthSN] = useState(null);
  const [timer, setTimer] = useState(0); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  const noPo = getIdMesin.no_po;
  const idPos = getIdMesin.id;
  // const idMesin = getIdMesin.mesin;
  const idCustomer = getIdMesin.customer;
  const nameMesin = getIdMesin.mesin;
  // console.log(getIdMesin?.mesin?.id, 'idMesin');
  // console.log(getLocalStorageBtn, 'getLocalStorageBtn');
  const namePartNumber = getIdMesin.part_number;
  const getJumlah = getIdMesin.jumlah;
  idPo = props.idPo.split('-')[0];
  idMesin = Number(props.idPo.split('-')[1]) + 1;
  idMesinPrev = Number(props.idPo.split('-')[1]) - 1;
  const id_Po = id.split('-')[0];
  const id_Mesin = Number(id.split('-')[1]);
  const [errButton, setErrButton] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showTime, setShowTime] = useState(null);

  const [DataeditSnMesin, setDataEditSnMesin] = useState([]);
  const [err, setErr] = useState(true);
  const [jsonExcel, setJsonExcel] = useState([]);
  const [BodyExcel, setBodyExcel] = useState([]);
  const [nameExcel, setNameExcel] = useState('');
  const [editSnMesin, setEditSnMesin] = useState({
    name: null,
    ws_id: null,
    ws_name: null,
    installation_date: null,
    ticket: null,
    changed: false,
    time_staging: null,
  });

  const [row_mesin, setrow_mesin] = useState(null);

  const getDataPO = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}purchaseOrder/${id}/datas`, configLocal)
      .then((res) => {
        setgetIdMesin(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
        } else if (errStatus === 429) {
          messages = 'Too Many Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        toast?.error(messages, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // dispatch(
        //   showMessage({
        //     message: messages,
        //     autoHideDuration: 2000,
        //     anchorOrigin: {
        //       vertical: 'top',
        //       horizontal: 'center',
        //     },
        //     variant: 'error',
        //   })
        // );
        console.log(err);
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

  const getData = async () => {
    setLoadingTable(true);
    if (idPos != undefined && idCustomer?.id != undefined) {
      const response = await axios
        .get(`${api}purchaseOrder/${id_Po}/${id_Mesin}`, configLocal)
        .then((res) => {
          setLoadingTable(false);
          setData(res.data.data);
          setJsonExcel([]);
        })
        .catch((err) => {
          setJsonExcel([]);
          setData([]);
          // console.log(err?.response, 'errorsss');
          const errStatus = err?.response?.status;
          // console.log(errStatus, 'errStatus');
          const errMessage = err?.response?.statusText;
          // console.log(errMessage, 'errMessage');
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
          } else if (errStatus === 429) {
            messages = 'Too Many Request!!';
          } else {
            messages = 'Something Wrong!!';
          }
          // dispatch(
          //   showMessage({
          //     message: messages,
          //     autoHideDuration: 2000,
          //     anchorOrigin: {
          //       // vertical: 'center',
          //       horizontal: 'center',
          //     },
          //     variant: 'error',
          //   })
          // );
          toast?.error(messages, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setLoadingTable(false);
          console.log(err, 'err bawah');
        });
    }
  };
  useEffect(() => {
    getData();
  }, [idMesin?.id, idCustomer?.id, getJumlah, id]);
  let url;
  if (valuePagin === null) {
    url = `/apps/stagging/newMachine/${idPo}-${idMesin}`;
  } else {
    url = `/apps/stagging/newMachine/${idPo}-${valuePagin}`;
  }
  const handleOnClick = () => {
    navigate(url);
    setValuePagin(null);
    setTimer(0);
    setStart(false);
    setgetValueLengthSN(null);
    dispatch(closeDialog());
    setJsonExcel([]);
    localStorage.removeItem('stagingBtnTrue');
  };

  const urlPrev = `/apps/stagging/newMachine/${idPo}-${idMesinPrev}`;
  const handleOnClickPrev = () => {
    setTimer(0);
    setgetValueLengthSN(null);
    navigate(urlPrev);
    setJsonExcel([]);
    localStorage.removeItem('stagingBtnTrue');
  };

  useEffect(() => {
    axios
      .get(`${api}purchaseOrder/${id_Po}/${id_Mesin}/snMesin`, configLocal)
      .then((res) => {
        setGetReadOnly(res?.data?.sn_mesin);
        // setGetReadOnlyRow(res?.data?.row_mesin);
        setLoadingTable(false);
        setDataEditSnMesin(res.data);
        setShowTime(res?.data?.time_staging);
        setEditSnMesin({
          name: res?.data?.sn_mesin,
          ws_id: res?.data?.ws_id,
          ws_name: res?.data?.ws_name,
          installation_date: res?.data?.installation_date,
          ticket: res?.data?.ticket,
          time_staging: res?.data?.time_staging,
          // row_mesin: res?.data?.row_mesin,
          changed: false,
        });
        setrow_mesin(res?.data?.no_baris_mesin);
      })
      .catch((err) => {
        setEditSnMesin({
          name: null,
          ws_id: null,
          ws_name: null,
          installation_date: null,
          ticket: null,
          time_staging: null,
          // row_mesin: null,
          changed: false,
        });
        setrow_mesin(null);
        setShowTime(null);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        // console.log(errMessage, 'er');
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
        } else if (errStatus === 429) {
          messages = 'Too Many Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        toast?.error(messages, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // dispatch(
        //   showMessage({
        //     message: messages,
        //     autoHideDuration: 2000,
        //     anchorOrigin: {
        //       // vertical: 'center',
        //       horizontal: 'center',
        //     },
        //     variant: 'error',
        //   })
        // );
        setDataEditSnMesin([]);
        setLoadingTable(false);
      });
    // setrow_mesin(editSnMesin.row_mesin)
  }, [idMesin?.id, idCustomer?.id, getJumlah, id]);
  // console.log(row_mesin, 'row_mesin');

  useEffect(() => {
    const arryJsonExcel = [];
    if (jsonExcel?.length !== 0) {
      for (let i = 0; i < datas?.length; i++) {
        arryJsonExcel.push({
          ...datas[i],
          scan_barcode:
            jsonExcel[i]?.scan_barcode?.toString() === undefined
              ? null
              : jsonExcel[i]?.scan_barcode?.toString(),
          part_model:
            jsonExcel[i]?.part_model?.toString() === undefined
              ? null
              : jsonExcel[i]?.part_model?.toString(),
        });
        // const element = array[i];
      }
      setBodyExcel(arryJsonExcel);
    }
  }, [jsonExcel]);

  useEffect(() => {
    const pagination = [];
    for (let index = 0; index < props.dataDetailOrder?.jumlah; index++) {
      pagination.push({
        label: `${index + 1}`,
      });
    }
    setPagin(pagination);
  }, [props.dataDetailOrder?.jumlah]);

  let data = {
    ...datas,
  };

  if (jsonExcel?.length !== 0) {
    data = BodyExcel;
  } else {
    data = datas;
  }

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setTimer((timers) => timers + 1);
      }, 1000);
    } else {
      setStart(false);
      // clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);
  // console.log(start, 'start')

  useEffect(() => {
    if (showTime === null || showTime === '') {
      setStart(true);
    } else {
      setStart(false);
    }
    setgetLocalStorageBtn(get_timetodo);
  }, [timer, showTime]);

  const pad = (n) => (n < 10 ? `0${n}` : n);

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    const hour = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const mins_ = hour % 60;
    const seconds_ = seconds % 60;
    const countData = `${hour === 0 ? `00` : hour}:${pad(
      mins > 60 ? mins_.toString() : mins.toString()
    )}:${seconds_ === 0 ? '00' : seconds_ < 10 ? `0${seconds_.toString()}` : seconds_.toString()}`;
    localStorage.setItem('time_todo', JSON.stringify(countData));
    return countData;
  };

  // let bodySn;
  // useEffect(() => {
  //   bodySn = {
  //     sn_mesin: editSnMesin.name,
  //     time_todo: dispSecondsAsMins(timer),
  //     row_mesin: editSnMesin.row_mesin,
  //   }
  //   console.log(bodySn, 'bodySn');
  // }, [editSnMesin])
  // console.log(editSnMesin?.row_mesin, 'row_mesin');
  //   console.log(editSnMesin?.name, 'sn_mesin');
  //   console.log(dispSecondsAsMins(timer), 'time_todo');
  const handleSubmitBarcode = async (event) => {
    event.preventDefault();
    setLoadingTable(true);
    // if (editSnMesin.changed) {
    axios
      .put(
        `${api}purchaseOrder/${id_Po}/${id_Mesin}/snMesin`,
        {
          sn_mesin: editSnMesin.name,
          time_todo: dispSecondsAsMins(timer),
          row_mesin,
        },
        configLocal
      )
      .then(async (res) => {
        localStorage.removeItem('stagingBtnTrue');
        toast?.success(res?.data?.data_response[0]?.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          if (res?.data?.data_response[1]?.status === 1) {
            toast?.success(res?.data?.data_response[1]?.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          } else {
            toast?.warn(res?.data?.data_response[1]?.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        }, 3000);
        // }
        setLoadingTable(false);
      })
      .catch((error) => {
        localStorage.removeItem('stagingBtnTrue');
        const errStatus = error.response.status;
        const errMessage = error.response.data.message;
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
        } else if (errStatus === 429) {
          messages = 'To Many Request!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        toast?.error(messages, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setLoadingTable(false);
      });
    // }
    axios
      .put(`${api}purchaseOrder/${id_Po}/${id_Mesin}/`, { data }, configLocal)
      .then(async (res) => {
        setErr(false);
        // setLoadingTable(true);
        axios
          .get(`${api}purchaseOrder/${id_Po}/${id_Mesin}/`, configLocal)
          .then((res) => {
            toast?.success('Serial Part Number Berhasil Di Tambahkan', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            if (jsonExcel?.length !== 0) {
              getData();
            }
            setLoadingTable(false);
            setData(res.data.data);
            setJsonExcel([]);
          })
          .catch((err) => {
            setJsonExcel([]);
            setData([]);
            setLoadingTable(false);
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
            } else if (errStatus === 429) {
              messages = 'Too Many Request!!';
            } else {
              messages = 'Something Wrong!!';
            }
            toast?.error(messages, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          });
      })
      .catch((error) => {
        setErr(true);
        setLoadingTable(false);
        const errStatus = error.response.status;
        const errMessage = error.response.data.message;
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
        } else if (errStatus === 429) {
          messages = 'Too Many Request!!';
        } else {
          messages = 'Something Wrong!!';
        }
        toast?.error(messages, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setLoadingTable(false);
        console.log('err', error);
      });
  };
  const pull_data = (data, data2, err, errBtn) => {
    setErrButton(err);
    setDisabledBtn(errBtn);
    const newData = data?.map((item, index) => {
      item?.cells?.map((cel, idx) => {
        if (cel.column?.id === 'scan_barcode') {
          item.cells[idx].value = data2[index];
        }
        return cel;
      });
      return item;
    });
    setData(data);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Part Number',
        accessor: 'part_no_from_stag',
        className: 'font-bold',
        sortable: false,
      },
      {
        Header: 'Replace Part Number',
        accessor: 'part_no',
        className: 'font-bold',
        sortable: false,
      },
      {
        Header: 'Part Name',
        accessor: 'part_name',
        className: 'font-bold',
        sortable: false,
      },
      {
        Header: 'Part Description',
        accessor: 'part_desc',
        className: 'font-normal',
        sortable: false,
      },
      {
        Header: 'Part Model',
        accessor: 'part_model',
        className: 'font-normal',
        sortable: false,
      },
      {
        Header: 'Serial Part Number',
        accessor: 'scan_barcode',
        className: 'font-normal',
        sortable: false,
      },
    ],
    [dispatch]
  );
  if (props?.loading && oldMachine?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }
  // console.log(oldMachine, 'machine old');
  props.getIdMesin(id_Mesin);
  const lenthText = editSnMesin?.name?.length;
  // console.log("CeekDatass", data);

  const details_po = props?.dataDetailOrder;

  const dataToPrint = [];

  function getDataToPrint() {
    datas?.map((item, index) => {
      const temp = [
        item.id,
        item.id_mesin,
        item.part_column,
        item.part_no,
        item.part_desc,
        item.part_model,
        item.scan_barcode,
      ];
      dataToPrint.push(temp);
    });
  }
  getDataToPrint();

  const id_mesinx = !props.idPo.includes('-') ? 1 : Number(props.idPo.split('-')[1]);
  const fileExtension = '.xlsx';
  let file_name = null;
  const str = details_po?.no_po;
  if (str) {
    file_name = str.replace(/([^\w]+|\s+)/g, '_');
  }

  file_name = `tmp_staging_${details_po?.id}_${file_name}_${id_mesinx}${fileExtension}`;

  function createData(no, part_no, part_desc, part_model, scan_barcode) {
    return {
      no,
      part_no,
      part_desc,
      part_model,
      scan_barcode,

      // detail_inspeksi,
    };
  }
  const newDatas = datas?.map((item, index) =>
    createData(
      index + 1,
      item?.part_no_from_stag ? Number(item?.part_no_from_stag) : null,
      item?.part_desc,
      item?.part_model,
      item?.scan_barcode
    )
  );
  const DataForBody = [];
  // console.log(disabledBtn, 'disabledBtn');

  for (let index = 0; index < newDatas.length; index++) {
    if (newDatas.length !== 0) {
      DataForBody.push(Object.values(newDatas[index]));
    }
  }

  // TAMBAH PO, SNMESIN, APPROVAL

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'legal');
    doc.text(
      `Registrasi Mesin Model : "${props.dataDetailOrder?.mesin.type}"  Date ${moment().format(
        'LL'
      )}`,
      20,
      20
    );
    doc.setFontSize(10);
    doc.text(
      `No PO : ${props.dataDetailOrder?.no_po === null ? '-' : props.dataDetailOrder?.no_po}`,
      20,
      40
    );
    doc.text(
      `PN-System : ${
        props.dataDetailOrder?.part_number === undefined ? '-' : props.dataDetailOrder?.part_number
      }`,
      20,
      55
    );
    doc.text(
      `Customer : ${
        props.dataDetailOrder?.customer?.bank_desc === undefined
          ? '-'
          : props.dataDetailOrder?.customer?.bank_desc
      }`,
      20,
      70
    );
    doc.text(
      `Type : ${
        props.dataDetailOrder?.model?.name === undefined ? '-' : props.dataDetailOrder?.model?.name
      }`,
      20,
      85
    );
    doc.text(
      `SN Batch : ${
        props.dataDetailOrder?.sn_batch === undefined ? '-' : props.dataDetailOrder?.sn_batch
      }`,
      20,
      100
    );

    doc.text(`SN Mesin : ${editSnMesin?.name === null ? '-' : editSnMesin?.name} `, 200, 40);
    doc.text(`WS ID : ${editSnMesin?.ws_id === null ? '-' : editSnMesin?.ws_id}`, 200, 55);
    doc.text(`WS Name : ${editSnMesin?.ws_name === null ? '-' : editSnMesin?.ws_name}`, 200, 70);
    doc.text(`Ticket : ${editSnMesin?.ticket === null ? '-' : editSnMesin?.ticket}`, 200, 85);
    doc.text(
      `Installation Date : ${
        editSnMesin?.installation_date === null ? '-' : editSnMesin?.installation_date
      }`,
      200,
      100
    );
    doc.text(`Row : ${row_mesin === null || row_mesin === undefined ? '-' : row_mesin} `, 400, 40);
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [['No', 'Part Number', 'Part Description', 'Part Model', 'Serial Part Number']],
      headStyles: { fontSize: 10, halign: 'center' },
      margin: { top: 110 },
      columnStyles: {
        0: { fontSize: 10, halign: 'center' },
        1: { fontSize: 10, halign: 'center' },
        2: { fontSize: 10, halign: 'center' },
        3: { fontSize: 10, halign: 'center' },
        4: { fontSize: 10, halign: 'center' },
        5: { fontSize: 10, halign: 'center' },
        6: { fontSize: 10, halign: 'center' },
      },

      body: DataForBody,
    });
    doc.save(
      `Registrasi Model New Machine No PO : ${getIdMesin?.no_po} ${moment().format('LL')}.pdf`
    );
  };
  async function exportToExcel() {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Staging_Registrations');

    const headers = [
      { header: 'no', key: 'no', width: 5 },
      { header: 'id_mesin', key: 'part_no', width: 10 },
      { header: 'part_column', key: 'part_column', width: 15 },
      { header: 'part_no', key: 'part_no', width: 15 },
      { header: 'part_desc', key: 'part_desc', width: 20 },
      { header: 'part_model', key: 'part_model', width: 20 },
      { header: 'scan_barcode', key: 'scan_barcode', width: 15 },
    ];
    ws.columns = headers;

    datas?.map((item, index) => {
      ws.addRow([
        ++index,
        item?.id_mesin,
        item?.part_column,
        item?.part_no_from_stag ? Number(item?.part_no_from_stag) : null,
        item?.part_desc,
        item?.part_model,
        item?.scan_barcode,
      ]);
    });

    const buffer = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buffer], { type: fileType }), file_name);
  }

  // new export function
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('PRE LOADING INSPECTION');
    const worksheet = workbook.getWorksheet('PRE LOADING INSPECTION');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = `Registrasi Mesin Model : "${
      props.dataDetailOrder?.mesin.type
    }"  Date ${moment().format('LL')}`;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A3', 'C3');
    worksheet.getCell('A3').value = `NO PO: ${
      props.dataDetailOrder?.no_po === undefined ? '-' : props.dataDetailOrder?.no_po
    }`;
    worksheet.getCell('A3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A4', 'C4');
    worksheet.getCell('A4').value = `PN-System : ${
      props.dataDetailOrder?.part_number === undefined ? '-' : props.dataDetailOrder?.part_number
    }`;
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A5', 'C5');
    worksheet.getCell('A5').value = `Customer    : ${
      props.dataDetailOrder?.customer?.bank_desc === undefined
        ? '-'
        : props.dataDetailOrder?.customer?.bank_desc
    }`;
    worksheet.getCell('A5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A6', 'C6');
    worksheet.getCell('A6').value = `Type : ${
      props.dataDetailOrder?.model?.name === undefined ? '-' : props.dataDetailOrder?.model?.name
    }`;
    worksheet.getCell('A6').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A7', 'C7');
    worksheet.getCell('A7').value = `SN Batch : ${
      props.dataDetailOrder?.sn_batch === undefined ? '-' : props.dataDetailOrder?.sn_batch
    }`;
    worksheet.getCell('A7').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D3', 'G3');
    worksheet.getCell('D3').value = `SN Mesin : ${
      editSnMesin?.name === null ? '-' : editSnMesin?.name
    }`;
    worksheet.getCell('D3').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D4', 'G4');
    worksheet.getCell('D4').value = `WS ID : ${
      editSnMesin?.ws_id === null ? '-' : editSnMesin?.ws_id
    }`;
    worksheet.getCell('D4').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D5', 'G5');
    worksheet.getCell('D5').value = `WS Name : ${
      editSnMesin?.ws_name === null ? '-' : editSnMesin?.ws_name
    }`;
    worksheet.getCell('D5').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D6', 'G6');
    worksheet.getCell('D6').value = `Ticket : ${
      editSnMesin?.ticket === null ? '-' : editSnMesin?.ticket
    }`;
    worksheet.getCell('D6').alignment = { horizontal: 'left' };

    worksheet.mergeCells('D7', 'G7');
    worksheet.getCell('D7').value = `Installation Date : ${
      editSnMesin?.installation_date === null ? '-' : editSnMesin?.installation_date
    }`;
    worksheet.getCell('D7').alignment = { horizontal: 'left' };

    worksheet.mergeCells('H3', 'J3');
    worksheet.getCell('H3').value = `Row : ${row_mesin === null ? '-' : row_mesin}`;
    worksheet.getCell('D3').alignment = { horizontal: 'left' };

    worksheet.getCell('A9').value = 'NO';
    worksheet.getCell('A9').alignment = { horizontal: 'center' };

    worksheet.getCell('B9').value = 'Part Number';
    worksheet.getCell('B9').alignment = { horizontal: 'center' };

    worksheet.getCell('C9').value = 'Part Description';
    worksheet.getCell('C9').alignment = { horizontal: 'center' };

    worksheet.getCell('D9').value = 'Part Model';
    worksheet.getCell('D9').alignment = { horizontal: 'center' };

    worksheet.getCell('E9').value = 'Serial Part Number';
    worksheet.getCell('E9').alignment = { horizontal: 'center' };

    // const headers = [
    //   { header: 'no', key: 'no', width: 5 },
    //   { header: 'part_no', key: 'part_no', width: 15 },
    //   { header: 'part_desc', key: 'part_desc', width: 20 },
    //   { header: 'scan_barcode', key: 'scan_barcode', width: 15 },
    // ];
    // worksheet.columns = headers;

    worksheet.getRow(8).values = [''];
    worksheet.columns = [
      { key: 'NO', width: 5 },
      { key: 'item.part_no_from_stag', width: 15 },
      { key: 'item.part_desc', width: 20 },
      { key: 'item.part_model', width: 20 },
      { key: 'item.scan_barcode', width: 18 },
    ];

    datas?.map((item, index) => {
      worksheet.addRow([
        ++index,
        item?.part_no_from_stag ? Number(item.part_no_from_stag) : null,
        item?.part_desc,
        item?.part_model,
        item?.scan_barcode,
      ]);
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(
        blob,
        `Registrasi Model New Machine No PO : ${getIdMesin?.no_po} ${moment().format(
          'LL'
        )}${fileExtension}`
      );
    })();
  }
  let name;

  const handleselectedFile = (e) => {
    name = e.target.files[0]?.name;
    e.preventDefault();

    if (name !== file_name) {
      dispatch(
        showMessage({
          message: 'Please Check Again The File Name!',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'warning',
        })
      );
    } else {
      dispatch(
        showMessage({
          message: 'Upload File Success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
      );
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setJsonExcel(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
        // handleSubmitBarcode();
      }
    }
  };

  const handleConfirmation = () => {
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle className="text-2xl" id="alert-dialog-title">
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText className="text-lg" id="alert-dialog-description">
                Are you sure have saved this data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => dispatch(closeDialog())}>
                Close
              </Button>
              <Button
                // disabled={props.setBody.partNumber === ''}
                variant="contained"
                color="error"
                onClick={handleOnClick}
                autoFocus
                startIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </DialogActions>
          </div>
        ),
        maxWidth: 'xl',
      })
    );
  };
  // console.log(editSnMesin?.name, 'editSnMesin?.name')
  // console.log(jsonExcel, 'jsonExcel');

  return (
    <>
      {props?.loading ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <FuseLoading />
        </div>
      ) : (
        <>
          {/* Table Atas */}
          <div className="my-10  grid md:grid-flow-row-dense sm:justify-between w-full">
            <div className="w-full flex justify-between ">
              <div className="flex justify-between gap-5 my-5">
                <div className="flex items-center my-5">
                  <div>
                    <TextField
                      autoComplete="off"
                      autoFocus
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        maxLength: 10,
                      }}
                      disabled={
                        getReadOnly !== null ||
                        userRoles === 'GUEST' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      name="sn_mesin"
                      value={editSnMesin?.name === null ? '' : editSnMesin?.name}
                      onChange={(e) => {
                        setgetValueLengthSN(e.target.value.length);
                        setEditSnMesin({ name: e.target.value, changed: true });
                      }}
                      label="SN Mesin"
                    />
                  </div>
                </div>

                <div className="flex items-center ">
                  <div>
                    <TextField
                      autoFocus
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      name="ws_id"
                      value={editSnMesin?.ws_id === null ? '-' : editSnMesin?.ws_id}
                      label="WS ID"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <TextField
                      autoFocus
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      name="ws_name"
                      value={editSnMesin?.ws_name === null ? '-' : editSnMesin?.ws_name}
                      label="WS Name"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <TextField
                      autoComplete="off"
                      autoFocus
                      type="number"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={
                        // getReadOnlyRow !== null ||
                        userRoles === 'GUEST' ||
                        userRoles === 'GUEST_BANK' ||
                        userRoles === 'GUEST_DIP' ||
                        userRoles === 'OPERATOR_TSS' ||
                        userRoles === 'GUEST_RELATED' ||
                        userRoles === 'OPERATOR_MOVER'
                      }
                      name="row_mesin"
                      // value={editSnMesin?.row_mesin === null ? '' : editSnMesin?.row_mesin}
                      value={row_mesin}
                      onChange={(e) => {
                        setrow_mesin(e.target.value);
                      }}
                      label="Row"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Table bawah */}
            <div className="w- full flex gap-5 mb-5 xl:row-start-2 my-8 col-span-2">
              <div className="">
                <TextField
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  name="ws_name"
                  value={editSnMesin?.ticket === null ? '-' : editSnMesin?.ticket}
                  label="Ticket"
                />
              </div>
              <div className="">
                <TextField
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  name="ws_name"
                  value={
                    editSnMesin?.installation_date === null ? '-' : editSnMesin?.installation_date
                  }
                  label="Installation Date"
                />
              </div>
              <div className="hidden">
                <TextField
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  error
                  color="warning"
                  name="ws_name"
                  value={
                    editSnMesin?.installation_date === null ? '-' : editSnMesin?.installation_date
                  }
                  label="Status"
                />
              </div>
              <div className="">
                <TextField
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  // error
                  // color="warning"
                  name="ws_name"
                  value={showTime === null || showTime === '' ? '-' : editSnMesin?.time_staging}
                  label="Time"
                />
                {/* {editSnMesin?.time_staging === null ? '-' : editSnMesin?.time_staging} */}
              </div>
            </div>

            {/* Button */}
            <div className=" flex flex-row-reverse p-12 sm:grid-rows-6">
              <Button
                variant="contained"
                disabled={
                  userRoles === 'GUEST' ||
                  userRoles === 'GUEST_BANK' ||
                  userRoles === 'GUEST_DIP' ||
                  userRoles === 'OPERATOR_TSS' ||
                  userRoles === 'OPERATOR_MOVER' ||
                  userRoles === 'GUEST_RELATED'
                }
                color={jsonExcel?.length !== 0 && name !== file_name ? 'success' : 'secondary'}
                // color="secondary"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                {jsonExcel?.length !== 0 && name !== file_name ? 'Uploaded' : 'Upload File'}
                <input type="file" hidden accept=".xlsx, .xls" onChange={handleselectedFile} />
              </Button>
              &nbsp;
              <Button
                variant="contained"
                disabled={
                  userRoles === 'GUEST' ||
                  userRoles === 'GUEST_BANK' ||
                  userRoles === 'GUEST_DIP' ||
                  userRoles === 'OPERATOR_TSS' ||
                  userRoles === 'OPERATOR_MOVER' ||
                  userRoles === 'GUEST_RELATED'
                }
                color="warning"
                className="ml-5"
                startIcon={<DocumentScannerIcon />}
                onClick={exportToExcel}
              >
                Download
              </Button>
              <div className="grid gap-4 grid-cols-2">
                <div className="gap-3">
                  <Button
                    color="success"
                    onClick={exportExcel}
                    variant="contained"
                    disabled={
                      userRoles === 'GUEST' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'OPERATOR_MOVER'
                    }
                  >
                    <PrintIcon className="mr-2" />
                    <div className="hidden md:contents">Export Excel</div>
                  </Button>
                </div>
                <div className="gap-3">
                  <Button
                    color="primary"
                    onClick={downloadPDF}
                    variant="contained"
                    disabled={
                      userRoles === 'GUEST' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'OPERATOR_MOVER'
                    }
                  >
                    <PictureAsPdfIcon className="mr-2" />
                    <div className="hidden md:contents">Export PDF</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse sm:w-full p-full gap-5 justify-between">
            <div className="flex gap-5 justify-between">
              <Typography variant="h6" className="mr-6">
                {showTime !== null ? '' : dispSecondsAsMins(timer)}
              </Typography>
              <Typography variant="h6" className="mr-6">
                {!props.idPo.includes('-') ? <>1</> : <>{Number(props.idPo.split('-')[1])}</>} /
                {props.dataDetailOrder?.jumlah}
              </Typography>

              <div className="flex">
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={pagin}
                  value={valuePagin}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setValuePagin(newValue?.label);
                    } else {
                      setValuePagin(null);
                    }
                  }}
                  sx={{ width: 100 }}
                  renderInput={(params) => <TextField {...params} label="Go" />}
                />
              </div>
              <div className="justify-between flex gap-5">
                <div className="">
                  <Button
                    onClick={handleConfirmation}
                    disabled={valuePagin === null}
                    variant="contained"
                  >{`To ${valuePagin === null ? '-' : valuePagin}`}</Button>
                </div>
                <div className="">
                  <Button
                    variant="contained"
                    color="success"
                    className="mr-3"
                    onClick={handleOnClickPrev}
                    disabled={Number(props.idPo.split('-')[1]) == 1}
                  >
                    Prev
                  </Button>
                </div>

                {loadingTable === true ? (
                  <div className="">
                    <Button
                      disabled
                      variant="contained"
                      startIcon={<CircularProgress size="2rem" />}
                      onClick={handleSubmitBarcode}
                      className="justify-end"
                    >
                      <AssignmentIcon className="mr-2" />
                      <div className="hidden md:contents">Loading</div>
                    </Button>
                  </div>
                ) : (
                  <>
                    {userRoles === 'GUEST' ||
                    userRoles === 'OPERATOR_TSS' ||
                    userRoles === 'GUEST_BANK' ||
                    userRoles === 'GUEST_DIP' ||
                    userRoles === 'GUEST_RELATED' ||
                    userRoles === 'OPERATOR_MOVER' ? (
                      ''
                    ) : (
                      <div className="justify-end text-sm sm:text-base">
                        <Button
                          variant="contained"
                          onClick={handleSubmitBarcode}
                          disabled={
                            jsonExcel.length === 0
                              ? editSnMesin.name === '' ||
                                editSnMesin.name === null ||
                                lenthText !== 10 ||
                                disabledBtn === true ||
                                errButton === true
                              : editSnMesin.name === '' ||
                                editSnMesin.name === null ||
                                lenthText !== 10
                          }
                          className=" "
                        >
                          <AssignmentIcon className="mr-2" />
                          <div className="hidden md:contents">Save</div>
                        </Button>
                      </div>
                    )}
                  </>
                )}
                <div className="p-full w-full">
                  <Button
                    variant="contained"
                    color="success"
                    className="ml-3 w-16 sm:w-auto text-sm sm:text-base"
                    onClick={handleConfirmation}
                    // onClick={handleOnClick}
                    disabled={props.dataDetailOrder?.jumlah === Number(props.idPo.split('-')[1])}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="my-10">
            <NewMachineTable
              userRoles={userRoles}
              pull_data={pull_data}
              columns={columns}
              data={datas}
              // data={data}
              idMesin={props.idPo.split('-')[1]}
              totalElements={totalElements}
              pages={props.page}
              setPage={props.setPage}
              rowsPerPage={props.rowsPerPage}
              setRowsPerPage={props.setRowsPerPage}
            />
          </div>
        </>
      )}
    </>
  );
}
