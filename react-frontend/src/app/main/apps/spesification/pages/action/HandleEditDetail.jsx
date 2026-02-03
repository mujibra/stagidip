/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import { Autocomplete, TextField } from '@mui/material';
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
  const [value, setValue] = useState(props.dataEdit);
  const [tglPO, setTglPo] = useState(dataEdit.tgl_po);
  const [tglMasuk, setTglMasuk] = useState(dataEdit.tgl_masuk);
  const [tglStaging, settglStaging] = useState(dataEdit.tgl_staging);

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

  // handlePicSttaging
  const [openPicSttaging, setopenPicSttaging] = useState(false);
  const [optionPicSttaging, setoptionPicSttaging] = useState([]);
  const [valuePicSttaging, setvaluePicSttaging] = useState({
    name: value?.approval_staging?.name || '',
    id: value?.approval_staging?.id || '',
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

  // handlePicTss
  const [openPicTss, setopenPicTss] = useState(false);
  const [optionPicTss, setoptionPicTss] = useState([]);
  const [valuePicTss, setvaluePicTss] = useState({
    name: value?.approval_tss?.name || '',
    id: value?.approval_tss?.id || '',
    json: value || null,
  });

  const loadingPicTss = openPicTss && optionPicTss.length === 0;
  const [triggerPicTss, settriggerPicTss] = useState(true);

  useEffect(() => {
    settriggerPicTss(true);
    axios
      .get(`${api}picmitra`, config)
      .then((response) => {
        const jsonResult = response.data.data;

        const dataPicTss = jsonResult.map((data) => {
          return {
            id: data.id,
            name: data.name,
            json: data,
          };
        });

        setoptionPicTss(dataPicTss);
        settriggerPicTss(false);
      })
      .catch((error) => {
        setoptionPicTss([]);
        settriggerPicTss(false);
      });
  }, [loadingPicTss]);

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
      case 'pic_staging':
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
      case 'pic_tss':
        if (values !== null) {
          setvaluePicTss({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvaluePicTss({
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

  useEffect(() => {
    if (tglMasuks < tglKeluars) {
      setgetErrTgl(false);
    } else if (tglMasuks === tglKeluars) {
      setgetErrTgl(false);
    } else {
      setgetErrTgl(true);
    }
  }, [tglMasuk, tglKeluars]);
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
                  // value={value.no_po}
                  value={dataEdit?.detail_po?.no_po}
                  name="id_po"
                  disabled
                  focused
                  // onChange={(event, newValue) => {
                  //   if (newValue) {
                  //     handleOnChange('tgl_po', newValue);
                  //   } else if (!newValue) {
                  //     handleOnChange('tgl_po', newValue);
                  //   }
                  // }}
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
              </div>

              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  value={dataEdit?.pn_system}
                  label="Part Number*"
                  name="pn_system"
                  disabled
                  // value={row?.jumlah}
                  // error={props.dataEdit?.jumlah === 0}
                  // onChange={handleChangeUpdate}
                  onChange={(e) => setDataEdit({ ...dataEdit, pn_system: e.target.value })}
                />
                <Autocomplete
                  disablePortal
                  disabled
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
              </div>

              {/* <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
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
                      setDataEdit({ ...dataEdit, approval_staging: newValue });
                    } else if (!newValue) {
                      setvaluePicSttaging(newValue);
                      setDataEdit({ ...dataEdit, approval_staging: null });
                      // handleOnChange('approval_Staging', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      {...params}
                      name="approval_staging"
                      label="PIC Staging"
                    />
                  )}
                />
                <Autocomplete
                  id="picTss"
                  onOpen={() => {
                    setopenPicTss(true);
                  }}
                  onClose={() => {
                    setopenPicTss(false);
                  }}
                  options={optionPicTss}
                  value={valuePicTss}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.id === valuePicTss.id}
                  loading={triggerPicTss === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleOnChange('val', newValue);
                      setvaluePicTss(newValue);
                      setDataEdit({ ...dataEdit, approval_tss: newValue });
                    } else if (!newValue) {
                      setvaluePicTss(newValue);
                      setDataEdit({ ...dataEdit, approval_tss: null });
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
                      name="approval_tss"
                      label="PIC TSS"
                    />
                  )}
                />
              </div> */}
              <div className="w-full mt-10">
                <TextField
                  id="outlined-textarea"
                  label="Notes"
                  value={dataEdit?.notes}
                  onChange={(e) => setDataEdit({ ...dataEdit, notes: e.target.value })}
                  multiline
                  rows={4}
                  // defaultValue="Default Value"
                  variant="outlined"
                  name="notes"
                  fullWidth
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
