/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { AppBar, CircularProgress, Dialog, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import Open1 from './MX8600S/Open1';
import Open1Edit from './MX8600S/Open1Edit';
// import OpenSpecChceking from './MX8600S/OpenSpecChceking';
import OpenOperatingInspection from './MX8600S/OpenOperatingInspection';
import OpenSpecChcekingEdit from './MX8600S/OpenSpecChcekingEdit';
import OpenOperatingInspectionEdit from './MX8600S/OpenOperatingInspectionEdit';
import OpenSpecChceking from './MX8600S/OpenSpecChceking';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  tableCell: {
    minWidth: '100px',
    cursor: 'pointer',
  },
  cursorTable: {
    cursor: 'pointer',
  },
  root: {
    fontSize: '200pt',
  },
  table: {
    fontSize: '100pt',
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { id: 'no', label: 'NO', minWidth: 50 },
  { id: 'division', label: 'Division', minWidth: 100 },
  {
    id: 'test',
    label: 'Test',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
];

function createData(id, name, checklistStaging, staging_checklist) {
  return { id, name, checklistStaging, staging_checklist };
}

export default function OpenMX8600S(props) {
  // console.log(props, 'props');
  const classes = useStyles();
  const getIdMesinPo = props?.dataById?.mesin?.id;
  const idPO = props?.dataById?.id;
  const dataHeader = props?.dataById;
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  let userRoles;
  let userRolesId;
  if (getUser) {
    userRoles = getUser[0]?.roles;
    userRolesId = getUser[0]?.id;
  }
  const getIdMesin = props?.getIdMesin;
  // console.log(getIdMesinPo, 'getIdMesinPo');
  const dispatch = useDispatch();
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`,
        {},
        config
      )
      .then(res => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };
  const dataById = props?.dataById;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [datas, setDatas] = useState([]);
  const [body, setbody] = useState([]);
  const [open, setOpen] = useState(false);
  const [getIdDivision, setIdDivision] = useState('');
  const [getIdDivisionForParent, setgetIdDivisionForParent] = useState('');
  // console.log(getIdDivisionForParent, 'getIdDivisionForParent')
  const [getDisable, setGetDisable] = useState(false);
  const [getIdx, setGetgetIdx] = useState('');
  const [getTriggerAddEdit, setGetTriggerAddEdit] = useState('');
  const [getErrImg, setgetErrImg] = useState(0);
  // console.log(getIdDivision?.id, 'getIdDivision');
  const handleOpen = (row, index, triggerAddEdit) => {
    // console.log(row);
    setGetgetIdx(index);
    setOpen(true);
    setIdDivision(row);
    setGetDisable(row?.staging_checklist);
    setGetTriggerAddEdit(triggerAddEdit);
  };
  const rows = datas?.map((item, index) =>
    createData(
      item?.id,
      item?.name,
      item?.checklistStaging,
      item?.staging_checklist
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getData = async () => {
    if (open === true) {
      setLoading(false);
      // console.log('false');
    } else {
      // console.log('true');

      setLoading(true);
    }

    const response = await axios
      .get(
        // `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}dataTableChecklist/${getIdMesinPo}`,
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getIdMesin?.idMesin},`,
        config
      )
      .then(res => {
        setDatas(res?.data?.data);
        setLoading(false);
        setGetDisable(res?.data?.data[getIdx].staging_checklist);
      })
      .catch(err => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        setDatas([]);
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          handleLogout();
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

  const pullData = (data, getIdDivisionForParents) => {
    setbody(data);
    setgetIdDivisionForParent(getIdDivisionForParents);
  };
  const pullDataErrImg = errImg => {
    setgetErrImg(errImg);
  };
  // console.log(body, 'data from child');

  const handleEdit = () => {
    // getData();
    setLoadingBtn(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging/${idPO}/${getIdMesin?.idMesin}/${getIdDivisionForParent}`,
        body,
        config
      )
      .then(res => {
        setLoadingBtn(false);
        // setOpen(!open);
        getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Updated',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch(err => {
        setLoadingBtn(false);
        console.log(err, 'err');
        const errStatus = err.response.status;
        console.log(errStatus, 'errStatus');
        const errMessage = err.response.data.errorMessage;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else if (errStatus === 413) {
          messages = 'Gambar Minimal 2MB!!';
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
      });
    // setLoadingBtn(false);
  };
  const handleSubmit = () => {
    // getData();
    // console.log(body, 'body');
    setLoadingBtn(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}checklistStaging`,
        body,
        config
      )
      .then(res => {
        setLoadingBtn(false);
        // setOpen(!open);
        getData();
        dispatch(
          showMessage({
            message: 'Data Successfully Added',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch(err => {
        setLoadingBtn(false);
        console.log(err, 'err');
        const errStatus = err.response.status;
        const errMessage = err.response.data.errorMessage;
        let messages = 'S';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 413) {
          messages = errMessage;
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
      });
    // setLoadingBtn(false);
  };
  const handleClose = () => {
    // props?.getOK();
    // props?.getNG();
    // props?.getNA();
    setOpen(false);
    getData();
  };
  // console.log(getIdDivision.id, 'getIdDivision');
  const getIdDivisionMX5600S = getIdDivision?.id;

  return (
    <Paper sx={{ width: '100%' }}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              className="flex"
              sx={{ ml: 2, flex: 1 }}
              variant="subtitle1"
              component="div"
            >
              <div className="flex">
                <div className="">
                  <div>
                    SN MESIN :{' '}
                    {getIdMesin?.snMesin === null ? '-' : getIdMesin?.snMesin}{' '}
                  </div>
                  <div>
                    Model :{' '}
                    {dataHeader?.mesin?.type === null
                      ? '-'
                      : dataHeader?.mesin?.type}
                  </div>
                  <div>
                    PN System :{' '}
                    {dataHeader?.part_number === null
                      ? '-'
                      : dataHeader?.part_number}{' '}
                  </div>
                  <div>
                    PIC Datindo:{' '}
                    {dataHeader?.pic_staging?.name === null
                      ? '-'
                      : dataHeader?.pic_staging?.name}{' '}
                  </div>
                </div>
              </div>
            </Typography>
            {getTriggerAddEdit === 1 ? (
              <>
                {loadingBtn === true ? (
                  <Button
                    disabled
                    startIcon={<CircularProgress size="2rem" />}
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    disabled={
                      getDisable === true ||
                      userRoles === 'GUEST' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'GUEST_RELATED' ||
                      userRoles === 'OPERATOR_MOVER'
                      // || getErrImg > 2097152
                    }
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <>
                {loadingBtn === true ? (
                  <Button
                    disabled
                    startIcon={<CircularProgress size="2rem" />}
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    // onClick={handleEdit}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    disabled={
                      userRoles === 'GUEST' ||
                      userRoles === 'OPERATOR_TSS' ||
                      userRoles === 'GUEST_BANK' ||
                      userRoles === 'GUEST_DIP' ||
                      userRoles === 'GUEST_RELATED' ||
                      userRoles === 'OPERATOR_MOVER'
                    }
                    // disabled={getDisable === true}
                    autoFocus
                    color="inherit"
                    variant="outlined"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
        {getTriggerAddEdit === 1 ? (
          <div>
            {getIdDivision?.id === 1 ||
            // getIdDivision?.id === 2 ||
            // getIdDivision?.id === 3 ||
            getIdDivision?.id === 4 ||
            getIdDivision?.id === 5 ||
            getIdDivision?.id === 6 ||
            getIdDivision?.id === 7 ||
            getIdDivision?.id === 8 ||
            getIdDivision?.id === 9 ||
            getIdDivision?.id === 10 ||
            getIdDivision?.id === 11 ||
            getIdDivision?.id === 12 ||
            getIdDivision?.id === 13 ||
            getIdDivision?.id === 14 ||
            getIdDivision?.id === 15 ||
            getIdDivision?.id === 16 ||
            getIdDivision?.id === 47 ||
            // mx56000s
            getIdDivision?.id === 17 ||
            // getIdDivision?.id === 18 ||
            // getIdDivision?.id === 19 ||
            getIdDivision?.id === 20 ||
            getIdDivision?.id === 21 ||
            getIdDivision?.id === 22 ||
            getIdDivision?.id === 23 ||
            getIdDivision?.id === 24 ||
            getIdDivision?.id === 25 ||
            getIdDivision?.id === 26 ||
            getIdDivision?.id === 27 ||
            getIdDivision?.id === 28 ||
            getIdDivision?.id === 29 ||
            getIdDivision?.id === 30 ||
            getIdDivision?.id === 31 ||
            getIdDivision?.id === 32 ||
            getIdDivision?.id === 48 ||
            // MS500
            getIdDivision?.id === 50 ||
            // getIdDivision?.id === 51 ||
            // getIdDivision?.id === 52 ||
            getIdDivision?.id === 53 ||
            getIdDivision?.id === 54 ||
            getIdDivision?.id === 55 ||
            getIdDivision?.id === 56 ||
            getIdDivision?.id === 57 ||
            getIdDivision?.id === 58 ||
            getIdDivision?.id === 59 ||
            // MX7800DAS
            getIdDivision?.id === 89 ||
            // getIdDivision?.id === 90 ||
            // getIdDivision?.id === 91 ||
            getIdDivision?.id === 92 ||
            getIdDivision?.id === 93 ||
            getIdDivision?.id === 94 ||
            getIdDivision?.id === 95 ||
            getIdDivision?.id === 96 ||
            getIdDivision?.id === 97 ||
            getIdDivision?.id === 98 ||
            getIdDivision?.id === 99 ||
            getIdDivision?.id === 100 ||
            getIdDivision?.id === 101 ||
            getIdDivision?.id === 102 ||
            getIdDivision?.id === 103 ||
            getIdDivision?.id === 104 ||
            getIdDivision?.id === 105 ||
            // mx86000
            getIdDivision?.id === 60 ||
            // getIdDivision?.id === 61 ||
            // getIdDivision?.id === 62 ||
            getIdDivision?.id === 64 ||
            getIdDivision?.id === 65 ||
            getIdDivision?.id === 66 ||
            getIdDivision?.id === 67 ||
            getIdDivision?.id === 68 ||
            getIdDivision?.id === 69 ||
            getIdDivision?.id === 70 ||
            getIdDivision?.id === 71 ||
            getIdDivision?.id === 72 ||
            getIdDivision?.id === 73 ||
            getIdDivision?.id === 74 ||
            // mx86000s
            getIdDivision?.id === 33 ||
            // getIdDivision?.id === 34 ||
            // getIdDivision?.id === 35 ||
            getIdDivision?.id === 36 ||
            getIdDivision?.id === 37 ||
            getIdDivision?.id === 38 ||
            getIdDivision?.id === 39 ||
            getIdDivision?.id === 40 ||
            getIdDivision?.id === 41 ||
            getIdDivision?.id === 43 ||
            getIdDivision?.id === 42 ||
            getIdDivision?.id === 44 ||
            getIdDivision?.id === 45 ||
            getIdDivision?.id === 46 ||
            getIdDivision?.id === 49 ||
            // mx8000A
            getIdDivision?.id === 75 ||
            // getIdDivision?.id === 76 ||
            // getIdDivision?.id === 77 ||
            getIdDivision?.id === 78 ||
            getIdDivision?.id === 79 ||
            getIdDivision?.id === 80 ||
            getIdDivision?.id === 81 ||
            getIdDivision?.id === 82 ||
            getIdDivision?.id === 83 ||
            getIdDivision?.id === 84 ||
            getIdDivision?.id === 85 ||
            getIdDivision?.id === 86 ||
            getIdDivision?.id === 87 ||
            getIdDivision?.id === 88 ? (
              <Open1
                userRoles={userRoles}
                dataHeader={dataHeader}
                dataById={dataById}
                idPO={idPO}
                getIdMesin={getIdMesin}
                datas={datas}
                getData={getData}
                getIdDivision={getIdDivision}
                pullData={pullData}
                getDisable={getDisable}
                handleOpen={handleOpen}
              />
            ) : getIdDivision?.id === 51 ||
              getIdDivision?.id === 76 ||
              getIdDivision?.id === 61 ||
              getIdDivision?.id === 90 ||
              getIdDivision?.id === 34 ||
              getIdDivision?.id === 18 ||
              getIdDivision?.id === 2 ? (
              <OpenSpecChceking
                pullDataErrImg={pullDataErrImg}
                userRoles={userRoles}
                getIdDivisionMX5600S={getIdDivisionMX5600S}
                dataHeader={dataHeader}
                dataById={dataById}
                idPO={idPO}
                getIdMesin={getIdMesin}
                datas={datas}
                getData={getData}
                getIdDivision={getIdDivision}
                pullData={pullData}
                getDisable={getDisable}
                handleOpen={handleOpen}
              />
            ) : getIdDivision?.id === 77 ||
              getIdDivision?.id === 52 ||
              getIdDivision?.id === 62 ||
              getIdDivision?.id === 91 ||
              getIdDivision?.id === 35 ||
              getIdDivision?.id === 19 ||
              getIdDivision?.id === 3 ? (
              <>
                <div>
                  <OpenOperatingInspection
                    userRoles={userRoles}
                    dataHeader={dataHeader}
                    dataById={dataById}
                    idPO={idPO}
                    getIdMesin={getIdMesin}
                    datas={datas}
                    getData={getData}
                    getIdDivision={getIdDivision}
                    pullData={pullData}
                    getDisable={getDisable}
                    handleOpen={handleOpen}
                  />
                </div>
              </>
            ) : (
              <>
                <div>err</div>
              </>
            )}
          </div>
        ) : (
          <>
            <>
              {
                // mx5600
                getIdDivision?.id === 1 ||
                // getIdDivision?.id === 2 ||
                // getIdDivision?.id === 3 ||
                getIdDivision?.id === 4 ||
                getIdDivision?.id === 5 ||
                getIdDivision?.id === 6 ||
                getIdDivision?.id === 7 ||
                getIdDivision?.id === 8 ||
                getIdDivision?.id === 9 ||
                getIdDivision?.id === 10 ||
                getIdDivision?.id === 11 ||
                getIdDivision?.id === 12 ||
                getIdDivision?.id === 13 ||
                getIdDivision?.id === 14 ||
                getIdDivision?.id === 15 ||
                getIdDivision?.id === 16 ||
                getIdDivision?.id === 47 ||
                // MS500
                getIdDivision?.id === 50 ||
                // getIdDivision?.id === 51 ||
                // getIdDivision?.id === 52 ||
                getIdDivision?.id === 53 ||
                getIdDivision?.id === 54 ||
                getIdDivision?.id === 55 ||
                getIdDivision?.id === 56 ||
                getIdDivision?.id === 57 ||
                getIdDivision?.id === 58 ||
                getIdDivision?.id === 59 ||
                // MX7800DAS
                getIdDivision?.id === 89 ||
                // getIdDivision?.id === 90 ||
                // getIdDivision?.id === 91 ||
                getIdDivision?.id === 92 ||
                getIdDivision?.id === 93 ||
                getIdDivision?.id === 94 ||
                getIdDivision?.id === 95 ||
                getIdDivision?.id === 96 ||
                getIdDivision?.id === 97 ||
                getIdDivision?.id === 98 ||
                getIdDivision?.id === 99 ||
                getIdDivision?.id === 100 ||
                getIdDivision?.id === 101 ||
                getIdDivision?.id === 102 ||
                getIdDivision?.id === 103 ||
                getIdDivision?.id === 104 ||
                getIdDivision?.id === 105 ||
                // mx5600s
                getIdDivision?.id === 17 ||
                // getIdDivision?.id === 18 ||
                // getIdDivision?.id === 19 ||
                getIdDivision?.id === 20 ||
                getIdDivision?.id === 21 ||
                getIdDivision?.id === 22 ||
                getIdDivision?.id === 23 ||
                getIdDivision?.id === 24 ||
                getIdDivision?.id === 25 ||
                getIdDivision?.id === 26 ||
                getIdDivision?.id === 27 ||
                getIdDivision?.id === 28 ||
                getIdDivision?.id === 29 ||
                getIdDivision?.id === 30 ||
                getIdDivision?.id === 31 ||
                getIdDivision?.id === 32 ||
                getIdDivision?.id === 48 ||
                // mx86000
                getIdDivision?.id === 60 ||
                // getIdDivision?.id === 61 ||
                // getIdDivision?.id === 62 ||
                getIdDivision?.id === 64 ||
                getIdDivision?.id === 65 ||
                getIdDivision?.id === 66 ||
                getIdDivision?.id === 67 ||
                getIdDivision?.id === 68 ||
                getIdDivision?.id === 69 ||
                getIdDivision?.id === 70 ||
                getIdDivision?.id === 71 ||
                getIdDivision?.id === 72 ||
                getIdDivision?.id === 73 ||
                getIdDivision?.id === 74 ||
                // mx8600s
                getIdDivision?.id === 33 ||
                getIdDivision?.id === 36 ||
                getIdDivision?.id === 37 ||
                getIdDivision?.id === 38 ||
                getIdDivision?.id === 39 ||
                getIdDivision?.id === 40 ||
                getIdDivision?.id === 41 ||
                getIdDivision?.id === 43 ||
                getIdDivision?.id === 44 ||
                getIdDivision?.id === 45 ||
                getIdDivision?.id === 46 ||
                getIdDivision?.id === 49 ||
                // mx8000A
                getIdDivision?.id === 75 ||
                // getIdDivision?.id === 76 ||
                // getIdDivision?.id === 77 ||
                getIdDivision?.id === 78 ||
                getIdDivision?.id === 79 ||
                getIdDivision?.id === 80 ||
                getIdDivision?.id === 81 ||
                getIdDivision?.id === 82 ||
                getIdDivision?.id === 83 ||
                getIdDivision?.id === 84 ||
                getIdDivision?.id === 85 ||
                getIdDivision?.id === 86 ||
                getIdDivision?.id === 87 ||
                getIdDivision?.id === 88 ? (
                  <Open1Edit
                    userRoles={userRoles}
                    dataHeader={dataHeader}
                    dataById={dataById}
                    idPO={idPO}
                    getIdMesin={getIdMesin}
                    datas={datas}
                    getData={getData}
                    getIdDivision={getIdDivision}
                    pullData={pullData}
                    getDisable={getDisable}
                    handleOpen={handleOpen}
                  />
                ) : getIdDivision?.id === 51 ||
                  getIdDivision?.id === 76 ||
                  getIdDivision?.id === 61 ||
                  getIdDivision?.id === 90 ||
                  getIdDivision?.id === 34 ||
                  getIdDivision?.id === 18 ||
                  getIdDivision?.id === 2 ? (
                  <OpenSpecChcekingEdit
                    pullDataErrImg={pullDataErrImg}
                    userRoles={userRoles}
                    getIdDivisionMX5600S={getIdDivisionMX5600S}
                    dataHeader={dataHeader}
                    dataById={dataById}
                    idPO={idPO}
                    getIdMesin={getIdMesin}
                    datas={datas}
                    getData={getData}
                    getIdDivision={getIdDivision}
                    pullData={pullData}
                    getDisable={getDisable}
                    handleOpen={handleOpen}
                  />
                ) : getIdDivision?.id === 52 ||
                  getIdDivision?.id === 77 ||
                  getIdDivision?.id === 62 ||
                  getIdDivision?.id === 91 ||
                  getIdDivision?.id === 35 ||
                  getIdDivision?.id === 19 ||
                  getIdDivision?.id === 3 ? (
                  <>
                    <OpenOperatingInspectionEdit
                      userRoles={userRoles}
                      dataHeader={dataHeader}
                      dataById={dataById}
                      idPO={idPO}
                      getIdMesin={getIdMesin}
                      datas={datas}
                      getData={getData}
                      getIdDivision={getIdDivision}
                      pullData={pullData}
                      getDisable={getDisable}
                      handleOpen={handleOpen}
                    />
                  </>
                ) : (
                  <div>err Edit</div>
                )
              }
            </>
          </>
        )}
      </Dialog>
      <TableContainer sx={{ maxHeight: 600 }}>
        {loading === true ? (
          <FuseLoading />
        ) : datas.length !== 0 ? (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  {dataById?.mesin?.type} Pre-Staging Checklist
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <>
                      <StyledTableRow>
                        <TableCell align="left" className={classes?.tableCell}>
                          {index + 1}.)
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          {row?.name === null ? '-' : row?.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes?.tableCell}
                        >
                          <div className="flex justify-center">
                            <div>
                              <IconButton
                                onClick={() => handleOpen(row, index, 1)}
                                color="info"
                                disabled={
                                  row.staging_checklist === true ||
                                  loading === true
                                }
                                // className="z-9999"
                              >
                                <PlaylistAddIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpen(row, index, 2)}
                                color="info"
                                disabled={row.staging_checklist === false}
                                // className="z-9999"
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                          </div>
                        </TableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <>
            <div className="text-center m-20">
              <div>No Data Available</div>
            </div>
          </>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
