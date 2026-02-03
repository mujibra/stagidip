/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Dialog,
  DialogActions,
  Button,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  DialogContent,
  TextField,
  Autocomplete,
} from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import {
  addMachineSpesification,
  updateMachineSpesification,
  closeNewMachineSpesificationDialog,
  closeEditMachineSpesificationDialog,
  deleteMachineSpesification,
  getMachineSpesification,
} from './store/machineSpesificationSlice';

let defaultFormState = {
  item: '',
  description: '',
};

const dataItems = [
  { value: 'OS', label: 'OS' },
  { value: 'PROCESSOR', label: 'Processor' },
  { value: 'MAINBOARD_CE', label: 'Mainboard CE' },
  { value: 'MEMORY_1', label: 'Size Memory' },
  { value: 'MEMORY_2', label: 'Tipe Memory' },
  { value: 'MONITOR_1', label: 'Size Monitor' },
  { value: 'MONITOR_2', label: 'Monitor Screen' },
  { value: 'HDD_1', label: 'HDD 1' },
  { value: 'HDD_2', label: 'HDD 2' },
  { value: 'HDD_3', label: 'Tipe HDD 1' },
  { value: 'HDD_4', label: 'Tipe HDD 2' },
  { value: 'MCU', label: 'MCU' },
  { value: 'SPR', label: 'SPR' },
  { value: 'EPP_1', label: 'EPP' },
  // { value : 'EPP_2', label: 'EPP 2'},
  { value: 'POWER_SUPPLY', label: 'Power Supply' },
  { value: 'CROPF', label: 'CROPF' },
  { value: 'CARDBIN_1', label: 'Cardbin 1' },
  { value: 'CARDBIN_2', label: 'Cardbin 2' },
  { value: 'CASSETTE_1', label: 'Cassette 1' },
  { value: 'CASSETTE_2', label: 'Cassette 2' },
  { value: 'REJECT_1', label: 'Reject 1' },
  { value: 'REJECT_2', label: 'Reject 2' },
  { value: 'KUNCI_FASCIA', label: 'Kunci Fascia' },
  { value: 'KUNCI_FASCIA_ATAS_1', label: 'Kunci Fascia Atas 1' },
  { value: 'KUNCI_FASCIA_ATAS_2', label: 'Kunci Fascia Atas 2' },
  { value: 'KUNCI_FASCIA_BAWAH', label: 'Kunci Fascia Bawah' },
  { value: 'KUNCI_TENGAH', label: 'Kunci Tengah' },
  { value: 'KUNCI_TOMBAK', label: 'Kunci Tombak' },
  { value: 'KUNCI_CASSETTE_REJECT_1', label: 'Kunci Cassette/Reject' },
  { value: 'KUNCI_CASSETTE_REJECT_2', label: 'Kunci Cassette/Reject PCS' },
  { value: 'KUNCI_CASSETTE_REJECT_3', label: 'Kunci Cassette/Reject Kode' },
  { value: 'CENCON', label: 'Safe Door' },
  { value: 'AS_CENCON', label: 'As Cencon' },
  { value: 'BRACKET_CAMERA', label: 'Bracket Camera' },
  { value: 'KUNCI_CARDBIN', label: 'Kunci Cardbin' },
  { value: 'CARDLESS_READER', label: 'CardLessReader' },
  { value: 'LAN_CARD_1', label: 'LAN Card 1' },
  { value: 'LAN_CARD_2', label: 'LAN Card 2' },
  { value: 'THERMAL_PAPER', label: 'Thermal Paper' },
  { value: 'CABINET_SENSOR', label: 'Cabinet Sensor' },
  { value: 'SENSOR_GETAR', label: 'Sensor Getar' },
  { value: 'KABEL_LAN', label: 'Kabel LAN' },
  { value: 'KABEL_POWER', label: 'Kabel Power' },
  { value: 'KABEL_SERIAL_UPS', label: 'Kabel Serial UPS' },
  { value: 'KVA', label: 'KVA' },
  { value: 'KABEL_HDMI_TO_DVI_1', label: 'Kabel HDMI to DVI 1' },
  { value: 'KABEL_HDMI_TO_DVI_2', label: 'Kabel HDMI to DVI 2' },
  { value: 'KABEL_HDMI_TO_DVI_3', label: 'Kabel HDMI to DVI 3' },
  { value: 'FDI', label: 'FDI' },
  { value: '3_WAY_LOCK', label: '3 way Lock' },
  { value: 'PIN_COVER', label: 'PIN Cover' },
  { value: 'PROXIMITY_SENSOR', label: 'Proximity Sensor' },
  { value: 'PELINDUNG_CASSETTE', label: 'Pelindung Cassette' },
  { value: 'SAFEDOOR_KEY', label: 'Safedoor Key' },
  // { value: 'PELINDUNG_CASSETTE', label: 'Pelindung Cassette' },
  { value: 'BATERE_BACKUP', label: 'Batere Backup' },
  { value: 'ID_SCANNER', label: 'ID Scanner' },
  { value: 'BILL_ACEPTOR', label: 'Bill Aceptor' },
  { value: 'PRINTER_A4', label: 'Printer A4' },
  { value: 'KUNCI_BILL_ACEPTOR', label: 'Kunci Bill Aceptor' },
  { value: 'A4_PAPER', label: 'A4 Paper' },
  { value: 'ROLL_PEREKAT', label: 'Roll Perekat' },
  { value: 'RIBBON', label: 'Ribbon' },
  { value: 'CONTACTLESS', label: 'Contactless' },
  { value: 'UTC', label: 'UTC' },
  { value: 'CUSTOMER_DISPLAY_1', label: 'CUSTOMER DISPLAY SIZE' },
  { value: 'CUSTOMER_DISPLAY_2', label: 'CUSTOMER DISPLAY TYPE' },
  { value: 'CUSTOMER_DISPLAY_3', label: 'CUSTOMER DISPLAY PRIVACY FILTER' },
  { value: 'CUSTOMER_INPUT_1', label: 'CUSTOMER INPUT SIZE' },
  { value: 'CUSTOMER_INPUT_2', label: 'CUSTOMER INPUT TYPE' },
  { value: 'WEBCAM', label: 'WEBCAM' },
  { value: 'CARD_PRINTER', label: 'CARD PRINTER' },
  { value: 'A4_DOCUMENT_PRINTER', label: 'A4 DOCUMENT PRINTER' },
  { value: 'SPEAKER_PHONE', label: 'SPEAKER PHONE' },
  { value: 'CARD_DISPENSER', label: 'CARD DISPENSER' },
  { value: 'SCANNER', label: 'SCANNER' },
  { value: 'SIGN_PAD', label: 'SIGN PAD' },
  { value: 'CONTACTLESS_CARD_READER', label: 'CONTACTLESS CARD READER' },
];

