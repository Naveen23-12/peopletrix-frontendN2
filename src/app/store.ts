import { configureStore } from "@reduxjs/toolkit";
import { hrReducer } from "../features/hr/slice";

export const store = configureStore({
    reducer: {
        hr: hrReducer,
        // Add your reducers here
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch