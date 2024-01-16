import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api`,
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('mode', 'no-cors');
        return headers
    },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
})
