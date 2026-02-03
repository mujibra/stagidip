/* eslint-disable no-self-compare */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Alert, Autocomplete, TextField } from '@mui/material';

const useStyles = makeStyles({
  tableCell: {
    minWidth: '100px',
    cursor: 'pointer',
  },
  cursorTable: {
    cursor: 'pointer',
  },
  root: {
    fontSize: '200pt',
  },
  table: {
    fontSize: '100pt',
  },
});

function createData(id, general_desc, detail_inspeksi) {
  return { id, general_desc, detail_inspeksi };
}

export default function HandleUpproveStaging(props) {
  // const userRoles = props?.userRoles;
  const idPo = props?.idPO;
  const getRow = props?.getRow;
  const approval_staging = props?.getRow?.approval_staging;
  const getIdMesin = props?.getIdMesin?.snMesin;
  const dataUpproveById = props?.dataUpproveById;

  const classes = useStyles();
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const [data, setData] = useState([]);
  const [defaultMover, setDefaultMover] = useState('');
  const [mover, setMover] = useState('');

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // setMover(defaultMover);
    setDefaultMover(dataUpproveById?.name);
  }, [dataUpproveById?.name]);
  // console.log(defaultMover?.name, 'defaultMover');

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
            handleLogout();
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
  // console.log(defaultMover, 'defaultMover');
  props.propsFromParrent(mover, props.getIdMesin, defaultMover);
  let color = '';
  if (approval_staging !== null) {
    color = 'success';
  } else {
    color = 'warning';
  }
  // console.log(userRoles, 'userRoles');

  return (
    <Paper className="flex items-center justify-center" sx={{ width: '100%', height: '100%' }}>
      <div className="m-20 mb-96 mt-10 w-md">
        <div className="mb-10">
          <Alert severity={color}>
            Approval By:{' '}
            {approval_staging?.name === undefined ? 'Belum ada Approval' : approval_staging?.name}
          </Alert>
        </div>
        {userRoles === 'ADMIN' || userRoles === 'SUPER_ADMIN' ? (
          <Box sx={{ minWidth: 300 }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="idPicMitra"
              options={data}
              // disabled={defaultMover !== undefined}
              value={mover}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              isOptionEqualToValue={(option) => option?.id === option?.id}
              loading={loading === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setMover(newValue);
                } else {
                  setMover('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  disabled={loading === true}
                  // disabled={loading === true}
                  {...params}
                  label="PIC Datindo"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
          </Box>
        ) : userRoles === 'GUEST' ||
          userRoles === 'OPERATOR_TSS' ||
          userRoles === 'GUEST_RELATED' ||
          userRoles === 'GUEST_DIP' ||
          userRoles === 'OPERATOR_MOVER' ||
          userRoles === 'GUEST_BANK' ||
          defaultMover === '' ? (
          <Box sx={{ minWidth: 300 }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="idPicMitra"
              options={data}
              disabled
              value={mover}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              isOptionEqualToValue={(option) => option?.id === option?.id}
              loading={loading === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setMover(newValue);
                } else {
                  setMover('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  disabled={loading === true}
                  // disabled={loading === true}
                  {...params}
                  label="PIC Datindo"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
          </Box>
        ) : (
          <Box sx={{ minWidth: 300 }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="idPicMitra"
              options={data}
              disabled={defaultMover !== undefined}
              value={mover}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              isOptionEqualToValue={(option) => option?.id === option?.id}
              loading={loading === true}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setMover(newValue);
                } else {
                  setMover('');
                }
              }}
              renderInput={(params) => (
                <TextField
                  disabled={loading === true}
                  // disabled={loading === true}
                  {...params}
                  label="PIC Datindo"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
            />
          </Box>
        )}
      </div>
    </Paper>
  );
}
