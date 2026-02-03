/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';

import moment from 'moment';
import {
  // useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const useStyles = makeStyles((_theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

const HandleAddTemplate = (props) => {
  const { getDatasPoById } = props;
  const classes = useStyles();
  const { api } = props;
  const getAccessToken = localStorage.getItem('access_token');
  const { body } = props;
  const { newBody } = props;
  const { setBody } = props;
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('DD MMMM YYYY');
  const [loadingModel, setloadingModel] = useState(true);
  const [loadingListModel, setloadingListModel] = useState(true);
  const [DataListCopyModel, setDataListCopyModel] = useState([]);

  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const getDataListCopyModelById = async () => {
    setloadingListModel(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getByIdNewMesin/${props?.dataEdit?.id}`,
        config
      )
      .then((res) => {
        setDataListCopyModel(res?.data?.list_copy_from);
        setloadingListModel(false);
        console.log(res?.data?.list_copy_from);
      })
      .catch((err) => {
        setDataListCopyModel([]);
        setloadingListModel(false);
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
      case 'idCopyModel':
        getDataListCopyModelById();
        break;
      default:
    }
  };

  return (
    <FuseAnimate className="w-full" animation="transition.slideLeftIn" delay={100}>
      <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row">
        <Autocomplete
          disablePortal
          id="idCopyModel"
          onFocus={handleFocus}
          options={DataListCopyModel}
          value={props?.newModel}
          fullWidth
          // disabled={loadingModel === true}
          getOptionLabel={(n) => (n?.type === undefined ? '' : n?.type)}
          getOptionSelected={(option) => option?.id === props?.newModel}
          loading={loadingListModel === true}
          onChange={(_event, newValue) => {
            if (newValue) {
              props?.setNewModel(newValue);
            } else {
              props?.setNewModel('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: 300 }}
              label="Copy Model"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
      </div>
    </FuseAnimate>
  );
};

export default HandleAddTemplate;
