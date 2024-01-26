import * as React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Box,
    Typography
} from '@mui/material'

export default function Error(): JSX.Element {
    return(
        <Box sx={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h4" component="h4" sx={{color: 'red', textAlign: 'center'}}>
                This is Error Page
            </Typography>
            <NavLink to={'/'}>Return Home</NavLink>
        </Box>
    )
}