import { apiSlice } from './baseApi'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation({
            query: (credentials) => ({
                url: '/getItems',
                method: 'GET'
            }),
        })
    }),
})

export const { 
    useGetUserMutation
} = userApi