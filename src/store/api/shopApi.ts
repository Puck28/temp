import { apiSlice } from './baseApi'

export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.mutation({
            query: (credentials) => ({
                url: '/getItems',
                method: 'POST',
                body: credentials,
            }),
        }),
        getCategories: builder.mutation({
            query: (credentials) => ({
                url: '/getCategories',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { 
    useGetCategoriesMutation,
    useGetItemsMutation
} = shopApi