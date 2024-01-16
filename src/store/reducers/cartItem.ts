import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Thing, CartThing, CartChangePayload } from '../../type'

export interface Shop {
    cartItems: CartThing[],
    shopItems: Thing[] 
}

const initialState: Shop = {
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
            const shopItem = state.shopItems.find(el => el.Id === action.payload)
            const cartItem = state.cartItems.find(el => el.id === action.payload)
            if(cartItem){
                return {...state, carItems: state.cartItems.map(el => {
                    if(el.id === action.payload){
                        return {...el, quantity: el.quantity + 1}
                    }
                    return el
                })}    
            }
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
                    return {...el, quantity: el.quantity + 1}
                }
                return el
            })}      
        },
        reduceCartItem: (state, action: PayloadAction<number>) => {
            return {...state, carItems: state.cartItems.map(el => {
                if(el.id === action.payload){
                    return {...el, quantity: (el.quantity - 1) > 0 ? (el.quantity - 1) : 1}
                }
                return el
            })}      
        },
        changeCartItem: (state, action: PayloadAction<CartChangePayload>) => {
            return {...state, carItems: state.cartItems.map(el => {
                if(el.id === action.payload.id){
                  el.quantity = action.payload.value
                }
                return el
            })}
        }
    },
})

const makeCartItem = (item: Thing): CartThing => {
    return {
        id: item.Id,
        quantity: 1
    }
}

const calcTotalPrice = (cartItems: CartThing[], shopItems: Thing[]): string => {
    const currency = shopItems[0] ? shopItems[0].Сurrency : "$"
    const totalPrice = cartItems.map(el => {
        const temp = shopItems.find(item => item.Id === el.id);
        return temp ? (temp.Price * el.quantity) : 0 
    }).reduce((price1, price2) => price1 + price2, 0)

    return currency + totalPrice
}

export const { 
    updateShopItems, 
    addCartItem, 
    deleteCartItem, 
    increaseCartItem, 
    reduceCartItem,
    changeCartItem
} = cartItem.actions

export const getAllShopItems = (state: RootState) => state.cartItem.shopItems
export const getAllCartItems = (state: RootState) => state.cartItem.cartItems
export const getTotalPrice = (state: RootState) => calcTotalPrice(state.cartItem.cartItems, state.cartItem.shopItems)
export const getTotalCount = (state: RootState) => state.cartItem.cartItems.length

export default cartItem.reducer