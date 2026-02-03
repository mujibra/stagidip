/* eslint-disable no-undef */
import { Box } from '@mui/system';
import {
  // Autocomplete,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
} from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useRef } from 'react';

export default function HandleEditDetail(props) {
  const ref0 = useRef();
  const { body } = props;
  const { setBody } = props;
  const { row } = props;
  const { bodyEdit } = props;

  const handleChangeUpdate = (e) => {
    const values = e.target.value;
    // console.log(values, 'values');
    props.setDataEdit(() => {
      return {
        ...props.dataEdit,
        [e.target.name]: values,
      };
    });
    // console.log(e.target.name, 'name');
    // console.log(values, 'values');
  };

  function handleOnChange(e) {
    const values = e.target.value;
    const label = e.target.innerText;
    props.setDataEdit({
      ...props.dataEdit,
      [label]: values,
    });
    // console.log(values, 'value');
    // console.log(label, 'label');
  }

  const formatDate = moment().format('YYYY-DD-MM');
  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-16 sm:p-24 w-sm items-left">
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
                  label="Style Name*"
                  type="text"
                  value={props?.dataEdit?.name}
                  name="name"
                  // error={body?.name <= '0'}
                  // helperText={body?.name <= '0' ? '*No Po Tidak Boleh kurang dari 1!' : ''}
                  focused
                  onChange={handleChangeUpdate}
                  // onChange={(newValue) => {
                  //   if (newValue) {
                  //     setBody.name(newValue);
                  //   } else {
                  //     setBody.name(null);
                  //   }
                  // }}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
