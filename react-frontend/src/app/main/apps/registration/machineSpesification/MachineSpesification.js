import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { getMachineSpesification } from './store/machineSpesificationSlice';
import reducerMachineSpesification from './store';
import MachineSpesificationHeader from './MachineSpesificationHeader';
import MachineSpesificationList from './MachineSpesificationList';
import MachineSpesificationDialog from './MachineSpesificationDialog';

function MachineSpesification(prop) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // display & loading
  const [loading, setLoading] = useState(true);

  useDeepCompareEffect(() => {
    setLoading(true);
    dispatch(getMachineSpesification({ page, max: rowsPerPage })).then((res) => {
      setLoading(false);
    });
  }, [dispatch, page, rowsPerPage]);

  return (
    <>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={<MachineSpesificationHeader pageLayout={pageLayout} />}
        content={
          <MachineSpesificationList
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            loading={loading}
          />
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <MachineSpesificationDialog
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}

export default withReducer(
  'machineSpesificationApp',
  reducerMachineSpesification
)(MachineSpesification);
