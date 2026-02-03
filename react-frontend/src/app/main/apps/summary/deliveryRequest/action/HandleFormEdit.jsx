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

export const HandleFormEdit = (props) => {
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
  const [request_by, setRequestBY] = useState(props?.row?.request_by);
  const [id_po, setIdPo] = useState(null);
  const [purpose, setpurpose] = useState(props?.row?.purpose);
  const [category, setcategory] = useState(props?.row?.category);
  const [task, settask] = useState(props?.row?.task);
  const [contact_person, setcontact_person] = useState(props?.row?.contact_no);
  const [contact_no, setcontact_no] = useState(props?.row?.contact_no);
  const [address, setaddress] = useState(props?.row?.address);
  const [value, setValue] = useState({
    category: props?.row?.category,
    type: props?.row?.detail_po?.mesin?.type,
    model: props?.row?.detail_po?.type?.name,
    customer: props?.row?.detail_po?.customer?.bank_desc,
    warehouse: props?.row?.detail_po?.gudang?.gudang_desc,
    no_mesin: props?.row?.detail_sn_mesin?.no_mesin,
    sn_mesin: props?.row?.detail_sn_mesin,
    id_po: props?.row?.detail_po?.id,
    // task: props?.row?.task,
    // purpose: props?.row?.purpose,
    // contact_person: props?.row?.contact_person,
    // contact_no: props?.row?.contact_no,
    // address: props?.row?.address,
    // request_by,
  });
  const [bodyEdit, setBodyEdit] = useState({
    category,
    task,
    no_mesin: value?.no_mesin,
    sn_mesin: value?.sn_mesin?.sn_mesin,
    id_po: value?.id_po,
    purpose,
    contact_person,
    contact_no,
    address,
    request_by: request_by?.id,
  });

  // const bodyEdit = {
  // category,
  // task,
  // no_mesin: value?.no_mesin,
  // sn_mesin: value?.sn_mesin?.sn_mesin,
  // id_po: value?.id_po,
  // purpose,
  // contact_person,
  // contact_no,
  // address,
  // request_by: request_by?.id,
  // };
  // console.log(bodyEdit, 'bodyEdit');

  const handleChange = (e) => {
    props?.getPropsSetBody?.setValues({
      ...value,
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
          const errStatus = err.response.status;
          const errMessage = err.response.data.errorMessage;
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
      if (snMesin?.snMesin?.sn_mesin !== undefined) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getDetailPOBySNMesinIdPo/${snMesin?.snMesin?.sn_mesin}/${id_po}`,
            config
          )
          .then((res) => {
            setDataPO(res?.data?.data);
            setLoading(false);
            // console.log(res.data, 'data snn');
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
  }, [snMesin?.snMesin?.sn_mesin, id_po]);

  useEffect(() => {
    const arr = [];
    if (dataSNMesin?.length !== 0 && snMesin?.snMesin !== undefined) {
      const objIndex = dataSNMesin?.findIndex((obj) => obj === snMesin?.snMesin);
      // console.log(objIndex, 'objIndex')
      setIdPo(dataSNMesin[objIndex]?.id_po);
      props?.getPropsSetBody?.setvalueId_po(dataSNMesin[objIndex]?.id_po);
      setValue({
        ...value,
        id_po: dataSNMesin[objIndex]?.id_po,
        no_mesin: dataSNMesin[objIndex]?.no_mesin,
        sn_mesin: dataSNMesin[objIndex],
        type: dataPO?.mesin?.type,
        model: dataPO?.name,
        customer: dataPO?.customer?.bank_desc,
        warehouse: dataPO?.gudang?.gudang_desc,
      });
    }
  }, [snMesin?.snMesin, dataSNMesin, dataPO]);

  useEffect(() => {
    setBodyEdit({
      ...bodyEdit,
      category,
      task,
      no_mesin: value?.no_mesin,
      sn_mesin: value?.sn_mesin?.sn_mesin,
      id_po: value?.id_po,
      purpose,
      contact_person,
      contact_no,
      address,
      // request_by: request_by?.id,
    });
  }, [value, category, task, purpose, contact_person, contact_no, address, request_by]);
  useEffect(() => {
    setBodyEdit({
      ...bodyEdit,
      request_by: request_by?.id,
    });
  }, [request_by]);
  props?.propsFromParrent(bodyEdit);

  return (
    <div className="gap-4 w- full ">
      <div className="flex justify-between pt-8 w-full">
        <div>
          <Autocomplete
            disablePortal
            id="sn_mesins"
            value={value?.sn_mesin}
            onFocus={handleFocus}
            options={dataSNMesin}
            getOptionLabel={(option) => option?.sn_mesin}
            onChange={(e, newValue) => {
              if (newValue) {
                setSNMesin({ ...value, snMesin: newValue });
              } else {
                setSNMesin(null);
              }
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} variant="standard" label="SN Mesin" />}
          />
        </div>
        <div>
          <Box sx={{ width: 260 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                label="Category"
                name="category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <MenuItem value="ACTIVATION">ACTIVATION</MenuItem>
                <MenuItem value="DEVELOPMENT">DEVELOPMENT</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ width: 260 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Task</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={task}
                label="Age"
                name="task"
                onChange={(e) => settask(e.target.value)}
              >
                <MenuItem value="DELIVERY">DELIVERY</MenuItem>
                <MenuItem value="WITHDRAWAL">WITHDRAWAL</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="pt-8">
        <div className="flex pt-8 gap-4 w-full">
          <div className="w-full">
            <TextField
              focused
              disabled
              value={value?.type}
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
              disabled
              value={value?.model}
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
        <div className="flex pt-8 gap-4 w-full">
          <div className="w-full">
            <TextField
              disabled
              // value={value?.customer}
              value={value?.customer}
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
              disabled
              fullWidth
              value={value?.warehouse}
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
        <div className="flex pt-8 gap-4 w-full">
          <div className="w-full">
            <TextField
              value={purpose}
              onChange={(e) => setpurpose(e.target.value)}
              id="outlined-basic"
              // focused
              label="Purpose"
              name="purpose"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              value={contact_person}
              onChange={(e) => setcontact_person(e.target.value)}
              id="outlined-basic"
              // focused
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
              value={contact_no}
              onChange={(e) => setcontact_no(e.target.value)}
              id="outlined-basic"
              // focused
              label="Contact No"
              name="contact_no"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
            />
          </div>
          <div className="w-full">
            <TextField
              fullWidth
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              id="outlined-basic"
              label="Addres"
              name="address"
              multiline
              rows={2}
              // focused
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div className="flex pt-10 justify-end">
        <Autocomplete
          disablePortal
          id="request_by"
          value={request_by}
          onFocus={handleFocus}
          options={dataPicMarketing}
          disable
          getOptionLabel={(option) => option?.name}
          onChange={(e, newValue) => {
            if (newValue) {
              // console.log(newValue, 'value');
              setRequestBY(newValue);
            } else {
              setRequestBY(null);
            }
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="standard" label="Request By" />}
        />
      </div>
    </div>
  );
};
