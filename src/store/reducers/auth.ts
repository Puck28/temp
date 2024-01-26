import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { InitData } from '../../type'

type AuthState = {
    LogoImg: string,
    UsedGuid: string,
    UserName: string,
    isAuth: boolean
}

const initialState: AuthState = {
    LogoImg: "",
    UsedGuid: "",
    UserName: "",
    isAuth: false
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState: (state, action: PayloadAction<boolean>) => {
            return {...state, isAuth: action.payload}
        },
        updateInitData: (state, action: PayloadAction<InitData>) => {
            return {...state, ...action.payload}
        }
    }
})

export const { 
    updateAuthState,
    updateInitData
} = auth.actions

export const getAuthState = (state: RootState) => state.auth.isAuth
export const getUsedGuid = (state: RootState) => state.auth.UsedGuid
export const getUserName = (state: RootState) => state.auth.UserName
export const getLogoImg = (state: RootState) => state.auth.LogoImg

export default auth.reducer
