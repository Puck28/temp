import { apiSlice } from './baseApi'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: () => ({
                url: '/Admin/create',
                method: 'POST'
            }),
        })
    }),
})

export const { 
    useCreateUserMutation
} = userApi