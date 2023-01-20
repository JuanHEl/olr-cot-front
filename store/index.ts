import { configureStore } from '@reduxjs/toolkit'
import cotizacion from './slices/index';

const store = configureStore({
    reducer:{
        cotizacion
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store