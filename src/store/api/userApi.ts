import { apiSlice } from './baseApi'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (integer) => ({
                url: '/Admin/create',
                method: 'POST',
                body: integer  
            }),
        })
    }),
})

export const { 
    useCreateUserMutation
} = userApi