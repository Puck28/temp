import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Typography from '@mui/material/Typography/Typography'

import Header from '../Header'
import Footer from '../Footer'
import { useAppSelector } from '../../store/hook'
import { getAuthState } from '../../store/reducers/auth'
export default function Layout(): JSX.Element {

    const isAuth = useAppSelector(getAuthState)

    return(
        <>
            <Header />
            {
                isAuth ?   (<section><Outlet /></section>) : (<Typography variant="h4" component="h4" sx={{color: 'red', textAlign: 'center', marginTop: '200px'}}>Need to create Admin account</Typography>)
            }           
            <Footer />
        </>
    )
}