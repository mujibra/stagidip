/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import { Box } from '@mui/system';
import {
  Autocomplete,
  Button,
  List,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
  // Autocomplete,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Stack,
  TextField,
} from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const HeaderParent = [
  { id: 'no', label: 'No', minWidth: 170 },
  { id: 'label', label: 'Label', minWidth: 100 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];
const HeaderChild = [
  { id: 'no', label: 'No', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

export default function HandleEditDetail(props) {
  const ref0 = useRef();
  const userInfo = JSON.parse(localStorage.getItem('user_profile'));
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  const { dataEdit, setDataEdit, valueModel, setvalueModel } = props;
  const [triggerModel, settriggerModel] = useState(true);
  const [openModel, setopenModel] = useState(false);
  const [optionModel, setoptionModel] = useState([]);
  const loadingModel = openModel && optionModel.length === 0;
  const [value, setValue] = useState(props?.dataEdit?.type_atm);
  console.log(dataEdit, 'dataEdit');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataDetailChild, setDataDetailChild] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const [openChildEdit, setOpenChildEdit] = useState(false);
  const [openChildList, setOpenChildList] = useState(false);
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({});
  const [getBody, setGetBody] = useState([]);
  const [getDataById, setGetDataById] = useState({});
  const [getDataByIdList, setGetDataByIdList] = useState({});
  // const [itemChild, setItemChild] = useState(getDataById);
  const [description, setDescription] = useState('');
  const [dataListChild, setDataListChild] = useState([]);
  const [todos, setTodos] = useState([]);
  // console.log(todos, 'todos');
  const [task, setTask] = useState('');

  let dataById;

  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      // setDataEdit({ ...dataEdit, option: todos });
      setTask('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // setDataEdit({ ...dataEdit, option: todos });
  };

  const payloadModel = [];
  valueModel.map((item) => {
    payloadModel.push(item?.type_atm);
  });
  useEffect(() => {
    settriggerModel(true);
    axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-model`, config)
      .then((response) => {
        const jsonResult = response.data.data;
        // console.log(jsonResult, 'jsonResult');

        const dataModel = jsonResult.map((data) => {
          return {
            id: data.id,
            type_atm: data.name,
            json: data,
          };
        });

        setoptionModel(dataModel);
        settriggerModel(false);
      })
      .catch((error) => {
        setoptionModel([]);
        settriggerModel(false);
      });
  }, [loadingModel]);

  useEffect(() => {
    // console.log(form.description, 'form.description');
    if (!description.match(/[`!@#$%^&*()\\[\]{};':"\\|<>/?~]/)) {
      setError('');
    } else {
      setError('Forbidden character: !@#$%^&*()[]{};"\\|<>/?~');
      // console.log('Forbidden character: %<>$\'"');
    }
    const arr = [];
    if (valueModel?.length !== 0) {
      for (let index = 0; index < valueModel?.length; index++) {
        arr.push({
          id_type: valueModel[index].id_type,
          type: valueModel[index].name,
        });
      }
    }
    // console.log(arr, 'arr')
    setGetBody(arr);
    if (dataEdit?.label && dataEdit?.option !== null) {
      setTodos(dataEdit?.option);
      setLabel(dataEdit?.label);
    }
  }, [form.description, valueModel]);

  props.propsFromParent(todos);
  // console.log(todos, 'todoss')

  return (
    <FuseAnimate className="bg-red-800" animation="transition.slideLeftIn" delay={100}>
      <div className="p-16 sm:p-24 w-full items-left">
        <div>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <Autocomplete
                  disablePortal
                  multiple
                  filterSelectedOptions
                  id="combo-box-customer"
                  noOptionsText="No Option Available"
                  options={optionModel}
                  onOpen={() => {
                    setopenModel(true);
                  }}
                  onClose={() => {
                    setopenModel(false);
                  }}
                  value={valueModel}
                  fullWidth
                  getOptionLabel={(n) => (n?.type_atm === undefined ? '' : n?.type_atm)}
                  getOptionSelected={(option) => option?.type_atm}
                  loading={triggerModel === true}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setvalueModel(newValue);
                      setDataEdit({ ...dataEdit, type_atm: newValue });
                    } else if (!newValue) {
                      setvalueModel(null);
                      setDataEdit({ ...dataEdit, type_atm: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      }}
                      label="Type"
                    />
                  )}
                />
              </div>
              <div className=" w-full mt-10 flex gap-10 flex-col md:flex-row ">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="General desc"
                  // name="type"
                  value={dataEdit?.general_desc}
                  onChange={(e) => setDataEdit({ ...dataEdit, general_desc: e.target.value })}
                />
              </div>
              <div>
                <div className="w-full my-10">
                  <TextField
                    id="filled-error-helper-text"
                    label="Label"
                    value={dataEdit?.label}
                    // onChange={(e) => setLabel(e.target.value)}
                    onChange={(e) => setDataEdit({ ...dataEdit, label: e.target.value })}
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className="w-full flex justify-between gap-2">
                  <TextField
                    type="text"
                    size="small"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    label="Option"
                  />
                  <Button variant="contained" onClick={addTodo}>
                    Add
                  </Button>
                </div>
                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                  {todos.map((value, index) => (
                    <ListItem
                      key={value}
                      disableGutters
                      secondaryAction={
                        <Button color="error" variant="contained" onClick={() => removeTodo(index)}>
                          Remove
                        </Button>
                      }
                    >
                      <ListItemText primary={`${index + 1}. ${value}`} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
