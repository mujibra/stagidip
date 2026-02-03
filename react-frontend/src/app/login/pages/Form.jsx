/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable func-names */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CircularProgress, FormControl } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/fuse/messageSlice';
// import { showMessage } from 'app/store/fuse/messageSlice';

const Form = () => {
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  // const [errMessage, setErrMessage] = useState('');
  const [errorstatus, setErrorstatus] = useState({
    email: false,
    password: false,
  });
  // const getUser = JSON.parse(localStorage.getItem("user_profile"));
  // let userRoles;
  // useEffect(() => {
  //   if (getUser) {
  //     userRoles = getUser[0]?.roles;
  //   }
  // }, [getUser, userRoles]);

  const handleSubmit = (e) => {
    setloading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    axios
      .post(`${api}login`, formData)
      .then((response) => {
        setloading(false);
        setErrorstatus({
          email: false,
          password: false,
        });
        localStorage.setItem('access_token', response.data.access_token);
        const data_user = JSON.stringify(response.data.user_profile);
        localStorage.setItem('user_profile', data_user);
        const getUser = JSON.parse(localStorage.getItem('user_profile'));
        const userRoles = getUser[0]?.roles;

        dispatch(
          showMessage({
            message: 'Login Success',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        if (userRoles === 'OPERATOR_MOVER') {
          window.location.href = '/apps/stagging/inspeksiTestings/';
        } else if (userRoles === 'GUEST_BANK') {
          window.location.href = 'apps/spesification';
        } else {
          window.location.href = 'apps/dashboard/dashboardPages';
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        setloading(false);
        if (error?.response) {
          const errStatus = error?.response?.status;
          const errMessage = error?.response?.data?.message;
          let messages = '';
          if (errStatus === 401) {
            setErrorstatus({
              email: true,
              password: true,
            });
            messages = 'Email atau Password salah!!!';
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
        } else {
          console.log('Error', error?.message);
        }
      });
  };
  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            // labelId="Email"
            // helperText={loginFiled}
            // id="standard-error-helper-text"
            className="mb-16"
            focused
            required
            error={errorstatus.email === true}
            fullWidth
            label="Email"
            name="email"
            type="text"
            value={email}
            // helperText={errMessage}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            // helperText={errMessage}
            // labelId="password"
            // helperText={loginFiled}
            // id="standard-error-helper-text"
            className="mb-16"
            focused
            required
            error={errorstatus.password === true}
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {loading === true ? (
          <Button
            disabled
            // onClick={props.HandleSubmit}
            variant="contained"
            startIcon={<CircularProgress size="2rem" />}
          >
            <div className="hidden md:contents">Loading...</div>
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16"
            aria-label="LOG IN"
            disabled={email === '' && password === ''}
            value="legacy"
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default Form;
