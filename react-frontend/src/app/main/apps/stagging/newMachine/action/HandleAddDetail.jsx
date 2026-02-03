/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
  Button,
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

const HandleAddDetail = (props) => {
  // console.log(props, 'HandleAddDetail props');
  const { body } = props;
  const { setBody } = props;
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
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
                  label="Part Number"
                  type="number"
                  value={body?.part_no}
                  error={getLengthPN === 0 ? false : getLengthPN < 10}
                  helperText={
                    getLengthPN === 0
                      ? ''
                      : getLengthPN < 10
                      ? 'Tidak boleh lebih/kurang dari 10'
                      : ''
                  }
                  onChange={(e) => {
                    if (e.target.value.length === 11) {
                      return;
                    }
                    setgetLengthPN(e.target.value.length);
                    // console.log(e.target.value.length);
                    setBody?.setpart_no(e.target.value);
                  }}
                  // onChange={(e) => setBody?.setpart_no(e.target.value)}
                />
              </div>
              {/* <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Alamat"
                  type="text"
                  multiline
                  rows={5}
                  value={body?.address}
                  onChange={(e) => setBody?.setaddress(e.target.value)}
                />
              </div> */}
            </Box>
          </div>
        </div>
        <div>
          <div className="flex justify-end mt-10">
            <Button variant="contained" onClick={props.handleClose} className="mr-5">
              Close
            </Button>
            <Button
              disabled={body.part_no === ''}
              onClick={props.HandleSubmit}
              variant="contained"
              startIcon={<PlaylistAddIcon />}
            >
              <div className="hidden md:contents">Submit</div>
            </Button>
            {/* {props.loading === true ? (
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
                disabled={body.part_no === '' || body.address === ''}
                onClick={props.HandleSubmit}
                variant="contained"
                startIcon={<PlaylistAddIcon />}
              >
                <div className="hidden md:contents">Submit</div>
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
};

export default HandleAddDetail;
