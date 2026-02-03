/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import {
  Autocomplete,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
} from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

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
  const [type, settype] = useState(dataEdit.type);

  // const [openBrand, setopenBrand] = useState(false);
  // const [optionBrand, setoptionBrand] = useState([]);
  // const [valueBrand, setvalueBrand] = useState(dataEdit.merek);

  // const loadingBrand = openBrand && optionBrand.length === 0;
  // const [triggerBrand, settriggerBrand] = useState(true);

  // useEffect(() => {
  //   settriggerBrand(true);
  //   axios
  //     .get(`${api}brand`, config)
  //     .then((response) => {
  //       const jsonResult = response.data.data;
  //       // console.log(jsonResult, 'jsonResult');

  //       const dataBrand = jsonResult.map((data) => {
  //         return {
  //           id: data.id,
  //           name: data.name,
  //           json: data,
  //         };
  //       });

  //       setoptionBrand(dataBrand);
  //       settriggerBrand(false);
  //     })
  //     .catch((error) => {
  //       setoptionBrand([]);
  //       settriggerBrand(false);
  //     });
  // }, [loadingBrand]);

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
      case 'type':
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
      <div className="p-16 sm:p-24 w-sm items-left">
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
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Brand"
                  name="merek"
                  disabled
                  readOnly
                  aria-readonly
                  value={dataEdit?.merek}
                  onChange={(e) => setDataEdit({ ...dataEdit, merek: e.target.value })}
                />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-customer"
                  noOptionsText="No Option Available"
                  options={optionBrand}
                  onOpen={() => {
                    setopenBrand(true);
                  }}
                  onClose={() => {
                    setopenBrand(false);
                  }}
                  // options={Custumor}
                  // value={value?.customer}
                  value={valueBrand}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option === valueBrand}
                  // isOptionEqualToValue={(option, value) => option.value === value.value}
                  loading={triggerBrand === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueBrand(newValue);
                      setDataEdit({ ...dataEdit, merek: newValue });
                    } else if (!newValue) {
                      setvalueBrand(null);
                      setDataEdit({ ...dataEdit, merek: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Brand"
                    />
                  )}
                /> */}
              </div>
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  id="combo-box-customer"
                  noOptionsText="No Option Available"
                  options={optionModel}
                  onOpen={() => {
                    setopenModel(true);
                  }}
                  onClose={() => {
                    setopenModel(false);
                  }}
                  // options={Custumor}
                  // value={value?.customer}
                  value={valueModel}
                  fullWidth
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  // getOptionSelected={(option) => option.id === valueBrand.id}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  loading={triggerModel === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueModel(newValue);
                      setDataEdit({ ...dataEdit, model: newValue });
                    } else if (!newValue) {
                      setvalueModel(null);
                      setDataEdit({ ...dataEdit, model: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Type"
                    />
                  )}
                />
              </div>
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Model"
                  name="type"
                  value={dataEdit?.type}
                  onChange={(e) => setDataEdit({ ...dataEdit, type: e.target.value })}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
