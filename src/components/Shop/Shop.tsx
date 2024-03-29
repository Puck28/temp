import React, { useEffect } from 'react'
import {
    Box,
    Grid
} from '@mui/material';

import BreadCrumb from '../../common/BreadCrumb';
import ItemCard from '../../common/ItemCard';
import TotalView from '../../common/TotalView';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getAllShopItems, updateShopItems } from '../../store/reducers/cartItem';
import { useGetItemsMutation } from '../../store/api/shopApi';
import { Thing } from '../../type';
import { getAuthState } from '../../store/reducers/auth';

export default function Shop(): JSX.Element {

    const dispatch = useAppDispatch()

    const shopItems = useAppSelector(getAllShopItems)
    const isAuth = useAppSelector(getAuthState)
    const [getItems] = useGetItemsMutation()

    useEffect(() => {
        const fetchData = async () => {
            const items = await getItems({}).unwrap()
            dispatch(updateShopItems(items))
        }
        if(isAuth)
            fetchData()
    }, [isAuth])

    return(
        <>
            <Box component="main" sx={{ p: 4, flexGrow: 1 }} gap={4}>
                <BreadCrumb link='Shop' />
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={8}>
                            {shopItems.map((el: Thing) =><ItemCard key={el.Id} item={el} />)}
                        </Grid>
                        <Grid item xs={4}>
                            <TotalView />
                            test
                        </Grid>
                    </Grid>                
                </Box>
            </Box>
        </>
    )
}