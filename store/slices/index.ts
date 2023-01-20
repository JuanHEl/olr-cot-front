import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CotState {
    factura: string,
    accesorios: string,
    rentas: string,
    fondoReservaMensual: string,
    comisionApertura: string,
    seguroAnual: string,
    otrosGastos: string,
    fondoReserva: string,
    residual: string,
    plazo: string
  }
  

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
        setCotizacion: ( state,{payload}:PayloadAction<CotState>) => {
            return payload
        },
        setMoverPlazo: ( state , {payload}: PayloadAction<string>) => {
            state.plazo = payload
        }
    }
})

export const { setCotizacion, setMoverPlazo } = cotizacionSlice.actions

export default cotizacionSlice.reducer