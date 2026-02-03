/* eslint-disable prettier/prettier */
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  List,
//   ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
//   ListItemText,
} from '@mui/material';
// import { Scrollbars } from 'react-custom-scrollbars';
// import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflow: "auto", // atur overflow agar daftar dapat di-scroll
    maxHeight: "300px",
    backgroundColor: theme.palette.background.paper,
  },
  scrollbar: {
    '& .thumb-vertical': {
      backgroundColor: theme.palette.primary.main, // atur warna thumb scrollbar
      borderRadius: '4px',
    },
  },
  textList: {
    fontWeight: 'bold',
  },
}));

const NumberCustomerOrder = () => {
  const classes = useStyles();
  const listData = [
    { id: 1, unit: 1200, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BCA' },
    { id: 2, unit: 1200, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BNI' },
    { id: 3, unit: 1300, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BRI' },
    { id: 4, unit: 1000, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'MANDIRI ' },
    { id: 5, unit: 1200, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BANK JATENG' },
    { id: 6, unit: 1200, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'OCBC NISP' },
    { id: 7, unit: 1300, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BJB' },
    { id: 8, unit: 1000, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BTN' },
  ];

  return (
    <Card className={classes.root}>
    <Typography className="m-20 text-17 text-center" color="textSecondary">
        <b>Number Customer Orders</b>
    </Typography>
      {/* <Scrollbars autoHide className={clsx('w-full', classes.scrollbar)}> */}
      <CardContent>
        <List>
          {listData.map((item) => (
            <div key={item.id}>
              <div className="flex flex-cols-2 justify-between items-center mt-20">
                <div className="flex items-center justify-start">
                  <ListItemAvatar>
                    <Avatar alt={item.bank_desc} src={item.imgUrl} />
                  </ListItemAvatar>
                  <p className='font-normal text-md'>
                  {item.bank_desc}
                  </p>
                </div>
                <div className="flex gap-6 items-center justify-end">
                  <p className="text-right flex font-semibold">{item.unit}</p>
                  <p className="text-right flex">Machine</p>
                </div>
              </div>
            </div>
          ))}
        </List>
      </CardContent>
      {/* </Scrollbars> */}
    </Card>
  );
};

export default NumberCustomerOrder;
