import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { cartItemReducer } from './reducers'
import { apiSlice } from './api/baseApi'

export const store = configureStore({
    reducer: { 
        [apiSlice.reducerPath]: apiSlice.reducer,
        cartItem: cartItemReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>