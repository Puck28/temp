import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

type AuthState = {
    userGUID: string,
    isAuth: boolean
}

const initialState: AuthState = {
    userGUID: "",
    isAuth: false
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState: (state, action: PayloadAction<boolean>) => {
            return {...state, isAuth: action.payload}
        },
    }
})

export const { 
    updateAuthState
} = auth.actions

export const getAuthState = (state: RootState) => state.auth.isAuth
export const getUserGUID = (state: RootState) => state.auth.userGUID

export default auth.reducer
