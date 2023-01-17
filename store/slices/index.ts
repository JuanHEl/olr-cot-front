import { createSlice } from '@reduxjs/toolkit'

export const cotizacionSlice = createSlice({
    name: 'cotizacion',
    initialState: {
        factura:'',
        accesorios:'',
        rentas:'',
        fondoReservaMensual:'',
        comisionApertura:'',
        seguroAnual:'',
        otrosGastos:'',
        fondoReserva:'',
        residual:'',
        plazo:'',
    },
    reducers: {
        setCotizacion: (state,action) => {
            state.factura             = action.payload,
            state.accesorios          = action.payload,
            state.rentas              = action.payload,
            state.fondoReservaMensual = action.payload,
            state.comisionApertura    = action.payload,
            state.seguroAnual         = action.payload,
            state.otrosGastos         = action.payload,
            state.fondoReserva        = action.payload,
            state.residual            = action.payload,
            state.plazo               = action.payload
        }
    }
})

export const { setCotizacion } = cotizacionSlice.actions

export default cotizacionSlice.reducer