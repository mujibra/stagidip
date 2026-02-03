// import Icon from '@mui/material/Icon';
// import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

/* eslint-disable import/prefer-default-export */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const CardChartDummy = (props) => {
  const data = [
    { name: 'G-5600', nilai: '97.550' },
    { name: 'MX-5600', nilai: '78.760' },
    { name: 'MX-5600S', nilai: '20.300' },
    { name: 'MX-8600S', nilai: '17.543' },
    { name: 'MX-8600', nilai: '79.680' },
    { name: 'MS-500', nilai: '54.115' },
    { name: 'BS-B200', nilai: '53.891' },
    { name: 'MX-9100', nilai: '77.973' },
    { name: 'MV-400', nilai: '104.774' },
    { name: 'CDUT', nilai: '123.632' },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      overflow: 'auto', // atur overflow agar daftar dapat di-scroll
      maxHeight: '300px',
      backgroundColor: theme.palette.background.paper,
    },
    scrollbar: {
      '& .thumb-vertical': {
        backgroundColor: theme.palette.primary.main, // atur warna thumb scrollbar
        borderRadius: '4px',
      },
    },
  }));

  return (
    <div className={useStyles.root}>
      <h2 className="text-gray-600 mb-10 text-xs font-medium uppercase tracking-wide">
        Total: 350.000 Machine
      </h2>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <li key={item.name} className="col-span-1 flex shadow-sm rounded-md">
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <p className="text-gray-800 font-semibold text-md">{item.nilai}</p>
                <p className="text-gray-700 font-normal text-xs mt-4">{item.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
