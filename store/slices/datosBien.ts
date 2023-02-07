import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface bien {
    tipoActivo: string,
    cantidadUnidades: number,
    marca: string,
    modelo: string,
    version: string,
    estado: string,
    precioActivo: number,
    accesorios: IUaccesorios[]
}
interface IUaccesorios {
    idAccesorio:string
    nombreAccesorio:string,
    descripcionAccesorio:string,
    valorAccesorio:number
}

export const bienSlice = createSlice({
    name: 'bien',
    initialState: {
        tipoActivo:'',
        cantidadUnidades:0,
        marca:'',
        modelo:'',
        version:'',
        estado:'',
        precioActivo:0,
        accesorios: [] as IUaccesorios[]
    },
    reducers: {
        // setBien: ( state, {payload}:PayloadAction<bien> )=>{
        //     return {...state,...payload}
        // },
        setTipoActivo: ( state:bien, {payload}:PayloadAction<string> )=>{
            state.tipoActivo = payload
        },
        setCantidadUnidades: ( state:bien, {payload}:PayloadAction<number> )=>{
            state.cantidadUnidades = payload
        },
        setMarca: ( state:bien, {payload}:PayloadAction<string> )=>{
            state.marca = payload
        },
        setModelo: ( state:bien, {payload}:PayloadAction<string> )=>{
            state.modelo = payload
        },
        setVersion: ( state:bien, {payload}:PayloadAction<string> )=>{
            state.version = payload
        },
        setEstado: ( state:bien, {payload}:PayloadAction<string> )=>{
            state.estado = payload
        },
        setPrecioActivo: ( state:bien, {payload}:PayloadAction<number> )=>{
            state.precioActivo = payload
        },
        setAccesorios: ( state:bien, {payload}:PayloadAction<IUaccesorios> ) => {
            state.accesorios.push(payload)
        },
        updateAccesorios: ( state:bien, {payload}:PayloadAction<IUaccesorios> ) => {
            const index = state.accesorios.findIndex(accesorio=>accesorio.idAccesorio===payload.idAccesorio)
            if(index < 0) return state
            state.accesorios[index]=payload
        },
        deleteAccesorios: ( state:bien, {payload}:PayloadAction<string> ) => {
            const index = state.accesorios.findIndex(accesorio=>accesorio.idAccesorio===payload)
            if(index < 0) return state
            state.accesorios.splice(index,1)
        }
        // setAccesorios: ( {accesorios}:bien, {payload}:PayloadAction<{nombreAccesorio:string,descripcionAccesorio:string,valorAccesorio:number}> )=>{
        //     accesorios.nombreAccesorio = payload.nombreAccesorio
        //     accesorios.descripcionAccesorio = payload.descripcionAccesorio
        //     accesorios.valorAccesorio = payload.valorAccesorio
        // },
        // setAccesorioNombre: ( {accesorios}:bien, {payload}:PayloadAction<string>) => {
        //     accesorios.nombreAccesorio = payload
        // },
        // setAccesorioDescripcion: ( {accesorios}:bien, {payload}:PayloadAction<string>) => {
        //     accesorios.descripcionAccesorio = payload
        // },
        // setAccesorioValor: ( {accesorios}:bien, {payload}:PayloadAction<number>) => {
        //     accesorios.valorAccesorio = payload
        // }
    }
})

export const {
        // setBien,
        setTipoActivo,
        setCantidadUnidades,
        setMarca,
        setModelo,
        setVersion,
        setEstado,
        setPrecioActivo,
        setAccesorios,
        updateAccesorios,
        deleteAccesorios
        // setAccesorioNombre,
        // setAccesorioDescripcion,
        // setAccesorioValor
  } = bienSlice.actions

export default bienSlice.reducer