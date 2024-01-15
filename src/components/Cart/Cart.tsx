import * as React from 'react'
import Box from '@mui/material/Box';
import BreadCrumb from '../../common/BreadCrumb';
import Grid from '@mui/material/Grid';
import ItemCartCard from '../../common/ItemCartCard';
import TotalView from '../../common/TotalView';

export default function Cart(): JSX.Element {
    return(
        <Box component="main" sx={{ p: 4, flexGrow: 1 }} gap={4}>
            <BreadCrumb link='Cart' />
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <ItemCartCard />
                    </Grid>
                    <Grid item xs={4}>
                        <TotalView />
                    </Grid>
                </Grid>                
            </Box>
        </Box>
    )
}