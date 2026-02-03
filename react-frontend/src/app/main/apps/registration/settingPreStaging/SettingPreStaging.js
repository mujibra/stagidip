import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import reducerSettingPreStaging from './store';
import { getSettingPreStaging } from './store/settingPreStagingSlice';
import { useRef, useState, useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import SettingPreStagingHeader from './SettingPreStagingHeader';
import SettingPreStagingList from './SettingPreStagingList';
import SettingPreStagingDialog from './SettingPreStaggingDialog';
import SettingPreStagingSidebarContent from './SettingPreStagingSidebarContent';

function SettingPreStaging(props){

    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // display & loading
    const [loading, setLoading] = useState(true);

    // parameter for filtering 
    const [valueTypes, setValueTypes] = useState('');
    const [valueDescription, setValueDescription] = useState('');

    useDeepCompareEffect(() => {
        setLoading(true);
        // dispatch(getSettingPreStaging({page, max: rowsPerPage}))
        dispatch(getSettingPreStaging({page, max: rowsPerPage, types: valueTypes, description: valueDescription}))
            .then((res) => {
                setLoading(false);
            })
    }, [dispatch, page, rowsPerPage, valueTypes, valueDescription]);

    return (
        <>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
                }}
                header={<SettingPreStagingHeader pageLayout={pageLayout}/>}
                content={
                    <SettingPreStagingList
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        loading={loading}
                    />
                }
                leftSidebarContent={
                    <SettingPreStagingSidebarContent
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        Parameter={{
                            valueTypes, 
                            setValueTypes, 
                            valueDescription, 
                            setValueDescription
                        }}
                    />
                }
            />
            <SettingPreStagingDialog
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </>
    )
}

export default withReducer('settingPreStagingApp', reducerSettingPreStaging)(SettingPreStaging);