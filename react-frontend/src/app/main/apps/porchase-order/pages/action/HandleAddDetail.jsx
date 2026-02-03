/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Button,
  CircularProgress,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';

// const useStyles = makeStyles((theme) => ({
//   link: {
//     color: theme.palette.secondary.contrastText,
//   },
//   cardRoot: {
//     padding: '0px',
//     minWidth: '100%',
//   },
// }));
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;
const useStyles = makeStyles((_theme) => ({
  helperText: {
    marginLeft: 0,
  },
  dropdown: {
    '&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot': {
      padding: '0px !important',
      fontSize: '14px',
      color: '#1E5EF3',
      zindex: 99,
      fontWeight: 500,
    },
  },
  listbox: {
    '.MuiAutocomplete-listbox': {
      zindex: 99999,
    },
  },
}));

const HandleAddDetail = (props) => {
  const { getDatasPoById } = props;
  const classes = useStyles();
  const { api } = props;
  const { getAccessToken } = props;
  const { body } = props;
  const { newBodys } = props;
  // console.log(body, 'newBodys');
  const { setBody } = props;
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('DD MMMM YYYY');
  const [loadingModel, setloadingModel] = useState(true);
  const [loadingPicStagging, setloadingPicStagging] = useState(true);
  const [loadingType, setloadingType] = useState(true);
  const [loadingBrand, setloadingBrand] = useState(true);
  const [loadingStyle, setloadingStyle] = useState(true);
  const [loadingBatch, setloadingBatch] = useState(true);
  const [loadingWarehouse, setloadingWarehouse] = useState(true);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [loadingPO, setloadingPO] = useState(true);
  const [loadingStatusPO, setloadingStatusPO] = useState(true);

  const [listDataPicMitra, setlistDataPicMitra] = useState([]);
  const [listPoDummy, setlistPoDummy] = useState([]);
  const [listPoDummyFilter, setlistPoDummyFilter] = useState([]);
  const [listPoDummySnMesins, setlistPoDummySnMesins] = useState([]);
  const [Datapo, setDatapo] = useState([]);
  const [DataStatusPo, setDataStatusPo] = useState([]);
  const [DataCustomer, setDataCustomer] = useState([]);
  const [DataPicMitra, setDataPicMitra] = useState([]);
  const [DataModel, setDataModel] = useState([]);
  const [DataType, setDataType] = useState([]);
  const [DataBrand, setDataBrand] = useState([]);
  const [DataBatch, setDataBatch] = useState([]);
  const [DataStyle, setDataStyle] = useState([]);
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [getDataPoById, setDataPoById] = useState([]);
  const [getLoadingDataPoById, setLoadingDataPoById] = useState([]);
  const [getPo, setGetPo] = useState(null);

  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  // console.log(listPoDummy, 'listPoDummy');
  const obj = {};

  useEffect(() => {
    const datax = [];
    if (listPoDummy.length !== 0) {
      for (let index = 0; index < listPoDummy.length; index++) {
        datax.push({
          id: listPoDummy[index]?.object?.id,
          name: [
            listPoDummy[index]?.object?.no_po,
            listPoDummy[index]?.object?.model,
            listPoDummy[index]?.object?.name === null
              ? `No Style`
              : listPoDummy[index]?.object?.name,
          ]?.join(' - '),
        });
      }
    }
    setlistPoDummyFilter(datax);
    // console.log(datax, 'datax');
  }, [listPoDummy]);

  const getDataListPO = async () => {
    setloadingPO(true);
    const response = await axios
      .get(`${api}master-po`, config)
      .then((res) => {
        setDatapo(res?.data?.data);
        setloadingPO(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setloadingPO(false);
        setDatapo([]);
        const errStatus = err.response.status;
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
  const getDataListCustomer = async () => {
    setloadingCustomer(true);
    const response = await axios
      .get(`${api}master-customer`, config)
      .then((res) => {
        setDataCustomer(res?.data?.data);
        setloadingCustomer(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setloadingCustomer(false);
        setDataCustomer([]);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListPicMitra = async () => {
    setloadingPicStagging(true);
    const response = await axios
      .get(`${api}picmitra`, config)
      .then((res) => {
        setlistDataPicMitra(res?.data?.data);
        setloadingPicStagging(false);
        // console.log(res.data, 'DATA');
      })
      .catch((err) => {
        setloadingPicStagging(false);
        setlistDataPicMitra([]);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListModel = async () => {
    setloadingModel(true);
    const response = await axios
      .get(`${api}master-model`, config)
      .then((res) => {
        setDataModel(res?.data?.data);
        setloadingModel(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataModel([]);
        setloadingModel(false);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListBrand = async () => {
    setloadingBrand(true);
    const response = await axios
      .get(`${api}brand`, config)
      .then((res) => {
        setDataBrand(res?.data?.data);
        setloadingBrand(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataBrand([]);
        setloadingBrand(false);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListBacth = async () => {
    setloadingBatch(true);
    const response = await axios
      .get(`${api}bacth`, config)
      .then((res) => {
        setDataBatch(res?.data?.data);
        setloadingBatch(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataBatch([]);
        setloadingBatch(false);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListStatusPo = async () => {
    setloadingStatusPO(true);
    const response = await axios
      .get(`${api}status-po`, config)
      .then((res) => {
        setDataStatusPo(res?.data?.data);
        // setDataStatusPo(
        //   res?.data?.data.map((value) => ({
        //     id: value.id,
        //     name: value.status_desc,
        //     object: value,
        //   }))
        // );
        setloadingStatusPO(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataStatusPo([]);
        setloadingStatusPO(false);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListWarehouse = async () => {
    setloadingWarehouse(true);
    const response = await axios
      .get(`${api}master-gudang`, config)
      .then((res) => {
        setDataWarehouse(
          res?.data?.data.map((value) => ({
            id: value.id,
            gudang_desc: value.gudang_desc,
            object: value,
          }))
        );
        // setDataWarehouse(res?.data?.data);
        setloadingWarehouse(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataWarehouse([]);
        setloadingWarehouse(false);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  const getDataListStyle = async () => {
    setloadingStyle(true);
    const response = await axios
      .get(`${api}master-style`, config)
      .then((res) => {
        setDataStyle(
          res?.data?.data.map((value) => ({
            id: value.id,
            name: value.name,
            object: value,
          }))
        );
        setloadingStyle(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setDataStyle([]);
        setloadingStyle(false);
        console.log(err);
        const errStatus = err.response.status;
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
      });
  };
  // console.log(body?.id_type_mesin, 'body?.id_type_mesin');

  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'idPO':
        getDataListPO();
        // props.getDataPoById();
        break;
      case 'idCustomer':
        getDataListCustomer();
        break;
      case 'idModel':
        getDataListModel();
        break;
      case 'idBrand':
        getDataListBrand();
        break;
      case 'idBatch':
        getDataListBacth();
        break;
      case 'idWarehouse':
        getDataListWarehouse();
        break;
      case 'idPicMitra':
        getDataListPicMitra();
        break;
      case 'idStyle':
        getDataListStyle();
        break;
      case 'idStatusPo':
        getDataListStatusPo();
        break;
      // case 'idPoDummy':
      //   getDataListPoDummy();
      //   break;
      // case 'idPoDummySnMesin':
      //   getDataListPoDummySnMesins();
      //   break;
      default:
    }
  };
  useEffect(() => {
    if (body.id_status_po.status_desc !== 'Dummy' && body?.id_status_po !== '') {
      axios
        .get(`${api}getAllPoDummyBasedOnIdModel/${body?.id_status_po}`, config)
        .then((res) => {
          setlistPoDummy(
            res?.data?.data?.map((value) => ({
              id: value?.id,
              name: value?.concat_po,
              object: value,
            }))
          );
          setloadingStyle(false);
          // console.log(res.data);
        })
        .catch((err) => {
          setlistPoDummy([]);
          setloadingStyle(false);
          console.log(err);
          const errStatus = err?.response?.status;
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
        });
    }
    if (body?.copy_from_id_po !== null) {
      axios
        .get(`${api}getSnMesinByIdPoDummy/${body?.copy_from_id_po}`, config)
        .then((res) => {
          // console.log(res, 'res');
          setlistPoDummySnMesins(res?.data?.data);
          setloadingStyle(false);
          // console.log(res.data);
        })
        .catch((err) => {
          setlistPoDummySnMesins([]);
          setloadingStyle(false);
          console.log(err);
          const errStatus = err?.response?.status;
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
        });
    }
  }, [body.status_po, body.id_status_po, getPo, body?.copy_from_id_po]);
  useEffect(() => {
    if (body?.model?.id !== undefined) {
      axios
        .get(`${api}master-mesin/${body?.model?.id}`, config)
        .then((res) => {
          // console.log(res, 'res');
          setDataType(res?.data?.data);
          setloadingType(false);
        })
        .catch((err) => {
          setDataType([]);
          setloadingType(false);
          console.log(err);
          const errStatus = err.response.status;
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
        });
    }
  }, [body.model]);
  useEffect(() => {
    if (body.id_po_master !== 0) {
      axios
        .get(`${api}master-po/${body?.id_po_master}`, config)
        .then((res) => {
          // console.log(res, 'res');
          setDataPoById(res?.data?.data);
          setLoadingDataPoById(false);
        })
        .catch((err) => {
          setDataPoById([]);
          setLoadingDataPoById(false);
          console.log(err);
          const errStatus = err.response.status;
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
        });
    }
  }, [body.id_po_master]);

  useEffect(() => {
    if (getPo !== null) {
      axios
        .get(`${api}purchaseOrder/${getPo}/datas`, config)
        .then((res) => {
          // console.log(res, 'res');
          setBody.setmodel(res?.data?.data?.model);
          setBody.setid_type_mesin(res?.data?.data?.mesin);
          setBody?.setjumlah(res?.data?.data?.jumlah);
          setBody?.setbatch(res?.data?.data?.batch);
          setBody?.setpart_number(res?.data?.data?.part_number);
          setBody?.setsn_batch(res?.data?.data?.sn_batch);
          setBody.setstyle(res?.data?.data?.style);
          setBody.settahun_produksi(res?.data?.data?.tahun_produksi);
          setBody.setnama_gudang(res?.data?.data?.gudang);
          setBody.settgl_masuk(res?.data?.data?.tgl_masuk);
          setBody.settgl_staging(res?.data?.data?.tgl_staging);
          setBody.setpic_staging(res?.data?.data?.pic_staging);
          setBody?.setstatus_mesin(res?.data?.data?.status_mesin);
          // setDataType(res?.data?.data);
          setloadingType(false);
        })
        .catch((err) => {
          setDataType([]);
          setloadingType(false);
          console.log(err);
          const errStatus = err.response.status;
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
        });
    } else {
      setBody.setmodel('');
      setBody.setid_type_mesin('');
    }
  }, [getPo]);

  const [open, setOpen] = useState(false);
  const [getErrTgl, setgetErrTgl] = useState(false);
  const [getLengthPN, setgetLengthPN] = useState(0);
  const tglMasuk = moment(body.tgl_masuk).format('L');
  const tglKeluar = moment(body.tgl_staging).format('L');
  const dateCondition = moment(tglMasuk).isSameOrBefore(tglKeluar);
  const invalidDate = tglMasuk === 'Invalid date' || tglKeluar === 'Invalid date';

  useEffect(() => {
    if (dateCondition || invalidDate) {
      setgetErrTgl(false);
    } else {
      setgetErrTgl(true);
    }
  }, [tglMasuk, tglKeluar, dateCondition]);
  // console.log(newBodys?.copy_from_id_po, 'body?.copy_from_id_po?.id');
  // console.log(body?.id_status_po, 'status po');

  return (
    <FuseAnimate className="z-9999" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 md:w-xl w-auto items-left">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          {/* {console.log(body?.id_po_master, 'body?.id_po_master')} */}
          <div className=" w-full flex gap-10 flex-col md:flex-row ">
            <Autocomplete
              disablePortal
              id="idPO"
              options={Datapo}
              value={body?.id}
              fullWidth
              onFocus={handleFocus}
              getOptionLabel={(n) => (n?.no_po_master === undefined ? '' : n?.no_po_master)}
              getOptionSelected={(option) => option?.body?.no_po_master}
              loading={loadingPO === true}
              onChange={(_event, newValue, reason) => {
                if (reason === 'clear') {
                  setBody.setid_po_master('');
                  setBody.settgl_po(null);
                  setBody.setcustomer({
                    id: null,
                    name: '',
                  });
                }
                if (newValue) {
                  setBody.setno_po(newValue?.no_po_master);
                  setBody.setid_po_master(newValue?.id);
                } else {
                  setBody.setno_po('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  value={body.customer}
                  {...params}
                  label="No Po*"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            {body?.id_po_master === '' ? (
              <>
                {setBody.settgl_po(null)}
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Purchase Order Date"
                        inputFormat="dd MMM yyyy"
                        value={body?.tgl_po}
                        // value={moment(body?.tgl_po).format('YYYY-MM-DD HH:mm:ss')}
                        fullWidth
                        disabled
                        onChange={(newValue) => {
                          if (newValue) {
                            setBody.settgl_po(newValue);
                          } else {
                            setBody.settgl_po(null);
                          }
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <Autocomplete
                  disablePortal
                  id="idCustomer"
                  options={DataCustomer}
                  value={body?.customer?.id}
                  fullWidth
                  disabled
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                  getOptionSelected={(option) => option?.body?.customer?.bank_desc}
                  loading={loadingCustomer === true}
                  onChange={(_event, newValue, reason) => {
                    if (newValue) {
                      setBody.setcustomer(newValue?.id);
                    } else {
                      setBody.setcustomer({
                        id: null,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={body.customer}
                      {...params}
                      label="Customer"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
              </>
            ) : getDatasPoById[0]?.customer === null ? (
              <>
                {/* {setBody.settgl_po(null)} */}
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Purchase Order Date"
                        inputFormat="dd MMM yyyy"
                        value={body?.tgl_po}
                        // value={moment(body?.tgl_po).format('YYYY-MM-DD HH:mm:ss')}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setBody.settgl_po(newValue);
                          } else {
                            setBody.settgl_po(null);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField fullWidth value={body.tgl_po} {...params} />
                        )}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <Autocomplete
                  disablePortal
                  id="idCustomer"
                  options={DataCustomer}
                  value={body?.customer.id}
                  fullWidth
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                  // getOptionSelected={(option) => option?.id === body.customer.id}
                  getOptionSelected={(option) => option?.body.customer.bank_desc}
                  loading={loadingCustomer === true}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      setBody.setcustomer(newValue.id);
                    } else {
                      setBody.setcustomer({
                        id: null,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      // value={body.customer}
                      {...params}
                      label="CustomerPObaru*"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <Tooltip
                              className="cursor-pointer"
                              onClick={() => setOpen(true)}
                              placement="top-end"
                              title="Add Customer"
                            >
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  // title="Tambah Batch Baru"
                                >
                                  <Icon>add_circle</Icon>
                                </IconButton>
                              </InputAdornment>
                            </Tooltip>
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </>
            ) : (
              <>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Purchase Order Date"
                        inputFormat="dd MMM yyyy"
                        value={body?.tgl_po}
                        // readOnly
                        // disabled
                        // value={moment(body?.tgl_po).format('YYYY-MM-DD HH:mm:ss')}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setBody.settgl_po(newValue);
                          } else {
                            setBody.settgl_po(null);
                          }
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                {/* {console.log(body?.customer?.name)} */}
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Customer*"
                  readOnly
                  disabled
                  value={body?.customer?.name}
                  onChange={(e) => {
                    setBody?.setcustomer(e.target.value);
                  }}
                />
              </>
            )}
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status PO</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={body.status_po}
                label="Status PO"
                onChange={(e) => setBody?.setstatus_po(e.target.value)}
              >
                <MenuItem value="Valid">Valid</MenuItem>
                <MenuItem value="Dummy">Dummy</MenuItem>
              </Select>
            </FormControl> */}
            <Autocomplete
              disablePortal
              id="idStatusPo"
              className={classes.listbox}
              options={DataStatusPo}
              value={body.id_status_po.id}
              fullWidth
              onFocus={handleFocus}
              getOptionLabel={(n) => (n?.status_desc === undefined ? '' : n?.status_desc)}
              getOptionSelected={(option) => option?.name === body.id_status_po.status_desc}
              loading={loadingStatusPO === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setBody.setid_status_po(newValue.id);
                } else {
                  setBody.setid_status_po('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status PO"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
          </div>
          {/* <div className="mt-10 w-full flex gap-10 flex-col md:flex-row">
            {body?.id_status_po.status_desc !== 'Dummy' ? (
              <>
                <Autocomplete
                  disablePortal
                  id="idPoDummySnMesin"
                  options={listPoDummyFilter}
                  value={body?.copy_from_id_po?.id}
                  fullWidth
                  // disabled={body?.id_type_mesin === ''}
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === body?.copy_from_id_po?.name}
                  // loading={loadingPicStagging === true}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      setBody.setcopy_from_id_po(newValue?.id);
                      setGetPo(newValue?.id);
                    } else {
                      setBody.setcopy_from_id_po(null);
                      setGetPo(null);
                      setBody.setmodel('');
                      setBody.setid_type_mesin('');
                      setBody?.setpart_number('');
                      setBody.setbatch('');
                      setBody?.setjumlah(1);
                      setBody?.setstok(1);
                      setBody.setstyle('');
                      setBody.setsn_mesins([]);
                      setBody.setnama_gudang('');
                      setBody.settahun_produksi(null);
                      setBody.settgl_staging(null);
                      setBody.settgl_masuk(null);
                      setBody.setpic_staging('');
                      setBody?.setstatus_mesin('');
                      setBody?.setsn_batch('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled={loadingPicStagging === true}
                      {...params}
                      label="PO Dummy"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="idPoDummySnMesin"
                  options={listPoDummySnMesins}
                  multiple
                  // filterSelectedOptions
                  value={body?.sn_mesins}
                  disabled={body?.copy_from_id_po === null}
                  fullWidth
                  onFocus={handleFocus}
                  // inputValue={body?.pic_staging?.id}
                  getOptionLabel={(n) => (n?.snMesin === undefined ? '' : n?.snMesin)}
                  // getOptionSelected={(option) => option?.id === body.copy_from_id_po.name}
                  loading={loadingPicStagging === true}
                  onChange={(_event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      setBody.setsn_mesins(newValue);
                    } else {
                      setBody.setsnmesins([]);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled={loadingPicStagging === true}
                      {...params}
                      // onChange={(e) => setBody.setpic_staging(e.target.value)}
                      label="SN-Mesin PO Dummy"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
              </>
            ) : (
              ''
            )}
          </div> */}
          {body?.id_status_po !== 1 &&
            body?.id_status_po !== '' &&
            body?.id_status_po !== null &&
            body?.id_status_po.status_desc !== 'Dummy' && (
              <div className="mt-10 w-full flex gap-10 flex-col md:flex-row">
                <Autocomplete
                  disablePortal
                  id="idPoDummySnMesin"
                  options={listPoDummyFilter}
                  value={body?.copy_from_id_po?.id}
                  fullWidth
                  // disabled={body?.id_type_mesin === ''}
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === body?.copy_from_id_po?.name}
                  // loading={loadingPicStagging === true}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      setBody.setcopy_from_id_po(newValue?.id);
                      setGetPo(newValue?.id);
                    } else {
                      setBody.setcopy_from_id_po(null);
                      setGetPo(null);
                      setBody.setmodel('');
                      setBody.setid_type_mesin('');
                      setBody?.setpart_number('');
                      setBody.setbatch('');
                      setBody?.setjumlah(1);
                      setBody?.setstok(1);
                      setBody.setstyle('');
                      setBody.setsn_mesins([]);
                      setBody.setnama_gudang('');
                      setBody.settahun_produksi(null);
                      setBody.settgl_staging(null);
                      setBody.settgl_masuk(null);
                      setBody.setpic_staging('');
                      setBody?.setstatus_mesin('');
                      setBody?.setsn_batch('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled={loadingPicStagging === true}
                      {...params}
                      label="PO Dummy"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="idPoDummySnMesin"
                  options={listPoDummySnMesins}
                  multiple
                  // filterSelectedOptions
                  value={body?.sn_mesins}
                  disabled={body?.copy_from_id_po === null}
                  fullWidth
                  onFocus={handleFocus}
                  // inputValue={body?.pic_staging?.id}
                  getOptionLabel={(n) => (n?.snMesin === undefined ? '' : n?.snMesin)}
                  // getOptionSelected={(option) => option?.id === body.copy_from_id_po.name}
                  loading={loadingPicStagging === true}
                  onChange={(_event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      setBody.setsn_mesins(newValue);
                    } else {
                      setBody.setsnmesins([]);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled={loadingPicStagging === true}
                      {...params}
                      // onChange={(e) => setBody.setpic_staging(e.target.value)}
                      label="SN-Mesin PO Dummy"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
              </div>
            )}
          <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Brand*"
              defaultValue="HYOSUNG"
              disabled
              value={body.brand?.name}
              onChange={(e) => setBody?.setbrand(e.target.value)}
            />
            <Autocomplete
              disablePortal
              id="idModel"
              onFocus={handleFocus}
              options={DataModel}
              value={body?.model}
              fullWidth
              disabled={getPo !== null}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.label === body.model.name}
              loading={loadingModel === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setBody.setmodel(newValue);
                } else {
                  setBody.setmodel('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="idType"
              options={DataType}
              value={body.id_type_mesin}
              fullWidth
              onFocus={handleFocus}
              // getOptionLabel={(n) => (body.model === '' ? '' : n?.type)}
              getOptionLabel={(n) => (n?.type === undefined ? '' : n?.type)}
              getOptionSelected={(option) => option?.type === body.id_type_mesin}
              disabled={body.model === '' || getPo !== null}
              loading={loadingType === true}
              focused
              onChange={(_event, newValue) => {
                // console.log(newValue);
                if (newValue) {
                  setBody.setid_type_mesin(newValue);
                } else {
                  setBody.setid_type_mesin('');
                  setBody.setcopy_from_id_po(null);
                  setBody.setsnmesins([]);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Quantity"
              type="number"
              value={body?.jumlah}
              error={body?.jumlah <= '0' || body.jumlah > 5000}
              // color={DateSettingTahun ? 'warning' : 'primary'}
              helperText={
                body?.jumlah <= '0'
                  ? '*Number Cannot be less 1!'
                  : body.jumlah > 5000
                  ? '*Total Cannot be more 5000!'
                  : ''
              }
              onChange={(e) => {
                setBody?.setjumlah(e.target.value);
                setBody?.setstok(e.target.value);
              }}
            />
          </div>
          <div className="w-full flex gap-10 mt-10 flex-col md:flex-row">
            <Autocomplete
              disablePortal
              id="idBatch"
              className={classes.listbox}
              options={DataBatch}
              value={body.batch}
              fullWidth
              onFocus={handleFocus}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.name === body.bacth.name}
              loading={loadingBatch === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setBody.setbatch(newValue);
                } else {
                  setBody.setbatch('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Batch"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Part Number System*"
              type="number"
              error={getLengthPN === 0 ? false : getLengthPN < 10}
              helperText={
                getLengthPN === 0 ? '' : getLengthPN < 10 ? 'Cannot be more/less 10 Number' : ''
              }
              value={body.part_number}
              onChange={(e) => {
                if (e.target.value.length === 11) {
                  return;
                }
                setgetLengthPN(e.target.value.length);
                // console.log(e.target.value.length);
                setBody?.setpart_number(e.target.value);
              }}
            />
            <TextField
              fullWidth
              id="outlined-password-input"
              label="SN Batch*"
              // defaultValue=""
              // disabled
              value={body.sn_batch}
              onChange={(e) => setBody?.setsn_batch(e.target.value)}
            />
            <Autocomplete
              disablePortal
              id="idStyle"
              className={classes.listbox}
              options={DataStyle}
              value={body.style}
              fullWidth
              onFocus={handleFocus}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.label === body.bacth.name}
              loading={loadingBatch === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setBody.setstyle(newValue);
                } else {
                  setBody.setstyle('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Style"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            {/* {console.log(body.sn_batch, 'sn batch')} */}
          </div>
          <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={20}>
                  <DesktopDatePicker
                    label="Production Year"
                    // format={formatDateTahun}
                    value={body.tahun_produksi}
                    maxDate={new Date()}
                    fullWidth
                    onChange={(newValue) => {
                      if (newValue) {
                        setBody.settahun_produksi(newValue);
                      } else {
                        setBody.settahun_produksi(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth value={body.tahun_produksi} {...params} />
                    )}
                    views={['year', 'month']}
                    placeholderText="Please select a date"
                    // maxDate={new Date()}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <Autocomplete
              disablePortal
              id="idWarehouse"
              options={DataWarehouse}
              value={body.nama_gudang}
              fullWidth
              onFocus={handleFocus}
              getOptionLabel={(n) => (n?.gudang_desc === undefined ? '' : n?.gudang_desc)}
              getOptionSelected={(option, value) => option.gudang_desc === value.gudang_desc}
              getOptionDisabled={(option) => option.id === 'error'}
              loading={loadingBatch === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  // console.log(newValue, 'newValue');
                  setBody.setnama_gudang(newValue);
                } else {
                  setBody.setnama_gudang('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Warehouse"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={20}>
                  <DesktopDatePicker
                    label="Entry Date"
                    // maxDate={new Date()}
                    // format={formatDate}
                    inputFormat="dd MMM yyyy"
                    // value={moment(body.tgl_masuk).format('YYYY-DD-MM')}
                    value={body.tgl_masuk}
                    fullWidth
                    onChange={(newValue) => {
                      if (newValue) {
                        setBody.settgl_masuk(newValue);
                      } else {
                        setBody.settgl_masuk(null);
                      }
                    }}
                    // disabled={body.tahun_produksi === null}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        error={getErrTgl}
                        color={getErrTgl === true ? 'error' : 'primary'}
                        // helperText={
                        //   getErrTgl === true
                        //     ? '*Tanggal rencana staging tidak boleh lebih dari tanggal masuk*'
                        //     : ''
                        // }
                        // focused
                      />
                    )}
                    // views={['year']}
                    // views={['day','year', 'month']}
                    placeholderText="Please select a date"
                    // maxDate={new Date()}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>
          <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={20}>
                  <DesktopDatePicker
                    label="Planned Staging Date"
                    // format={formatDate}
                    inputFormat="dd MMM yyyy"
                    // value={moment(body.tgl_staging).format('YYYY-MM-YY')}
                    value={body.tgl_staging}
                    fullWidth
                    onChange={(newValue) => {
                      if (newValue) {
                        setBody.settgl_staging(newValue);
                      } else {
                        // console.log('null');
                        setBody.settgl_staging(null);
                      }
                    }}
                    // disabled={body.tgl_masuk === null}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        error={getErrTgl}
                        color={getErrTgl === true ? 'error' : 'primary'}
                        helperText={
                          getErrTgl === true
                            ? '*Planned Staging Date Cannot Be Later Than Entry Date*'
                            : ''
                        }
                        // focused
                      />
                    )}
                    placeholderText="Please select a date"
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <Autocomplete
              disablePortal
              id="idPicMitra"
              options={listDataPicMitra}
              value={body?.pic_staging}
              fullWidth
              onFocus={handleFocus}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.id === body.picMitra.name}
              loading={loadingPicStagging === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setBody.setpic_staging(newValue);
                } else {
                  setBody.setpic_staging('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  disabled={loadingPicStagging === true}
                  {...params}
                  label="PIC Staging"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status Machine</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={body.status_mesin}
                label="Status Machine"
                onChange={(e) => setBody?.setstatus_mesin(e.target.value)}
              >
                <MenuItem value="Old Machine">Old Machine</MenuItem>
                <MenuItem value="New Machine">New Machine</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <div>
          <div className="flex justify-end mt-10">
            <Button variant="contained" onClick={props.handleClose} className="mr-5">
              Close
            </Button>
            {props.loading === true ? (
              <Button
                disabled
                onClick={props.HandleSubmit}
                variant="contained"
                startIcon={<CircularProgress size="2rem" />}
              >
                <div className="hidden md:contents">Loading</div>
              </Button>
            ) : (
              <Button
                disabled={
                  newBodys?.copy_from_id_po === null
                    ? newBodys?.tgl_po === null ||
                      newBodys?.jumlah > 5000 ||
                      newBodys?.part_number === '' ||
                      newBodys?.model === '' ||
                      newBodys?.status_mesin === '' ||
                      newBodys?.nama_gudang === '' ||
                      newBodys?.pic_staging === '' ||
                      newBodys?.id_type_mesin === '' ||
                      newBodys?.batch === '' ||
                      // newBodys?.brand === '' ||
                      newBodys?.tgl_masuk === null ||
                      newBodys?.tgl_staging === null ||
                      newBodys?.customer === '' ||
                      newBodys?.tahun_produksi === null ||
                      newBodys?.jumlah <= '0' ||
                      getLengthPN < 10 ||
                      getErrTgl === true
                    : newBodys?.tgl_po === null ||
                      newBodys?.jumlah > 5000 ||
                      newBodys?.part_number === '' ||
                      newBodys?.model === '' ||
                      newBodys?.status_mesin === '' ||
                      newBodys?.nama_gudang === '' ||
                      newBodys?.pic_staging === '' ||
                      newBodys?.id_type_mesin === '' ||
                      newBodys?.batch === '' ||
                      // newBodys?.brand === '' ||
                      newBodys?.tgl_masuk === null ||
                      newBodys?.tgl_staging === null ||
                      newBodys?.customer === '' ||
                      newBodys?.tahun_produksi === null ||
                      newBodys?.jumlah <= '0' ||
                      // getLengthPN < 10 ||
                      newBodys?.snmesins?.length === 0 ||
                      getErrTgl === true
                  // body.no_po === '' ||
                }
                onClick={props.HandleSubmit}
                variant="contained"
                // startIcon={<PlaylistAddIcon />}
              >
                <div className=" md:contents">Save</div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
};

export default HandleAddDetail;
