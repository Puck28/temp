import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

type Thing = {
  id: string
  count: number
}

type CartThing = {
  id: string
  count: number
}

export interface CounterState {
  cartItemCount: 0,
  cartItems: CartThing[],
  shopItems: Thing[] 
}

const initialState: CounterState = {
  cartItemCount: 0,
  cartItems: [],
  shopItems: []
}

export const cartItem = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    updateShopItems: (state, action: PayloadAction<Thing[]>) => {
      return {...state, shopItems: action.payload}
    },
    addCartItem: (state, action: PayloadAction<string>) => {
      const shopItem = state.shopItems.find(el => el.id === action.payload)
      if(shopItem)
        return { ...state, cartItems: [...state.cartItems, makeCartItem(shopItem)]}
      else 
        return state
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      return {...state, cartItems: state.cartItems.filter(el => el.id !== action.payload)}
    },
    increaseCartItem: (state, action: PayloadAction<string>) => {
      return {...state, carItems: state.cartItems.map(el => {
        if(el.id === action.payload){
          el.count = el.count + 1
        }
        return el
      })}      
    },
    reduceCartItem: (state, action: PayloadAction<string>) => {
      return {...state, carItems: state.cartItems.map(el => {
        if(el.id === action.payload){
          el.count = el.count - 1
          if(el.count){
            el.count = el.count + 1
          }
        }
        return el
      })}      
    },
  },
})

const makeCartItem = (item: Thing): CartThing => {
  
  return {
    id: item.id,
    count: 1
  }
}

export const { 
  updateShopItems, 
  addCartItem, 
  deleteCartItem, 
  increaseCartItem, 
  reduceCartItem 
} = cartItem.actions

export const getAllShopItems = (state: RootState) => state.cartItem.shopItems

export default cartItem.reducer