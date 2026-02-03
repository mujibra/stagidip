/* eslint-disable camelcase */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import axios from 'axios';

function UserMenu(props) {
  const getAccessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };
  // console.log(config, 'config');
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };
  // console.log(user_info, 'user_info');
  let name;

  const userRoles = user_info ? user_info[0].roles : null;
  if (userRoles === 'SUPER_ADMIN') {
    name = 'SA';
  } else if (userRoles === 'ADMIN') {
    name = 'AD';
  } else if (userRoles === 'SUPERVISOR') {
    name = 'SPV';
  } else if (userRoles === 'OPERATOR_DIP') {
    name = 'DIP';
  } else if (userRoles === 'OPERATOR_MOVER') {
    name = 'MOVER';
  } else if (userRoles === 'OPERATOR_TSS') {
    name = 'TSS';
  } else if (userRoles === 'GUEST_DIP') {
    name = 'Guest DIP';
  } else if (userRoles === 'GUEST') {
    name = 'Guest';
  } else if (userRoles === 'GUEST_RELATED') {
    name = 'Guest Related';
  } else if (userRoles === 'GUEST_BANK') {
    name = 'BANK';
  }

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {/* {user.data.displayName} */}
            {name}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="textSecondary">
            {user.role.toString()}
            {/* {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guestttt'} */}
            {user_info ? user_info[0]?.name : ''}
          </Typography>
        </div>

        {user.data.photoURL ? (
          <Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user?.role || user?.role?.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button" onClick={handleLogout}>
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
            {/* <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register2" />
            </MenuItem> */}
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
