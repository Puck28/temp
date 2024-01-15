import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ItemCartCard() {
  return (
    <Card sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', width: '30%', flexDirection: 'column', padding: '0 8px 0 8px' }}>
            <Typography component="div" variant="h5" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                Live From Space
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '0 8px 0 8px' }}>
            <Typography component="div" variant="body1" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                Live From Space
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '200px', flexDirection: 'column', padding: '0 8px 0 8px' }}>
            <Typography component="div" variant="body1" sx={{ marginTop: 'auto', marginBottom: 'auto'}}>
                Salary: $455
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '8px', justifyContent: 'right' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    Count: 1
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button> - </Button>
                        <Button> + </Button>
                        <Button><DeleteForeverIcon /></Button>
                    </ButtonGroup>       
                </Grid>
            </Grid>
        </Box>
    </Card>
  );
}
