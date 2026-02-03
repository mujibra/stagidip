import Paper from '@mui/material/Paper';
import { Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

function PartNumberSidebarContent(props) {
  const tipeMesin = props.TipeMesin;

  return (
    <div className="p-6">
      <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">
        <Autocomplete
          className="m-12"
          id="mesin"
          noOptionsText="No Option Available"
          open={tipeMesin.openTypeMesin}
          onOpen={() => {
            tipeMesin.setOpenTypeMesin(true);
          }}
          onClose={() => {
            tipeMesin.setOpenTypeMesin(false);
          }}
          value={tipeMesin.valueTypeMesin}
          getOptionLabel={(option) => option.name}
          options={tipeMesin.optionsTypeMesin}
          loading={tipeMesin.triggerLoadTypeMesin}
          onChange={(event, value) => {
            if (value) {
              tipeMesin.setValueTypeMesin(value);
            } else {
              tipeMesin.setValueTypeMesin({
                id: '',
                name: '',
                json: null,
              });
              tipeMesin.setValueStatus('');
              tipeMesin.setValueType('');
              tipeMesin.setValuePartColumn('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Model"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            className="m-12"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            // value={body.status_mesin}
            defaultValue={null}
            disabled={tipeMesin?.valueTypeMesin?.name === ''}
            value={tipeMesin.valueStatus}
            label="Status"
            // onChange={(e) => setBody?.setstatus_mesin(e.target.value)}
            onChange={(e, val) => {
              if (val) {
                tipeMesin.setValueStatus(e.target.value);
              } else {
                tipeMesin.setValueStatus('');
              }
            }}
          >
            <MenuItem value="">- Choose -</MenuItem>
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type Machine</InputLabel>
          <Select
            className="m-12"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            defaultValue={null}
            value={tipeMesin.valueType}
            disabled={tipeMesin?.valueTypeMesin === '' || tipeMesin?.valueStatus === ''}
            label="Status"
            onChange={(e, val) => {
              if (val) {
                tipeMesin.setValueType(e.target.value);
              } else {
                tipeMesin.setValueType('');
              }
            }}
          >
            <MenuItem value="">- Choose -</MenuItem>
            <MenuItem value="MESIN">Machine</MenuItem>
            <MenuItem value="PART_MESIN">Part Machine</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className="m-12"
          label="Part Description"
          id="partColumn"
          name="partColumn"
          disabled={
            tipeMesin?.valueTypeMesin === '' ||
            tipeMesin?.valueStatus === '' ||
            tipeMesin?.valueType === ''
          }
          value={tipeMesin.valuePartColumn}
          onChange={(e) => {
            tipeMesin.setValuePartColumn(e.target.value);
          }}
          variant="standard"
        />
        &nbsp; &nbsp;
      </Paper>
    </div>
  );
}
export default PartNumberSidebarContent;
