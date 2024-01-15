import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Thing } from '../../type';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { deleteCartItem, increaseCartItem, reduceCartItem } from '../../store/reducers/cartItem';
import { useDeleteItemMutation } from '../../store/api/shopApi';
import { getUserGUID } from '../../store/reducers/auth';

type Props = {
    item: Thing,
    count: number
}

export default function ItemCartCard({ item, count }: Props) {

    const dispatch = useAppDispatch()
    const userGUID = useAppSelector(getUserGUID)

    const increaseItem = () => {
        dispatch(increaseCartItem(item.id))
    }

    const reduceItem = () => {
        dispatch(reduceCartItem(item.id))
    }

    const deleteItem = async () => {
        await useDeleteItemMutation({
            productId: item.id,
            userGUID: userGUID
        });
        dispatch(deleteCartItem(item.id))
    }

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ item.images[0].image }
                alt={ item.images[0].file_name + item.images[0].file_extension }
            />
            <Box sx={{ display: 'flex', width: '30%', flexDirection: 'column', padding: '0 8px 0 8px' }}>
                <Typography component="div" variant="h5" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                    { item.name }
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '0 8px 0 8px' }}>
                <Typography component="div" variant="body1" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                    { item.description }
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '200px', flexDirection: 'column', padding: '0 8px 0 8px' }}>
                <Typography component="div" variant="body1" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                    Salary: { item.currency + item.price + " , " + item.discounted_price}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '8px', justifyContent: 'right' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        Count: { count }
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={reduceItem}> - </Button>
                            <Button onClick={increaseItem}> + </Button>
                            <Button onClick={deleteItem}><DeleteForeverIcon /></Button>
                        </ButtonGroup>       
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
