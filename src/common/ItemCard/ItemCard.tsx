import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

import { Thing } from '../../type';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addCartItem } from '../../store/reducers/cartItem';
import { getUsedGuid } from '../../store/reducers/auth';
import { useAddItemMutation } from '../../store/api/shopApi';

type Props = {
    item: Thing
}

export default function ItemCard({ item }: Props) {
    const dispatch = useAppDispatch()
    const usedGuid = useAppSelector(getUsedGuid)
    const [addItem] = useAddItemMutation()
    const add_cartItem = async () => {
        const state = await addItem({
            ProductId: item.Id,
            UserGuid: usedGuid
        }).unwrap()
        if(state.Name === 'Success')
            dispatch(addCartItem(item.Id))
        else
            alert('failed')
    }

    return (
        <Card sx={{ display: 'flex', marginBottom: '8px' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ `data:image/png;base64,${item.Images[0].Image}` }
                alt={ item.Images[0].FileName + item.Images[0].FileExtension }
            />
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        { item.Name }
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        { item.Description }
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        { item.Сurrency + " " + item.Price + " , " }<span style={{textDecoration: 'line-through'}}>{item.DiscountedPrice}</span>
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', p: 1 }}>
                    <Button variant="contained" onClick={add_cartItem} >Place an Order</Button>
                </Box>
            </Box>
        </Card>
    );
}
