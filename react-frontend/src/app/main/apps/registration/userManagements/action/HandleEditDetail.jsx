/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));
const getAccessToken = localStorage.getItem('access_token');
const getUser = JSON.parse(localStorage.getItem('user_profile'));
let userRoles;
if (getUser) {
  userRoles = getUser[0]?.roles;
}

const HandleEditDetail = (props) => {
  const { dataEdit, setDataEdit } = props;
  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const { body } = props;
  const { setBody } = props;
  const [getLengthPN, setgetLengthPN] = useState(0);
  // console.log(props?.valueCustomer, 'props?.valueCustomer')

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 w-full items-left">
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
                  label="Name"
                  name="name"
                  type="text"
                  value={dataEdit?.name}
                  onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
                />
              </div>

              <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Email"
                  type="email"
                  value={dataEdit?.email}
                  onChange={(e) => setDataEdit({ ...dataEdit, email: e.target.value })}
                />
              </div>
              <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  // type="password"
                  value={dataEdit?.password}
                  error={getLengthPN === 0 ? false : getLengthPN < 8}
                  helperText={
                    getLengthPN === 0
                      ? ''
                      : getLengthPN < 8
                      ? 'Could not lower or higher than 8 character'
                      : ''
                  }
                  onChange={(e) => {
                    if (e.target.value.length === 9) {
                      return;
                    }
                    setgetLengthPN(e.target.value.length);
                    setDataEdit({ ...dataEdit, password: e.target.value });
                  }}
                />
              </div>
              <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Roles</InputLabel>

                  {userRoles === 'ADMIN' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Roles"
                      value={dataEdit?.roles}
                      onChange={(e) => setDataEdit({ ...dataEdit, roles: e.target.value })}
                    >
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="SUPERVISOR">Supervisor</MenuItem>
                      <MenuItem value="OPERATOR_DIP">Operator DIP</MenuItem>
                      <MenuItem value="OPERATOR_MOVER">Operator Mover</MenuItem>
                      <MenuItem value="OPERATOR_TSS">Operator TSS</MenuItem>
                      <MenuItem value="GUEST">Guest</MenuItem>
                      <MenuItem value="GUEST_BANK">Guest Bank</MenuItem>
                      <MenuItem value="GUEST_RELATED">Guest Related</MenuItem>
                    </Select>
                  ) : userRoles === 'SUPERVISOR' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Roles"
                      value={dataEdit?.roles}
                      onChange={(e) => setDataEdit({ ...dataEdit, roles: e.target.value })}
                    >
                      {/* <MenuItem value="ADMIN">Admin</MenuItem> */}
                      <MenuItem value="SUPERVISOR">Supervisor</MenuItem>
                      <MenuItem value="OPERATOR_DIP">Operator DIP</MenuItem>
                      <MenuItem value="OPERATOR_MOVER">Operator Mover</MenuItem>
                      <MenuItem value="OPERATOR_TSS">Operator TSS</MenuItem>
                      <MenuItem value="GUEST">Guest</MenuItem>
                      <MenuItem value="GUEST_BANK">Guest Bank</MenuItem>
                      <MenuItem value="GUEST_RELATED">Guest Related</MenuItem>
                    </Select>
                  ) : userRoles === 'SUPER_ADMIN' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Roles"
                      value={dataEdit?.roles}
                      onChange={(e) => setDataEdit({ ...dataEdit, roles: e.target.value })}
                    >
                      <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="SUPERVISOR">Supervisor</MenuItem>
                      <MenuItem value="OPERATOR_DIP">Operator DIP</MenuItem>
                      <MenuItem value="OPERATOR_MOVER">Operator Mover</MenuItem>
                      <MenuItem value="OPERATOR_TSS">Operator TSS</MenuItem>
                      <MenuItem value="GUEST">Guest</MenuItem>
                      <MenuItem value="GUEST_BANK">Guest Bank</MenuItem>
                      <MenuItem value="GUEST_RELATED">Guest Related</MenuItem>
                    </Select>
                  ) : (
                    ''
                  )}
                </FormControl>
              </div>
              {dataEdit?.roles === 'GUEST_BANK' ? (
                <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                  <Autocomplete
                    disablePortal
                    id="idCustomer"
                    options={props?.DataCustomer}
                    value={props?.valueCustomer}
                    fullWidth
                    getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    loading={props?.loadingCustomer === true}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        props?.setvalueCustomer(newValue);
                        setDataEdit({ ...dataEdit, customer: newValue });
                      } else if (!newValue) {
                        props?.setvalueCustomer(null);
                        setDataEdit({ ...dataEdit, customer: null });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        color="warning"
                        // error
                        helperText="Edit GUEST BANK Dalam Perbaikan!"
                        // value={body.customer}
                        {...params}
                        label="Customer"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
                </div>
              ) : dataEdit?.roles === 'OPERATOR_MOVER' ? (
                <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                  <Autocomplete
                    disablePortal
                    id="idGudang"
                    options={props?.DataGudang}
                    value={props?.valueGudang}
                    fullWidth
                    // disabled={body?.roles !== 'OPERATOR_MOVER'}
                    // onFocus={handleFocus}
                    getOptionLabel={(n) => (n?.gudang_desc === undefined ? '' : n?.gudang_desc)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    loading={props?.loadingGudang === true}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        props?.setvalueGudang(newValue);
                        setDataEdit({ ...dataEdit, gudang: newValue });
                      } else if (!newValue) {
                        props?.setvalueGudang(null);
                        setDataEdit({ ...dataEdit, gudang: null });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Warehouse"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
                </div>
              ) : (
                ''
              )}
              <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>

                  {userRoles === 'ADMIN' || userRoles === 'SUPERVISOR' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Roles"
                      value={dataEdit?.status}
                      onChange={(e) => setDataEdit({ ...dataEdit, status: e.target.value })}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                    </Select>
                  ) : userRoles === 'SUPER_ADMIN' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Roles"
                      value={dataEdit?.status}
                      onChange={(e) => setDataEdit({ ...dataEdit, status: e.target.value })}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                    </Select>
                  ) : (
                    ''
                  )}
                </FormControl>
              </div>
            </Box>
          </div>
        </div>
        <div>
          <div className="flex justify-end mt-10 w-auto">
            <Button variant="contained" onClick={props.handleClose} className="mr-5">
              Close
            </Button>
            {props.loading === true ? (
              <Button
                disabled
                onClick={props.handleEdit}
                variant="contained"
                startIcon={<CircularProgress size="2rem" />}
              >
                <div className="hidden md:contents">Loading</div>
              </Button>
            ) : (
              <Button
                // disabled={body.name === '' || body.email === '' || body.password === ''}
                onClick={props.handleEdit}
                variant="contained"
                disabled={getLengthPN === 0 ? false : getLengthPN < 8}
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

export default HandleEditDetail;
