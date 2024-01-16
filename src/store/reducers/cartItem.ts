import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Thing, CartThing, CartChangePayload } from '../../type'

export interface Shop {
    promoCode: string,
    promoState: boolean,
    cartItems: CartThing[],
    shopItems: Thing[] 
}

const initialState: Shop = {
    promoCode: "",
    promoState: false,
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
                return {...state, cartItems: state.cartItems.map(el => {
                    if(el.id === action.payload){
                        return {...el, quantity: el.quantity + 1}
                    }else {
                        return el
                    }
                    
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
            return {...state, cartItems: state.cartItems.map(el => {
                if(el.id === action.payload){
                    return {...el, quantity: el.quantity + 1}
                }
                else{
                    return el
                }
            })}      
        },
        reduceCartItem: (state, action: PayloadAction<number>) => {
            return {...state, cartItems: state.cartItems.map(el => {
                if(el.id === action.payload){
                    return {...el, quantity: (el.quantity - 1) > 0 ? (el.quantity - 1) : 1}
                }
                else {
                    return el
                }
            })}      
        },
        changeCartItem: (state, action: PayloadAction<CartChangePayload>) => {
            return {...state, cartItems: state.cartItems.map(el => {
                if(el.id === action.payload.id){
                    return {...el, quantity: action.payload.value > 0 ? action.payload.value : 1}
                }
                else{
                    return el
                }
            })}
        },
        updatePromoCode: (state, action: PayloadAction<string>) => {
            return {...state, promoCode: action.payload}
        },
        updatePromoState: (state, action: PayloadAction<boolean>) => {
            return {...state, promoState: action.payload}
        },
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

    return currency + " " + (Math.round(totalPrice * 100) / 100)
}

export const { 
    updateShopItems, 
    addCartItem, 
    deleteCartItem, 
    increaseCartItem, 
    reduceCartItem,
    changeCartItem,
    updatePromoCode,
    updatePromoState
} = cartItem.actions

export const getAllShopItems = (state: RootState) => state.cartItem.shopItems
export const getAllCartItems = (state: RootState) => state.cartItem.cartItems
export const getTotalPrice = (state: RootState) => calcTotalPrice(state.cartItem.cartItems, state.cartItem.shopItems)
export const getTotalCount = (state: RootState) => state.cartItem.cartItems.length
export const getPromoCode = (state: RootState) => state.cartItem.promoCode
export const getPromoState = (state: RootState) => state.cartItem.promoState

export default cartItem.reducer