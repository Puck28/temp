import * as React from 'react'
import Box from '@mui/material/Box';
import BreadCrumb from '../../common/BreadCrumb';
import Grid from '@mui/material/Grid';
import ItemCartCard from '../../common/ItemCartCard';
import TotalView from '../../common/TotalView';
import { useAppSelector } from '../../store/hook';
import { getAllCartItems, getAllShopItems } from '../../store/reducers/cartItem';
import { CartThing, Thing } from '../../type';

export default function Cart(): JSX.Element {

    const shopItems = useAppSelector(getAllShopItems)
    const cartItems = useAppSelector(getAllCartItems)

    return(
        <Box component="main" sx={{ p: 4, flexGrow: 1 }} gap={4}>
            <BreadCrumb link='Cart' />
            <Box sx={{ p: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        {cartItems.map((el: CartThing) => {
                            const item = shopItems.find((item: Thing) => item.Id === el.id)
                            return item ? <Grid item ><ItemCartCard key={el.id} item={item} count={el.quantity} /></Grid> : null                                
                        })}
                    </Grid>
                    <Grid item xs={4}>
                        <TotalView />
                    </Grid>
                </Grid>                
            </Box>
        </Box>
    )
}