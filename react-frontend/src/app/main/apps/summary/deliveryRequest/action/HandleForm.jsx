/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';

export const HandleForm = (props) => {
  // console.log(props, 'props');
  const getAccessToken = localStorage.getItem('access_token');
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const dispatch = useDispatch();
  const [dataSNMesin, setDataSNMesin] = useState([]);
  const [data, setData] = useState([]);
  const [dataPO, setDataPO] = useState({});
  const [loading, setLoading] = useState(true);
  const [snMesin, setSNMesin] = useState(null);
  const [request_by, setRequestBY] = useState(null);
  const [id_po, setIdPo] = useState(null);
  const [purpose, setpurpose] = useState(null);
  const [contact_person, setcontact_person] = useState(null);
  const [contact_no, setcontact_no] = useState(null);
  const [address, setaddress] = useState(null);
  const [bodys, setBodys] = useState(null);
  const [value, setValue] = useState({
    category: null,
    type: null,
    model: null,
    customer: null,
    warehouse: null,
    task: null,
    no_mesin: null,
    sn_mesin: null,
    id_po: null,
  });

  const body = {
    category: value?.category,
    type: value?.type,
    model: value?.model,
    customer: value?.customer,
    warehouse: value?.warehouse,
    task: value?.task,
    no_mesin: value?.no_mesin,
    sn_mesin: value?.sn_mesin,
    id_po,
    purpose,
    contact_person,
    contact_no,
    address,
    request_by,
  };
  // console.log(bodys, 'body');

  const handleChange = (e) => {
    props?.getPropsSetBody?.setValues({
      ...props?.getPropsBody?.values,
      [e.target.name]: e.target.value,
    });
  };

  const getListSN = async () => {
    const datas = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getListSN`, config)
      .then((res) => {
        setDataSNMesin(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setDataSNMesin([]);
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

  const [dataPicMarketing, setdataPicMarkerting] = useState([]);

  const [loadingPicMarketing, setloadingPicMarketing] = useState(true);

  const getListPicMarketing = async () => {
    const datas = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getPicMarketing`, config)
      .then((res) => {
        setdataPicMarkerting(res?.data?.data);
        setloadingPicMarketing(false);
      })
      .catch((err) => {
        setdataPicMarkerting([]);
        setloadingPicMarketing(false);
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
        console.log(err);
      });
  };

  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'sn_mesins':
        getListSN();
        break;
      case 'request_by':
        getListPicMarketing();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // setDefaultMover(dataUpproveById);
    let isUnmout = false;
    if (!isUnmout) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}picmitra/v2/STAGING/${userRolesId}`,
          config
        )
        .then((res) => {
          setData(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setData([]);
          setLoading(false);
          const errStatus = err?.response?.status;
          const errMessage = err?.response?.data?.errorMessage;
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
            messages = 'Too Many Request!!';
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
        });
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      // getListSN();
      if (id_po !== null || id_po === undefined) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getDetailPOBySNMesinIdPo/${props?.snMesin?.sn_mesin}/${id_po}`,
            config
          )
          .then((res) => {
            setDataPO(res?.data?.data);
            setLoading(false);
            // console.log(res.data);
          })
          .catch((err) => {
            setDataPO([]);
            setLoading(false);
            const errStatus = err?.response?.status;
            const errMessage = err?.response?.data?.message;
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
            console.log(err);
          });
      }
    }
    return () => {
      isUnmout = true;
    };
  }, [props?.snMesin?.sn_mesin, id_po]);

  useEffect(() => {
    const arr = [];
    if (dataSNMesin?.length !== 0 && props?.snMesin !== null) {
      const objIndex = dataSNMesin?.findIndex((obj) => obj === props?.snMesin);
      console.log(dataSNMesin[objIndex]?.id_po);
      if (dataSNMesin[objIndex]?.id_po !== undefined) {
        setIdPo(dataSNMesin[objIndex]?.id_po);
      }
      props?.getPropsSetBody?.setvalueId_po(dataSNMesin[objIndex]?.id_po);
      props?.getPropsSetBody?.setValues({
        ...props?.getPropsBody?.values,
        id_po: dataSNMesin[objIndex]?.id_po,
        no_mesin: dataSNMesin[objIndex]?.no_mesin,
        sn_mesin: dataSNMesin[objIndex]?.sn_mesin,
        type: dataPO?.mesin?.type,
        model: dataPO?.name,
        customer: dataPO?.customer?.bank_desc,
        warehouse: dataPO?.gudang?.gudang_desc,
        // request_by: request_by?.id === undefined ? null : request_by?.id,
      });
    }
  }, [props?.snMesin, dataSNMesin, dataPO]);
  props?.propFromParent(bodys);

  // console.log(value, 'pageState');
  // console.log(props?.getPropsBody?.values, 'props?.getPropsBody?.values');
  return (
    <div className="gap-4">
      <div className="flex justify-between pt-16 w-full gap-6">
        <div>
          <Autocomplete
            disablePortal
            id="sn_mesins"
            value={props?.snMesin}
            onFocus={handleFocus}
            options={dataSNMesin}
            fullWidth
            getOptionLabel={(option) => option?.sn_mesin}
            onChange={(e, newValue) => {
              if (newValue) {
                props?.getPropsSetBody?.setSNMesin(newValue);
              } else {
                props?.getPropsSetBody?.setSNMesin(null);
                props?.getPropsSetBody?.setValues({
                  category: '',
                  type: '',
                  model: '',
                  customer: '',
                  warehouse: '',
                  task: '',
                  no_mesin: null,
                  sn_mesin: null,
                  id_po: null,
                });
              }
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} variant="standard" label="SN Mesin" />}
          />
        </div>
        <div>
          <Box sx={{ width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                // size='small'
                labelId="demo-simple-select-label"
                id="category"
                value={props?.getPropsBody?.values?.category}
                label="Category"
                name="category"
                onChange={handleChange}
              >
                <MenuItem value="ACTIVATION">ACTIVATION</MenuItem>
                <MenuItem value="DEVELOPMENT">DEVELOPMENT</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Task</InputLabel>
              <Select
                //  size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props?.getPropsBody?.values?.task}
                label="Age"
                name="task"
                onChange={handleChange}
              >
                <MenuItem value="DELIVERY">DELIVERY</MenuItem>
                <MenuItem value="WITHDRAWAL">WITHDRAWAL</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="pt-16">
        <div className="flex pt-16 gap-4 w-full">
          <div className="w-full">
            <TextField
              focused
              // disabled
              value={props?.getPropsBody?.values?.type}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
              id="outlined-basic"
              label="Type"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              value={props?.getPropsBody?.values?.model}
              focused
              onChange={handleChange}
              id="outlined-basic"
              label="Model"
              name="model"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </div>
        </div>
        <div className="flex pt-16 gap-4 w-full">
          <div className="w-full">
            <TextField
              // value={value?.customer}
              value={props?.getPropsBody?.values?.customer}
              onChange={handleChange}
              focused
              id="outlined-basic"
              label="Customer"
              name="customer"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="w-full">
            <TextField
              fullWidth
              value={props?.getPropsBody?.values?.warehouse}
              onChange={handleChange}
              id="outlined-basic"
              label="Warehouse"
              name="warehouse"
              focused
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </div>
        </div>
        <div className="flex pt-16 gap-4 w-full">
          <div className="w-full">
            <TextField
              value={props?.getPropsBody?.purpose}
              onChange={(e) => props?.getPropsSetBody?.setpurpose(e.target.value)}
              id="outlined-basic"
              focused
              label="Purpose"
              name="purpose"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              value={props?.getPropsBody?.contact_person}
              onChange={(e) => props?.getPropsSetBody?.setcontact_person(e.target.value)}
              id="outlined-basic"
              focused
              label="Contact Person"
              name="contact_person"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className="flex pt-10 gap-4 w-full">
          <div className="w-full">
            <TextField
              value={props?.getPropsBody?.contact_no}
              onChange={(e) => props?.getPropsSetBody?.setcontact_no(e.target.value)}
              id="outlined-basic"
              focused
              label="Contact No"
              name="contact_no"
              variant="outlined"
              multiline
              rows={2}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              fullWidth
              value={props?.getPropsBody?.address}
              onChange={(e) => props?.getPropsSetBody?.setaddress(e.target.value)}
              id="outlined-basic"
              label="Addres"
              name="address"
              multiline
              rows={2}
              focused
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div className="flex pt-10 justify-end">
        {/* <Autocomplete
          disablePortal
          // id="sn_mesins"
          value={props?.getPropsBody?.values?.request_by}
          onFocus={handleFocus}
          options={data}
          getOptionLabel={(option) => option?.name}
          onChange={(e, newValue) => {
            if (newValue) {
              // console.log(newValue, 'value');
              props?.getPropsSetBody?.setRequestBY(newValue?.id);
            } else {
              props?.getPropsSetBody?.setRequestBY(null);
            }
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="standard" label="Request By" />}
        /> */}
        <Autocomplete
          disablePortal
          id="request_by"
          value={
            dataPicMarketing.find((option) => option.id === props?.getPropsBody?.request_by) || null
          }
          onFocus={handleFocus}
          options={dataPicMarketing}
          fullWidth
          getOptionLabel={(option) => option?.name}
          onChange={(e, newValue) => {
            if (newValue) {
              props?.getPropsSetBody?.setRequestBY(newValue?.id);
            } else {
              props?.getPropsSetBody?.setRequestBY(null);
            }
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="standard" label="Request By" />}
        />
      </div>
    </div>
  );
};
