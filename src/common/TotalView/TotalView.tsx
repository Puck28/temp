import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getAllCartItems, getAllShopItems, getPromoCode, getPromoState, getTotalPrice, updatePromoCode, updatePromoState } from '../../store/reducers/cartItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Input from '@mui/material/Input';
import { getUsedGuid } from '../../store/reducers/auth';
import { useSendDiscountMutation } from '../../store/api/shopApi';

export default function TotalView(): JSX.Element {

    const dispatch = useAppDispatch()
    const [sendDiscount] = useSendDiscountMutation()
    const totalPrice = useAppSelector(getTotalPrice)
    const promoState = useAppSelector(getPromoState)
    const promoCode = useAppSelector(getPromoCode)
    const usedGuid = useAppSelector(getUsedGuid)
    const sendPromoCode = async () => {
        const state = await sendDiscount({DiscountName: promoCode, UsedGuid: usedGuid}).unwrap()
        if(state.Name === 'Success')
            dispatch(updatePromoState(true))
    }

    const changePromoCode = async (e: any) => {
        dispatch(updatePromoCode(e.target.value))
    }

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
                <Grid item xs={6}>
                    <Typography variant='body1' component="span" align='left' sx={{justifyContent: 'center', alignContent: 'center'}}> 
                        Promo Code: 
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{textAlign: 'right'}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Input sx={{height: '40px'}} onChange={changePromoCode} inputProps={{style: {height: '40px', textAlign: 'center'}}} disabled={promoState} />
                        <Button onClick={sendPromoCode} disabled={promoState}> Apply </Button>
                    </ButtonGroup>       
                </Grid>
            </Grid>
            <hr />
            <Box textAlign={'center'}>
                <Button variant="contained" fullWidth>Checkout</Button>
            </Box>
        </Card>
    );
}
