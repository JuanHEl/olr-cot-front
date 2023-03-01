import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { authSlice } from '../../../store/slices/authSlice';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, Grid, TextField, Button, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { dataInfo } from '../../../interfaces/dataInterfaces';

export const DatosLogin = () => {

    // 
    const router = useRouter()
    const dispatch=useDispatch()
    const {loggin} = authSlice.actions
    
    // Constantes y funciones de EMAIL
    const [emailState, setEmailState] = useState({ value: "", touched: false })
    const handleChangeEmail = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEmailState(currentValue => ({...currentValue, value: event.target.value}))
    }

    
    // Constantes y funciones de PASSWORD
    const [passwordState, setPasswordState] = useState({ value: "", touched: false, isVisible: false, tipoVista: 'password' || 'text' })
    const handleChangePassword = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPasswordState(currentValue => ({...currentValue, value: event.target.value}))
    }
    const viewPass = () => {
        setPasswordState(currentValue => ({...currentValue, isVisible:!passwordState.isVisible}))
        if(passwordState.isVisible===false){
            setPasswordState(currentValue => ({...currentValue, tipoVista:'password'}))
        }else{
            setPasswordState(currentValue => ({...currentValue, tipoVista:'text'}))
        }
    }
    

    const onSubmitHandler = async( event: FormEvent )=>{
        event.preventDefault()
        try {
            const response = await axios.post<dataInfo>('http://localhost:8006/api/administrador/login', {
                email:emailState.value,
                password:passwordState.value
            })
            const resp = response.data
            console.log(response)
            if(response.status === 200){
                if(response.data){
                    const { token } = response.data
                    setCookie('TOKEN',token)
                }
                dispatch(loggin(resp))
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.msg)
            }
        }
    }

  return (
    <Container>
        <Box component='form' onSubmit={onSubmitHandler}>
            <Grid container m={3} spacing={3} sx={{ position:'relative' }}>
                <Grid item xs={12} sm={6} sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                    onChange={handleChangeEmail}
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    value={emailState.value}
                    // variant="outlined"
                    // onBlur={()=>setValorAnticipoArrendamiento(currentValue => ({ ...currentValue, touched: true }))}
                    // color={valorAnticipoArrendamiento.value==''? 'warning' : 'info'}
                    // helperText={valorAnticipoArrendamiento.touched&&valorAnticipoArrendamiento.value==''? 'El valor del anticipo es requerido' : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{display: "flex", justifyContent: "center"}}>
                    <FormControl fullWidth variant="outlined">
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={passwordState.tipoVista}
                        onChange={handleChangePassword}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={viewPass}
                            value={passwordState.value}
                            edge="end"
                            >
                            {passwordState.isVisible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    </FormControl>
                </Grid>

            </Grid>
            <Button type='submit'>
                Entrar
            </Button>
        </Box>

    </Container>
  )
}
