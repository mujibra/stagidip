/* eslint-disable no-inner-declarations */
/* eslint-disable consistent-return */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, CircularProgress, FormControl, Tab, Tabs, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showMessage } from '../store/fuse/messageSlice';

export default function Index() {
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Step 1; Input Email, Step 2; Input Code sent to email, Step 3; Input New Password
  const [step, setStep] = useState(1);

  // Step 1 State
  const [email, setEmail] = useState('');
  // Step 2 State
  const [code, setCode] = useState('');
  const [token, setToken] = useState(null);
  // Step 3 State
  const [password, setPassword] = useState(null); // will be an object { password: "", confirmPassword: "" }

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errMsg, setErrMsg] = useState(null); // should be an object e.g { email: "" }

  function handleSubmit() {
    if (step === 1) {
      sendCodeToEmail();
    } else if (step === 2) {
      validate();
    } else if (step === 3) {
      resetPassword();
    }
  }

  function handleRefresh() {
    setTouched(false);
    setStep(step + 1);
    setErrMsg(null);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));

    // If the input being changed is confirmPassword, revalidate newPassword for equality
    if (name === 'confirmPassword') {
      validateInput('newPassword', password.newPassword, 'Password');
    }
  };

  const validateInput = (key, value, name) => {
    if (!value) {
      setErrMsg((prevErr) => ({ ...prevErr, [key]: `${name} cannot be empty` }));
      return false;
    }
    if (value.length < 8) {
      setErrMsg((prevErr) => ({ ...prevErr, [key]: `${name} must be at least 8 characters` }));
      return false;
    }

    // Check for equality only if it's the confirmPassword field
    if (key === 'confirmPassword' && value !== password.newPassword) {
      setErrMsg((prevErr) => ({ ...prevErr, [key]: 'Passwords do not match' }));
      return false;
    }

    setErrMsg((prevErr) => ({ ...prevErr, [key]: '' }));
    return true;
  };

  async function sendCodeToEmail() {
    setTouched(true);

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${api}send-email`, { email });
      setToken(res.data?.token);
      dispatch(
        showMessage({
          message: 'Email sent successfully',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
      );
      handleRefresh();
    } catch (err) {
      dispatch(
        showMessage({
          message: err?.response?.data?.message || 'Email failed to sent.',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'error',
        })
      );
      // setErrorMessage
    } finally {
      setLoading(false);
    }
  }

  async function validate() {
    setTouched(true);
    setLoading(true);
    try {
      await axios.post(`${api}verif-email`, { kode: code, token });
      handleRefresh();
      dispatch(
        showMessage({
          message: 'Verification successful',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
      );
    } catch (err) {
      if (err?.response?.status === 500) {
        dispatch(
          showMessage({
            message: err?.response?.data?.message,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      } else {
        setErrMsg({ code: err?.response?.data?.message });
      }
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    setTouched(true);

    const newPassValid = validateInput('newPassword', password.newPassword, 'Password');
    const confirmPassValid = validateInput(
      'confirmPassword',
      password.confirmPassword,
      'Confirm Password'
    );
    if (!newPassValid || !confirmPassValid) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${api}change-new-password`, {
        email,
        password: password?.newPassword,
      });
      dispatch(
        showMessage({
          message: 'Password successfully reset.',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
      );
      //   wait for alert to hide then navigate to login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      dispatch(
        showMessage({
          message: error?.response?.data?.message,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (password) {
      validateInput('newPassword', password.newPassword, 'Password');
      validateInput('confirmPassword', password.confirmPassword, 'Confirm Password');
    }
  }, [password]);
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#161EB3] to-[#0b0f59]">
      <div className="w-full h-full flex justify-center items-center p-24">
        <div className="w-full max-w-400 md:max-w-sm bg-white p-20 px-64 rounded-24 flex flex-col items-center">
          <Tabs value={0} variant="fullWidth" className="w-full mb-32">
            <Tab
              icon={<AccountCircleIcon fontSize="large" />}
              className="min-w-0"
              label="Forgot Password"
            />
          </Tabs>

          <div hidden={step !== 2} className="mx-auto w-full md:w-3/4 text-xs text-center mb-32">
            Kode telah terkirim ke email Anda. Masukkan kode untuk melanjutkan.
          </div>

          {step === 1 && (
            <FormControl fullWidth>
              <TextField
                className="mb-16"
                focused
                required
                error={!isValidEmail && touched}
                fullWidth
                label="Email"
                name="email"
                type="text"
                helperText={
                  (touched &&
                    (email ? !isValidEmail && 'Email tidak valid' : 'Email tidak boleh kosong')) ||
                  errMsg?.email
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          )}

          {step === 2 && (
            <FormControl fullWidth>
              <TextField
                className="mb-16"
                focused
                required
                error={(!code && touched) || errMsg?.code}
                fullWidth
                label="Kode"
                name="kode"
                type="text"
                helperText={(touched && !code && 'Kode tidak boleh kosong') || errMsg?.code}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
          )}

          {step === 3 && (
            <FormControl fullWidth>
              <TextField
                className="mb-16"
                focused
                required
                error={touched && Boolean(errMsg?.newPassword)}
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                helperText={touched && errMsg?.newPassword}
                value={password?.newPassword || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          )}
          {step === 3 && (
            <FormControl fullWidth>
              <TextField
                className="mb-16"
                focused
                required
                error={touched && Boolean(errMsg?.confirmPassword)}
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                helperText={(touched && errMsg?.confirmPassword) || ''}
                value={password?.confirmPassword || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          )}

          <Button
            disabled={
              loading ||
              (step === 1 && !email) ||
              (step === 2 && !code) ||
              (step === 3 && (!password?.newPassword || !password?.confirmPassword))
            }
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16"
            aria-label="LOG IN"
            // disabled={email === '' && password === ''}
            value="legacy"
            startIcon={loading && <CircularProgress size="2rem" />}
            onClick={handleSubmit}
          >
            {loading ? <div className="hidden md:contents">Loading...</div> : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
}
