import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signout } from '../redux/authSlice';
import { fetchUser } from '../redux/userSlice';
import { fetchProfile } from '../redux/profileSlice';
import { fetchCompanyInfor } from '../redux/companySlice';


const MyAppBar = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const auth = useSelector((state) => state.auth);

    const user = useSelector((state) => state.user);
    
    const handleMenu = (event) => {
        dispatch(fetchUser(auth.auth.access_token));
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickLogo = () => {
        navigate('/')
        window.location.reload();
    }

    const handleClickProfile = () => {
        if (user.user.role === 'USER') {
            dispatch(fetchProfile())
            navigate('/profile');
        } else if (user.user.role === 'COMPANY') {
            dispatch(fetchCompanyInfor(user.user.user_id))
            navigate('/');
        }
    };

    const handleClickDashboard = () => {
        if (user.user.role === 'USER') {
            dispatch(fetchProfile())
            navigate('/dashboard')
        } else if (user.user.role === 'COMPANY') {
            dispatch(fetchCompanyInfor(user.user.user_id))
            console.log(user.user_id)
            navigate('/company-dashboard')
        }
    };

    const handleClickLogout = async (event) => {
        event.preventDefault();
        dispatch(signout(auth.auth.access_token))
        .unwrap()
        .then(() => {
            navigate('/')
            window.location.reload();
        })

    };

    return (
        <>
        <AppBar placement="top-start" sx={{ top:0, bgcolor: 'rgb(33,5,5)'}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Button 
                    color='inherit' 
                    sx={{ bgcolor: 'red', 
                    padding: '10px 30px 10px',
                    "&:hover": {
                        bgcolor: '#3d5afe'
                    }
                }}
                    onClick={handleClickLogo}
                >
                    <ScreenSearchDesktopIcon />
                    <Typography pl={1}>IT-JOB</Typography>
                </Button>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/employer">
                        For Employers
                    </Button>
                    {!auth.auth && (
                        <Button color="inherit" component={Link} to="/signin">
                            Signin/Signup
                        </Button>
                    )}
                    {auth.auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleClickDashboard}>Dashboard</MenuItem>
                                <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default MyAppBar