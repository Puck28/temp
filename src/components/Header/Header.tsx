import React, { useEffect  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
    AppBar,
    Badge,
    Button,
    Box,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,

} from '@mui/material';

import { useGetInitMutation } from '../../store/api/shopApi';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getLogoImg, getUserName, updateAuthState, updateInitData } from '../../store/reducers/auth';
import { useCreateUserMutation } from '../../store/api/userApi';
import { getTotalCount } from '../../store/reducers/cartItem';

export default function Header(): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [getInit] = useGetInitMutation()
    const [createUser] = useCreateUserMutation()
    const isMenuOpen = Boolean(anchorEl);
    const dispatch = useAppDispatch()
    const logo = useAppSelector(getLogoImg)
    const username = useAppSelector(getUserName)
    const totalCount = useAppSelector(getTotalCount)
    
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const createAdmin = async () => {
        const state = await createUser(1).unwrap()
        if(state)
            dispatch(updateAuthState(true))
    }

    useEffect(() => {
        const fetchUser = async () => {
            const initData = await getInit({}).unwrap()
            dispatch(updateInitData(initData))
        }
      
        fetchUser()
    }, [])

    useEffect(() => {
        createAdmin()
    }, [])
    

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <CardMedia
                        component="img"
                        sx={{ height: 60, width: 100 }}
                        image={ `data:image/png;base64,${logo}` }
                        alt='logo'
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{color: 'white'}}>
                            <Typography
                              variant="h6"
                              noWrap
                              component="div"
                              sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', color: 'white' }}
                            >
                                <NavLink to="/" style={{color: 'white', textDecoration: 'none'}}>Shop</NavLink>
                              
                            </Typography>
                        </Button>
                        <IconButton size="large" sx={{color: 'white'}}>
                            {
                                totalCount > 0 ?
                                    <Badge badgeContent={totalCount} color="error">
                                        <NavLink to='/cart' style={{color: 'white'}}>
                                            <AddShoppingCartIcon />
                                        </NavLink>
                                    </Badge> :
                                    <NavLink to='/cart' style={{color: 'white'}}>
                                        <AddShoppingCartIcon />
                                    </NavLink>
                            }
                        </IconButton>
                        <IconButton
                          size="large"
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={handleProfileMenuOpen}
                          color="inherit"
                        >
                            <AccountCircle />
                            { username }
                            This is Header part
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}