import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../store/hook';
import { getAllCartItems, getAllShopItems, getTotalPrice } from '../../store/reducers/cartItem';

export default function TotalView(): JSX.Element {

    const totalPrice = useAppSelector(getTotalPrice)

    return (
        <Card variant="outlined" sx={{p: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant='body1' component="span" align='left'> 
                        Total: 
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{textAlign: 'right'}}>
                    <Typography variant='body1' component="span" align='left'> 
                        { totalPrice }
                    </Typography>
                </Grid>
            </Grid>
            <hr />
            <Box textAlign={'center'}>
                <Button variant="contained" fullWidth>Checkout</Button>
            </Box>
        </Card>
    );
}
