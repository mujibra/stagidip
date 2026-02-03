/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import { useForm } from '@fuse/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {
  addPartNumber,
  closeNewPartNumberDialog,
  closeEditPartNumberDialog,
  updatePartNumber,
  deletePartNumber,
  selectPartNumber,
} from './store/partNumberSlice';

const getAccessToken = localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${getAccessToken}` },
};

const defaultFormState = {
  id_mesin: '',
  part_no: '',
  part_desc: '',
  part_column: '',
  status: '',
  types: '',
  position: '',
};

function PartNumberDialog(props) {
  const partNumber = useSelector(selectPartNumber);
  const foundMachine = partNumber.find((element) => element?.types === 'MESIN');
  console.log(foundMachine, 'found');
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const tipeMesin = props.TipeMesin;
  const dispatch = useDispatch();
  const partNumberDialog = useSelector(
    ({ partNumberApp }) => partNumberApp.partNumber.partNumberDialog
  );
  console.log(partNumberDialog, 'partNumberDialog');
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const [status, setStatus] = useState('');
  const [getLengthPN, setgetLengthPN] = useState(0);
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setForm({
      ...form,
      status: event.target.value,
    });
  };
  // const [part, setPart] = useState();
  const handlePartChange = (event) => {
    const inputValue = event.target.value;
    if (event.target.value.length === 11) {
      return;
    }
    setgetLengthPN(event.target.value.length);
    const inputValueParse = parseFloat(inputValue.replace(/[^\d.-]/g, ''));
    const cleanedValue = isNaN(parseFloat(inputValue.replace(/[^\d.-]/g, '')))
      ? ''
      : inputValueParse;
    // console.log(cleanedValue, 'cleann');
    // setPart(cleanedValue);
    setForm({
      ...form,
      part_no: cleanedValue,
    });
  };
  // console.log(form, 'form');
  // console.log(part, 'part');

  const [types, setTypes] = useState('');
  const handleTypeChange = (event) => {
    setTypes(event.target.value);
    setForm({
      ...form,
      types: event.target.value,
    });
  };

  // useEffect(() => {
  //   setPart(form?.part_no);
  // }, [form]);

  const initDialog = useCallback(() => {
    /* Dialog type: 'Edit' */
    if (partNumberDialog.type === 'edit' && partNumberDialog.data) {
      setForm({
        ...partNumberDialog.data,
        id_mesin: partNumberDialog?.data?.mesin?.id,
      });
    }

    /* Dialog Type: 'new' */
    if (partNumberDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...partNumberDialog.data,
        status: partNumberDialog?.data?.status,
        id_mesin: partNumberDialog?.data?.valueType?.id,
      });
    }
  }, [partNumberDialog.data, partNumberDialog.type, setForm]);

  useEffect(() => {
    if (partNumberDialog.props.open) {
      initDialog();
    }
  }, [partNumberDialog.props.open, initDialog]);

  // function for handle Model form
  const [openModel, setOpenModel] = useState(false);
  const [optionsModel, setOptionsModel] = useState([]);
  const [triggerLoadModel, setTriggerLoadModel] = useState(true);
  const loadingModel = openModel && optionsModel.length === 0;

  const [valueModel, setValueModel] = useState({
    name: partNumberDialog?.data?.model?.name || '',
    id: partNumberDialog?.data?.model?.id || '',
    json: partNumberDialog?.data?.model || {},
  });

  useEffect(() => {
    if (!loadingModel) {
      return undefined;
    }
    (async () => {
      setTriggerLoadModel(true);
      await axios
        .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-model`, config)
        .then((res) => {
          // console.log('ress-getModel', res);
          setOptionsModel(
            res.data.data.map((value) => ({
              id: value.id,
              name: value.name,
              json: value,
            }))
          );
        });
    })();
  }, [loadingModel]);

  // function for handle Type form
  const [openType, setOpenType] = useState(false);
  const [optionsType, setOptionsType] = useState([]);
  const [triggerLoadType, setTriggerLoadType] = useState(true);
  const loadingType = openType && optionsType.length === 0;
  const [valueType, setValueType] = useState({
    name: partNumberDialog?.data?.type?.type || '',
    id: partNumberDialog?.data?.type?.id || '',
    json: partNumberDialog?.data?.type || {},
  });

  useEffect(() => {
    if (!loadingType) {
      return undefined;
    }

    (async () => {
      setTriggerLoadType(true);
      await axios
        .get(
          `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-mesin/${valueModel?.id}`,
          config
        )
        .then((res) => {
          // console.log('ress-getTypeMesin', res);
          setOptionsType(
            res.data.data.map((value) => ({
              id: value.id,
              name: value.type,
              json: value,
            }))
          );
          setTriggerLoadType(false);
        })
        .catch((err) => {
          setOptionsType([]);
          setTriggerLoadType(false);
        });
    })();
  }, [loadingType, valueModel?.id]);

  // add by ardie 2023-04-01
  useEffect(() => {
    setValueModel({
      name: partNumberDialog?.data?.mesin?.model?.name || '',
      id: partNumberDialog?.data?.mesin?.model?.id || '',
      json: partNumberDialog?.data?.mesin?.model || null,
    });
    setValueType({
      name: partNumberDialog?.data?.mesin?.type || '',
      id: partNumberDialog?.data?.mesin?.id || '',
      json: partNumberDialog?.data?.mesin,
    });
    setStatus(partNumberDialog?.data?.status);
    setTypes(partNumberDialog?.data?.types);
  }, [partNumberDialog?.data]);

  function closeComposeDialog() {
    setValueType({ id: '', name: '', json: {} });
    setValueModel({ id: '', name: '', json: {} });
    setStatus('');
    setTypes('');
    return partNumberDialog.type === 'edit'
      ? dispatch(closeEditPartNumberDialog())
      : dispatch(closeNewPartNumberDialog());
  }
  // console.log(form,  'from')

  function canBeSubmitted() {
    return form.types === '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (partNumberDialog.type === 'new') {
      dispatch(
        addPartNumber({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
          tipeMesin: props.TipeMesin,
        })
      );
      setValueType({ id: '', name: '', json: {} });
      setValueModel({ id: '', name: '', json: {} });
      setStatus('');
      setTypes('');

      // tipeMesin.setValueTypeMesin({
      //   id: '',
      //   name: '',
      //   json: null,
      // });
      // tipeMesin.setValueStatus('');
      // tipeMesin.setValueType('');
      // tipeMesin.setValuePartColumn('');
    } else {
      dispatch(
        updatePartNumber({
          form,
          page: props.page,
          rowsPerPage: props.rowsPerPage,
          tipeMesin: props.TipeMesin,
        })
      );
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(
      deletePartNumber({
        form,
        page: props.page,
        rowsPerPage: props.rowsPerPage,
        tipeMesin: props.TipeMesin,
      })
    );
    closeComposeDialog();
    // alert('test delete');
  }
  // console.log(valueModel, 'valmodel');

  return (
    <>
      <Dialog
        classes={{
          paper: 'm-24 rounded-4',
        }}
        {...partNumberDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" className="shadow-md">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {partNumberDialog.type === 'new' ? 'Add Part Number' : 'Edit Part Number'}
            </Typography>
          </Toolbar>
        </AppBar>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
          <DialogContent classes={{ root: 'p-24' }}>
            <div>
              <div className="flex -mx-2">
                <Autocomplete
                  id="model"
                  size="medium"
                  className="mb-10"
                  noOptionsText="No Option Available"
                  open={openModel}
                  onOpen={() => {
                    setOpenModel(true);
                  }}
                  onClose={() => {
                    setOpenModel(false);
                  }}
                  style={{ width: 300 }}
                  value={valueModel}
                  getOptionSelected={(option, value) => option.name === value.name}
                  // getOptionSelected={(option) => console.log('tesss', option)}
                  getOptionLabel={(option) => option.name}
                  getOptionDisabled={(option) => option.id === 'error'}
                  options={optionsModel}
                  loading={triggerLoadModel}
                  onChange={(event, value) => {
                    if (value) {
                      setValueModel(value);
                    } else {
                      setValueModel({
                        id: '',
                        name: '',
                        json: {},
                      });
                    }
                    setValueType({
                      id: '',
                      name: '',
                      json: {},
                    });
                    setOptionsType([]);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      variant="outlined"
                      className="mb-10"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
                &nbsp;
                <Autocomplete
                  className="mb-10"
                  size="medium"
                  id="type"
                  style={{ width: 300 }}
                  noOptionsText="No Option Available"
                  open={openType}
                  onOpen={() => {
                    setOpenType(true);
                  }}
                  onClose={() => {
                    setOpenType(false);
                  }}
                  value={valueType}
                  getOptionSelected={(option, value) => option.name === value.name}
                  getOptionLabel={(option) => option.name}
                  getOptionDisabled={(option) => option.id === 'error'}
                  options={optionsType}
                  loading={triggerLoadType}
                  disabled={valueModel?.name === ''}
                  onChange={(event, value) => {
                    if (value) {
                      setValueType(value);
                      setForm({
                        ...form,
                        id_mesin: value?.id,
                      });
                    } else {
                      setValueType({
                        id: '',
                        name: '',
                        json: {},
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Model Mesin"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex -mx-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type Machine</InputLabel>
                  {foundMachine === undefined || partNumberDialog.type !== 'new' ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="types"
                      name="types"
                      value={types}
                      label="Type"
                      className="mb-10"
                      onChange={handleTypeChange}
                    >
                      <MenuItem value="MESIN">MACHINE</MenuItem>
                      <MenuItem value="PART_MESIN">PART MACHINE</MenuItem>
                    </Select>
                  ) : (
                    <Select
                      labelId="demo-simple-select-label"
                      id="types"
                      name="types"
                      value={types}
                      label="Type"
                      className="mb-10"
                      onChange={handleTypeChange}
                    >
                      {/* <MenuItem value="MESIN">MACHINE</MenuItem> */}
                      <MenuItem value="PART_MESIN">PART MACHINE</MenuItem>
                    </Select>
                  )}
                </FormControl>
                &nbsp;
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="status"
                    name="status"
                    value={status}
                    label="Status"
                    className="mb-10"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {types === 'MESIN' ? (
                ''
              ) : (
                <div>
                  <div className="flex -mx-2">
                    <TextField
                      className="mb-10"
                      label="Part Number"
                      id="part_no"
                      name="part_no"
                      type="text" // Menggunakan tipe "text" agar tidak menampilkan tombol spinner
                      error={getLengthPN === 0 ? false : getLengthPN < 10}
                      helperText={
                        getLengthPN === 0
                          ? ''
                          : getLengthPN < 10
                          ? 'Cannot be more/less 10 Number'
                          : ''
                      }
                      InputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        style: { textAlign: 'right' },
                      }}
                      value={form?.part_no}
                      onChange={handlePartChange}
                      variant="outlined"
                      size="medium"
                      fullWidth
                    />
                    &nbsp;
                    <TextField
                      className="mb-10"
                      label="Part Description"
                      id="part_desc"
                      name="part_desc"
                      value={form.part_desc}
                      onChange={handleChange}
                      variant="outlined"
                      size="medium"
                      fullWidth
                    />
                  </div>
                  <div className="flex">
                    <TextField
                      className="mb-10"
                      label="Urutan"
                      id="position"
                      name="position"
                      type="number"
                      value={form.position}
                      onChange={handleChange}
                      variant="outlined"
                      size="medium"
                      inputProps={{
                        maxLength: 4,
                      }}
                      fullWidth
                    />
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
          {partNumberDialog.type === 'new' ? (
            <DialogActions className="justify-between p-8">
              <div className="px-16">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={form?.types === '' || form?.status === undefined}
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
                {user_info[0]?.roles === 'SUPER_ADMIN' ||
                user_info[0]?.roles === 'ADMIN' ||
                user_info[0]?.roles === 'SUPERVISOR' ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={form?.types === '' || form?.status === undefined}
                    className="mr-4"
                  >
                    Save
                  </Button>
                ) : (
                  ''
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeComposeDialog}
                  className="mr-4"
                >
                  Close
                </Button>
              </div>
              {user_info[0]?.roles === 'SUPER_ADMIN' || user_info[0]?.roles === 'ADMIN' ? (
                <IconButton onClick={handleRemove}>
                  <Icon>delete</Icon>
                </IconButton>
              ) : (
                ''
              )}
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  );
}

export default PartNumberDialog;
