import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface plan {
    plazo: number,
    comisionApertura: string,
    anticipoArrendamiento: number,
    plan: string,
    tipoSeguro: string,
    rentasDeposito: number,
    tipoResidual: string,
    fondoReserva: number,
    valorResidualConvenido: number
}

export const planSlice = createSlice({
    name: 'plan',
    initialState: {
        plazo:24,
        comisionApertura:'',
        anticipoArrendamiento:0,
        plan:'',
        tipoSeguro:'',
        rentasDeposito:0,
        tipoResidual: '',
        fondoReserva: 0,
        valorResidualConvenido: 0
    },
    reducers: {
        setPlPlan: ( state, {payload}:PayloadAction<plan> )=>{
            return {...state,...payload}
        },
        setPlazo: ( state:plan, {payload}:PayloadAction<number> )=>{
            state.plazo = payload
        },
        setComisionApertura: ( state:plan, {payload}:PayloadAction<string> )=>{
            state.comisionApertura = payload
        },
        setAnticipoArrendamiento: ( state:plan, {payload}:PayloadAction<number> )=>{
            state.anticipoArrendamiento = payload
        },
        setPlan: ( state:plan, {payload}:PayloadAction<string> )=>{
            state.plan = payload
        },
        setTipoSeguro: ( state:plan, {payload}:PayloadAction<string> )=>{
            state.tipoSeguro = payload
        },
        setRentasDeposito: ( state:plan, {payload}:PayloadAction<number> )=>{
            state.rentasDeposito = payload
        },
        setTipoResidual: ( state:plan, {payload}:PayloadAction<string> )=>{
            state.tipoResidual = payload
        },
        setFondoReserva: ( state:plan, {payload}:PayloadAction<number> )=>{
            state.fondoReserva = payload
        },
        setValorResidualConvenido: ( state:plan, {payload}:PayloadAction<number> )=>{
            state.valorResidualConvenido = payload
        }
    }
})

export const {
    setPlPlan,
    setPlazo,
    setComisionApertura,
    setAnticipoArrendamiento,
    setPlan,
    setTipoSeguro,
    setRentasDeposito,
    setTipoResidual,
    setFondoReserva,
    setValorResidualConvenido
} = planSlice.actions

export default planSlice.reducer