/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
// import PartNumber from '../../mockData/PartNumber';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

export default function HandleEditDetail(props) {
  const classes = useStyles();
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const { dataEdit, setDataEdit } = props;
  const methods = useFormContext();
  const { setBody } = props;
  // const [value, setValue] = useState(props.dataEdit);
  const [value, setValue] = useState(props?.dataEdit);
  const [tglPO, setTglPo] = useState(dataEdit?.tgl_po);
  const [tglProduksi, settglProduksi] = useState(dataEdit?.tahun_produksi);
  const [tglMasuk, setTglMasuk] = useState(dataEdit?.tgl_masuk);
  const [tglStaging, settglStaging] = useState(dataEdit?.tgl_staging);
  const [valueStatusMesin, setvalueStatusMesin] = useState(dataEdit?.status_mesin);
  // const [valueStatuPo, setvalueStatuPo] = useState(dataEdit?.status_po);
  const [valuePoDummy, setvaluePoDummy] = useState(null);
  const [valueSnMesins, setvalueSnMesins] = useState(dataEdit?.sn_mesins);
  // console.log(dataEdit, 'dataEdit');
  const [listPoDummyFilter, setlistPoDummyFilter] = useState([]);
  useEffect(() => {
    const datax = [];
    if (dataEdit.copy_from_po !== null) {
      datax.push({
        id: dataEdit?.copy_from_po?.object?.id,
        name: [
          dataEdit?.copy_from_po?.no_po,
          dataEdit.copy_from_po?.model?.type,
          dataEdit?.copy_from_po?.style === null ? `No Style` : dataEdit?.copy_from_po?.style?.name,
        ]?.join(' - '),
      });
      setvaluePoDummy(datax[0]);
    }
    setlistPoDummyFilter(datax);
    // console.log(datax, 'datax');
  }, [dataEdit?.copy_from_po]);

  // useEffect(() => {
  //   setDataEdit(props.row);
  // }, [props.row]);

  const [valueTglStaging, setvalueTglStaging] = useState({
    name: value?.tgl_po || '',
    id: value?.id || '',
    json: value || null,
  });
  // console.log(valueTglStaging, 'valueTglStaging');

  const [openCustomer, setopenCustomer] = useState(false);
  const [optionCustomer, setoptionCustomer] = useState([]);
  const [valueCustomer, setvalueCustomer] = useState({
    name: value?.customer?.bank_desc || '',
    id: value?.customer?.id || '',
    json: value || null,
  });

  const loadingCustomer = openCustomer && optionCustomer.length === 0;
  const [triggerCustomer, settriggerCustomer] = useState(true);

  useEffect(() => {
    settriggerCustomer(true);
    axios
      .get(`${api}master-customer`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataCustomer = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.bank_desc,
            json: data,
          };
        });

        setoptionCustomer(dataCustomer);
        settriggerCustomer(false);
      })
      .catch((error) => {
        setoptionCustomer([]);
        settriggerCustomer(false);
      });
  }, [loadingCustomer]);

  // handleModel
  const [openModel, setopenModel] = useState(false);
  const [optionModel, setoptionModel] = useState([]);
  const [valueModel, setvalueModel] = useState({
    name: value?.model?.name || '',
    id: value?.model?.id || '',
    json: value || null,
  });

  const loadingModel = openModel && optionModel.length === 0;
  const [triggerModel, settriggerModel] = useState(true);

  useEffect(() => {
    settriggerModel(true);
    axios
      .get(`${api}master-model`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataModel = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionModel(dataModel);
        settriggerModel(false);
      })
      .catch((error) => {
        setoptionModel([]);
        settriggerModel(false);
      });
  }, [loadingModel]);

  // handleModel
  const [openStyle, setopenStyle] = useState(false);
  const [optionStyle, setoptionStyle] = useState([]);
  const [valueStyle, setvalueStyle] = useState({
    name: value?.styles?.name || '',
    id: value?.styles?.id || '',
    json: value || null,
  });

  const loadingStyle = openStyle && optionStyle.length === 0;
  const [triggerStyle, settriggerStyle] = useState(true);

  useEffect(() => {
    settriggerStyle(true);
    axios
      .get(`${api}master-style`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataStyle = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionStyle(dataStyle);
        settriggerStyle(false);
      })
      .catch((error) => {
        setoptionStyle([]);
        settriggerStyle(false);
      });
  }, [loadingStyle]);

  // handleType
  const [openType, setopenType] = useState(false);
  const [optionType, setoptionType] = useState([]);
  const [valueType, setvalueType] = useState({
    name: value?.mesin?.type || '',
    id: value?.mesin?.id || '',
    json: value || null,
  });

  const loadingType = openType && optionType.length === 0;
  const [triggerType, settriggerType] = useState(true);

  useEffect(() => {
    settriggerType(true);
    axios
      .get(`${api}master-mesin`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataType = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.type,
            json: data,
          };
        });

        setoptionType(dataType);
        settriggerType(false);
      })
      .catch((error) => {
        setoptionType([]);
        settriggerType(false);
      });
  }, [loadingType]);

  // handleBrand
  const [openBrand, setopenBrand] = useState(false);
  const [optionBrand, setoptionBrand] = useState([]);
  const [valueBrand, setvalueBrand] = useState({
    name: value?.brand || '',
    id: value?.id || '',
    json: value || null,
  });

  const loadingBrand = openBrand && optionBrand.length === 0;
  const [triggerBrand, settriggerBrand] = useState(true);

  useEffect(() => {
    settriggerBrand(true);
    axios
      .get(`${api}brand`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataBrand = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionBrand(dataBrand);
        settriggerBrand(false);
      })
      .catch((error) => {
        setoptionBrand([]);
        settriggerBrand(false);
      });
  }, [loadingBrand]);

  // handleBatch
  const [openBatch, setopenBatch] = useState(false);
  const [optionBatch, setoptionBatch] = useState([]);
  const [valueBatch, setvalueBatch] = useState({
    name: value?.batch?.name || '',
    id: value?.batch?.id || '',
    json: value || null,
  });

  const loadingBatch = openBatch && optionBatch.length === 0;
  const [triggerBatch, settriggerBatch] = useState(true);

  useEffect(() => {
    settriggerBatch(true);
    axios
      .get(`${api}bacth`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataBatch = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionBatch(dataBatch);
        settriggerBatch(false);
      })
      .catch((error) => {
        setoptionBatch([]);
        settriggerBatch(false);
      });
  }, [loadingBatch]);

  // handleWarehouse
  const [openWarehouse, setopenWarehouse] = useState(false);
  const [optionWarehouse, setoptionWarehouse] = useState([]);
  const [valueWarehouse, setvalueWarehouse] = useState({
    name: value?.gudang?.gudang_desc || '',
    id: value?.gudang?.id || '',
    json: value || null,
  });

  const loadingWarehouse = openWarehouse && optionWarehouse.length === 0;
  const [triggerWarehouse, settriggerWarehouse] = useState(true);

  useEffect(() => {
    settriggerWarehouse(true);
    axios
      .get(`${api}master-gudang`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataWarehouse = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.gudang_desc,
            json: data,
          };
        });

        setoptionWarehouse(dataWarehouse);
        settriggerWarehouse(false);
      })
      .catch((error) => {
        setoptionWarehouse([]);
        settriggerWarehouse(false);
      });
  }, [loadingWarehouse]);

  // handlePicSttaging
  const [openPicSttaging, setopenPicSttaging] = useState(false);
  const [optionPicSttaging, setoptionPicSttaging] = useState([]);
  const [valuePicSttaging, setvaluePicSttaging] = useState({
    name: value?.pic_staging?.name || '',
    id: value?.pic_staging?.id || '',
    json: value || null,
  });

  const loadingPicSttaging = openPicSttaging && optionPicSttaging.length === 0;
  const [triggerPicSttaging, settriggerPicSttaging] = useState(true);

  useEffect(() => {
    settriggerPicSttaging(true);
    axios
      .get(`${api}picmitra`, config)
      .then((response) => {
        const jsonResult = response.data.data;

        const dataPicSttaging = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionPicSttaging(dataPicSttaging);
        settriggerPicSttaging(false);
      })
      .catch((error) => {
        setoptionPicSttaging([]);
        settriggerPicSttaging(false);
      });
  }, [loadingPicSttaging]);

  // handleStatusPO
  const [openStatusPo, setopenStatusPo] = useState(false);
  const [optionStatusPo, setoptionStatusPo] = useState([]);
  const [valueStatusPo, setvalueStatusPo] = useState({
    name: value?.status_po_details?.status_desc || '',
    id: value?.status_po_details?.id || '',
    json: value || null,
  });

  const loadingStatusPo = openStatusPo && optionStatusPo.length === 0;
  const [triggerStatusPo, settriggerStatusPo] = useState(true);

  useEffect(() => {
    settriggerStatusPo(true);
    axios
      .get(`${api}status-po`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataStatusPo = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.status_desc,
            json: data,
          };
        });

        setoptionStatusPo(dataStatusPo);
        settriggerStatusPo(false);
      })
      .catch((error) => {
        setoptionStatusPo([]);
        settriggerStatusPo(false);
      });
  }, [loadingStatusPo]);

  // status mesin
  // const [valueStatusMesin, setvalueStatusMesin] = useState({
  //   name: value?.status_mesin || '',
  //   id: value?.id || '',
  //   json: value || null,
  // });

  const handleChangeUpdate = (e) => {
    const values = e.target.value;
    setValue(() => {
      return {
        ...value,
        [e.target.name]: values,
      };
    });
    props.setDataById(() => {
      return {
        ...value,
        [e.target.name]: values,
      };
    });
  };

  function handleOnChange(label, values) {
    setValue((prev) => {
      return {
        ...value,
        [label]: values,
      };
    });
    // props.setDataById((prev) => {
    //   return {
    //     ...prev,
    //     [label]: values,
    //   };
    // });
    switch (label) {
      case 'customer':
        if (values !== null) {
          setvalueCustomer({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueCustomer({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'model':
        if (values !== null) {
          setvalueModel({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueModel({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'type':
        if (values !== null) {
          setvalueType({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueType({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'brand':
        if (values !== null) {
          setvalueBrand({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueBrand({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'batch':
        if (values !== null) {
          setvalueBatch({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueBatch({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'partNumber':
        if (values !== null) {
          setvaluePartNumber({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvaluePartNumber({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'warehouse':
        if (values !== null) {
          setvalueWarehouse({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueWarehouse({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'pic_Staging':
        if (values !== null) {
          setvaluePicSttaging({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvaluePicSttaging({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'statusMesin':
        if (values !== null) {
          setvalueStatusMesin({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueStatusMesin({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'tgl_po':
        if (values !== null) {
          setvalueTglStaging({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueTglStaging({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      case 'statusPo':
        if (values !== null) {
          setvalueStatusPo({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueStatusPo({
            id: '',
            name: '',
            json: null,
          });
        }
        break;
      default:
    }
  }
  const [getErrTgl, setgetErrTgl] = useState(false);
  const [getLengthPN, setgetLengthPN] = useState(0);
  const tglMasuks = moment(tglMasuk).format('L');
  const tglKeluars = moment(tglStaging).format('L');
  const dateCondition = moment(tglMasuks).isSameOrBefore(tglKeluars);

  useEffect(() => {
    if (dateCondition) {
      setgetErrTgl(false);
    } else {
      setgetErrTgl(true);
    }
  }, [tglMasuks, tglKeluars, dateCondition]);
  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 md:w-xl w-auto items-left">
        <div>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className=" w-full flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="No PO*"
                  type="text"
                  // value={value.no_po}
                  value={value?.po_master?.no_po_master}
                  name="no_po"
                  disabled
                  focused
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleOnChange('tgl_po', newValue);
                    } else if (!newValue) {
                      handleOnChange('tgl_po', newValue);
                    }
                  }}
                />
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        id="tgl_po"
                        name="tgl_po"
                        label="Purchase Order Date"
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        value={tglPO}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setTglPo(newValue);
                            setDataEdit({ ...dataEdit, tgl_po: newValue });
                          } else {
                            setTglPo(null);
                            setDataEdit({ ...dataEdit, tgl_po: null });
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
                  id="combo-box-customer"
                  noOptionsText="No Option Available"
                  options={optionCustomer}
                  onOpen={() => {
                    setopenCustomer(true);
                  }}
                  onClose={() => {
                    setopenCustomer(false);
                  }}
                  // options={Custumor}
                  // value={value?.customer}
                  value={valueCustomer}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  // getOptionSelected={(option) => option.id === valueCustomer.id}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  loading={triggerCustomer === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueCustomer(newValue);
                      setDataEdit({ ...dataEdit, customer: newValue });
                    } else if (!newValue) {
                      setvalueCustomer(null);
                      setDataEdit({ ...dataEdit, customer: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Customer"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-status-po"
                  noOptionsText="No Option Available"
                  options={optionStatusPo}
                  onOpen={() => {
                    setopenStatusPo(true);
                  }}
                  onClose={() => {
                    setopenStatusPo(false);
                  }}
                  // options={Custumor}
                  // value={value?.customer}
                  value={valueStatusPo}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  // getOptionSelected={(option) => option.id === valueCustomer.id}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  loading={triggerStatusPo === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueStatusPo(newValue);
                      setDataEdit({ ...dataEdit, status_po_details: newValue });
                    } else if (!newValue) {
                      setvalueStatusPo(null);
                      setDataEdit({ ...dataEdit, status_po_details: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Status PO"
                    />
                  )}
                />
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status PO</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valueStatuPo}
                    label="Status PO"
                    onChange={(event) => {
                      if (event) {
                        setvalueStatuPo(event.target.value);
                        setDataEdit({
                          ...dataEdit,
                          status_po: event.target.value,
                        });
                        // handleOnChange('statusMesin', newValue);
                      } else {
                        setvalueStatuPo(null);
                        setDataEdit({ ...dataEdit, status_po: null });
                        // handleOnChange('statusMesin', newValue);
                      }
                    }}
                    // onChange={(e) => setBody?.setstatus_po(e.target.value)}
                  >
                    <MenuItem value="Valid">Valid</MenuItem>
                    <MenuItem value="Dummy">Dummy</MenuItem>
                  </Select>
                </FormControl> */}
              </div>
              {dataEdit?.copy_from_po !== null ? (
                <div className="mt-10 w-full flex gap-10 flex-col md:flex-row">
                  <Autocomplete
                    disablePortal
                    // id="idPoDummySnMesin"
                    value={valuePoDummy}
                    disabled
                    fullWidth
                    getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                    options={listPoDummyFilter}
                    // disabled={body?.id_type_mesin === ''}
                    // onFocus={handleFocus}
                    // getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                    // getOptionSelected={(option) => option?.id === body?.copy_from_id_po?.name}
                    // loading={loadingPicStagging === true}
                    // onChange={(_event, newValue) => {
                    //   if (newValue) {
                    //     setBody.setcopy_from_id_po(newValue?.id);
                    //     setGetPo(newValue?.id);
                    //   } else {
                    //     setBody.setcopy_from_id_po(null);
                    //     setGetPo(null);
                    //     setBody.setmodel('');
                    //     setBody.setid_type_mesin('');
                    //     setBody?.setpart_number('');
                    //     setBody.setbatch('');
                    //     setBody?.setjumlah(1);
                    //     setBody?.setstok(1);
                    //     setBody.setstyle('');
                    //     setBody.setsnmesins([]);
                    //     setBody.setnama_gudang('');
                    //     setBody.settahun_produksi(null);
                    //     setBody.settgl_staging(null);
                    //     setBody.settgl_masuk(null);
                    //     setBody.setpic_staging('');
                    //     setBody?.setstatus_mesin('');
                    //     setBody?.setsn_batch('');
                    //   }
                    // }}
                    // onChange={(_event, newValue) => {
                    //   console.log(newValue, 'newValue');
                    //   if (newValue) {
                    //     setBody.setsnmesins(newValue);
                    //   } else {
                    //     setBody.setsnmesins([]);
                    //   }
                    // }}
                    renderInput={(params) => (
                      <TextField
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
                    multiple
                    filterSelectedOptions
                    fullWidth
                    disabled
                    value={valueSnMesins}
                    options={valueSnMesins}
                    getOptionLabel={(n) => (n?.snMesin === undefined ? '' : n?.snMesin)}
                    renderInput={(params) => (
                      <TextField
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
              ) : (
                ''
              )}

              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  readOnly
                  onOpen={() => {
                    setopenBrand(true);
                  }}
                  onClose={() => {
                    setopenBrand(false);
                  }}
                  options={optionBrand}
                  value={valueBrand}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === value?.id}
                  loading={triggerBrand === true}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      // handleOnChange('brand', newValue);
                      setvalueBrand(newValue);
                      setDataEdit({ ...dataEdit, brand: newValue });
                    } else {
                      // handleOnChange('brand', null);
                      setvalueBrand(null);
                      setDataEdit({ ...dataEdit, brand: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      label="Brand"
                    />
                  )}
                />
                <Autocomplete
                  disabled
                  disablePortal
                  id="model"
                  options={optionModel}
                  onOpen={() => {
                    setopenModel(true);
                  }}
                  onClose={() => {
                    setopenModel(false);
                  }}
                  value={valueModel}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option.id === value?.model?.id}
                  loading={triggerModel === true}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      handleOnChange('model', newValue);
                    } else if (!newValue) {
                      handleOnChange('model', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      name="model"
                      label="Type"
                    />
                  )}
                />
                <Autocomplete
                  disabled
                  noOptionsText="No Option Available"
                  disablePortal
                  id="type"
                  onOpen={() => {
                    setopenType(true);
                  }}
                  onClose={() => {
                    setopenType(false);
                  }}
                  options={optionType}
                  value={valueType}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valueType?.id}
                  loading={triggerType === true}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      handleOnChange('type', newValue);
                    } else if (!newValue) {
                      handleOnChange('type', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      name="type"
                      label="Model"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  value={value.jumlah}
                  label="Quantity"
                  name="Quantity"
                  disabled
                  // value={row?.jumlah}
                  // error={props.dataEdit?.jumlah === 0}
                  onChange={handleChangeUpdate}
                />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onOpen={() => {
                    setopenPartNumber(true);
                  }}
                  onClose={() => {
                    setopenPartNumber(false);
                  }}
                  options={PartNumber}
                  value={valuePartNumber}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valuePartNumber.id}
                  loading={triggerBatch === false}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      // handleOnChange('partNumber', newValue);
                      setvaluePartNumber(newValue);
                      setDataEdit({ ...dataEdit, part_number: newValue?.name });
                    } else if (!newValue) {
                      // handleOnChange('partNumber', newValue);
                      setvaluePartNumber(null);
                      setDataEdit({ ...dataEdit, part_number: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      label="Part Number System"
                    />
                  )}
                /> */}
              </div>
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={optionBatch}
                  onOpen={() => {
                    setopenBatch(true);
                  }}
                  onClose={() => {
                    setopenBatch(false);
                  }}
                  value={valueBatch}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valueBatch.id}
                  // getOptionSelected={(option) => option?.id === value?.id}
                  loading={triggerBatch === true}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      // handleOnChange('brand', newValue);
                      setvalueBatch(newValue);
                      setDataEdit({ ...dataEdit, batch: newValue });
                    } else {
                      // handleOnChange('batch', null);
                      setvalueBatch(null);
                      setDataEdit({ ...dataEdit, batch: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      label="Bacth"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  value={dataEdit?.part_number}
                  label="Part Number*"
                  name="part_number"
                  onChange={(e) => setDataEdit({ ...dataEdit, part_number: e.target.value })}
                />
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  value={dataEdit?.sn_batch}
                  label="SN Batch*"
                  name="sn_batch"
                  onChange={(e) => setDataEdit({ ...dataEdit, sn_batch: e.target.value })}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={optionStyle}
                  onOpen={() => {
                    setopenStyle(true);
                  }}
                  onClose={() => {
                    setopenStyle(false);
                  }}
                  value={valueStyle}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valueStyle.id}
                  // getOptionSelected={(option) => option?.id === value?.id}
                  loading={triggerStyle === true}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      // handleOnChange('brand', newValue);
                      setvalueStyle(newValue);
                      setDataEdit({ ...dataEdit, styles: newValue });
                    } else {
                      // handleOnChange('styles', null);
                      setvalueStyle(null);
                      setDataEdit({ ...dataEdit, styles: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      label="Style"
                    />
                  )}
                />
              </div>
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Production Year"
                        // format={formatDateTahun}
                        value={tglProduksi}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            settglProduksi(newValue);
                            setDataEdit({
                              ...dataEdit,
                              tahun_produksi: newValue,
                            });
                          } else {
                            settglProduksi(null);
                            setDataEdit({ ...dataEdit, tahun_produksi: null });
                          }
                        }}
                        renderInput={(params) => (
                          <TextField fullWidth value={props.dataEdit?.tglProduksi} {...params} />
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
                  id="combo-box-demo"
                  onOpen={() => {
                    setopenWarehouse(true);
                  }}
                  onClose={() => {
                    setopenWarehouse(false);
                  }}
                  options={optionWarehouse}
                  value={valueWarehouse}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valueWarehouse.id}
                  loading={triggerWarehouse === true}
                  onChange={(event, newValue) => {
                    // console.log(newValue, 'newValue');
                    if (newValue) {
                      setvalueWarehouse(newValue);
                      setDataEdit({ ...dataEdit, nama_gudang: newValue });
                    } else if (!newValue) {
                      setvalueWarehouse(null);
                      setDataEdit({ ...dataEdit, nama_gudang: null });
                      // handleOnChange('warehouse', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      label="Warehouse"
                    />
                  )}
                />
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Entry Date"
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        value={tglMasuk}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            setTglMasuk(newValue);
                            setDataEdit({ ...dataEdit, tgl_masuk: newValue });
                          } else {
                            setTglMasuk(null);
                            setDataEdit({ ...dataEdit, tgl_masuk: null });
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            value={props.dataEdit?.tglMasuk}
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
                          />
                        )}
                        // views={['year']}
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
                        value={tglStaging}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            settglStaging(newValue);
                            setDataEdit({ ...dataEdit, tgl_staging: newValue });
                          } else {
                            settglStaging(null);
                            setDataEdit({ ...dataEdit, tgl_staging: null });
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            value={props.dataEdit?.tglStagging}
                            {...params}
                            FormHelperTextProps={{
                              className: classes.helperText,
                            }}
                            error={getErrTgl}
                            color={getErrTgl === true ? 'error' : 'primary'}
                            helperText={
                              getErrTgl === true
                                ? '*Tanggal rencana staging tidak boleh lebih dari tanggal masuk*'
                                : ''
                            }
                            // focused
                          />
                        )}
                        // views={['year']}
                        placeholderText="Please select a date"
                        // maxDate={new Date()}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <Autocomplete
                  id="picMitra"
                  onOpen={() => {
                    setopenPicSttaging(true);
                  }}
                  onClose={() => {
                    setopenPicSttaging(false);
                  }}
                  options={optionPicSttaging}
                  value={valuePicSttaging}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valuePicSttaging.id}
                  loading={triggerPicSttaging === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleOnChange('val', newValue);
                      setvaluePicSttaging(newValue);
                      setDataEdit({ ...dataEdit, pic_staging: newValue });
                    } else if (!newValue) {
                      setvaluePicSttaging(newValue);
                      setDataEdit({ ...dataEdit, pic_staging: null });
                      // handleOnChange('pic_Staging', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      name="picMitra"
                      label="PIC Staging"
                    />
                  )}
                />
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status PO</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.dataEdit?.statusPo || ''}
                    label="Status PO"
                    onChange={(newValue) => {
                      if (newValue) {
                        setBody.setstatusPo(newValue);
                      } else {
                        setBody.setstatusPo(null);
                      }
                    }}
                    // onChange={(e) => setBody?.setstatusPo(e.target.value)}
                  >
                    <MenuItem value="procces">procces</MenuItem>
                    <MenuItem value="staging">staging</MenuItem>
                    <MenuItem value="delivery">delivery</MenuItem>
                  </Select>
                </FormControl> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status Machine</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valueStatusMesin}
                    label="Status Machine"
                    onChange={(event) => {
                      if (event) {
                        setvalueStatusMesin(event.target.value);
                        setDataEdit({
                          ...dataEdit,
                          status_mesin: event.target.value,
                        });
                        // handleOnChange('statusMesin', newValue);
                      } else {
                        setvalueStatusMesin(null);
                        setDataEdit({ ...dataEdit, status_mesin: null });
                        // handleOnChange('statusMesin', newValue);
                      }
                    }}
                    // onChange={(e) => setBody?.setstatusMachine(e.target.value)}
                  >
                    <MenuItem value="Old Machine">Old Machine</MenuItem>
                    <MenuItem value="New Machine">New Machine</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
