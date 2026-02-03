/* eslint-disable no-lonely-if */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import { format } from "date-fns";
import moment from 'moment';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import StatusDelivery from './StatusDeliveryTable';
import {
  selectStatusDelivery,
  openNewStatusDeliveryDialog,
  openEditStatusDeliveryDialog,
} from './store/statusDeliverySlice';
// eslint-disable-next-line import/extensions
import HandleExportExcel from './action/HandleExportExcel';

function StatusDeliveryList(props) {
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: { Authorization: `Bearer ${getAccessToken}` },
  };
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const StatusDeliveryDialogs = useSelector(
    ({ statusDeliveryApp }) => statusDeliveryApp.statusDelivery.statusDeliveryDialog.props.open
  );
  const statusDelivery = useSelector(selectStatusDelivery);
  const searchText = useSelector(
    ({ statusDeliveryApp }) => statusDeliveryApp.statusDelivery.searchText
  );
  const totalElements = useSelector(
    ({ statusDeliveryApp }) => statusDeliveryApp.statusDelivery.totalElements
  );

  const [filteredData, setFilteredData] = useState([]);
  // console.log(filteredData, 'filteredData');
  let rowPerPages;
  if (props?.value === '') {
    rowPerPages = props?.rowsPerPage;
  } else {
    rowPerPages = 9999;
  }
  // console.log(rowPerPages, 'rowPerPages');

  useEffect(() => {
    if (props.getData === true) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}statusDelivery/${rowPerPages}/${
            user_info[0]?.id
          }?dataSearch=${props?.value?.toUpperCase()}`,
          config
        )
        .then((res) => {
          // console.log(res?.data?.data?.data, 'RES2');
          setFilteredData(res?.data?.data?.data);
          // }
          setLoading(false);
        })
        .catch((err) => {
          setFilteredData([]);
          setLoading(false);
          const errStatus = err?.response?.status;
          const errMessage = err?.response?.data?.errorMessage;
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
        });
    }
  }, [props.getData, props?.value, rowPerPages]);

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return statusDelivery;
      }
      return FuseUtils.filterArrayByString(statusDelivery, _searchText);
    }

    let url_statusDeliv = '';
    let url_statusDelivSeacrh = '';
    if (props?.date === null) {
      // props?.setSearched('');
      url_statusDelivSeacrh = props?.value.toUpperCase();
    } else {
      url_statusDelivSeacrh = props?.date?.toString();
    }

    if (props?.page === 0) {
      url_statusDeliv = `statusDelivery/${rowPerPages}/${user_info[0]?.id}?page=1&dataSearch=${url_statusDelivSeacrh}`;
    } else {
      url_statusDeliv = `statusDelivery/${rowPerPages}/${user_info[0]?.id}?page=${
        props?.page + 1
      }&dataSearch=${url_statusDelivSeacrh}`;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}${url_statusDeliv}`, config)
      .then((res) => {
        // console.log(res?.data?.data?.data, 'RES3');
        setFilteredData(res?.data?.data?.data);
        // }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFilteredData([]);
        setLoading(false);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.errorMessage;
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
    // setFilteredData(statusDelivery);
  }, [statusDelivery, searchText, props?.value, props?.date, rowPerPages]);

  // useEffect(() => {
  //   if (props?.date === null) {
  //     props?.setSearched('');
  //   } else {
  //     props?.setdate(null);
  //   } 
  // }, [props?.date]);

  // console.log(filteredData, 'filteredData');
  const [dataDetail, setDataDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(
    () => [
      {
        Header: 'No PO',
        accessor: 'detailPo.po_master.no_po_master', // 'detailPo.no_po',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Customer',
        accessor: 'detailPo.customer.bank_desc',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Warehouse',
        accessor: 'detailPo.gudang.gudang_desc',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'SN Mesin',
        accessor: 'sn_mesin',
        className: 'font-normal',
        sortable: true,
      },
      {
        Header: 'Departure Date',
        accessor: 'tgl_keluar',
        Cell: ({ value }) => {
          return value ? moment(value).format('DD MMM YYYY') : '-';
        },
      },
      {
        Header: 'Arrival Date',
        accessor: 'tgl_received',
        className: 'font-normal',
        Cell: ({ value }) => {
          return value ? moment(value).format('DD MMM YYYY') : '-';
        },
        sortable: true,
      },
      {
        Header: 'Action',
        className: 'font-normal',
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              title="Edit PartNumber"
              onClick={(ev) => {
                dispatch(openEditStatusDeliveryDialog(row.original));
              }}
              size="large"
            >
              <EditIcon color="primary" />
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  function createData(no, no_po, customer_desc, gudang_desc, sn_mesin, tgl_keluar, tgl_received) {
    return {
      no,
      no_po,
      customer_desc,
      gudang_desc,
      sn_mesin,
      tgl_keluar,
      tgl_received,
    };
  }
  const datas = filteredData?.map((item, index) =>
    createData(
      index + 1,
      item?.detailPo?.no_po === null ? '-' : item?.detailPo?.no_po,
      item?.detailPo?.customer === null ? '-' : item?.detailPo?.customer?.bank_desc,
      item?.detailPo?.gudang === null ? '-' : item?.detailPo?.gudang?.gudang_desc,
      item?.sn_mesin,
      moment(item?.tgl_keluar).format('YYYY-DD-MM'),
      moment(item?.tgl_received).format('YYYY-DD-MM')
    )
  );
  const DataForBody = [];
  // console.log(filteredData, 'data');
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < datas?.length; index++) {
    if (datas.length !== 0) {
      DataForBody.push(Object.values(datas[index]));
    }
    // console.log(datas[index], 'DataForBody')
  }

  const downloadPDF = () => {
    // console.log('test');
    // eslint-disable-next-line new-cap
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`Status Delivery Date ${moment().format('LL')}`, 20, 20);
    const index = 0;
    autoTable(doc, {
      theme: 'striped',
      head: [
        ['N0', 'No PO', 'Customer', 'Warehouse', 'SN Mesin', 'Departure Date', 'Arrival Date'],
      ],
      headStyles: { fontSize: 7, halign: 'center' },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
        4: { fontSize: 7, halign: 'center' },
        5: { fontSize: 7, halign: 'center' },
        6: { fontSize: 7, halign: 'center' },
        7: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Status of Delivery  ${moment().format('LL')}.pdf`);
  };

  return (
    <>
      <div className="flex justify-between p-12">
        {(user_info[0]?.roles === 'SUPER_ADMIN' ||
          user_info[0]?.roles === 'ADMIN' ||
          user_info[0]?.roles === 'SUPERVISOR' ||
          user_info[0]?.roles === 'OPERATOR_MOVER') && (
          <Button
            variant="contained"
            color="primary"
            onClick={(ev) => dispatch(openNewStatusDeliveryDialog())}
          >
            Add Data
          </Button>
        )}
        {(user_info[0]?.roles === 'SUPER_ADMIN' ||
          user_info[0]?.roles === 'ADMIN' ||
          user_info[0]?.roles === 'SUPERVISOR' ||
          user_info[0]?.roles === 'GUEST_DIP' ||
          user_info[0]?.roles === 'OPERATOR_DIP' ||
          user_info[0]?.roles === 'OPERATOR_TSS') && (
          <div className="flex gap-2">
            <FuseAnimate animation="transition.slideLeftIn" delay={100}>
              <Button className="mr-10" variant="contained" onClick={downloadPDF}>
                <PictureAsPdfIcon className="mr-2" />
                <div className="hidden md:contents">Export PDF</div>
              </Button>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={100}>
              <HandleExportExcel datas={datas} />
            </FuseAnimate>
          </div>
        )}
      </div>
      <StatusDelivery
        isSearching={props?.isSearching}
        setIsSearching={props?.setIsSearching}
        statusDelivery={statusDelivery}
        loading={props?.loading}
        user_info={user_info}
        setSearched={props?.setSearched}
        searched={props?.searched}
        date={props?.date}
        setdate={props?.setdate}
        value={props?.value}
        columns={columns}
        data={filteredData}
        totalElements={totalElements}
        pages={props.page}
        setPage={props.setPage}
        rowsPerPage={rowPerPages}
        setRowsPerPage={props.setRowsPerPage}
      />
    </>
  );
}

export default StatusDeliveryList;
