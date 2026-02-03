/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { HandleFormEdit } from './HandleFormEdit';
import HandleApproval from './HandleApproval';

const Root = styled('div')(({ theme }) => ({
  '& .header': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '& .header-icon': {
      position: 'absolute',
      top: -64,
      left: 0,
      opacity: 0.04,
      fontSize: 512,
      width: 512,
      height: 512,
      pointerEvents: 'none',
    },
  },
}));

const Cards = (props) => {
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const theme = useTheme();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});
  const [trigger, setTrigger] = useState('');
  const [body, setBody] = useState({});
  const [bodyStatus, setBodyStatus] = useState({});
  const [getBody, setGetBody] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log(body, 'body')

  const handleClickOpen = (rows, triggers) => {
    setOpen(true);
    setRow(rows);
    setTrigger(triggers);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createData(
    id,
    detail_po,
    address,
    purpose,
    contact_person,
    contact_no,
    created_at,
    task,
    status_approval,
    request_by,
    category,
    detail_sn_mesin
  ) {
    return {
      id,
      detail_po,
      address,
      purpose,
      contact_person,
      contact_no,
      created_at,
      task,
      status_approval,
      request_by,
      category,
      detail_sn_mesin,
    };
  }
  const datas = props.dataById?.map((item, index) =>
    createData(
      item?.id,
      item?.detail_po,
      item?.address,
      item?.purpose,
      item?.contact_person,
      item?.contact_no,
      item?.created_at,
      item?.task,
      item?.status_approval,
      item?.request_by,
      item?.category,
      item?.detail_sn_mesin
    )
  );
  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  function buttonStatus(course) {
    switch (course.activeStep) {
      case course.totalSteps:
        return 'Completed';
      case 0:
        return 'Start';
      default:
        return 'Continue';
    }
  }

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}deliveryRequest/${row?.id}`,
        config
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        dispatch(
          showMessage({
            message: `Data Berhasil Di Hapus`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  const handleEdit = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}deliveryRequest/${row?.id}`,
        body,
        config
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        dispatch(
          showMessage({
            message: `Data Berhasil Di Edit`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  const handleApproval = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}updateApproval/${row?.id}`,
        { approve_by: body?.id, status_approval: bodyStatus },
        config
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        props?.getData();
        dispatch(
          showMessage({
            message:
              body === '' ? `successfully rejected` : `successfully approved by ${body?.name}`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  const propsFromParrent = (dataEdit, status) => {
    setBody(dataEdit);
    setBodyStatus(status);
  };
  // console.log(bodyStatus, 'bodyStatus');

  return (
    <Root className=" shrink-0 w-full">
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="1000px"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {trigger === 0 ? `Edit` : trigger === 1 ? 'Delete' : 'Approval'}
          </DialogTitle>
          <Divider />
          <DialogContent className="mb-72">
            <DialogContentText id="alert-dialog-description">
              {trigger === 0 ? (
                <HandleFormEdit row={row} propsFromParrent={propsFromParrent} />
              ) : trigger === 1 ? (
                `Apakah Anda Ingin Menghapus "${row?.purpose}"?`
              ) : (
                <HandleApproval row={row} propsFromParrent={propsFromParrent} />
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {trigger === 0 ? (
              <Button
                variant="contained"
                onClick={handleEdit}
                disabled={loading === true}
                autoFocus
              >
                {loading === true ? '...Loading' : 'Edit'}
              </Button>
            ) : trigger === 1 ? (
              <Button variant="contained" onClick={handleDelete} autoFocus>
                Delete
              </Button>
            ) : (
              <Button
                disabled={bodyStatus === null}
                variant="contained"
                onClick={handleApproval}
                autoFocus
              >
                Approve
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>

      <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
        <motion.div
          className="py-24 w-full justify-items-center"
          // variants={container}
          initial="hidden"
          animate="show"
        >
          {datas.map((item, index) => {
            return (
              <motion.div
                // variants={item}
                // className="w-full pb-24 sm:w-1/2 lg:w-1/2 sm:p-16"
                key={item?.id}
              >
                <Card className="flex flex-col h-400 shadow" sx={{ height: '100%' }}>
                  <div
                    className="flex shrink-0 items-center justify-between px-24 h-64 bg-light-blue-600"
                    // style={{
                    //   background: category?.color,
                    //   color: theme?.palette?.getContrastText(category?.color),
                    // }}
                  >
                    <Typography className="font-medium truncate" color="inherit">
                      NO. {index + 1}
                    </Typography>
                    <div className="flex items-center justify-center opacity-75">
                      <Icon className="text-20 mx-8" color="inherit">
                        access_time
                      </Icon>
                      <div className="text-14 font-medium whitespace-nowrap">
                        {moment(item?.created_at).format('LL')}
                      </div>
                      <CardActions className="fullwidth">
                        <div className="flex w-full">
                          <div className="flex w-full">
                            <Button
                              className="justify-start "
                              InputProps={{
                                readOnly: true,
                              }}
                              color={
                                item?.status_approval === null
                                  ? 'info'
                                  : item?.status_approval === '1'
                                  ? 'success'
                                  : 'error'
                              }
                              variant="contained"
                              // onClick={() => handleClickOpen(item, 2)}
                            >
                              {item?.status_approval === null
                                ? 'Approval'
                                : item?.status_approval === '1'
                                ? 'Approved'
                                : 'Reject'}
                            </Button>
                          </div>
                          {/* <div className=" flex  w-full">
                        <div className="w-full flex justify-end">
                          <IconButton
                            onClick={() => handleClickOpen(item, 0)}
                            className="justify-end p-2 "
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            onClick={() => handleClickOpen(item, 1)}
                            className="justify-start"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div> */}
                        </div>
                      </CardActions>
                    </div>
                  </div>
                  <CardContent className="">
                    <div>
                      <Typography className="text-center text-16 font-medium">
                        {item?.detail_po?.customer?.bank_desc}
                      </Typography>
                    </div>
                    <div>
                      <List
                        sx={{
                          width: '100%',
                          // maxWidth: 360,
                          bgcolor: 'background.paper',
                          position: 'relative',
                          overflow: 'auto',
                          maxHeight: 300,
                          // maxWidth: 360,
                        }}
                      >
                        <ListItem sx={{ height: 48 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <FmdGoodIcon fontSize="small" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Purpose*" secondary={item?.purpose} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem sx={{ height: 48 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <PersonIcon fontSize="small" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Contact Person*"
                            secondary={item?.contact_person}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem sx={{ height: 48 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <ContactsIcon fontSize="small" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Contact NO*" secondary={item?.contact_no} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem sx={{ height: 48 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <HomeIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Address*" secondary={item?.address} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem sx={{ height: 48 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <PostAddIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Request by*" secondary={item?.request_by?.name} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem sx={{ height: 48 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              <WarehouseIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Gudang*"
                            secondary={item?.detail_po?.gudang?.gudang_desc}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                    </div>
                  </CardContent>

                  <LinearProgress
                    className="w-full"
                    variant="determinate"
                    value={(item?.activeStep * 100) / item?.totalSteps}
                    color="secondary"
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Root>
  );
};

export default Cards;
