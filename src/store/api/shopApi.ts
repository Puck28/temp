import { apiSlice } from './baseApi'

export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.mutation({
            query: () => ({
                url: '/ShoppingCart/products',
                method: 'GET'
            }),
        }),
        deleteItem: builder.mutation({
            query: (data: string) => ({
                url: '/ShoppingCart/products',
                method: 'DELETE',
                body: data 
            }),
        }),

    }),
})

export const { 
    useGetItemsMutation,
    useDeleteItemMutation
} = shopApi