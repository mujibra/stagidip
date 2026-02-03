import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { format } from 'date-fns';

const Top3CustomerFilter = (props) => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);
  const months = Array.from({ length: 12 }, (_, index) => format(new Date(currentYear, index, 1), 'MMMM'));

  const handleYearChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    props.setYear(selectedValue);
  };

  return (
    <div className='w-3/12 flex gap-x-5 items-center p-12'>
      <Typography className='whitespace-nowrap mr-10'>Filter :</Typography>
      <FormControl fullWidth className='mb-7'>
        <InputLabel id="tahun-label">Tahun</InputLabel>
        <Select
          labelId="tahun-label"
          id={`${props.idFilter}-year`}
          variant="standard"
          value={props.year}
          onChange={handleYearChange}
        >
          <MenuItem value="">- Semua -</MenuItem>
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Top3CustomerFilter