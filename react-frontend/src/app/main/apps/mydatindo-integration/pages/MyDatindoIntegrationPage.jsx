import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { makeStyles } from '@mui/styles';
import { Link as LinkMui } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function MyDatindoIntegrationPage() {
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  console.log(getAccessToken);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textDecoration: {
      textDecoration: 'none',
    },
  }));
  const urlDatindo = 'https://dev.datindoku.com/login.php';

  const handleGetToken = () => {
    if (getAccessToken !== null || getAccessToken !== undefined || getAccessToken !== '') {
      navigator.clipboard.writeText(getAccessToken);
      dispatch(
        showMessage({
          message: 'Token Berhasil Di Copy',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
      );
    } else {
      dispatch(
        showMessage({
          message: 'Login Terlebih Dahulu!',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'error',
        })
      );
    }
  };
  return (
    <div className={useStyles.root}>
      <div>
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">MyDatindo Integration</span>{' '}
              {/* <span className="block text-blue-600 xl:inline">online business</span> */}
            </h1>
            <p className="mt-20 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Click button Go to MyDatindo below to connect with MyDatindo Application
            </p>
            <div className="flex flex-cols-2 gap-10 items-center justify-center mt-10">
              <div>
                <Link
                  to="/apps/dashboard/dashboardPages"
                  className="w-full flex items-center justify-center px-8 py-1 border border-transparent text-base font-medium rounded-md md:text-lg md:px-10 no-underline text-secondary"
                >
                  <p className="text-blue-800 underline">Back to Dashboard</p>
                </Link>
                {/* <Button variant="contained" onClick={handleGetToken}>
                  GetToken
                </Button> */}
              </div>
              <div className="bg-blue-800 rounded-sm">
                <LinkMui
                  href={urlDatindo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 text-white w-full flex items-center justify-center border border-transparent text-base font-medium rounded-md md:text-lg px-6"
                >
                  <LaunchIcon className="mr-4 text-white" />
                  <p className="text-white">Go to MyDatindo</p>
                </LinkMui>
              </div>
            </div>
            {/* <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button>
                <Link
                  to="/apps/dashboard/dashboardPages"
                  className="w-full flex items-center justify-center px-8 py-1 border border-transparent text-base font-medium rounded-md md:text-lg md:px-10 no-underline"
                >
                  <p>Back to Dashboard</p>
                </Link>
              </Button>
              <Button className="">
                <a
                  href={urlDatindo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 text-white w-full flex items-center justify-center border border-transparent text-base font-medium rounded-md md:text-lg"
                >
                  <LaunchIcon className="mr-4" />
                  Goes to MyDatindo
                </a>
              </Button>
            </div> */}
          </div>
          <div className="flex items-center justify-center">
            <img
              className="flex items-center w-1/2"
              src="assets/images/ilustration/connect.svg"
              alt="connect"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
