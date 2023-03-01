import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tipoAdmin, roles } from '../../interfaces/storeInterfaces/sliceAdminInterface';
import { getCookie, deleteCookie, setCookie } from 'cookies-next';
import { dataInfo } from '../../interfaces/dataInterfaces';
import { axiosInstances } from '../../instances/axiosInstances';

const initialState: tipoAdmin = {
    authorization: null,
    isLogged: false,
    nombre: ''
}

export const getAuth = createAsyncThunk("getDataAdmin", async () => {
    try {
        const token = getCookie('TOKEN')
        const response = await axiosInstances.get<dataInfo>('administrador/get_data_session', {
            headers: { 'TOKEN': token }
        })
        if(response.status===200){
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggout: (state,{payload})=>{
            deleteCookie('TOKEN')
            return initialState
        },
        loggin: (state,{payload}:PayloadAction<dataInfo>)=>{
            state.isLogged=true
            state.nombre=payload?.nombre
            state.authorization=payload?.tipo_administrador
            setCookie('TOKEN',payload.token)
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAuth.fulfilled,(state,{payload})=>{
            state.isLogged=true
            state.nombre=payload?.nombre as string
            state.authorization=payload?.tipo_administrador as roles
        }),
        builder.addCase(getAuth.rejected,(state,{payload})=>{
            deleteCookie('TOKEN')
            return initialState
        })
    }
})

export default authSlice.reducer

