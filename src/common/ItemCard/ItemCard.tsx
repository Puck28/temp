import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Thing } from '../../type';
import { useAppDispatch } from '../../store/hook';
import { addCartItem } from '../../store/reducers/cartItem';

type Props = {
    item: Thing
}

export default function ItemCard({ item }: Props) {
    const dispatch = useAppDispatch()

    const addItem = () => {
        dispatch(addCartItem(item.id))
    }

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ item.images[0].image }
                alt={ item.images[0].file_name + item.images[0].file_extension }
            />
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        { item.name }
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        { item.description }
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        { item.currency + item.price + " , " + item.discounted_price }
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', p: 1 }}>
                    <Button variant="contained" onClick={addItem} >Place an Order</Button>
                </Box>
            </Box>
        </Card>
    );
}
