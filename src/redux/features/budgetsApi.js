import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import getBaseUrl from "../../utils/getBaseUrl"



const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: 'include'
})

const budgetsApi = createApi({
    reducerPath: "budgetsApi",
    baseQuery,
    tagTypes: ["Budgets"],
    endpoints: (builder) => ({
        fetchAllBudgets: builder.query({
            query: () => "/budgets",
            providesTags: ["Budgets"]
        }),
        fetchBudgetById: builder.query({
            query: (id) => `/budget/${id}`,
            providesTags: (result, error, id) => [{type: "Budgets", id}]
        }),

        addBudget: builder.mutation({
            query: ({ name, description, amount, category, startDate, userEmail, endDate, userId }) => ({
                url: "/create-budget",
                method: "POST",
                body: { name, description, amount, category, startDate, endDate, userEmail , userId },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Budgets"],
        }),
        
       updateBudget: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit-budget/${id}`,
                method: "PUT",
                body: {
                    ...rest,
                    updatedAt: new Date().toISOString(), // Add updatedAt to ensure the field gets updated
                  },
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["Budgets"]
       }),
       deleteBudget: builder.mutation({
        query: ({ id, userId }) => ({
            url: `/delete-budget/${id}?userId=${userId}`, // Send userId as a query param
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }),
        invalidatesTags: ["Budgets"], // Ensures UI updates after deletion
    }),
    
    
       })
    })




export const {
    useFetchAllBudgetsQuery,
    useFetchBudgetByIdQuery,
    useAddBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation
} = budgetsApi;

export default budgetsApi