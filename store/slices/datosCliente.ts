import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cliente {
    cliente: string,
    enAtencionA: string,
    tipoCliente: string,
    promotor: string,
    correoCliente: string,
    telefono: string
}

export const clienteSlice = createSlice({
    name: 'cliente',
    initialState: {
        cliente:'',
        enAtencionA:'',
        tipoCliente:'',
        promotor:'',
        correoCliente:'',
        telefono:''
    },
    reducers: {
        setCliente: ( state, {payload}:PayloadAction<cliente> )=>{
            return {...state,...payload}
        },
        setClCliente: ( state:cliente, {payload}:PayloadAction<string> )=>{
            state.cliente = payload
        },
        setEnAtencionA: ( state:cliente, {payload}:PayloadAction<string> )=>{
            state.enAtencionA = payload
        },
        setTipoCliente: ( state:cliente, {payload}:PayloadAction<string> )=>{
            state.tipoCliente = payload
        },
        setPromotor: ( state:cliente, {payload}:PayloadAction<string> )=>{
            state.promotor = payload
        },
        setCorreoCliente: ( state:cliente, {payload}:PayloadAction<string> )=>{
            state.correoCliente = payload
        },
        setTelefono: ( state:cliente, {payload}:PayloadAction<string> )=>{
            state.telefono = payload
        }
    }
})

export const { setCliente, setClCliente, setEnAtencionA, setTipoCliente, setPromotor, setCorreoCliente, setTelefono} = clienteSlice.actions

export default clienteSlice.reducer