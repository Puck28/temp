import { CartItemChangePayload, CartItemPayload } from '../../type'
import { apiSlice } from './baseApi'

export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInit: builder.mutation({
            query: () => ({
                url: '/ShoppingCart/header',
                method: 'GET'
            })
        }),
        getItems: builder.mutation({
            query: () => ({
                url: '/ShoppingCart/products',
                method: 'GET'
            }),
        }),
        deleteItem: builder.mutation({
            query: (data: CartItemPayload) => ({
                url: '/ShoppingCart/products',
                method: 'DELETE',
                body: data 
            }),
        }),
        addItem: builder.mutation({
            query: (data: CartItemPayload) => ({
                url: '/ShoppingCart/quantityinc',
                method: 'POST',
                body: data 
            }),
        }),
        reduceItem: builder.mutation({
            query: (data: CartItemPayload) => ({
                url: '/ShoppingCart/quantitydec',
                method: 'POST',
                body: data 
            }),
        }),
        changeItem: builder.mutation({
            query: (data: CartItemChangePayload) => ({
                url: '/ShoppingCart/changequantity',
                method: 'POST',
                body: data 
            }),
        }),
    }),
})

export const { 
    useGetInitMutation,
    useGetItemsMutation,
    useDeleteItemMutation,
    useAddItemMutation,
    useReduceItemMutation,
    useChangeItemMutation
} = shopApi