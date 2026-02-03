/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseAnimate from "@fuse/core/FuseAnimate";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import { Navigate } from "react-router-dom";
import HandleAddDetail from "./action/HandleAddDetail";
import TableBrand from "./TableBrand";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: "0px",
    minWidth: "100%",
  },
}));

const BrandParent = (props) => {
  const dispatch = useDispatch();
  const formatDateTahun = moment().format("YYYY");
  const formatDate = moment().format("YYYY-DD-MM");
  const getAccessToken = localStorage.getItem("access_token");
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);
  const [dataForm, setdataForm] = useState([]);

  const [name, setname] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const body = {
    name,
  };
  const setBody = {
    setname,
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}brand`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };

  const HandleSubmit = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(`${api}brand`, body, {
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Successfully Added", // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: "top", // top bottom
              horizontal: "center", // left center right
            },
            variant: "success", // success error info warning null
          })
        );
        getData();
        setname("");
        handleClose();
        <Navigate to="/apps/registration/brand" replace />;
      })
      .catch((err) => {
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
        setLoading(false);
        console.log(err, "err");
      });
  };

  return (
    <div>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-72 sm:min-h-72",
        }}
        header={
          <div>
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography
                    className="flex items-left mt-20 sm:mb-12 flex-col"
                    color="inherit"
                  >
                    <Typography
                      className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xl"
                      variant="h3"
                    >
                      REGISTRATION - Brand
                    </Typography>
                    <Typography
                      className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xs"
                      variant="h5"
                    >
                      Brand List
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        contentToolbar={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
              <div>
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  {/* <Link to="/apps/porchoseOrder/handleAdd"> */}
                  <Button variant="contained" onClick={handleClickOpens}>
                    <AddCircleOutlineIcon className="mr-2" />
                    <div className="hidden md:contents">Add New Brand</div>
                  </Button>
                  {/* </Link> */}
                </FuseAnimate>
              </div>
              <div className="ml-10 hidden">
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <TextField
                    className="mb-10"
                    id="standard-textarea"
                    // label="Seacrh Machine"
                    placeholder="Search..."
                    // multiline
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FuseAnimate>
              </div>
            </div>
            {/* <div className="flex items-center w-full lg2:w-1/3/2 md:w-1/2 justify-end mr-16">
              <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                <div>
                  <Button variant="contained" className="mr-5">
                      <PrintIcon className="mr-2" />
                      <div className="hidden md:contents sm:contents">Print</div>
                    </Button>
                  <Button variant="contained" className=" bg-green">
                    <FileOpenIcon className="mr-2" />
                    <div className="hidden md:contents sm:contents">Convert to Excel</div>
                  </Button>
                </div>
              </FuseAnimate>
            </div> */}
            <Dialog
              maxWidth="xl"
              // maxWidth="lg"
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Add New Brand</DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <HandleAddDetail
                    loading={loading}
                    body={body}
                    setBody={setBody}
                    HandleSubmit={HandleSubmit}
                    handleClose={handleClose}
                  />
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                <TableBrand
                  body={body}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  getData={getData}
                  handleClose={handleClose}
                />
              </div>
            </div>
          </FuseAnimate>
        }
        // innerScroll
      />
    </div>
  );
};

export default BrandParent;
