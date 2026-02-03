
import Paper from '@mui/material/Paper';
import { Autocomplete, FormControl, InputLabel, Select,  MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';


function SettingPreStagingSidebarContent(props){
    const params = props.Parameter;

    return ( 
        <div className="p-6">
            &nbsp;
            <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Types</InputLabel>
                    <Select
                        className="m-12"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        variant="standard"
                        // value={body.status_mesin}
                        defaultValue={null}
                        value={params.valueTypes}
                        label="Types"
                        // onChange={(e) => setBody?.setstatus_mesin(e.target.value)}
                        onChange={(e, val) => {
                            if (val) {
                                params.setValueTypes(e.target.value);
                            } else {
                                params.setValueTypes('');
                            }

                        }}
                    >
                        <MenuItem value="">- Choose -</MenuItem>
                        <MenuItem value="PROBLEM">Problem</MenuItem>
                        <MenuItem value="ACTION">Action</MenuItem>
                        <MenuItem value="REMARK">Remark</MenuItem>
                        <MenuItem value="DENOMINATION">Denomination</MenuItem>
                        <MenuItem value="BILL_CHECKER_UNIT">Bill</MenuItem>
                        <MenuItem value="KETERANGAN">Keterangan</MenuItem>
                    </Select>
                    </FormControl>
                    {/* <TextField
                        className="m-12"
                        label="Description"
                        id="description"
                        name="description"
                        value={params.valueDescription}
                        onChange={e => {
                            params.setValueDescription(e.target.value);
                        }}
                        variant="standard"
                    /> */}
            </Paper>
        </div>
    )
}

export default SettingPreStagingSidebarContent;