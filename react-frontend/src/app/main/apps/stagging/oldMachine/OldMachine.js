/* eslint-disable camelcase */
import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import reducer from "./store";
import OldMachineHeader from "./OldMachineHeader";
import OldMachineList from "./OldMachineList";
import { getOldMachine } from "./store/oldmachineSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 140,
    height: 140,
    [theme.breakpoints.up("lg")]: {
      minHeight: 140,
      height: 140,
    },
  },
  "& .FusePageSimple-wrapper": {
    minHeight: 0,
  },
  "& .FusePageSimple-contentWrapper": {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: 24,
      height: "100%",
    },
  },
  "& .FusePageSimple-content": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  "& .FusePageSimple-sidebar": {
    width: 256,
    border: 0,
  },
}));

function OldMachine(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const id = routeParams["*"];

  // paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [loading, setLoading] = useState(false);

  const getAccessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };

  const [dataDetailOrder, setDataDetailOrder] = useState(null);
  const [loadingDetailOrder, setLoadingDetailOrder] = useState(true);
  const getDetailOrder = idPo => {
    // console.log('idddss', `${id}`);
    const id_Po = id.split("-")[0];
    const id_Mesin = Number(id.split("-")[1]);

    // console.log('idddss2', id_Po, id_Mesin);

    setLoadingDetailOrder(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}purchaseOrder/${id_Po}/datas`,
        config
      )
      .then(res => {
        // console.log('reess22', res);
        setDataDetailOrder(res?.data.data);
        setLoadingDetailOrder(false);
      })
      .catch(err => {
        setDataDetailOrder(null);
        setLoadingDetailOrder(false);
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
        console.log(err);
      });
  };
  let idMesin = 1;
  useDeepCompareEffect(() => {
    setLoading(true);
    // console.log('tessssxZZ', id);
    getDetailOrder(`${id.split("-")[0]}`);
    dispatch(
      getOldMachine({
        page,
        max: rowsPerPage,
        idPo: id,
      })
    ).then(() => setLoading(false));
  }, [dispatch, page, rowsPerPage, id]);

  // console.log('cekdata_OldMachine', page, routeParams);
  const getIdMesin = arg => {
    idMesin = arg;
  };

  return (
    <>
      <Root
        header={
          <OldMachineHeader
            dataDetailOrder={dataDetailOrder}
            pageLayout={pageLayout}
            loading={loading}
            idPo={id}
            page={page}
          />
        }
        content={
          <OldMachineList
            dataDetailOrder={dataDetailOrder}
            getIdMesin={getIdMesin}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            loading={loading}
            idPo={id}
          />
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}

export default withReducer("oldMachineApp", reducer)(OldMachine);
