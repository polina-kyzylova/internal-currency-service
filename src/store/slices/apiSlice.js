import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { redirect } from "react-router-dom";

const url = `http://188.225.36.233`;
const buildApiUrl = (endpoint) => `${url}${endpoint}`;

let isRefreshing = false;    // Flag to indicate if token refresh is in progress
let refreshPromise = null;   // To hold the refresh token promise


/* ---------- BASE AUTH QUERY ---------- */
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: async headers => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers
  }
});


/* ---------- REFRESH AUTH QUERY ---------- */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  //if (result.error && result.error.status === 401) {
  if (result.error) {
    if (!isRefreshing) {
      isRefreshing = true // Indicate refresh is in progress
      const refreshToken = localStorage.getItem('refreshToken');

      refreshPromise = Promise.resolve(
        baseQuery({
          url: `/users/me/refresh-token`,
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
          body: { token: localStorage.getItem('refreshToken') },
        },
          api,
          extraOptions
        )
      )
        .then(refreshResult => {
          if (refreshResult.data) {
            const refreshTokenResult = refreshResult.data

            // Store the new tokens
            localStorage.setItem('accessToken', refreshTokenResult.data.accessToken)
            localStorage.setItem('refreshToken', refreshTokenResult.data.refreshToken)
            isRefreshing = false // Reset the flag
            return refreshTokenResult
          } else {
            // Handle refresh error
            isRefreshing = false // Ensure flag is reset for future requests
            //if (refreshResult?.error?.status === 500) {
            if (refreshResult?.error?.status === 300) {
              localStorage.setItem("accessToken", null);
              localStorage.setItem("refreshToken", null);
              window.location.reload(true)
              redirect('/')
            }
            return null
          }
        })
        .catch((error) => {
          console.error('Error refreshing token', error)
          isRefreshing = false // Reset flag on error
        })
    }
    await refreshPromise // Wait for the refresh token request to complete
    result = await baseQuery(args, api, extraOptions) // Retry the initial query
  }
  return result
}
export const { } = baseQueryWithReauth




/* ---------- QUERIES SLICE ---------- */
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    get: builder.query({
      queryFn: async (endpoint, _quryApi, _options, fetchBaseQuery) => {
        let res = await fetchBaseQuery(`${endpoint}`);
        if (res.data) {
          console.log("SUCCESS:", res);
          return { data: res.data };
        } else {
          res.endpointAddress = endpoint;
          console.log("ERROR:", res);
          return { error: res };
        }
      },
    }),
    getQuery: builder.mutation({
      query: (endpoint) => ({
        url: endpoint,
        method: 'GET',
      }),
    }),
    postQuery: builder.mutation({
      query: ({ endpoint, body }) => ({
        url: endpoint,
        method: 'POST',
        body: JSON.stringify(body),
      })
    }),
  }),
});


export const {
  useGetQuery,
  useGetQueryMutation,
  usePostQueryMutation,
} = apiSlice;
export { url, buildApiUrl as buildUrl };
