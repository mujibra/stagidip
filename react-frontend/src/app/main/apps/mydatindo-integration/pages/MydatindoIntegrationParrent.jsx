/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable import/prefer-default-export */
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Typography, IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

export const MydatindoIntegrationParrent = () => {
  const urlDatindo = 'https://dev.datindoku.com/login.php';

  return (
    <div>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={
          <div>
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography
                      className="hidden sm:flex mx-0 sm:mx-12 text-3xl font-bold"
                      variant="h1"
                    >
                      MyDatindo Integration
                    </Typography>
                    <Typography className="mt-10 hidden sm:flex mx-0 sm:mx-12 text-xs" variant="h5">
                      Click below to Sign in
                    </Typography>
                    <a
                      href={urlDatindo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 bg-gray-400 text-center text-gray-800"
                    >
                      <IconButton>
                        <LaunchIcon className="text-gray-200" />
                        <p className="ml-4 text-xl text-gray-200">
                          My<span className="font-extrabold text-gray-900">Datindo</span>
                        </p>
                      </IconButton>
                    </a>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
