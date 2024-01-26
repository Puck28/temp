import * as React from 'react';
import {
    Box, 
    CircularProgress
} from '@mui/material';

export default function Loading(): JSX.Element {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
          <CircularProgress />
        </Box>
    );
}
