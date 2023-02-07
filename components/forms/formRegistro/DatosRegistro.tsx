import React, {ChangeEvent, FormEvent, useState} from 'react'
import axios from 'axios';
import { Container, Grid, TextField, Button, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const DatosRegistro = () => {

    const router = useRouter()
    
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
    
    // Constantes y funciones de TELEFONO
    const [telefonoState, setTelefonoState] = useState({ value: "", touched: false })
    const handleChangeTelefono = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTelefonoState(currentValue => ({...currentValue, value: event.target.value}))
    }
    
    // Constantes y funciones de NOMBRE
    const [nombreState, setNombreState] = useState({ value: "", touched: false })
    const handleChangeNombre = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNombreState(currentValue => ({...currentValue, value: event.target.value}))
    }

    const onSubmitHandler = async( event: FormEvent )=>{
        event.preventDefault()
        try {
            const response = await axios.post<{msg:string}>('http://localhost:8006/api/cliente', {
                nombre:nombreState.value,
                email:emailState.value,
                password:passwordState.value,
                telefono:telefonoState.value
            })
            if(response.status === 201){
                return router.push('/login')
            }
            alert('No se pudo registrar')
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <Container>
        <Box component='form' onSubmit={onSubmitHandler}>
            <Grid container m={3} spacing={3} sx={{ position:'relative' }}>
                <Grid item xs={12} sm={6} sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                    onChange={handleChangeNombre}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    fullWidth
                    value={nombreState.value}
                    // variant="outlined"
                    // onBlur={()=>setValorAnticipoArrendamiento(currentValue => ({ ...currentValue, touched: true }))}
                    // color={valorAnticipoArrendamiento.value==''? 'warning' : 'info'}
                    // helperText={valorAnticipoArrendamiento.touched&&valorAnticipoArrendamiento.value==''? 'El valor del anticipo es requerido' : ''}
                    />
                </Grid>
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
                    <TextField
                    onChange={handleChangeTelefono}
                    id="telefono"
                    name="telefono"
                    label="Telefono"
                    fullWidth
                    value={telefonoState.value}
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
            <Button type='submit'>Enviar</Button>
        </Box>
    </Container>
  )
}
