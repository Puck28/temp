import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import Link from '@mui/material/Link';
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
                        sx={{ hrght: 60 }}
                        image={ logo }
                        alt='logo'
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{color: 'white'}} onClick={createAdmin}>
                            <Typography
                              variant="h6"
                              noWrap
                              component="div"
                              sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                            >
                                Create Admin
                            </Typography>
                        </Button>
                        <Button sx={{color: 'white'}}>
                            <Typography
                              variant="h6"
                              noWrap
                              component="div"
                              sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                            >
                                <Link href="/" sx={{color: 'white'}}>Shop</Link>
                              
                            </Typography>
                        </Button>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            {
                                totalCount > 0 ?
                                    <Badge badgeContent={totalCount} color="error">
                                        <Link href='/cart' sx={{color: 'white'}}>
                                            <AddShoppingCartIcon />
                                        </Link>
                                    </Badge> :
                                    <Link href='/cart' sx={{color: 'white'}}>
                                        <AddShoppingCartIcon />
                                    </Link>
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
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}