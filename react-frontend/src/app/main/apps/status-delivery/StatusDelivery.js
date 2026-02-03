/* eslint-disable import/no-extraneous-dependencies */
import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDebounce } from 'use-debounce';
import { getStatusDelivery } from './store/statusDeliverySlice';
import reducerStatusDelivery from './store';
import StatusDeliveryHeader from './StatusDeliveryHeader';
import StatusDeliveryDialog from './StatusDeliveryDialog';
import StatusDeliveryDetailDialog from './StatusDeliveryDetailDialog';
import StatusDeliveryList from './StatusDeliveryList';

function StatusDelivery() {
  const getUser = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const [page, setPage] = useState(0);
  const [searched, setSearched] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [value] = useDebounce(searched, 1500);
  const [date, setdate] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  // console.log(date, 'dateee');
  // console.log(value, 'value');

  useDeepCompareEffect(() => {
    setLoading(true);
    setIsSearching(true);
    dispatch(
      getStatusDelivery({
        page,
        max: value === '' ? rowsPerPage : 99999,
        user_login: getUser[0]?.id,
        snMesin: value,
        date,
        purchoseOrder: 'PO',
      })
    ).then((res) => {
      setLoading(false);
    });
    setIsSearching(false);
  }, [dispatch, page, rowsPerPage, value, date]);
  const [getData, setGetData] = useState(false);

  const pullData = (getDatas) => {
    setGetData(getDatas);
  };
  //   console.log(getData, 'getData');

  return (
    <>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={<StatusDeliveryHeader pageLayout={pageLayout} />}
        content={
          <StatusDeliveryList
            getData={getData}
            pullData={pullData}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            loading={loading}
            setSearched={setSearched}
            searched={searched}
            value={value}
            date={date}
            setdate={setdate}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        }
      />
      <StatusDeliveryDialog
        pullData={pullData}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        loading={loading}
        setLoading={setLoading}
      />

      <StatusDeliveryDetailDialog
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}

export default withReducer('statusDeliveryApp', reducerStatusDelivery)(StatusDelivery);
