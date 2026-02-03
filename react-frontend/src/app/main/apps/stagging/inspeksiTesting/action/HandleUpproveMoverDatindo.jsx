/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import * as React from 'react';
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

// keterangan,
// no_mesin,
// position,
// quantity,
// sn_mesin,
// status,
export default function HandleUpproveMoverDatindo(props) {
  const idPo = props?.idPO;
  const getIdMesin = props?.getIdMesin;
  // const userRoles = props?.userRoles;
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }

  // console.log(props, 'props');
  const classes = useStyles();
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const [data, setData] = React.useState([]);
  const [gudang, setGudang] = React.useState('');
  const [mover, setMover] = React.useState('');
  const [getDataByIdMover, setgetDataByIdMover] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event) => {
    setMover('');
    setGudang(event.target.value);
  };

  const getData = async () => {
    setLoading(true);

    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}inspeksi/approval/DATINDO/${idPo}/${getIdMesin?.idMesin}`,
        config
      )
      .then((res) => {
        const datas = res?.data?.data[0];
        // console.log(datas, 'data');
        setgetDataByIdMover({
          data: datas,
          name: datas?.name,
          id: datas?.id,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        setgetDataByIdMover({});
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
  };
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
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
  }, [gudang]);
  // console.log(data, 'data');
  const [defaultMover, setDefaultMover] = React.useState('');
  const dataUpproveById = props?.dataUpproveById;

  React.useEffect(() => {
    // setMover(defaultMover);
    setDefaultMover(dataUpproveById?.name);
  }, [dataUpproveById?.name]);
  // console.log(defaultMover?.name, 'defaultMover');

  props.propsFromParrent(mover, props.getIdMesin, defaultMover);
  let color = '';
  if (getDataByIdMover?.data?.name !== undefined) {
    color = 'success';
  } else {
    color = 'warning';
  }

  return (
    <Paper className="flex items-center justify-center" sx={{ width: '100%', height: '100%' }}>
      <div className="m-10 w-md">
        <div>
          <Alert className="mb-5" severity={color}>
            Approval By:{' '}
            {getDataByIdMover?.name === undefined ? 'Belum ada Approval' : getDataByIdMover?.name}
          </Alert>
        </div>
        {userRoles === 'ADMIN' || userRoles === 'SUPER_ADMIN' ? (
          <Box sx={{ minWidth: 200 }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="idPicMitra"
              options={data}
              // disabled={getDataByIdMover?.name !== undefined}
              value={mover}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.id === data.name}
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
          userRoles === 'OPERATOR_MOVER' ||
          userRoles === 'GUEST_BANK' ||
          userRoles === 'GUEST_DIP' ||
          userRoles === 'GUEST_RELATED' ||
          defaultMover === '' ? (
          <Box sx={{ minWidth: 200 }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="idPicMitra"
              options={data}
              disabled
              value={mover}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.id === data.name}
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
          <Box sx={{ minWidth: 200 }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="idPicMitra"
              options={data}
              disabled={getDataByIdMover?.name !== undefined || userRoles === 'OPERATOR_MOVER'}
              value={mover}
              getOptionLabel={(n) => (n?.name === undefined ? '' : n?.name)}
              getOptionSelected={(option) => option?.id === data.name}
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
