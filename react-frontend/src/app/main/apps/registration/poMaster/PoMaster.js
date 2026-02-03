import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducerPoMaster from './store';

function PoMaster(props) {
    const dispatch = useDispatch();
    const pageLayout = useRef(null);

    return (
        <>
        </>
    );
}

export default withReducer('poMasterApp', reducerPoMaster)(PoMaster);