import { configureStore } from '@reduxjs/toolkit'
import cotizacion from './slices/index';
import cliente from './slices/datosCliente'
import bien from './slices/datosBien'
import plan from './slices/datosPlan'

const store = configureStore({
    reducer:{
        cotizacion,
        cliente,
        bien,
        plan
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store