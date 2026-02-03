/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from "@mui/system";
import {
  Autocomplete,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  Stack,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import FuseAnimate from "@fuse/core/FuseAnimate";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { makeStyles } from "@mui/styles";
// import PartNumber from '../../mockData/PartNumber';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

export default function HandleEditDetail(props) {
  const classes = useStyles();
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const getAccessToken = localStorage.getItem("access_token");
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
  // const [noPo, setnoPo] = useState(dataEdit.no_po_master);
  // const [customer, setcustomer] = useState(dataEdit.customer);
  // const [valueStatusMesin, setvalueStatusMesin] = useState(dataEdit.status_mesin);

  // useEffect(() => {
  //   setDataEdit(props.row);
  // }, [props.row]);

  // const [valueTglStaging, setvalueTglStaging] = useState({
  //   name: value?.tgl_po || '',
  //   id: value?.id || '',
  //   json: value || null,
  // });
  // console.log(valueTglStaging, 'valueTglStaging');

  const [openCustomer, setopenCustomer] = useState(false);
  const [optionCustomer, setoptionCustomer] = useState([]);
  const [valueCustomer, setvalueCustomer] = useState({
    name: value?.customer?.bank_desc || "",
    id: value?.customer?.id || "",
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
      case "customer":
        if (values !== null) {
          setvalueCustomer({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueCustomer({
            id: "",
            name: "",
            json: null,
          });
        }
        break;
      case "tglPO":
        if (values !== null) {
          setvalueTglStaging({
            id: values.id,
            name: values.name,
            json: values.json,
          });
        } else {
          setvalueTglStaging({
            id: "",
            name: "",
            json: null,
          });
        }
        break;
      default:
    }
  }
  const formatDate = moment().format("YYYY-DD-MM");
  return (
    <FuseAnimate
      className="bg-red-800"
      animation="transition.slideLeftIn"
      delay={100}
    >
      <div className="p-16 sm:p-24 md:2-auto items-left">
        <div>
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className=" w-full flex gap-10 flex-col md:flex-row ">
                {/* <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="No Po*"
                  type="text"
                  // value={noPo}
                  value={value.no_po_master}
                  name="no_po_master"
                  // disabled
                  focused
                  // onChange={(e) => setnoPo(e.target.value)}
                  onChange={handleChangeUpdate()}
                  // onChange={(event, newValue) => {
                  //   if (newValue) {
                  //     handleOnChange('noPo', newValue);
                  //   } else if (!newValue) {
                  //     handleOnChange('noPo', newValue);
                  //   }
                  // }}
                /> */}
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="No PO"
                  name="no_po_master"
                  value={dataEdit?.no_po_master}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, no_po_master: e.target.value })
                  }
                  // onChange={(e) => setnoPo(e.target.value)}
                />
              </div>
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        id="tgl_po"
                        name="tgl_po"
                        label="PO Date"
                        // format={formatDate}
                        inputFormat="dd MMM yyyy"
                        value={tglPO}
                        fullWidth
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
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                        placeholderText="Please select a date"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
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
                  getOptionLabel={(n) => (n?.name === undefined ? "" : n?.name)}
                  // getOptionSelected={(option) => option.id === valueCustomer.id}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
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
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
