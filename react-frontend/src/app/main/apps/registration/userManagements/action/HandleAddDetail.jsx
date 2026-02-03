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

const HandleAddDetail = (props) => {
  // console.log(props, 'HandleAddDetail props');
  const config = {
    // body: DataPicMitra,
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const { body } = props;
  const { setBody } = props;
  const [getLengthPN, setgetLengthPN] = useState(0);

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 w-sm items-left">
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
                  type="text"
                  value={body?.name}
                  onChange={(e) => setBody?.setname(e.target.value)}
                />
              </div>

              <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Email"
                  type="email"
                  value={body?.email}
                  onChange={(e) => setBody?.setemail(e.target.value)}
                />
              </div>
              <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  type="text"
                  error={getLengthPN === 0 ? false : getLengthPN < 8}
                  helperText={
                    getLengthPN === 0
                      ? ''
                      : getLengthPN < 8
                      ? 'Could not lower or higher than 8 character'
                      : ''
                  }
                  value={body?.password}
                  onChange={(e) => {
                    if (e.target.value.length === 9) {
                      return;
                    }
                    setgetLengthPN(e.target.value.length);
                    setBody?.setpassword(e.target.value);
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
                      value={body?.roles}
                      label="Roles"
                      onChange={(e) => setBody?.setroles(e.target.value)}
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
                      value={body?.roles}
                      label="Roles"
                      onChange={(e) => setBody?.setroles(e.target.value)}
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
                      value={body?.roles}
                      label="Roles"
                      onChange={(e) => setBody?.setroles(e.target.value)}
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
              {body?.roles === 'GUEST_BANK' ? (
                <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                  <Autocomplete
                    disablePortal
                    id="idCustomer"
                    options={props?.DataCustomer}
                    value={body?.customer?.id}
                    fullWidth
                    disabled={body?.roles !== 'GUEST_BANK'}
                    // onFocus={handleFocus}
                    getOptionLabel={(n) => (n?.bank_desc === undefined ? '' : n?.bank_desc)}
                    getOptionSelected={(option) => option?.body?.customer?.bank_desc}
                    loading={props?.loadingCustomer === true}
                    onChange={(_event, newValue, reason) => {
                      if (newValue) {
                        setBody.setcustomer(newValue?.id);
                      } else {
                        setBody.setcustomer({
                          id: null,
                          name: '',
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        value={body.customer}
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
              ) : body?.roles === 'OPERATOR_MOVER' ? (
                <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                  <Autocomplete
                    disablePortal
                    id="idGudang"
                    options={props?.DataGudang}
                    value={body?.gudang?.id}
                    fullWidth
                    disabled={body?.roles !== 'OPERATOR_MOVER'}
                    // onFocus={handleFocus}
                    getOptionLabel={(n) => (n?.gudang_desc === undefined ? '' : n?.gudang_desc)}
                    getOptionSelected={(option) => option?.body?.gudang?.gudang_desc}
                    loading={props?.loadingGudang === true}
                    onChange={(_event, newValue, reason) => {
                      if (newValue) {
                        setBody.setgudang(newValue?.id);
                      } else {
                        setBody.setgudang({
                          id: null,
                          name: '',
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        value={body.gudang}
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
                      value={body?.status}
                      label="Roles"
                      onChange={(e) => setBody?.setstatus(e.target.value)}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                    </Select>
                  ) : userRoles === 'SUPER_ADMIN' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={body?.status}
                      label="Roles"
                      onChange={(e) => setBody?.setstatus(e.target.value)}
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
                disabled={
                  body.name === '' ||
                  body.email === '' ||
                  body.password === '' ||
                  getLengthPN === 0 ||
                  getLengthPN < 8
                }
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
