import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Thing, CartThing } from '../../type'

export interface Shop {
    cartItemCount: 0,
    cartItems: CartThing[],
    shopItems: Thing[] 
}

const initialState: Shop = {
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
        addCartItem: (state, action: PayloadAction<number>) => {
            const shopItem = state.shopItems.find(el => el.id === action.payload)
            if(shopItem)
                return { ...state, cartItems: [...state.cartItems, makeCartItem(shopItem)]}
            else 
                return state
        },
        deleteCartItem: (state, action: PayloadAction<number>) => {
            return {...state, cartItems: state.cartItems.filter(el => el.id !== action.payload)}
        },
        increaseCartItem: (state, action: PayloadAction<number>) => {
            return {...state, carItems: state.cartItems.map(el => {
                if(el.id === action.payload){
                    el.quantity = el.quantity + 1
                }
                return el
            })}      
        },
        reduceCartItem: (state, action: PayloadAction<number>) => {
            return {...state, carItems: state.cartItems.map(el => {
                if(el.id === action.payload){
                  el.quantity = el.quantity - 1
                  if(el.quantity){
                    el.quantity = el.quantity + 1
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
        quantity: 1
    }
}

const calcTotalPrice = (cartItems: CartThing[], shopItems: Thing[]): string => {
    const currency = shopItems ? shopItems[0].currency : "$"
    const totalPrice = cartItems.map(el => {
        const temp = shopItems.find(item => item.id === el.id);
        return temp ? temp.price * el.quantity : 0 
    }).reduce((price1, price2) => price1 + price2, 0)

    return currency + totalPrice
}

export const { 
    updateShopItems, 
    addCartItem, 
    deleteCartItem, 
    increaseCartItem, 
    reduceCartItem 
} = cartItem.actions

export const getAllShopItems = (state: RootState) => state.cartItem.shopItems
export const getAllCartItems = (state: RootState) => state.cartItem.cartItems
export const getTotalPrice = (state: RootState) => calcTotalPrice(state.cartItem.cartItems, state.cartItem.shopItems)

export default cartItem.reducer