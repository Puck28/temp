import { apiSlice } from './baseApi'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (integer) => ({
                url: `/Admin/create?value=${integer}`,
                method: 'POST'  
            }),
        })
    }),
})

export const { 
    useCreateUserMutation
} = userApi