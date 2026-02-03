/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Button,
  CircularProgress,
  // FormControl,
  // Icon,
  // IconButton,
  // InputAdornment,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
  // Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import {
  // useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

// const useStyles = makeStyles((theme) => ({
//   link: {
//     color: theme.palette.secondary.contrastText,
//   },
//   cardRoot: {
//     padding: '0px',
//     minWidth: '100%',
//   },
// }));
const useStyles = makeStyles((_theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

const HandleAddDetail = (props) => {
  const { getDatasPoById } = props;
  const classes = useStyles();
  const { api } = props;
  const { getAccessToken } = props;
  const { body } = props;
  const { newBody } = props;
  const { setBody } = props;
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('DD MMMM YYYY');
  const [loadingModel, setloadingModel] = useState(true);
  const [loadingBrand, setloadingBrand] = useState(true);
  const [DataModel, setDataModel] = useState([]);
  const [DataBrand, setDataBrand] = useState([]);

  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
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
  };
  // console.log(body.model, 'body.model');
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

  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'idModel':
        getDataListModel();
        break;
      case 'idBrand':
        getDataListBrand();
        break;
      default:
    }
  };

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 w-auto items-left">
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
              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <Autocomplete
                  multiple
                  filterSelectedOptions
                  disablePortal
                  id="idModel"
                  onFocus={handleFocus}
                  options={DataModel}
                  // value={body?.type_atm}
                  fullWidth
                  // disabled={loadingModel === true}
                  getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
                  getOptionSelected={(option) => option?.label === body.model.name}
                  loading={loadingModel === true}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      setBody.settype_atm(newValue);
                    } else {
                      setBody.settype_atm('');
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
              </div>
              <div className="w-full flex gap-10 mt-10 flex-col md:flex-row">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Item"
                  type="text"
                  value={body?.parent}
                  // error={body?.address <= '0'}
                  // helperText={body?.address <= '0' ? '*No Po Tidak Boleh kurang dari 1!' : ''}
                  // focused
                  onChange={(e) => setBody?.setparent(e.target.value)}
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
            {props?.loading === true ? (
              <Button
                disabled
                onClick={props?.HandleSubmit}
                variant="contained"
                startIcon={<CircularProgress size="2rem" />}
              >
                <div className="hidden md:contents">Loading</div>
              </Button>
            ) : (
              <Button
                disabled={body.parent === ''}
                onClick={props?.HandleSubmit}
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
