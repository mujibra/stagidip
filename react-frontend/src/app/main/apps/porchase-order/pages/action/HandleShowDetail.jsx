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
import PartNumber from '../../mockData/PartNumber';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

export default function HandleShowDetail(props) {
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
  const [value, setValue] = useState(props.dataEdit);
  const [tglPO, setTglPo] = useState(dataEdit.tgl_po);
  const [tglProduksi, settglProduksi] = useState(dataEdit.tahun_produksi);
  const [tglMasuk, setTglMasuk] = useState(dataEdit.tgl_masuk);
  const [tglStaging, settglStaging] = useState(dataEdit.tgl_staging);
  const [valueStatusMesin, setvalueStatusMesin] = useState(dataEdit.status_mesin);
  const [valueStatuPo, setvalueStatuPo] = useState(dataEdit.status_po);

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

  // handleBatch
  const [openPartNumber, setopenPartNumber] = useState(false);
  const [optionPartNumber, setoptionPartNumber] = useState(PartNumber);
  const [valuePartNumber, setvaluePartNumber] = useState({
    name: value?.part_number || '',
    id: value?.id || '',
    json: value || null,
  });

  const loadingPartNumber = openPartNumber && optionPartNumber.length === 0;
  const [triggerPartNumber, settriggerPartNumber] = useState(true);

  // useEffect(() => {
  //   settriggerPartNumber(true);
  //   axios
  //     .get(`${api}bacth`, config)
  //     .then((response) => {
  //       const jsonResult = response.data.data;
  //       // console.log(jsonResult, 'jsonResult');

  //       const dataPartNumber = jsonResult.map((data) => {
  //         return {
  //           id: data.id,
  //           name: data.name,
  //           json: data,
  //         };
  //       });

  //       setoptionPartNumber(dataPartNumber);
  //       settriggerPartNumber(false);
  //     })
  //     .catch((error) => {
  //       setoptionPartNumber([]);
  //       settriggerPartNumber(false);
  //     });
  // }, [loadingPartNumber]);

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
      default:
    }
  }
  const formatDate = moment().format('YYYY-DD-MM');
  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-16 sm:p-24 w-xl items-left">
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
                  value={value.no_po}
                  name="no_po"
                  focused
                  readOnly
                  // onChange={handleChangeUpdate}
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
                        label="Tanggal PO"
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        value={tglPO}
                        fullWidth
                        readOnly
                        onChange={(newValue) => {
                          if (newValue) {
                            setTglPo(newValue);
                            // console.log(newValue, 'new');
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
                  readOnly
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
                  // getOptionLabel={(n) => (n?.label === undefined ? '' : n?.label)}
                  getOptionSelected={(option) => option.id === valueCustomer.id}
                  // getOptionSelected={(option) => option.id === valueCustomer.id}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status PO</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valueStatuPo}
                    label="Status PO"
                    readOnly
                    onChange={(event) => {
                      if (event) {
                        setvalueStatuPo(event.target.value);
                        setDataEdit({ ...dataEdit, status_po: event.target.value });
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
                </FormControl>
              </div>
              {/* <Typography className="font-bold text-xs mt-24 md:mt-10">Machine</Typography> */}
              {/* <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row "> */}
              {/* <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="No PO dummy*"
                  name="no_po_dummy"
                  readOnly
                  value={value?.no_po_dummy}
                  onChange={handleChangeUpdate}
                /> */}
              {/* </div> */}
              {/* <Typography className="font-bold md:mt-10 mt-24 text-xs">PIC</Typography> */}
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  readOnly
                  id="combo-box-demo"
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
                  readOnly
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
                  readOnly
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
                  readOnly
                  id="outlined-password-input"
                  value={value?.jumlah}
                  label="Jumlah*"
                  name="jumlah"
                  // value={row?.jumlah}
                  // error={props.dataEdit?.jumlah === 0}
                  onChange={handleChangeUpdate}
                />
                {/* {console.log(value.jumlah)} */}
              </div>
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  readOnly
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
                  getOptionSelected={(option) => option?.id === value?.id}
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
                      setDataEdit({ ...dataEdit, brand: null });
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
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  readOnly
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
                />
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        readOnly
                        label="Tahun Produksi"
                        // format={formatDateTahun}
                        value={tglProduksi}
                        fullWidth
                        onChange={(newValue) => {
                          if (newValue) {
                            settglProduksi(newValue);
                            setDataEdit({ ...dataEdit, tahun_produksi: newValue });
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
                  readOnly
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
              </div>

              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Tanggal Masuk"
                        readOnly
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
                            error={
                              moment(props.dataEdit?.tgl_staging).format('l') <
                              moment(props.dataEdit?.tgl_masuk).format('l')
                            }
                            color={
                              moment(props.dataEdit?.tgl_staging).format('l') <
                              moment(props.dataEdit?.tgl_masuk).format('l')
                                ? 'error'
                                : 'primary'
                            }
                            helperText={
                              moment(props.dataEdit?.tgl_staging).format('l') <
                              moment(props.dataEdit?.tgl_masuk).format('l')
                                ? '*Tgl staging tidak boleh lebih tua dari tgl masuk*'
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
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="Tanggal Staging"
                        readOnly
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
                            value={props.dataEdit?.tglStaging}
                            {...params}
                            FormHelperTextProps={{
                              className: classes.helperText,
                            }}
                            error={
                              moment(props.dataEdit?.tgl_staging).format('l') <
                              moment(props.dataEdit?.tgl_masuk).format('l')
                            }
                            color={
                              moment(props.dataEdit?.tgl_staging).format('l') <
                              moment(props.dataEdit?.tgl_masuk).format('l')
                                ? 'error'
                                : 'primary'
                            }
                            helperText={
                              moment(props.dataEdit?.tgl_staging).format('l') <
                              moment(props.dataEdit?.tgl_masuk).format('l')
                                ? '*Tgl staging tidak boleh lebih tua dari tgl masuk*'
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
                  readOnly
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status Machine</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    readOnly
                    value={valueStatusMesin}
                    label="Status Machine"
                    onChange={(event) => {
                      if (event) {
                        setvalueStatusMesin(event.target.value);
                        setDataEdit({ ...dataEdit, status_mesin: event.target.value });
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
