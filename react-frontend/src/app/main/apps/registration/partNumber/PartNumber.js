/* eslint-disable consistent-return */
import withReducer from 'app/store/withReducer';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import FusePageCarded from '@fuse/core/FusePageCarded';
import axios from 'axios';
import reducerPartNumber from './store';
import PartNumberHeader from './PartNumberHeader';
import PartNumberList from './PartNumberList';
// import { styled } from '@mui/material/styles';
// import FusePageSimple from '@fuse/core/FusePageSimple';
import PartNumberDialog from './PartNumberDialog';
import PartNumberSidebarContent from './PartNumberSidebarContent';
import { getPartNumber } from './store/partNumberSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken}`,
  },
};

function PartNumber(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  // display & loading
  const [loading, setLoading] = useState(true);
  const [valueStatus, setValueStatus] = useState('');
  const [valueType, setValueType] = useState('');
  const [valuePartColumn, setValuePartColumn] = useState('');

  // function for handle Filter Based on Type Mesin
  const [openTypeMesin, setOpenTypeMesin] = useState(false);
  const [optionsTypeMesin, setOptionsTypeMesin] = useState([]);
  const [valueTypeMesin, setValueTypeMesin] = useState({
    name: '',
    id: '',
    json: null,
  });

  const loadingTypeMesin = openTypeMesin && optionsTypeMesin.length === 0;
  const [triggerLoadTypeMesin, setTriggerLoadTypeMesin] = useState(true);

  useEffect(() => {
    if (!loadingTypeMesin) {
      return undefined;
    }

    (async () => {
      setTriggerLoadTypeMesin(true);
      await axios
        .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-mesin`, config)
        .then((res) => {
          setOptionsTypeMesin(
            res.data.data.map((value) => ({
              id: value.id,
              name: value.type,
              json: value,
            }))
          );
          setTriggerLoadTypeMesin(false);
        })
        .catch((err) => {
          setOptionsTypeMesin([]);
          setTriggerLoadTypeMesin(false);
        });
    })();
  }, [loadingTypeMesin]);

  useDeepCompareEffect(() => {
    setLoading(true);
    dispatch(
      getPartNumber({
        page,
        max: rowsPerPage,
        tipeMesin: valueTypeMesin,
        status: valueStatus,
        type: valueType,
        partColum: valuePartColumn,
      })
    ).then((res) => {
      // console.log(res, 'ress');
      setLoading(false);
    });
  }, [dispatch, page, rowsPerPage, valueTypeMesin, valueStatus, valueType, valuePartColumn]); // , page, rowsPerPage

  return (
    <>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={<PartNumberHeader pageLayout={pageLayout} />}
        content={
          <PartNumberList
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            loading={loading}
          />
        }
        leftSidebarContent={
          <PartNumberSidebarContent
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            TipeMesin={{
              openTypeMesin,
              setOpenTypeMesin,
              optionsTypeMesin,
              setOptionsTypeMesin,
              loadingTypeMesin,
              triggerLoadTypeMesin,
              valueTypeMesin,
              setValueTypeMesin,
              valueStatus,
              setValueStatus,
              valueType,
              setValueType,
              valuePartColumn,
              setValuePartColumn,
            }}
          />
        }
        sidebarInner
        ref={pageLayout}
        // innerScroll
      />
      <PartNumberDialog
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        TipeMesin={{
          valueTypeMesin,
          setValueTypeMesin,
          valueStatus,
          setValueStatus,
          valueType,
          setValueType,
          valuePartColumn,
          setValuePartColumn,
        }}
      />
    </>
  );
}

export default withReducer('partNumberApp', reducerPartNumber)(PartNumber);
