import { configureStore } from '@reduxjs/toolkit'

import budgetsApi from './features/budgetsApi'

const store = configureStore({
    reducer: {
        [budgetsApi.reducerPath] : budgetsApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(budgetsApi.middleware)
})


export default store