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
                  label="PIC Name*"
                  type="text"
                  value={props.dataEdit?.name || ''}
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

              {/* <Typography className="font-bold text-xs mt-24 md:mt-10">Machine</Typography> */}
              {/* <div className="  w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Jumlah*"
                  name="jumlah"
                  value={props.dataEdit?.jumlah}
                  // value={props.dataEdit?.jumlah}
                  // error={props.dataEdit?.jumlah === 0}
                  onChange={handleChangeUpdate}
                />
              </div>

              <div className=" w-full flex gap-10 mt-10 flex-col md:flex-row ">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status PO</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.dataEdit?.statusPo || ''}
                    label="Status PO"
                    onChange={(newValue) => {
                      if (newValue) {
                        setBody.setstatusPo(newValue);
                      } else {
                        setBody.setstatusPo(null);
                      }
                    }}
                    // onChange={(e) => setBody?.setstatusPo(e.target.value)}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="deactive">Deactive</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