function MachineSpesificationDialog(props) {
  const getAccessToken = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  const machineSpesificationDialog = useSelector(
    ({ machineSpesificationApp }) =>
      machineSpesificationApp.machineSpesification.machineSpesificationDialog
  );
  const { form, handleChange, setForm } = useForm(defaultFormState);
  // console.log(form, 'form')

  const [item, setItem] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleItemChange = (event) => {
    setItem(event.target.value);
    setForm({
      ...form,
      item: event.target.value,
    });
  };

  const initDialog = useCallback(() => {
    if (machineSpesificationDialog.type === 'edit' && machineSpesificationDialog.data) {
      setForm({
        ...machineSpesificationDialog.data,
      });
    }

    if (machineSpesificationDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...machineSpesificationDialog.data,
      });
    }
  }, [machineSpesificationDialog.data, machineSpesificationDialog.type, setForm]);

  useEffect(() => {
    if (machineSpesificationDialog.props.open) {
      initDialog();
    }
  }, [machineSpesificationDialog.props.open, initDialog]);

  function closeComposeDialog() {
    setItem('');
    return machineSpesificationDialog.type === 'edit'
      ? dispatch(closeEditMachineSpesificationDialog())
      : dispatch(closeNewMachineSpesificationDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (machineSpesificationDialog.type === 'new') {
      dispatch(
        addMachineSpesification({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
      defaultFormState = {
        item: '',
        description: '',
      };
      setItem('');
    } else {
      setItem('');
      dispatch(
        updateMachineSpesification({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      );
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(
      deleteMachineSpesification({
        form,
        page: props.page,
        rowsPerPage: props.rowsPerPage,
      })
    ).then(() =>
      dispatch(
        getMachineSpesification({
          page: props.page,
          rowsPerPage: props.rowsPerPage,
        })
      )
    );
    closeComposeDialog();
  }

  function canBeSubmitted() {
    return form?.item?.length > 0;
  }

  useEffect(() => {
    setItem(machineSpesificationDialog?.data?.item);
  }, [machineSpesificationDialog?.data]);

  const [error, setError] = useState('');
  useEffect(() => {
    // console.log(form.description, 'form.description');
    if (!form.description.match(/[`!@#$%^&*()\\[\]{};':"\\|<>\/?~]/)) {
      setError('');
    } else {
      setError('Forbidden character: !@#$%^&*()[]{};"\\|<>/?~');
      // console.log('Forbidden character: %<>$\'"');
    }
  }, [form.description]);
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getAllTypeSpekMesin`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res?.data?.datas);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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

  useEffect(() => {
    getData();
  }, []);

  const user_info = JSON.parse(localStorage.getItem('user_profile'));

  return (
    <>
      <Dialog
        classes={{
          paper: 'm-24 rounded-4',
        }}
        {...machineSpesificationDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" className="shadow-md">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {machineSpesificationDialog.type === 'new'
                ? 'Add Machine Spesification'
                : 'Edit Machine Spesification'}
            </Typography>
          </Toolbar>
        </AppBar>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
          <DialogContent classes={{ root: 'p-24' }}>
            <div>
              <div className="flex">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={item}
                  loading={loading}
                  options={data}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setItem(newValue);
                    setForm({
                      ...form,
                      item: newValue?.val,
                    });
                  }}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="Item" />}
                />
              </div>
              <div className="flex">
                <TextField
                  className="mb-10 mt-4"
                  label="Description"
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={!!error}
                  helperText={error}
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          {machineSpesificationDialog.type === 'new' ? (
            <DialogActions className="justify-between p-8">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  type="submit"
                  // disabled={!canBeSubmitted() || !!error}
                >
                  Add
                </Button>{' '}
                &nbsp;
                <Button variant="contained" color="secondary" onClick={closeComposeDialog}>
                  Close
                </Button>
              </div>
            </DialogActions>
          ) : (
            <DialogActions className="justify-between p-8">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  // disabled={!canBeSubmitted()}
                  className="mr-4"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeComposeDialog}
                  className="mr-4"
                >
                  Close
                </Button>
              </div>
              {user_info[0]?.roles === 'SUPER_ADMIN' ||
                (user_info[0]?.roles === 'ADMIN' && (
                  <IconButton onClick={handleRemove}>
                    <Icon>delete</Icon>
                  </IconButton>
                ))}
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default MachineSpesificationDialog;
