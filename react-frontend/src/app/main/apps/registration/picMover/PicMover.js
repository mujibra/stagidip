import withReducer from 'app/store/withReducer';
import reducerPicMover from './store';
import { getPicMover } from './store/picMoverSlice';
import { useRef, useState, useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import PicMoverHeader from './PicMoverHeader'; 
import PicMoverList from './PicMoverList';
import PicMoverDialog from './PicMoverDialog';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken}`,
  },
};


function PicMover(props){
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // display & loading
    const [loading, setLoading] = useState(true);

    useDeepCompareEffect(() => {
        setLoading(true);
        dispatch(getPicMover({ page, max: rowsPerPage}))
            .then((res) => {
                // console.log('ress-picMover', res);
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
            header={<PicMoverHeader pageLayout={pageLayout}/>}
            content={
                <PicMoverList
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    loading={loading}
                />
            }
        />
        <PicMoverDialog
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
        />
    </>)
}


export default withReducer('picMoverApp', reducerPicMover)(PicMover);