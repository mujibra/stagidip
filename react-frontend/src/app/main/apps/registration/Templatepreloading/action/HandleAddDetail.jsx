/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Autocomplete,
  Button,
  CircularProgress,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import moment from 'moment';
import { useState } from 'react';
import axios from 'axios';

const HandleAddDetail = (props) => {
  // console.log(props, 'HandleAddDetail props');
  const { getAccessToken } = props;
  const { body } = props;
  const { setBody } = props;
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const [loadingModel, setloadingModel] = useState(true);
  const [DataModel, setDataModel] = useState([]);

  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const getDataListModel = async () => {
    setloadingModel(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-model`, config)
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
  const handleFocus = (e) => {
    const getId = e.target.id;
    switch (getId) {
      case 'idModel':
        getDataListModel();
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
                  label="General Desc"
                  type="text"
                  value={body?.general_desc}
                  onChange={(e) => setBody?.setgeneral_desc(e.target.value)}
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
                disabled={body.name === ''}
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
