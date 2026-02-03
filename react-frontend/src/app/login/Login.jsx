import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Form from './pages/Form';

const Root = styled('div')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    theme.palette.primary.dark,
    0.5
  )} 100%)`,
  color: theme.palette.primary.contrastText,

  '& .Login-leftSection': {},

  '& .Login-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-10">
                <img className="logo-icon w-48" src="assets/images/inventary.png" alt="logo" />
                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    StagiDIP
                  </Typography>
                  <Typography
                    className="text-16 tracking-widest -mt-8 font-700"
                    color="textSecondary"
                  >
                    Management System
                  </Typography>
                </div>
              </div>
            </motion.div>

            <Tabs
              value={selectedTab}
              // onChange={handleTabChange}
              variant="fullWidth"
              className="w-full mb-32"
            >
              <Tab
                icon={<AccountCircleIcon fontSize="large" />}
                className="min-w-0"
                label="Login"
                // onClick={() => getFilter('mabes')}
                // disabled={loginMabes.length === 0}
              />
            </Tabs>

            {selectedTab === 0 && <Form />}
          </CardContent>

          <div className="flex flex-col text-sm mb-4 items-center justify-center pb-10">
            <div>
              <span className="font-normal mr-8">Lupa Password?</span>
              <Link className="font-normal" to="/forgot-password">
                Buat Password Baru
              </Link>
            </div>
            {/* <Link className="font-normal mt-8" to="/login">
              Kembali Ke Dashboard
            </Link> */}
          </div>
        </Card>

        <div className="Login-rightSection hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-800 text-center">
            <div className="flex justify-center">
              <img
                className="flex items-center logo-icon w-192"
                src="assets/images/inventary.png"
                alt="logo"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography variant="h4" color="inherit" className="font-semibold leading-tight">
                Welcome to <br /> StagiDIP
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            />
          </div>
        </div>
      </motion.div>
    </Root>
  );
};

export default Login;
