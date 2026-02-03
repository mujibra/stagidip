/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Box } from "@mui/system";
import {
  // Autocomplete,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
} from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import FuseAnimate from "@fuse/core/FuseAnimate";
import {
  // useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
// import axios from 'axios';
import { makeStyles } from "@mui/styles";
// import PartNumber from '../../mockData/PartNumber';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));

export default function HandleEditDetail(props) {
  const classes = useStyles();
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const getAccessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const { dataEdit, setDataEdit } = props;
  const methods = useFormContext();
  const { setBody } = props;
  // const [value, setValue] = useState(props.dataEdit);
  const [value, setValue] = useState(props.dataEdit);

  const handleChangeUpdate = (e) => {
    const values = e.target.value;
    setValue(() => {
      return {
        ...value,
        [e.target.name]: values,
      };
    });
    props.setDataById(() => {
      return {
        ...value,
        [e.target.name]: values,
      };
    });
  };

  const formatDate = moment().format("YYYY-DD-MM");
  return (
    <FuseAnimate
      className="bg-red-800"
      animation="transition.slideLeftIn"
      delay={100}
    >
      <div className="p-16 sm:p-24 w-sm items-left">
        <div>
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className=" w-full flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Warehouse Name"
                  name="gudang_desc"
                  value={dataEdit?.gudang_desc}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, gudang_desc: e.target.value })
                  }
                />
              </div>
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Address"
                  name="alamat"
                  multiline
                  rows={5}
                  value={dataEdit?.alamat}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, alamat: e.target.value })
                  }
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
