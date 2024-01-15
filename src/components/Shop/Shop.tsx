import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import BreadCrumb from '../../common/BreadCrumb';
import ItemCard from '../../common/ItemCard';
import Grid from '@mui/material/Grid';
import TotalView from '../../common/TotalView';
import { useAppDispatch } from '../../store/hook';
import { getAllShopItems } from '../../store/reducers/cartItem';

export default function Shop(): JSX.Element {

    const dispatch = useAppDispatch()

    const shopItems = dispatch(getAllShopItems)

    useEffect(() => {
        const fetchData = async () => {
            // await 
        }
    }, [])

    return(
        <>
            <Box component="main" sx={{ p: 4, flexGrow: 1 }} gap={4}>
                <BreadCrumb link='Shop' />
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <ItemCard />
                        </Grid>
                        <Grid item xs={4}>
                            <TotalView />
                        </Grid>
                    </Grid>                
                </Box>
            </Box>
        </>
    )
}