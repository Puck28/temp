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
import { changeCartItem, deleteCartItem, increaseCartItem, reduceCartItem } from '../../store/reducers/cartItem';
import { useAddItemMutation, useChangeItemMutation, useDeleteItemMutation, useReduceItemMutation } from '../../store/api/shopApi';
import { getUsedGuid } from '../../store/reducers/auth';
import { Input } from '@mui/material';

type Props = {
    item: Thing,
    count: number
}

export default function ItemCartCard({ item, count }: Props) {

    const dispatch = useAppDispatch()
    const usedGuid = useAppSelector(getUsedGuid)
    const [addItem] = useAddItemMutation()
    const [reduceItem] = useReduceItemMutation()
    const [deleteItem] = useDeleteItemMutation()
    const [changeItem] = useChangeItemMutation()
    const increaseItem = async () => {
        const state = await addItem({
            ProductId: item.Id,
            UserGuid: usedGuid
        }).unwrap()
        if(state.Name === 'Success')
            dispatch(increaseCartItem(item.Id))
        else
            alert('failed')
    }

    const reduce_item = async () => {
        const state = await reduceItem({
            ProductId: item.Id,
            UserGuid: usedGuid
        }).unwrap()
        if(state.Name === 'Success')
            dispatch(reduceCartItem(item.Id))
        else
            alert('failed')
        
    }

    const delete_item = async () => {
        const state = await deleteItem({
            ProductId: item.Id,
            UserGuid: usedGuid
        }).unwrap()
        if(state.Name === 'Success')
            dispatch(deleteCartItem(item.Id))
        else
            alert('failed')
        
    }

    const changeValue = async (e: any) => {
        const state = await changeItem({
            ProductId: item.Id,
            UserGuid: usedGuid,
            value: parseInt(e.target.value)
        }).unwrap()
        if(state.Name === 'Success')
            dispatch(changeCartItem({id: item.Id, value: parseInt(e.target.value)}))
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
            <Box sx={{ display: 'flex', width: '30%', flexDirection: 'column', padding: '0 8px 0 8px' }}>
                <Typography component="div" variant="h5" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                    { item.Name }
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '0 8px 0 8px' }}>
                <Typography component="div" variant="body1" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                    { item.Description }
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '200px', flexDirection: 'column', padding: '0 8px 0 8px' }}>
                <Typography component="div" variant="body1" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                    Salary: { item.Сurrency + " " + item.Price + " , " + item.DiscountedPrice}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '8px', justifyContent: 'right' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        Count: { count }
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={reduce_item}> - </Button>
                            <Input defaultValue={count} sx={{width: '38px', textAlign: 'center'}} onChange={changeValue}/>
                            <Button onClick={increaseItem}> + </Button>
                            <Button onClick={delete_item}><DeleteForeverIcon /></Button>
                        </ButtonGroup>       
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
