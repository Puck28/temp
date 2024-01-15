import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Error(): JSX.Element {
    return(
        <Box sx={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h4" component="h4" sx={{color: 'red', textAlign: 'center'}}>
                This is Error Page
            </Typography>
            <Link href='/'> return Home</Link>
        </Box>
    )
}