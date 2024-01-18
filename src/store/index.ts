import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { authReducer, cartItemReducer } from './reducers'
import { apiSlice } from './api/baseApi'

export const store = configureStore({
    reducer: { 
        [apiSlice.reducerPath]: apiSlice.reducer,
        cartItem: cartItemReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>