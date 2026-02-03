/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Autocomplete,
  Button,
  CircularProgress,
  // Icon,
  // IconButton,
  // InputAdornment,
  Stack,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
  // Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/system';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import moment from 'moment';
import {
  useState,
  // useEffect
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));

const HandleAddDetail = (props) => {
  // console.log(props, 'HandleAddDetail props');
  const { api } = props;
  const { getAccessToken } = props;
  const { body } = props;
  const { setBody } = props;
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [DataCustomer, setDataCustomer] = useState([]);

  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
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
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        console.log(errStatus, 'errStatus');
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
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };

  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'idCustomer':
        getDataListCustomer();
        break;
      default:
    }
  };
  // console.log(body, 'body')

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
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
                  label="No PO"
                  type="text"
                  value={body?.no_po_master}
                  // error={body?.no_po_master <= '0'}
                  // helperText={body?.no_po_master <= '0' ? '*No Po Tidak Boleh kurang dari 1!' : ''}
                  // focused
                  onChange={(e) => setBody?.setno_po_master(e.target.value)}
                />
              </div>
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={20}>
                      <DesktopDatePicker
                        label="PO Date"
                        inputFormat="dd MMM yyyy"
                        value={body.tgl_po}
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
                        // maxDate={new Date()}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  id="idCustomer"
                  options={DataCustomer}
                  value={body.id_customer.id}
                  fullWidth
                  onFocus={handleFocus}
                  getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                  getOptionSelected={(option) => option?.body.id_customer.bank_desc}
                  loading={loadingCustomer === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setBody.setid_customer(newValue.id);
                    } else {
                      setBody.setid_customer('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={body.id_customer}
                      {...params}
                      label="Customer"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            {/* <Tooltip
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
                            </Tooltip> */}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </Box>
          </div>
        </div>
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
                disabled={body.no_po_master === '' || body.id_customer === ''}
                onClick={props.HandleSubmit}
                variant="contained"
                startIcon={<PlaylistAddIcon />}
              >
                <div className="hidden md:contents">Submit</div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
};

export default HandleAddDetail;
