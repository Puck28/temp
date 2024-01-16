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


const tempdata = {"LogoImg":"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","UsedGuid":"b8eaa083-e57b-484c-9723-595c82ecf477","UserName":"Тестов Тест Тестович"}

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
            // const initData = await getInit({}).unwrap()
            // dispatch(updateInitData(initData))
            dispatch(updateInitData(tempdata))
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