/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Button,
  CircularProgress,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));

const HandleAddDetail = props => {
  // console.log(props, 'HandleAddDetail props');
  const { body } = props;
  const { setBody } = props;
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');

  return (
    <FuseAnimate className="" animation="transition.slideLeftIn" delay={100}>
      <div className="p-5 sm:p-24 md:w-auto items-left">
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
                  label="TSS Name"
                  type="text"
                  value={body?.name}
                  // error={body?.name <= '0'}
                  // helperText={body?.name <= '0' ? '*No Po Tidak Boleh kurang dari 1!' : ''}
                  focused
                  onChange={e => setBody?.setname(e.target.value)}
                />
              </div>
            </Box>
          </div>
        </div>
        <div>
          <div className="flex justify-end mt-10">
            <Button
              variant="contained"
              onClick={props.handleClose}
              className="mr-5"
            >
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
                  body.name === ''
                  // body.phoneNumber === '' || body.status === ''
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
